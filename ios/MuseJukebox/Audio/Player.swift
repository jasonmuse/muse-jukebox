import AVFoundation
import MediaPlayer
import Observation
import UIKit

/// Plays the songs. Each song's file is fetched once and kept, then played through AVAudioEngine:
/// the player, a varispeed (a slowed side plays slower and lower, like a record) and a low-pass filter
/// (Fold FX, on iPhone Duo). Knows to the sample where the song is, which the haptics are timed by.
/// Keeps the lock screen, Control Center and headphone buttons in step.
@MainActor
@Observable
final class Player {
    enum Repeat: String, CaseIterable {
        case off, all, one

        var next: Repeat {
            switch self {
            case .off: .all
            case .all: .one
            case .one: .off
            }
        }
    }

    private(set) var song: Song?
    private(set) var isPlaying = false
    private(set) var isLoading = false
    private(set) var couldNotLoad = false
    private(set) var queue: [Song] = []
    private(set) var queueIndex = 0
    /// The song's length, in seconds of its file (a slowed side takes longer to play it)
    private(set) var duration: TimeInterval = 0
    /// Goes up whenever where the song is jumps (another song, a seek, a pause, a new speed), so what
    /// follows it along (the haptics) starts again from where it is
    private(set) var jumps = 0
    /// Fold FX: how far open the filter is (1 lets everything through)
    private(set) var filterOpenness: Double = 1
    /// The song's cover, once it's loaded (for the lock screen, and the backdrop)
    private(set) var artwork: UIImage?
    var shuffle = false
    var repeatMode: Repeat = .all

    private let engine = AVAudioEngine()
    private let node = AVAudioPlayerNode()
    private let varispeed = AVAudioUnitVarispeed()
    private let filter = AVAudioUnitEQ(numberOfBands: 1)
    @ObservationIgnored private var connectedFormat: AVAudioFormat?
    @ObservationIgnored private var file: AVAudioFile?
    @ObservationIgnored private var segmentStart: AVAudioFramePosition = 0
    @ObservationIgnored private var pausedTime: TimeInterval = 0
    @ObservationIgnored private var segment = 0
    @ObservationIgnored private var playWhenLoaded = false
    @ObservationIgnored private var resumeAfterInterruption = false
    @ObservationIgnored private var loading: Task<Void, Never>?
    @ObservationIgnored private var glide: Task<Void, Never>?
    @ObservationIgnored private var observers: [NSObjectProtocol] = []
    private let cache = SongCache()

    init() {
        engine.attach(node)
        engine.attach(varispeed)
        engine.attach(filter)
        let band = filter.bands[0]
        band.filterType = .lowPass
        band.frequency = 20_000
        band.bypass = true
        observeSession()
        setUpRemoteCommands()
    }

    // MARK: - Where it is

    /// How fast the record's going (1, or a slowed side's speed)
    var rate: Double {
        Double(varispeed.rate)
    }

    /// Where the song is, in seconds of its file, as it's heard: what's been played, less what's still
    /// on its way out (a few hundredths of a second from the speaker, a fifth through AirPods)
    var currentTime: TimeInterval {
        guard isPlaying else { return pausedTime }
        let session = AVAudioSession.sharedInstance()
        let onItsWay = (session.outputLatency + session.ioBufferDuration) * rate
        return min(duration, max(startTime, playedTime - onItsWay))
    }

    /// 0 to 1 along the song
    var progress: Double {
        duration > 0 ? currentTime / duration : 0
    }

    private var startTime: TimeInterval {
        guard let file else { return pausedTime }
        return Double(segmentStart) / file.processingFormat.sampleRate
    }

    private var playedTime: TimeInterval {
        guard file != nil, let renderTime = node.lastRenderTime, renderTime.isSampleTimeValid,
              let playerTime = node.playerTime(forNodeTime: renderTime) else { return pausedTime }
        return startTime + (Double(max(0, playerTime.sampleTime)) / playerTime.sampleRate)
    }

    // MARK: - Playing

