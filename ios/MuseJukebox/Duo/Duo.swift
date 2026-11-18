import Foundation
import Observation
import SwiftUI

/// iPhone Duo: what the hinge is doing, and where the fold is. On any other device the hinge is
/// `.none` and none of this shows.
@MainActor
@Observable
final class DuoState {
    enum Hinge {
        case none, closed, partiallyOpen, fullyOpen
    }

    /// Fold FX: folding brings its sound in over the music, the filter or another (`foldEffect`).
    /// Its button steps through these.
    enum FoldFX: Equatable {
        case off
        /// Following the hinge as it moves
        case live
        /// Kept where it was (the filter's openness), whatever the hinge does: open, folded, closed,
        /// or on the outside screen
        case locked(Double)
    }

    var hinge: Hinge = .none
    /// How far open it is, in degrees (180 flat open)
    var angle: Double = 180
    /// Where the fold is on screen, while it's folded
    var fold: CGRect?
    /// Whether the screen has a fold at all, folded or not (known from the start, before the hinge moves)
    var hasFold = false
    var foldFX: FoldFX = .off
    /// Fold FX's sound (picked by holding its button; kept for next time)
    private(set) var foldEffect: Player.FoldEffect = Player.FoldEffect(rawValue: UserDefaults.standard.string(forKey: DuoState.effectKey) ?? "") ?? .filter

    /// Fold FX's filter for the hinge, as of the last time the hinge said where it was. Closing it,
    /// or the app moving to the outside screen, leaves this be: the sound holds, rather than cutting
    /// back to unfiltered.
    private(set) var heldOpenness: Double = 1

    /// Whether this phone folds, once it's been seen to: so Fold FX's button stays on the outside
    /// screen too (which has no fold or hinge of its own), and Fold FX can be turned off there. Kept
    /// with the model of phone it was seen on, so a backup restored onto a phone that doesn't fold
    /// doesn't bring Fold FX with it: it's only ever on iPhone Duo.
    private(set) var folds = UserDefaults.standard.string(forKey: DuoState.foldsKey) == DuoState.model

    private static let foldsKey = "duo.foldsOnModel"
    /// This phone's model ("iPhone19,4")
    private static let model: String = {
        var system = utsname()
        uname(&system)
        return withUnsafeBytes(of: &system.machine) { bytes in
            String(decoding: bytes.prefix { $0 != 0 }, as: UTF8.self)
        }
    }()
    private static let effectKey = "duo.foldEffect"

    var isFoldable: Bool {
        hasFold || hinge != .none || folds
    }

    /// Propped up like a laptop: folded, with the fold running across the screen
    var isTabletop: Bool {
        guard let fold else { return false }
        return fold.width > fold.height
    }

    /// The hinge moved, or went quiet (`.none`: on the outside screen, or the phone doesn't fold)
    func update(hinge: Hinge, angle: Double?) {
        self.hinge = hinge
        if let angle {
            self.angle = angle
        }
        switch hinge {
        case .partiallyOpen:
            heldOpenness = Self.openness(at: self.angle)
        case .fullyOpen:
            heldOpenness = 1
        case .closed, .none:
            break
        }
        if hinge != .none {
            rememberFolding()
        }
    }

    /// Where the fold is, and whether there is one
    func update(fold reading: FoldReading) {
        fold = reading.frame
        hasFold = reading.exists
        if reading.exists {
            rememberFolding()
        }
    }

    /// Fold FX's button: off, then live (following the hinge), then locked where it is, then off
    func stepFoldFX() {
        switch foldFX {
        case .off:
            foldFX = .live
        case .live:
            foldFX = .locked(heldOpenness)
        case .locked:
            foldFX = .off
        }
    }

    /// Fold FX's sound, from now on
    func choose(_ effect: Player.FoldEffect) {
        foldEffect = effect
        UserDefaults.standard.set(effect.rawValue, forKey: Self.effectKey)
    }

    /// How far in Fold FX wants its sound now (0 while it's off)
    var foldFXAmount: Double {
        1 - foldFXOpenness
    }

    /// The filter Fold FX wants now (1, wide open, while it's off)
    var foldFXOpenness: Double {
        switch foldFX {
        case .off: 1
        case .live: heldOpenness
        case .locked(let openness): openness
        }
    }

