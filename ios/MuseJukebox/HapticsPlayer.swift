import CoreHaptics

/// Plays the jukebox's taps with Core Haptics, each one landing when the page asked it to
@MainActor
final class HapticsPlayer {
    /// A tap: how long from now it lands (s), how hard (0–1), and how crisp (0 a deep thud, 1 a sharp tick)
    struct Tap {
        var delay: TimeInterval
        var intensity: Float
        var sharpness: Float
    }

    /// Whether this device has a Taptic Engine (iPhones do; most iPads don't)
    static var isSupported: Bool {
        CHHapticEngine.capabilitiesForHardware().supportsHaptics
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
        schedule(events, in: first, on: engine)
    }

    /// A navigator.vibrate pattern (ms: buzz, pause, buzz...): short buzzes are taps, longer ones held
    func vibrate(_ pattern: [Double]) {
        guard !pattern.isEmpty, let engine = startedEngine() else { return }
        var events: [CHHapticEvent] = []
        var at: TimeInterval = 0
        for (index, milliseconds) in pattern.prefix(32).enumerated() {
            let length = min(max(milliseconds, 0), 5000) / 1000
            if index % 2 == 0 && length > 0 {
                let parameters = [
                    CHHapticEventParameter(parameterID: .hapticIntensity, value: 0.75),
                    CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.5)
                ]
                events.append(length <= 0.03
                    ? CHHapticEvent(eventType: .hapticTransient, parameters: parameters, relativeTime: at)
                    : CHHapticEvent(eventType: .hapticContinuous, parameters: parameters, relativeTime: at, duration: length))
            }
            at += length
        }
        guard !events.isEmpty else { return }
        schedule(events, in: 0, on: engine)
    }

    /// The taps that haven't landed yet don't
    func stop() {
        for item in pending {
            try? item.player.stop(atTime: CHHapticTimeImmediate)
        }
        pending.removeAll()
    }

    private func schedule(_ events: [CHHapticEvent], in delay: TimeInterval, on engine: CHHapticEngine) {
        do {
            let pattern = try CHHapticPattern(events: events, parameters: [])
            let player = try engine.makePlayer(with: pattern)
            let start = engine.currentTime + max(0, delay)
            try player.start(atTime: start)
            pending.removeAll { $0.end < engine.currentTime }
            pending.append((player, start + pattern.duration + 0.1))
        } catch {
            // The engine's been stopped under us (the app went to the background, say): it's
            // started afresh for the next taps
            running = false
        }
    }

    private func startedEngine() -> CHHapticEngine? {
        guard Self.isSupported else { return nil }
        if engine == nil {
            guard let made = try? CHHapticEngine() else { return nil }
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

    private func engineStopped() {
        running = false
        pending.removeAll()
    }
}

private func unit(_ value: Float) -> Float {
    min(max(value, 0), 1)
}
