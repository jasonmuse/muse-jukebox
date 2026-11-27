import CoreHaptics

/// Plays taps with Core Haptics, each one landing when it was asked to
@MainActor
final class HapticsPlayer {
    /// A tap: how long from now it lands (s), how hard (0–1), and how crisp (0 a deep thud, 1 a sharp tick)
    struct Tap {
        var delay: TimeInterval
        var intensity: Float
        var sharpness: Float
    }

    private var engine: CHHapticEngine?
    private var running = false
    /// Starting, in the background (starting it there and then held up the main thread for a moment:
    /// a stutter just as the music came in)
    private var starting = false
    /// Taps on their way (to call back if the song stops or moves), and when each lot's done
    private var pending: [(player: CHHapticPatternPlayer, end: TimeInterval)] = []

    /// Plays the taps, if the engine's ready for them: false while it's still starting (they can go
    /// out next time round, the ones that aren't late by then). `waiting` waits for it to start (a
    /// sample someone's asked to feel is worth the moment).
    @discardableResult
    func play(_ taps: [Tap], waiting: Bool = false) -> Bool {
        guard let first = taps.map(\.delay).min() else { return true }
        guard let engine = startedEngine(waiting: waiting) else { return false }
        let events = taps.map { tap in
            CHHapticEvent(eventType: .hapticTransient, parameters: [
                CHHapticEventParameter(parameterID: .hapticIntensity, value: unit(tap.intensity)),
                CHHapticEventParameter(parameterID: .hapticSharpness, value: unit(tap.sharpness))
            ], relativeTime: tap.delay - first)
        }
        do {
            let pattern = try CHHapticPattern(events: events, parameters: [])
            let player = try engine.makePlayer(with: pattern)
            let start = engine.currentTime + max(0, first)
            try player.start(atTime: start)
            pending.removeAll { $0.end < engine.currentTime }
            pending.append((player, start + pattern.duration + 0.1))
            return true
        } catch {
            // The engine's been stopped under us (the app went to the background, say): it's started
            // afresh for the next taps
            running = false
            return false
        }
    }

    /// The engine woken ahead of the first taps (a song's coming on), so it's ready for them
    func warmUp() {
        _ = startedEngine()
    }

    /// The taps that haven't landed yet don't (cancel, not stop: stopping leaves a player that's
    /// waiting for its start time to go ahead and start)
    func stop() {
        for item in pending {
            try? item.player.cancel()
        }
        pending.removeAll()
    }

    private func startedEngine(waiting: Bool = false) -> CHHapticEngine? {
        if engine == nil {
            guard CHHapticEngine.capabilitiesForHardware().supportsHaptics, let made = try? CHHapticEngine() else { return nil }
            made.playsHapticsOnly = true
            // (it sleeps when there's been nothing to play for a while, and wakes for the next taps)
            made.isAutoShutdownEnabled = true
            made.stoppedHandler = { @Sendable [weak self] _ in
                guard let self else { return }
                Task { @MainActor in self.engineStopped() }
            }
            made.resetHandler = { @Sendable [weak self] in
                guard let self else { return }
                Task { @MainActor in self.engineStopped() }
            }
            engine = made
        }
        guard let engine else { return nil }
        if running {
            return engine
        }
        if waiting {
            do {
                try engine.start()
                running = true
                return engine
            } catch {
                return nil
            }
        }
        if !starting {
            starting = true
            engine.start { @Sendable [weak self] error in
                let started = error == nil
                Task { @MainActor in
                    guard let self else { return }
                    self.starting = false
                    self.running = started
                }
            }
        }
        return nil
    }

    // (the players on their way are kept: this can arrive after newer taps went out, and cancelling
    // a player on a stopped engine does no harm)
    private func engineStopped() {
        running = false
    }
}

private func unit(_ value: Float) -> Float {
    min(max(value, 0), 1)
}
