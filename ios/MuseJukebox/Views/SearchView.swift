import SwiftUI

/// Search: every song in one list, the crate to dig through. Type to find songs by name, mood, year
/// or game, tap a mood to see just those, and sort them. Each row has the song's cover, its moods,
/// its wave and how long it is; tap one to play it (and the ones after it in the list).
struct SearchView: View {
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player
    @State private var query = ""
    @State private var tag: String?
    @State private var sort: Library.Sort = .newest

    var body: some View {
        NavigationStack {
            let songs = library.songs(tag: tag, matching: query, sortedBy: sort)
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 0) {
                    MoodChips(tags: library.tags, selection: $tag)
                        .padding(.bottom, 14)
                    HStack {
                        Text(songs.count == 1 ? "1 SONG" : "\(songs.count) SONGS")
                            .font(.footnote.weight(.bold))
                            .tracking(1)
                            .foregroundStyle(.secondary)
                        Spacer()
                        Menu {
                            Picker("Sort", selection: $sort) {
                                ForEach(Library.Sort.allCases) { sort in
                                    Text(sort.name).tag(sort)
                                }
                            }
                        } label: {
                            HStack(spacing: 4) {
                                Text(sort.name)
                                Image(systemName: "chevron.down")
                                    .font(.caption.weight(.bold))
                            }
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(Theme.pink)
                        }
                        .accessibilityLabel("Sort: \(sort.name)")
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 6)
                    if songs.isEmpty {
                        Group {
                            if query.isEmpty {
                                ContentUnavailableView("No songs", systemImage: "music.note",
                                                       description: Text("Nothing with that mood yet."))
                            } else {
                                ContentUnavailableView.search(text: query)
                            }
                        }
                        .padding(.top, 40)
                    } else {
                        ForEach(songs) { song in
                            Button {
                                player.play(song, in: songs)
                            } label: {
                                SongRow(song: song, isCurrent: player.song?.id == song.id)
                            }
                            .buttonStyle(.plain)
                            .contextMenu {
                                SongActions(song: song, in: songs)
                            }
                        }
                        .padding(.horizontal, 10)
                    }
                }
                .padding(.vertical, 8)
            }
            .scrollIndicators(.hidden)
            .nightSky()
            .navigationTitle("Search")
            .searchable(text: $query, prompt: "Songs, moods, years, games")
            .toolbar {
                ToolbarItem {
                    Button {
                        player.shuffleAll(songs)
                    } label: {
                        Label("Shuffle", systemImage: "shuffle")
                    }
                    .disabled(songs.isEmpty)
                }
            }
        }
    }
}

/// What a long press on a song offers: play it, play it next, or play its game
struct SongActions: View {
    let song: Song
    let songs: [Song]
    @Environment(Player.self) private var player

    init(song: Song, in songs: [Song]) {
        self.song = song
        self.songs = songs
    }

    var body: some View {
        Button {
            player.play(song, in: songs)
        } label: {
            Label("Play", systemImage: "play")
        }
        Button {
            player.playNext(song)
        } label: {
            Label("Play Next", systemImage: "text.line.first.and.arrowtriangle.forward")
        }
        if let game = song.game, let link = game.link {
            Link(destination: link) {
                Label("Play \(game.name)", systemImage: "gamecontroller")
            }
        }
    }
}

/// A song as a row of the list: cover, name and moods, its wave, and how long it is. The song that's
/// on is lit up, and its wave fills in as it plays.
struct SongRow: View {
    let song: Song
    var isCurrent = false
    @Environment(Player.self) private var player

    private static let bars = 14

    var body: some View {
        let levels = Self.levels(song.waveform)
        HStack(spacing: 12) {
            Artwork(song: song, cornerRadius: 12)
                .frame(width: 52, height: 52)
                .overlay(alignment: .bottomTrailing) {
                    if isCurrent {
                        PlayingBars()
                            .padding(4)
                            .glassEffect(.regular, in: Capsule())
                            .padding(3)
                    }
                }
            VStack(alignment: .leading, spacing: 2) {
                Text(song.title)
                    .font(.body.weight(.semibold))
                    .fontDesign(.rounded)
                    .foregroundStyle(isCurrent ? Theme.pink : .white)
                    .lineLimit(1)
                Text(song.subtitle)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
            Spacer(minLength: 8)
            Group {
                if isCurrent {
                    TimelineView(.periodic(from: .now, by: 0.5)) { _ in
                        MiniWave(levels: levels, progress: player.progress)
                    }
                } else {
                    MiniWave(levels: levels, progress: nil)
                }
            }
            .frame(width: CGFloat(Self.bars) * 5, height: 26)
            .accessibilityHidden(true)
            Text(Self.length(song.duration))
                .font(.caption.monospacedDigit())
                .foregroundStyle(.secondary)
                .frame(minWidth: 34, alignment: .trailing)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
        .background {
            if isCurrent {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.white.opacity(0.08))
            }
        }
        .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(isCurrent ? .isSelected : [])
    }

    /// The song's wave (96 points along) as a few bars: each the average of its stretch
    private static func levels(_ wave: [Double]) -> [Double] {
        guard !wave.isEmpty else { return Array(repeating: 0.35, count: bars) }
        return (0..<bars).map { bar in
            let start = bar * wave.count / bars
            let end = max(start + 1, (bar + 1) * wave.count / bars)
            let stretch = wave[start..<min(end, wave.count)]
            return stretch.reduce(0, +) / Double(stretch.count)
        }
    }

    private static func length(_ seconds: Double?) -> String {
        guard let seconds, seconds.isFinite, seconds > 0 else { return "" }
        let whole = Int(seconds.rounded())
        return String(format: "%d:%02d", whole / 60, whole % 60)
    }
}

/// A row's little wave: grey bars, lit pink to lilac to sky blue as far as the song has played
private struct MiniWave: View {
    let levels: [Double]
    /// How far along the song is (0 to 1), for the song that's on
    let progress: Double?

    var body: some View {
        HStack(alignment: .center, spacing: 2) {
            ForEach(levels.indices, id: \.self) { index in
                let along = Double(index) / Double(max(levels.count, 1))
                let lit = progress.map { along < $0 } ?? false
                Capsule()
                    .fill(lit ? Theme.rings[min(2, index * 3 / max(levels.count, 1))] : Color.white.opacity(0.28))
                    .frame(width: 3, height: max(4, 24 * pow(levels[index], 0.8)))
            }
        }
    }
}
