import CoreHaptics
import MediaAccessibility
import Observation
import UIKit

/// The haptics' settings, laid out like iOS's own Music Haptics settings: on or off, the full mix
/// or just the beats, and how hard. They come on as iOS's Music Haptics is turned on and go off as
/// it's turned off (even if that was while the app was shut); the switch in the app changes them in
/// between.
@MainActor
@Observable
final class HapticsSettings {
    enum Strength: String, CaseIterable, Identifiable {
        case light, medium, strong

        var id: String { rawValue }

        var name: String {
            rawValue.capitalized
        }

        /// How hard the hardest tap is
        var top: Double {
            switch self {
            case .light: 0.55
            case .medium: 0.8
            case .strong: 1
            }
        }

        var rings: Int {
            switch self {
            case .light: 1
            case .medium: 2
            case .strong: 3
            }
        }
    }

    enum Mix: String, CaseIterable, Identifiable {
        case full, beats

        var id: String { rawValue }

        var name: String {
            switch self {
            case .full: "Full Mix"
            case .beats: "Beats Only"
            }
        }

        var detail: String {
            switch self {
            case .full: "Taps match the rhythm, beat, and energy of the whole song."
            case .beats: "One tap on every beat, steady as a metronome."
            }
        }
    }

    var isOn: Bool {
        didSet { UserDefaults.standard.set(isOn, forKey: Keys.on) }
    }

    var strength: Strength {
        didSet { UserDefaults.standard.set(strength.rawValue, forKey: Keys.strength) }
    }

    var mix: Mix {
        didSet { UserDefaults.standard.set(mix.rawValue, forKey: Keys.mix) }
    }

    /// Whether iOS's Music Haptics setting is on
    private(set) var musicHapticsOn: Bool
    /// Whether this device has a Taptic Engine (iPhones do; most iPads don't)
    let isSupported = CHHapticEngine.capabilitiesForHardware().supportsHaptics

    var isActive: Bool {
        isSupported && isOn
    }

    @ObservationIgnored private var observers: [NSObjectProtocol] = []

    private enum Keys {
        static let on = "hapticsOn"
        static let strength = "hapticsStrength"
        static let mix = "hapticsMix"
        static let seen = "musicHapticsSeen"
    }

    init() {
        let defaults = UserDefaults.standard
        isOn = defaults.object(forKey: Keys.on) as? Bool ?? false
        strength = Strength(rawValue: defaults.string(forKey: Keys.strength) ?? "") ?? .medium
        mix = Mix(rawValue: defaults.string(forKey: Keys.mix) ?? "") ?? .full
        musicHapticsOn = MAMusicHapticsManager.shared.isActive
        followMusicHaptics()
        for name in [MAMusicHapticsManager.activeStatusDidChangeNotification, UIApplication.didBecomeActiveNotification] {
            observers.append(NotificationCenter.default.addObserver(forName: name, object: nil, queue: .main) { [weak self] _ in
                guard let self else { return }
                Task { @MainActor in self.followMusicHaptics() }
            })
        }
    }

    /// How hard a tap is (0–1) at the strength chosen, for `power` out of the song's hardest
    func intensity(for power: Double) -> Float {
        Float(0.12 + ((strength.top - 0.12) * min(max(power, 0), 1)))
    }

    private func followMusicHaptics() {
        let on = MAMusicHapticsManager.shared.isActive
        musicHapticsOn = on
        let defaults = UserDefaults.standard
        if defaults.object(forKey: Keys.seen) as? Bool == on { return }
        defaults.set(on, forKey: Keys.seen)
        isOn = on
    }
}
