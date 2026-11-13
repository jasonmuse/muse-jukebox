import Foundation
import Observation
import UIKit

/// Plays the song's haptic track along with it: every tenth of a second, the taps due in the next
/// 0.3 go to Core Haptics, each timed to land on its beat (sooner or later with the record's speed).
/// Whenever the song jumps (a seek, a pause, another song, a flip to the other side) the taps on their
/// way are called back and go out again from where it is.
@MainActor
@Observable
final class HapticsConductor {
    /// The playing song's haptic track (the rings that pulse with the taps read it too)
    private(set) var track: HapticTrack?
    private(set) var isPlayingSample = false

    private let player: Player
    private let settings: HapticsSettings
    private let haptics = HapticsPlayer()
    private let store = HapticTrackStore()
    @ObservationIgnored private var trackPath: String?
    @ObservationIgnored private var sentTo: TimeInterval?
    @ObservationIgnored private var sentJumps = -1
    @ObservationIgnored private var sentRate: Double = 1
    @ObservationIgnored private var tapsOut = false
    @ObservationIgnored private var loop: Task<Void, Never>?
    @ObservationIgnored private var sample: Task<Void, Never>?

    private static let ahead: TimeInterval = 0.3
    /// The taste of them, boom, tick, boom-boom (when, how hard, how crisp)
    private static let samplePattern: [(TimeInterval, Double, Double)] = [(0, 1, 0.15), (0.24, 0.5, 0.8), (0.48, 0.85, 0.2), (0.6, 0.6, 0.25)]

    init(player: Player, settings: HapticsSettings) {
        self.player = player
        self.settings = settings
        loop = Task { [weak self] in
            while !Task.isCancelled {
                self?.step()
                try? await Task.sleep(for: .milliseconds(100))
            }
        }
    }

    /// Four bars of the sample, at the strength chosen
    func playSample() {
        guard settings.isSupported else { return }
        callBack()
        var taps: [HapticsPlayer.Tap] = []
        for bar in 0..<4 {
            for (at, power, crisp) in Self.samplePattern {
                taps.append(HapticsPlayer.Tap(delay: (Double(bar) * 0.8) + at, intensity: settings.intensity(for: power), sharpness: Float(crisp)))
            }
        }
        haptics.play(taps)
        isPlayingSample = true
        sample?.cancel()
        sample = Task { [weak self] in
            try? await Task.sleep(for: .seconds(3.2))
            guard !Task.isCancelled else { return }
            self?.isPlayingSample = false
        }
    }

    func stopSample() {
        sample?.cancel()
        haptics.stop()
        isPlayingSample = false
    }

    private func step() {
        // (and none while the app's in the background: iOS doesn't play its haptics there)
        guard settings.isActive, !isPlayingSample, let song = player.song, player.isPlaying,
              UIApplication.shared.applicationState == .active else {
            callBack()
            return
        }
        if trackPath != song.haptics {
            trackPath = song.haptics
            track = nil
            callBack()
            Task { [weak self, store] in
                let loaded = await store.track(for: song)
                guard let self, self.trackPath == song.haptics else { return }
                self.track = loaded
            }
            return
        }
        guard let track else { return }
        // (the clock that runs on before the song's first sound reaches the speaker, so the first
        // taps after a start or a seek aren't early)
        let time = player.tapClock
        let rate = max(player.rate, 0.1)
        if let sent = sentTo, player.jumps != sentJumps || abs(rate - sentRate) > 0.001 || time < sent - (Self.ahead * rate) - 0.15 {
            callBack()
        }
        // (nothing from before where it started: that's not going to be heard)
        let from = max(sentTo ?? time, player.startTime - 0.001)
        if sentTo == nil {
            sentJumps = player.jumps
            sentRate = rate
        }
        let until = time + (Self.ahead * rate)
        // Fold FX muffles the taps along with the music: softer and duller as the filter closes
        let openness = player.filterOpenness
        var due: [HapticsPlayer.Tap] = []
        var index = track.firstTap(after: from)
        while index < track.taps.count && track.taps[index].time <= until {
            let tap = track.taps[index]
            index += 1
            if settings.mix == .beats && !tap.isBeat { continue }
            // (one that's been missed is left out: a tap late is worse than none)
            let delay = (tap.time - time) / rate
            guard delay >= -0.02 else { continue }
            due.append(HapticsPlayer.Tap(
                delay: max(0, delay),
                intensity: settings.intensity(for: tap.power * (0.35 + (0.65 * openness))),
                sharpness: Float(tap.crisp * (0.4 + (0.6 * openness)))
            ))
        }
        if !due.isEmpty {
            haptics.play(due)
            tapsOut = true
        }
        sentTo = max(from, until)
    }

    /// The taps on their way that haven't landed are called back
    private func callBack() {
        sentTo = nil
        guard tapsOut else { return }
        tapsOut = false
        haptics.stop()
    }
}