    /// Plays a song, then the rest of `list` after it (shuffled, with shuffle on)
    func play(_ song: Song, in list: [Song]) {
        var order = list.contains(song) ? list : [song] + list
        if shuffle {
            order.removeAll { $0 == song }
            order.shuffle()
            order.insert(song, at: 0)
        }
        queue = order
        queueIndex = order.firstIndex(of: song) ?? 0
        load(song, playing: true)
    }

    func shuffleAll(_ list: [Song]) {
        guard let first = list.randomElement() else { return }
        shuffle = true
        play(first, in: list)
    }

    /// Puts a song straight after the one that's playing
    func playNext(_ song: Song) {
        guard self.song != nil else {
            play(song, in: [song])
            return
        }
        queue.removeAll { $0 == song }
        queueIndex = queue.firstIndex(where: { $0 == self.song }) ?? 0
        queue.insert(song, at: min(queue.count, queueIndex + 1))
    }

    var upNext: [Song] {
        guard queueIndex + 1 < queue.count else { return [] }
        return Array(queue[(queueIndex + 1)...])
    }

    func togglePlayPause() {
        if isPlaying || (isLoading && playWhenLoaded) {
            pause()
        } else {
            resume()
        }
    }

    func pause() {
        playWhenLoaded = false
        guard isPlaying else { return }
        pausedTime = playedTime
        node.pause()
        engine.pause()
        isPlaying = false
        jumps += 1
        updateNowPlaying()
    }

    func resume() {
        guard let song else { return }
        if isLoading {
            playWhenLoaded = true
            return
        }
        guard file != nil else {
            load(song, from: pausedTime, playing: true)
            return
        }
        start()
    }

    func seek(to time: TimeInterval) {
        let time = min(max(0, time), max(0, duration - 0.05))
        guard file != nil else {
            pausedTime = time
            return
        }
        let wasPlaying = isPlaying
        stopNode()
        schedule(from: time)
        if wasPlaying {
            node.play()
        }
        jumps += 1
        updateNowPlaying()
    }

    func next() {
        guard !queue.isEmpty else { return }
        queueIndex = queueIndex + 1 < queue.count ? queueIndex + 1 : 0
        load(queue[queueIndex], playing: true)
    }

    /// Back to the start of the song, or to the one before if it's only just started
    func previous() {
        guard currentTime < 3, !queue.isEmpty else {
            seek(to: 0)
            return
        }
        queueIndex = queueIndex > 0 ? queueIndex - 1 : queue.count - 1
        load(queue[queueIndex], playing: true)
    }

    /// Flips a two-sided song over: the record glides up or down to the other side's speed, right
    /// where it is (both sides play the same recording)
    func flip(to other: Song) {
        guard let song, other.audio == song.audio, file != nil else {
            load(other, playing: isPlaying)
            return
        }
        self.song = other
        if queue.indices.contains(queueIndex) {
            queue[queueIndex] = other
        }
        glideRate(to: other.rate)
        loadArtwork(for: other)
        updateNowPlaying()
    }

    /// Fold FX: the filter closing down to 220 Hz (0) or open (1)
    func setFilterOpenness(_ openness: Double) {
        let openness = min(max(openness, 0), 1)
        guard abs(openness - filterOpenness) > 0.002 else { return }
        filterOpenness = openness
        let band = filter.bands[0]
        if openness > 0.985 {
            band.bypass = true
        } else {
            band.frequency = Float(220 * pow(20_000 / 220, openness))
            band.bypass = false
        }
    }

    // MARK: - Loading and the engine

    private func load(_ song: Song, from time: TimeInterval = 0, playing: Bool) {
        loading?.cancel()
        glide?.cancel()
        stopNode()
        if engine.isRunning {
            engine.pause()
        }
        self.song = song
        file = nil
        isPlaying = false
        isLoading = true
        couldNotLoad = false
        playWhenLoaded = playing
        pausedTime = time
        duration = (song.duration ?? 0) * song.rate
        jumps += 1
        loadArtwork(for: song)
        updateNowPlaying()
        loading = Task { [weak self] in
            guard let self else { return }
            do {
                let url = try await cache.file(for: song)
                try Task.checkCancellation()
                let file = try AVAudioFile(forReading: url)
                guard self.song == song else { return }
                self.file = file
                duration = Double(file.length) / file.processingFormat.sampleRate
                connect(file.processingFormat)
                varispeed.rate = Float(song.rate)
                schedule(from: time)
                isLoading = false
                if playWhenLoaded {
                    start()
                } else {
                    updateNowPlaying()
                }
                fetchNext()
            } catch is CancellationError {
                // (another song's been chosen)
            } catch {
                guard self.song == song else { return }
                isLoading = false
                couldNotLoad = true
                updateNowPlaying()
            }
        }
    }

