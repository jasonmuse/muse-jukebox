import SwiftUI

/// The song that's on, along the bottom above the tabs: its cover, its name, play or pause and on.
/// Tap it for the whole Now Playing screen.
struct MiniPlayer: View {
    let open: () -> Void
    @Environment(Player.self) private var player
    @Environment(\.tabViewBottomAccessoryPlacement) private var placement

    var body: some View {
        HStack(spacing: 12) {
            Artwork(song: player.song, cornerRadius: 8)
                .frame(width: 34, height: 34)
            VStack(alignment: .leading, spacing: 1) {
                Text(player.song?.title ?? "Muse Jukebox")
                    .font(.subheadline.weight(.semibold))
                    .lineLimit(1)
                if placement != .inline {
                    Text(player.song?.subtitle ?? "Pick a song to play")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
            Spacer(minLength: 4)
            if player.song != nil {
                Button {
                    player.togglePlayPause()
                } label: {
                    Image(systemName: player.isPlaying ? "pause.fill" : "play.fill")
                        .font(.title3)
                        .contentTransition(.symbolEffect(.replace))
                        .frame(width: 36, height: 36)
                }
                .accessibilityLabel(player.isPlaying ? "Pause" : "Play")
                if placement != .inline {
                    Button {
                        player.next()
                    } label: {
                        Image(systemName: "forward.fill")
                            .font(.title3)
                            .frame(width: 36, height: 36)
                    }
                    .accessibilityLabel("Next")
                }
            }
        }
        .foregroundStyle(.primary)
        .padding(.horizontal, 12)
        .contentShape(Rectangle())
        .onTapGesture(perform: open)
    }
}
