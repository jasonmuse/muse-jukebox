import AVFoundation
import MediaPlayer
import Observation
import UIKit

/// Plays the songs. Each song's file is fetched once and kept, then played through AVAudioEngine:
/// the player, a varispeed (a slowed side plays slower and lower, like a record), then Fold FX's
/// effects (on iPhone Duo: a filter, a crusher, an echo and a reverb, each doing nothing until
/// folding brings it in). Knows to the sample where the song is, which the haptics are timed by.
/// Keeps the lock screen, Control Center and headphone buttons in step.
@MainActor
@Observable
final class Player {
    /// Fold FX's sounds: folding the phone brings one of these in over the music
    enum FoldEffect: String, CaseIterable, Identifiable, Sendable {
        /// A low-pass filter closing down, like a DJ's filter knob
        case filter
        /// Echoes, in time with the song when its beat's known
        case echo
        /// A cathedral's reverb
        case space
        /// The record slowing down, to half speed
        case slowmo
        /// Crunched up like an old games console
        case crunch
        /// Squashed into a little radio (the lows and the highs filtered away)
        case radio

        var id: String { rawValue }
    }

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
    /// Fold FX's sound, and how far in it is (0, not at all, to 1, all the way)
    private(set) var foldEffect: FoldEffect = .filter
    private(set) var foldAmount: Double = 0
    /// How far open Fold FX's filter is (1 lets everything through): the taps go duller with it
    private(set) var filterOpenness: Double = 1
    /// The song's cover, once it's loaded (for the lock screen, and the backdrop)
    private(set) var artwork: UIImage?
    var shuffle = false
    var repeatMode: Repeat = .all

    private let engine = AVAudioEngine()
    private let node = AVAudioPlayerNode()
    private let varispeed = AVAudioUnitVarispeed()
    /// Fold FX's filters: a low-pass, and a high-pass (the radio)
    private let filter = AVAudioUnitEQ(numberOfBands: 2)
    /// (everything from here on in stereo, which the effects after it are happiest with)
    private let effectsMixer = AVAudioMixerNode()
    private let crusher = AVAudioUnitDistortion()
    private let echo = AVAudioUnitDelay()
    private let reverb = AVAudioUnitReverb()
    /// The side's own speed (1, or a slowed side's), and Fold FX's slow-mo on top (1, none)
    @ObservationIgnored private var sideRate: Double = 1
    @ObservationIgnored private var foldRate: Double = 1
    /// The song's beat, in seconds of its file, once its haptic track says (Fold FX's echo keeps time with it)
    @ObservationIgnored private var beat: TimeInterval?
    /// The speed the lock screen was last told about
    @ObservationIgnored private var toldRate: Double = 1
    @ObservationIgnored private var connectedFormat: AVAudioFormat?
    @ObservationIgnored private var file: AVAudioFile?
    /// The file's length in frames, worked out as it was opened
    @ObservationIgnored private var fileLength: AVAudioFramePosition = 0
    @ObservationIgnored private var segmentStart: AVAudioFramePosition = 0
    @ObservationIgnored private var pausedTime: TimeInterval = 0
    @ObservationIgnored private var segment = 0
    @ObservationIgnored private var playWhenLoaded = false
    @ObservationIgnored private var resumeAfterInterruption = false
    @ObservationIgnored private var loading: Task<Void, Never>?
    @ObservationIgnored private var glide: Task<Void, Never>?
    @ObservationIgnored private var observers: [NSObjectProtocol] = []
    /// Where the player was last seen (host time, song time), for when the engine's stopped under it
    @ObservationIgnored private var lastSeen: (at: TimeInterval, time: TimeInterval) = (0, 0)
    /// How long sound takes to come out (measured as it starts, and when the output changes)
    @ObservationIgnored private var latency: TimeInterval = 0
    private let cache = SongCache()

    init() {
        engine.attach(node)
        engine.attach(varispeed)
        engine.attach(filter)
        engine.attach(effectsMixer)
        engine.attach(crusher)
        engine.attach(echo)
        engine.attach(reverb)
        filter.bands[0].filterType = .lowPass
        filter.bands[1].filterType = .highPass
        crusher.loadFactoryPreset(.multiDecimated2)
        echo.lowPassCutoff = 5_000
        reverb.loadFactoryPreset(.cathedral)
        for effect in FoldEffect.allCases {
            setNeutral(effect)
        }
        observeSession()
        setUpRemoteCommands()
    }

