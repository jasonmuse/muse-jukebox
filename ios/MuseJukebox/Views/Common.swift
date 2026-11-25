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

/// Three little bars bouncing: the song that's on
struct PlayingBars: View {
    @Environment(Player.self) private var player

    var body: some View {
        TimelineView(.animation(paused: !player.isPlaying)) { timeline in
            let time = timeline.date.timeIntervalSinceReferenceDate
            HStack(alignment: .bottom, spacing: 2) {
                ForEach(0..<3, id: \.self) { bar in
                    let bounce: Double = abs(sin((time * 5) + (Double(bar) * 1.7)))
                    let height: CGFloat = player.isPlaying ? 5 + (8 * bounce) : 5
                    Capsule()
                        .fill(Theme.rings[bar])
                        .frame(width: 3, height: height)
                }
            }
            .frame(height: 13, alignment: .bottom)
        }
    }
}