    /// The player, varispeed and filter wired up for the song's file (only when its format's new)
    private func connect(_ format: AVAudioFormat) {
        if let connectedFormat, connectedFormat == format { return }
        engine.stop()
        engine.disconnectNodeOutput(node)
        engine.disconnectNodeOutput(varispeed)
        engine.disconnectNodeOutput(filter)
        engine.connect(node, to: varispeed, format: format)
        engine.connect(varispeed, to: filter, format: format)
        engine.connect(filter, to: engine.mainMixerNode, format: format)
        connectedFormat = format
    }

    private func start() {
        do {
            try AVAudioSession.sharedInstance().setActive(true)
            if !engine.isRunning {
                try engine.start()
            }
            node.play()
            isPlaying = true
            jumps += 1
        } catch {
            isPlaying = false
        }
        updateNowPlaying()
    }

    /// The rest of the song, from `time`, queued on the player
    private func schedule(from time: TimeInterval) {
        guard let file else { return }
        let sampleRate = file.processingFormat.sampleRate
        let first = min(max(0, AVAudioFramePosition(time * sampleRate)), file.length)
        segment += 1
        let current = segment
        segmentStart = first
        pausedTime = Double(first) / sampleRate
        let frames = file.length - first
        guard frames > 0 else { return }
        node.scheduleSegment(file, startingFrame: first, frameCount: AVAudioFrameCount(frames), at: nil,
                             completionCallbackType: .dataPlayedBack) { @Sendable [weak self] _ in
            guard let self else { return }
            Task { @MainActor in self.segmentPlayed(current) }
        }
    }

    private func stopNode() {
        segment += 1 // (so the stopped segment's completion is ignored)
        node.stop()
    }

    private func segmentPlayed(_ played: Int) {
        guard played == segment, isPlaying else { return }
        switch repeatMode {
        case .one:
            seek(to: 0)
        case .all:
            next()
        case .off:
            if queueIndex + 1 < queue.count {
                next()
            } else {
                stopNode()
                engine.pause()
                isPlaying = false
                schedule(from: 0)
                jumps += 1
                updateNowPlaying()
            }
        }
    }

    /// The next song's file, fetched while this one plays so it starts straight away
    private func fetchNext() {
        guard let next = upNext.first else { return }
        Task { [cache] in
            _ = try? await cache.file(for: next)
        }
    }

    private func glideRate(to target: Double) {
        glide?.cancel()
        let from = Double(varispeed.rate)
        glide = Task { [weak self] in
            let steps = 24
            for step in 1...steps {
                try? await Task.sleep(for: .milliseconds(30))
                guard let self, !Task.isCancelled else { return }
                let along = Double(step) / Double(steps)
                let eased = along * along * (3 - (2 * along))
                self.varispeed.rate = Float(from + ((target - from) * eased))
            }
            self?.jumps += 1
            self?.updateNowPlaying()
        }
    }

    private func loadArtwork(for song: Song) {
        artwork = nil
        Task { [weak self] in
            let image = await ArtworkStore.shared.image(for: song.cover)
            guard let self, self.song?.cover == song.cover else { return }
            self.artwork = image
            self.updateNowPlaying()
        }
    }

    // MARK: - The lock screen and the outside world

