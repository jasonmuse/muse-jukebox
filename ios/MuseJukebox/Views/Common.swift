import SwiftUI

/// The moods (the songs' tags) to filter by
struct MoodChips: View {
    let tags: [String]
    @Binding var selection: String?

    var body: some View {
        ScrollView(.horizontal) {
            HStack(spacing: 8) {
                chip("All", selected: selection == nil) { selection = nil }
                ForEach(tags, id: \.self) { tag in
                    chip(tag, selected: selection == tag) { selection = selection == tag ? nil : tag }
                }
            }
        }
        .scrollIndicators(.hidden)
        .contentMargins(.horizontal, 16, for: .scrollContent)
        .sensoryFeedback(.selection, trigger: selection)
    }

    private func chip(_ name: String, selected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(name)
                .font(.subheadline.weight(.semibold))
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .foregroundStyle(selected ? Theme.ink : .white)
                .background {
                    if selected {
                        Capsule().fill(Theme.glow)
                    }
                }
                .glassEffect(selected ? .identity : .regular, in: Capsule())
        }
        .buttonStyle(.plain)
    }
}

extension EnvironmentValues {
    /// Whether Now Playing's sheet is up over this (what bounces under it can rest)
    @Entry var isUnderNowPlaying = false
}

/// Three little bars bouncing: the song that's on. They're stretched rather than resized, so nothing's
/// laid out again as they bounce; 30 times a second is plenty for bars this size; and they rest while
/// Now Playing's over them.
struct PlayingBars: View {
    @Environment(Player.self) private var player
    @Environment(\.isUnderNowPlaying) private var isCovered

    var body: some View {
        TimelineView(.animation(minimumInterval: 1.0 / 30, paused: !player.isPlaying || isCovered)) { timeline in
            let time = timeline.date.timeIntervalSinceReferenceDate
            HStack(alignment: .bottom, spacing: 2) {
                ForEach(0..<3, id: \.self) { bar in
                    let bounce: Double = abs(sin((time * 5) + (Double(bar) * 1.7)))
                    let height: CGFloat = player.isPlaying ? 5 + (8 * bounce) : 5
                    Capsule()
                        .fill(Theme.rings[bar])
                        .frame(width: 3, height: 13)
                        .scaleEffect(x: 1, y: height / 13, anchor: .bottom)
                }
            }
            .frame(height: 13, alignment: .bottom)
        }
    }
}
