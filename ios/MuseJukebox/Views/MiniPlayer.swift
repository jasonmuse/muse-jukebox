import SwiftUI

/// The song that's on, along the bottom above the tabs: its record turning, its name and code on a
/// line of LED, play or pause and on. Tap it for the whole Now Playing screen.
struct MiniPlayer: View {
    let open: () -> Void
    @Environment(Player.self) private var player
    @Environment(Library.self) private var library
    @Environment(\.tabViewBottomAccessoryPlacement) private var placement

    var body: some View {
        HStack(spacing: 12) {
            Group {
                if let song = player.song {
                    SpinningRecord(song: song, shadowed: false)
                } else {
                    Image(systemName: "opticaldisc")
                        .font(.title2)
                        .foregroundStyle(.secondary)
                }
            }
            .frame(width: 38, height: 38)
            VStack(alignment: .leading, spacing: 2) {
                Text(player.song?.title ?? "Muse Jukebox")
                    .font(.subheadline.weight(.semibold))
                    .lineLimit(1)
                if placement != .inline {
                    if let song = player.song {
                        LEDText(text: [library.code(for: song), player.isPlaying ? "Now spinning" : "Paused"].compactMap { $0 }.joined(separator: " · "),
                                color: Theme.sky, size: 9)
                    } else {
                        Text("Pick a song to play")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                    }
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
            } else {
                Button {
                    player.shuffleAll(library.songs)
                } label: {
                    Image(systemName: "die.face.5")
                        .font(.title3)
                        .frame(width: 36, height: 36)
                }
                .accessibilityLabel("Play something random")
            }
        }
        .foregroundStyle(.primary)
        .padding(.horizontal, 12)
        .contentShape(Rectangle())
        .onTapGesture(perform: open)
    }
}
