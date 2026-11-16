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
    /// Taps on their way (to call back if the song stops or moves), and when each lot's done
    private var pending: [(player: CHHapticPatternPlayer, end: TimeInterval)] = []

    func play(_ taps: [Tap]) {
        guard let first = taps.map(\.delay).min(), let engine = startedEngine() else { return }
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
        } catch {
            // The engine's been stopped under us (the app went to the background, say): it's started
            // afresh for the next taps
            running = false
        }
    }

    /// The taps that haven't landed yet don't (cancel, not stop: stopping leaves a player that's
    /// waiting for its start time to go ahead and start)
    func stop() {
        for item in pending {
            try? item.player.cancel()
        }
        pending.removeAll()
    }

    private func startedEngine() -> CHHapticEngine? {
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
        if !running {
            do {
                try engine?.start()
                running = true
            } catch {
                return nil
            }
        }
        return engine
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
