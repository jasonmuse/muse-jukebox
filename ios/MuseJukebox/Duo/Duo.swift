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

    var hinge: Hinge = .none
    /// How far open it is, in degrees (180 flat open)
    var angle: Double = 180
    /// Where the fold is on screen, while it's folded
    var fold: CGRect?
    /// Fold FX: folding sweeps a filter over the music (and the haptics go softer and duller with it)
    var foldFXOn = false

    var hasHinge: Bool {
        hinge != .none
    }

    /// Propped up like a laptop: folded, with the fold running across the screen
    var isTabletop: Bool {
        guard hinge == .partiallyOpen, let fold else { return false }
        return fold.width > fold.height
    }

    /// Fold FX's filter for the hinge's angle: wide open at 170° and over, closed right down by 60°
    var foldFXOpenness: Double {
        hinge == .partiallyOpen ? min(max((angle - 60) / 110, 0), 1) : 1
    }
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
                        duo.angle = hinge.angle.degrees
                        if hinge.status == .closed {
                            duo.hinge = .closed
                        } else if hinge.status == .partiallyOpen {
                            duo.hinge = .partiallyOpen
                        } else {
                            duo.hinge = .fullyOpen
                        }
                    } else {
                        duo.hinge = .none
                    }
                    if duo.foldFXOn {
                        player.setFilterOpenness(duo.foldFXOpenness)
                    }
                }
                .onGeometryChange(for: CGRect?.self) { proxy in
                    proxy.reservedRegions(kind: .division).first?.frame
                } action: { fold in
                    duo.fold = fold
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
        NavigationStack {
            if #available(iOS 27.1, *) {
                ArrangementView {
                    NowPlayingView(style: duo.isTabletop ? .stage : .page)
                } secondary: {
                    LibraryView(showsDeck: duo.isTabletop)
                }
                .arrangementViewStyle(.split)
            } else {
                HStack(spacing: 0) {
                    NowPlayingView(style: .page)
                    LibraryView()
                        .frame(maxWidth: 520)
                }
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

/// Fold FX on or off, with how far the filter's closed when it's on
struct FoldFXButton: View {
    @Environment(DuoState.self) private var duo
    @Environment(Player.self) private var player

    var body: some View {
        Button {
            duo.foldFXOn.toggle()
            player.setFilterOpenness(duo.foldFXOn ? duo.foldFXOpenness : 1)
        } label: {
            HStack(spacing: 8) {
                Image(systemName: "dial.medium.fill")
                    .rotationEffect(.degrees(duo.foldFXOn ? (player.filterOpenness - 1) * 140 : 0))
                VStack(alignment: .leading, spacing: 0) {
                    Text("Fold FX")
                        .font(.subheadline.weight(.bold))
                    Text(duo.foldFXOn ? (duo.hinge == .partiallyOpen ? "\(Int((1 - player.filterOpenness) * 100))% filtered" : "Fold to filter") : "Off")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .contentTransition(.numericText())
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 9)
            .foregroundStyle(duo.foldFXOn ? Theme.pink : .white)
            .glassEffect(.regular.interactive(), in: Capsule())
        }
        .buttonStyle(.plain)
        .sensoryFeedback(.selection, trigger: duo.foldFXOn)
        .accessibilityLabel("Fold FX")
        .accessibilityValue(duo.foldFXOn ? "On" : "Off")
    }
}