    /// Fold FX in a few words, for under its name: "Echo · Off", "Echo · Live 42%", "Echo · Locked 42%"
    var foldFXStatus: String {
        let name = foldEffect.name
        switch foldFX {
        case .off:
            return "\(name) · Off"
        case .live:
            return percent == 0 && hinge != .partiallyOpen ? "\(name) · fold it" : "\(name) · Live \(percent)%"
        case .locked:
            return "\(name) · Locked \(percent)%"
        }
    }

    /// Fold FX, said in full (VoiceOver)
    var foldFXSpoken: String {
        switch foldFX {
        case .off: "\(foldEffect.name), off"
        case .live: "\(foldEffect.name), live, following the fold: \(percent)%"
        case .locked: "\(foldEffect.name), locked at \(percent)%, open or closed"
        }
    }

    /// Fold FX's color: white off, sky blue live, lilac locked
    var foldFXTint: Color {
        switch foldFX {
        case .off: .white
        case .live: Theme.sky
        case .locked: Theme.lilac
        }
    }

    var foldFXIsLocked: Bool {
        if case .locked = foldFX { return true }
        return false
    }

    /// How far in Fold FX's sound is, in percent
    private var percent: Int {
        Int((foldFXAmount * 100).rounded())
    }

    /// Fold FX's filter for a hinge angle: wide open at 170° and over, closed right down by 60°
    static func openness(at angle: Double) -> Double {
        min(max((angle - 60) / 110, 0), 1)
    }

    private func rememberFolding() {
        guard !folds else { return }
        folds = true
        UserDefaults.standard.set(Self.model, forKey: Self.foldsKey)
    }
}

/// Where the fold is (its region while it's folded), and whether there's one at all
struct FoldReading: Equatable, Sendable {
    var frame: CGRect?
    var exists = false
}

/// Reads the hinge (its angle, as it moves) and where the fold is (iOS 27.1, on iPhone Duo), and
/// drives Fold FX
struct DuoReader: ViewModifier {
    @Environment(DuoState.self) private var duo
    @Environment(Player.self) private var player

    @ViewBuilder
    func body(content: Content) -> some View {
        if #available(iOS 27.1, *) {
            content
                .onHingeChange { _, context in
                    if let hinge = context.hinge {
                        let status: DuoState.Hinge = switch hinge.status {
                        case .closed: .closed
                        case .partiallyOpen: .partiallyOpen
                        default: .fullyOpen
                        }
                        duo.update(hinge: status, angle: hinge.angle.degrees)
                    } else {
                        duo.update(hinge: .none, angle: nil)
                    }
                    player.follow(duo)
                }
                .onGeometryChange(for: FoldReading.self) { proxy in
                    FoldReading(
                        frame: proxy.reservedRegions(kind: .division).first?.frame,
                        exists: !proxy.reservedRegions(kind: .division, options: .includeInactive).isEmpty
                    )
                } action: { reading in
                    duo.update(fold: reading)
                }
        } else {
            content
        }
    }
}

/// The inner display (and iPad): Now Playing and the songs side by side, like a record's gatefold
/// sleeve opened out. Folded like a book they're a page each, either side of the fold. Propped up
/// like a laptop, Now Playing is the stage, big on the half that's standing up so it can be seen
/// from across the room, and the controls and the songs go on the half lying flat, where they're
/// easy to reach.
struct Gatefold: View {
    @Environment(DuoState.self) private var duo

    var body: some View {
        // (each page its own: the songs' title and buttons stay over the songs, and Now Playing has
        // its page to itself)
        if #available(iOS 27.1, *) {
            ArrangementView {
                NowPlayingView(style: duo.isTabletop ? .stage : .page)
            } secondary: {
                NavigationStack {
                    LibraryView(showsDeck: duo.isTabletop, searchable: true)
                }
            }
            .arrangementViewStyle(.split)
        } else {
            HStack(spacing: 0) {
                NowPlayingView(style: .page)
                NavigationStack {
                    LibraryView(searchable: true)
                }
                .frame(maxWidth: 520)
            }
        }
    }
}

/// The controls, on the half lying flat when iPhone Duo's propped up like a laptop
struct DeckControls: View {
    @Environment(Player.self) private var player