    // MARK: - Where it is

    /// How fast the record's going (1, or a slowed side's speed)
    var rate: Double {
        Double(varispeed.rate)
    }

    /// Where the song is, in seconds of its file, as it's heard (to show): what's been played, less what's
    /// still on its way out (a few hundredths of a second from the speaker, a fifth through AirPods)
    var currentTime: TimeInterval {
        isPlaying ? min(duration, max(startTime, heardTime)) : pausedTime
    }

    /// The same, for timing taps to: just after the song's started or moved it can be before where it
    /// started from, while its first sound is still on its way out
    var tapClock: TimeInterval {
        isPlaying ? heardTime : pausedTime
    }

    /// Where the song was started or moved to (nothing before it is heard)
    var startTime: TimeInterval {
        guard let file else { return pausedTime }
        return Double(segmentStart) / file.processingFormat.sampleRate
    }

    /// 0 to 1 along the song
    var progress: Double {
        duration > 0 ? currentTime / duration : 0
    }

    private var heardTime: TimeInterval {
        playedTime - (latency * rate)
    }

    /// What's been played: the player's own count while the engine's running, and otherwise (iOS has
    /// just stopped it for a call, say, or new headphones) worked out from where it last was
    private var playedTime: TimeInterval {
        let now = CACurrentMediaTime()
        if file != nil, let renderTime = node.lastRenderTime, renderTime.isSampleTimeValid,
           let playerTime = node.playerTime(forNodeTime: renderTime) {
            let played = startTime + (Double(max(0, playerTime.sampleTime)) / playerTime.sampleRate)
            lastSeen = (now, played)
            return played
        }
        guard isPlaying else { return pausedTime }
        return min(duration, lastSeen.time + ((now - lastSeen.at) * rate))
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
        guard let current = self.song else {
            play(song, in: [song])
            return
        }
        guard song != current else { return }
        queue.removeAll { $0 == song }
        queueIndex = queue.firstIndex(of: current) ?? 0
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
        guard isPlaying else {
            // (paused while the song's still on its way: the engine needn't run on for it)
            idleEngine()
            return
        }
        let rendering = engine.isRunning
        pausedTime = min(duration, playedTime)
        isPlaying = false
        if rendering {
            node.pause()
            engine.pause()
        } else {
            // (iOS has stopped the engine under it: the song's queued again from where it got to)
            stopNode()
            schedule(from: pausedTime)
        }
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
            if engine.isRunning {
                node.play()
                lastSeen = (CACurrentMediaTime(), time)
            } else {
                start()
            }
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
            load(other, playing: isPlaying || playWhenLoaded)
            return
        }
        self.song = other
        if queue.indices.contains(queueIndex) {
            queue[queueIndex] = other
        }
        glideRate(to: other.rate)
        if other.cover != song.cover {
            loadArtwork(for: other)
        }
        updateNowPlaying()
    }

    /// Fold FX: `effect`, `amount` of the way in (0, not at all, to 1, all the way). Changing the
    /// effect puts the one before back to doing nothing.
    func setFoldFX(_ effect: FoldEffect, amount: Double) {
        let amount = min(max(amount, 0), 1)
        guard effect != foldEffect || abs(amount - foldAmount) > 0.002 else { return }
        if effect != foldEffect {
            setNeutral(foldEffect)
            foldEffect = effect
        }
        foldAmount = amount
        let on = amount > 0.015
        switch effect {
        case .filter:
            // (closing down to 220 Hz)
            filter.bands[0].frequency = Float(220 * pow(20_000 / 220, 1 - amount))
            filter.bands[0].bypass = !on
        case .radio:
            // (the highs down to 3 kHz and the lows up to 900 Hz: a little speaker's band)
            filter.bands[0].frequency = Float(20_000 * pow(3_000.0 / 20_000, amount))
            filter.bands[1].frequency = Float(20 * pow(900.0 / 20, amount))
            filter.bands[0].bypass = !on
            filter.bands[1].bypass = !on
        case .crunch:
            crusher.wetDryMix = Float(100 * amount)
            crusher.bypass = !on
        case .echo:
            echo.delayTime = echoTime
            echo.wetDryMix = Float(55 * amount)
            echo.feedback = Float(15 + (55 * amount))
            echo.bypass = !on
        case .space:
            reverb.wetDryMix = Float(75 * amount)
            reverb.bypass = !on
        case .slowmo:
            foldRate = 1 - (0.5 * amount)
            applyRate()
            if abs(rate - toldRate) > 0.05 {
                updateNowPlaying()
            }
        }
        filterOpenness = effect == .filter ? 1 - amount : 1
    }

    /// The song's beat, from its haptic track (for Fold FX's echo)
    func setBeat(_ beat: TimeInterval?, for song: Song) {
        guard self.song?.audio == song.audio else { return }
        self.beat = beat
        if foldEffect == .echo {
            echo.delayTime = echoTime
        }
    }

    /// The echo's time: three quarters of a beat as it's heard (at the record's speed), or a third
    /// of a second when the beat's not known
    private var echoTime: TimeInterval {
        guard let beat, beat > 0 else { return 0.33 }
        return min(max(0.75 * beat / max(rate, 0.1), 0.12), 1.2)
    }

    /// An effect back to doing nothing
    private func setNeutral(_ effect: FoldEffect) {
        switch effect {
        case .filter, .radio:
            filter.bands[0].frequency = 20_000
            filter.bands[1].frequency = 20
            filter.bands[0].bypass = true
            filter.bands[1].bypass = true
        case .crunch:
            crusher.wetDryMix = 0
            crusher.bypass = true
        case .echo:
            echo.wetDryMix = 0
            echo.feedback = 0
            echo.bypass = true
        case .space:
            reverb.wetDryMix = 0
            reverb.bypass = true
        case .slowmo:
            foldRate = 1
            applyRate()
        }
    }

    /// The varispeed at the side's speed, slowed by Fold FX's slow-mo
    private func applyRate() {
        varispeed.rate = Float(sideRate * foldRate)
    }

    // MARK: - Loading and the engine

    private func load(_ song: Song, from time: TimeInterval = 0, playing: Bool) {
        loading?.cancel()
        glide?.cancel()
        stopNode()
        // (going straight on to another song the engine's left running, so the song starts the
        // moment it's ready: stopping and starting the engine for every song held up the screen)
        if engine.isRunning && !playing {
            engine.pause()
        }
        self.song = song
        file = nil
        fileLength = 0
        beat = nil
        isPlaying = false
        isLoading = true
        couldNotLoad = false
        playWhenLoaded = playing
        pausedTime = time
        duration = (song.duration ?? 0) * song.rate
        jumps += 1
        loadArtwork(for: song)
        updateNowPlaying()
        if playing {
            wakeSession()
        }
        loading = Task { [weak self] in
            guard let self else { return }
            do {
                let url = try await cache.file(for: song)
                try Task.checkCancellation()
                // (opened away from the main thread: working out an mp3's length can mean reading
                // through the whole file, which held up the screen as the song started)
                let opened = try await Task.detached(priority: .userInitiated) {
                    try OpenedFile(url)
                }.value
                try Task.checkCancellation()
                guard self.song == song else { return }
                file = opened.file
                fileLength = opened.length
                duration = Double(opened.length) / opened.file.processingFormat.sampleRate
                connect(opened.file.processingFormat)
                sideRate = song.rate
                applyRate()
                schedule(from: time)
                isLoading = false
                if playWhenLoaded {
                    start()
                } else {
                    idleEngine()
                    updateNowPlaying()
                }
                fetchNext()
            } catch is CancellationError {
                // (another song's been chosen)
            } catch {
                // (whatever was kept for it won't play, so it's fetched afresh next time)
                await cache.forget(song)
                guard self.song == song else { return }
                isLoading = false
                couldNotLoad = true
                idleEngine()
                updateNowPlaying()
            }
        }
    }

    /// The audio session woken in the background while the song's fetched and opened, so it's awake
    /// by the time the song starts (waking it holds up whichever thread asks, the first time for a
    /// good moment)
    private func wakeSession() {
        Task.detached(priority: .userInitiated) {
            try? AVAudioSession.sharedInstance().setActive(true)
        }
    }

    /// The engine paused while there's nothing for it to play, rather than left running silent
    private func idleEngine() {
        if engine.isRunning && !isPlaying {
            engine.pause()
        }
    }

    /// The player, varispeed and Fold FX's effects wired up for the song's file (only when its
    /// format's new). From the effects mixer on it's in stereo, whatever the file is.
    private func connect(_ format: AVAudioFormat) {
        if let connectedFormat, connectedFormat == format { return }
        engine.stop()
        for unit in [node, varispeed, filter, effectsMixer, crusher, echo, reverb] as [AVAudioNode] {
            engine.disconnectNodeOutput(unit)
        }
        let stereo = AVAudioFormat(standardFormatWithSampleRate: format.sampleRate, channels: 2) ?? format
        engine.connect(node, to: varispeed, format: format)
        engine.connect(varispeed, to: filter, format: format)
        engine.connect(filter, to: effectsMixer, format: format)
        engine.connect(effectsMixer, to: crusher, format: stereo)
        engine.connect(crusher, to: echo, format: stereo)
        engine.connect(echo, to: reverb, format: stereo)
        engine.connect(reverb, to: engine.mainMixerNode, format: stereo)
        connectedFormat = format
    }

    private func start() {
        do {
            try AVAudioSession.sharedInstance().setActive(true)
            if !engine.isRunning {
                try engine.start()
            }
            node.play()
            measureLatency()
            lastSeen = (CACurrentMediaTime(), pausedTime)
            isPlaying = true
            jumps += 1
        } catch {
            isPlaying = false
        }
        updateNowPlaying()
    }

    private func measureLatency() {
        let session = AVAudioSession.sharedInstance()
        latency = session.outputLatency + session.ioBufferDuration
    }

    /// The rest of the song, from `time`, queued on the player
    private func schedule(from time: TimeInterval) {
        guard let file else { return }
        let sampleRate = file.processingFormat.sampleRate
        let first = min(max(0, AVAudioFramePosition(time * sampleRate)), fileLength)
        segment += 1
        let current = segment
        segmentStart = first
        pausedTime = Double(first) / sampleRate
        let frames = fileLength - first
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
        let from = sideRate
        glide = Task { [weak self] in
            let steps = 24
            for step in 1...steps {
                try? await Task.sleep(for: .milliseconds(30))
                guard let self, !Task.isCancelled else { return }
                let along = Double(step) / Double(steps)
                let eased = along * along * (3 - (2 * along))
                self.sideRate = from + ((target - from) * eased)
                self.applyRate()
            }
            self?.jumps += 1
            self?.updateNowPlaying()
        }
    }

    private func loadArtwork(for song: Song) {
        artwork = nil
        Task { [weak self] in
            let image = await ArtworkStore.shared.image(for: song.cover, maxPixels: 800)
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
        toldRate = rate
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
        // (and whatever the new output is, how long its sound takes to come out)
        observers.append(center.addObserver(forName: AVAudioSession.routeChangeNotification, object: nil, queue: .main) { [weak self] note in
            let rawReason = note.userInfo?[AVAudioSessionRouteChangeReasonKey] as? UInt ?? 0
            let unplugged = AVAudioSession.RouteChangeReason(rawValue: rawReason) == .oldDeviceUnavailable
            guard let self else { return }
            Task { @MainActor in
                self.measureLatency()
                if unplugged {
                    self.pause()
                }
            }
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
        // (the engine's stopped, so this is worked out from where the player was last seen)
        let time = isPlaying ? min(duration, playedTime) : pausedTime
        stopNode()
        isPlaying = false
        schedule(from: time)
        if wasPlaying {
            start()
        }
    }
}

/// A song's file, opened, and its length in frames (for an mp3, working that out can mean reading
/// through the whole file, so it's done away from the main thread)
private struct OpenedFile: @unchecked Sendable {
    let file: AVAudioFile
    let length: AVAudioFramePosition

    init(_ url: URL) throws {
        file = try AVAudioFile(forReading: url)
        length = file.length
    }
}