    private func updateNowPlaying() {
        let center = MPNowPlayingInfoCenter.default()
        guard let song else {
            center.nowPlayingInfo = nil
            return
        }
        let speed = max(rate, 0.1)
        var info: [String: Any] = [
            MPMediaItemPropertyTitle: song.title,
            MPMediaItemPropertyArtist: "Jason Muse",
            MPMediaItemPropertyAlbumTitle: song.game?.name ?? "Muse Jukebox",
            MPMediaItemPropertyPlaybackDuration: duration / speed,
            MPNowPlayingInfoPropertyElapsedPlaybackTime: currentTime / speed,
            MPNowPlayingInfoPropertyPlaybackRate: isPlaying ? 1.0 : 0.0,
            MPNowPlayingInfoPropertyDefaultPlaybackRate: 1.0,
            MPNowPlayingInfoPropertyMediaType: MPNowPlayingInfoMediaType.audio.rawValue
        ]
        if let image = artwork {
            info[MPMediaItemPropertyArtwork] = MPMediaItemArtwork(boundsSize: image.size) { @Sendable _ in image }
        }
        center.nowPlayingInfo = info
    }

    private func setUpRemoteCommands() {
        let center = MPRemoteCommandCenter.shared()
        handle(center.playCommand) { $0.resume() }
        handle(center.pauseCommand) { $0.pause() }
        handle(center.togglePlayPauseCommand) { $0.togglePlayPause() }
        handle(center.nextTrackCommand) { $0.next() }
        handle(center.previousTrackCommand) { $0.previous() }
        center.changePlaybackPositionCommand.isEnabled = true
        _ = center.changePlaybackPositionCommand.addTarget { [weak self] event in
            guard let self, let position = (event as? MPChangePlaybackPositionCommandEvent)?.positionTime else {
                return .commandFailed
            }
            Task { @MainActor in self.seek(to: position * self.rate) }
            return .success
        }
    }

    private func handle(_ command: MPRemoteCommand, _ action: @escaping @MainActor @Sendable (Player) -> Void) {
        command.isEnabled = true
        _ = command.addTarget { [weak self] _ in
            guard let self else { return .commandFailed }
            Task { @MainActor in action(self) }
            return .success
        }
    }

    private func observeSession() {
        let center = NotificationCenter.default
        // A call, an alarm, another app's sound: paused, and on again after if iOS says so
        observers.append(center.addObserver(forName: AVAudioSession.interruptionNotification, object: nil, queue: .main) { [weak self] note in
            let rawType = note.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt ?? 0
            let rawOptions = note.userInfo?[AVAudioSessionInterruptionOptionKey] as? UInt ?? 0
            guard let self, let type = AVAudioSession.InterruptionType(rawValue: rawType) else { return }
            let shouldResume = AVAudioSession.InterruptionOptions(rawValue: rawOptions).contains(.shouldResume)
            Task { @MainActor in self.interrupted(type, shouldResume: shouldResume) }
        })
        // Headphones unplugged: paused, so it doesn't carry on out loud
        observers.append(center.addObserver(forName: AVAudioSession.routeChangeNotification, object: nil, queue: .main) { [weak self] note in
            let rawReason = note.userInfo?[AVAudioSessionRouteChangeReasonKey] as? UInt ?? 0
            guard let self, AVAudioSession.RouteChangeReason(rawValue: rawReason) == .oldDeviceUnavailable else { return }
            Task { @MainActor in self.pause() }
        })
        // The output changed under the engine (it stops): carry on from where it was
        observers.append(center.addObserver(forName: .AVAudioEngineConfigurationChange, object: engine, queue: .main) { [weak self] _ in
            guard let self else { return }
            Task { @MainActor in self.engineChanged() }
        })
    }

    private func interrupted(_ type: AVAudioSession.InterruptionType, shouldResume: Bool) {
        switch type {
        case .began:
            resumeAfterInterruption = isPlaying
            if isPlaying {
                pause()
            }
        case .ended:
            if resumeAfterInterruption && shouldResume {
                resume()
            }
            resumeAfterInterruption = false
        @unknown default:
            break
        }
    }

    private func engineChanged() {
        guard file != nil else { return }
        let wasPlaying = isPlaying
        let time = currentTime
        stopNode()
        isPlaying = false
        schedule(from: time)
        if wasPlaying {
            start()
        }
    }
}