    var body: some View {
        VStack(spacing: 16) {
            Scrubber()
            HStack {
                Transport(compact: true)
                Spacer()
                FoldFXButton()
            }
        }
        .padding(18)
        .glassEffect(.regular, in: RoundedRectangle(cornerRadius: 30, style: .continuous))
        .opacity(player.song == nil ? 0.5 : 1)
    }
}

/// Fold FX, with what it's doing: tap through off, live (following the hinge) and locked, and hold
/// to pick its sound
struct FoldFXButton: View {
    @Environment(DuoState.self) private var duo

    var body: some View {
        FoldFXMenu {
            HStack(spacing: 8) {
                FoldFXDial(size: 17)
                VStack(alignment: .leading, spacing: 0) {
                    Text("Fold FX")
                        .font(.subheadline.weight(.bold))
                    Text(duo.foldFXStatus)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .contentTransition(.numericText())
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 9)
            .foregroundStyle(duo.foldFXTint)
            .glassEffect(.regular.interactive(), in: Capsule())
        }
    }
}

/// Fold FX's button, whatever it looks like: a tap steps it through off, live and locked, and holding
/// it picks the sound
struct FoldFXMenu<Content: View>: View {
    @ViewBuilder var content: () -> Content
    @Environment(DuoState.self) private var duo
    @Environment(Player.self) private var player

    var body: some View {
        Menu {
            Picker("Fold FX", selection: Binding(get: { duo.foldEffect }, set: { effect in
                duo.choose(effect)
                player.follow(duo)
            })) {
                ForEach(Player.FoldEffect.allCases) { effect in
                    Label(effect.name, systemImage: effect.symbol)
                        .tag(effect)
                }
            }
            .pickerStyle(.inline)
        } label: {
            content()
        } primaryAction: {
            duo.stepFoldFX()
            player.follow(duo)
        }
        .menuIndicator(.hidden)
        .buttonStyle(.plain)
        .sensoryFeedback(.selection, trigger: duo.foldFX)
        .sensoryFeedback(.selection, trigger: duo.foldEffect)
        .accessibilityLabel("Fold FX")
        .accessibilityValue(duo.foldFXSpoken)
        .accessibilityHint("Steps through off, live and locked. Touch and hold to pick the sound.")
    }
}

/// Fold FX's sound's symbol (the filter's a dial, turned as far as it's closed), with a lock on it
/// while it's locked
struct FoldFXDial: View {
    var size: CGFloat
    @Environment(DuoState.self) private var duo

    var body: some View {
        Image(systemName: duo.foldEffect.symbol)
            .font(.system(size: size, weight: .semibold))
            .rotationEffect(.degrees(duo.foldEffect == .filter ? -duo.foldFXAmount * 140 : 0))
            .scaleEffect(duo.foldEffect == .filter ? 1 : 1 + (0.15 * duo.foldFXAmount))
            .contentTransition(.symbolEffect(.replace))
            .overlay(alignment: .topTrailing) {
                if duo.foldFXIsLocked {
                    Image(systemName: "lock.fill")
                        .font(.system(size: size * 0.5, weight: .bold))
                        .foregroundStyle(Theme.ink)
                        .padding(size * 0.14)
                        .background(Theme.lilac, in: Circle())
                        .offset(x: size * 0.45, y: -size * 0.45)
                        .transition(.scale.combined(with: .opacity))
                }
            }
            .animation(.snappy, value: duo.foldFXIsLocked)
    }
}

extension Player.FoldEffect {
    var name: String {
        switch self {
        case .filter: "Filter"
        case .echo: "Echo"
        case .space: "Space"
        case .slowmo: "Slow-mo"
        case .crunch: "8-bit"
        case .radio: "Radio"
        }
    }

    var symbol: String {
        switch self {
        case .filter: "dial.medium.fill"
        case .echo: "wave.3.right"
        case .space: "sparkles"
        case .slowmo: "tortoise.fill"
        case .crunch: "gamecontroller.fill"
        case .radio: "antenna.radiowaves.left.and.right"
        }
    }
}

extension Player {
    /// Fold FX as the hinge and its button have it now
    func follow(_ duo: DuoState) {
        setFoldFX(duo.foldEffect, amount: duo.foldFXAmount)
    }
}
