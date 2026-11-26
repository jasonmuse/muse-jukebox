import SwiftUI

/// The jukebox, as you walk up to it: its records standing in a row to flip through, the one in front
/// ready to play, and the title strips underneath, a row for each mood with a code for each record
/// (B3: the third under Chill), as on a real jukebox. Tap a strip to play from it.
struct JukeboxHome: View {
    /// iPhone Duo propped up like a laptop: the transport controls go at the top, on the half lying
    /// flat
    var showsDeck = false
    /// Search right here (the gatefold has no Search tab)
    var searchable = false

    @Environment(Library.self) private var library
    @Environment(Player.self) private var player
    @State private var front: Song.ID?
    @State private var query = ""

    private var frontRecord: Song? {
        front.flatMap { id in library.records.first { $0.id == id } } ?? library.records.first
    }

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 26) {
                if showsDeck {
                    DeckControls()
                        .padding(.horizontal)
                }
                if searchable && !query.isEmpty {
                    SearchResults(query: query)
                } else {
                    header
                    RecordWall(records: library.records, front: $front)
                    if let record = frontRecord {
                        FrontRecordCard(song: record)
                            .padding(.horizontal, 16)
                    }
                    ForEach(library.rows) { row in
                        RowShelf(row: row)
                    }
                }
            }
            .padding(.top, 6)
            .padding(.bottom, 28)
        }
        .scrollIndicators(.hidden)
        .nightSky()
        .modifier(HomeSearch(isOn: searchable, query: $query))
        .toolbarVisibility(searchable ? .visible : .hidden, for: .navigationBar)
        .navigationDestination(for: JukeboxRow.self) { row in
            RowList(row: row)
        }
    }

    private var header: some View {
        HStack(alignment: .center, spacing: 12) {
            VStack(alignment: .leading, spacing: 0) {
                MuseWordmark(size: 38)
                LEDText(text: "Jukebox · \(library.songs.count) sides", color: Brand.amber, size: 10)
                    .padding(.leading, 4)
            }
            Spacer()
            Button {
                player.shuffleAll(library.songs)
            } label: {
                Image(systemName: "die.face.5")
                    .font(.title3.weight(.semibold))
                    .foregroundStyle(.white)
                    .frame(width: 46, height: 46)
                    .glassEffect(.regular.interactive(), in: Circle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Play something random")
        }
        .padding(.horizontal, 20)
    }
}

/// Searching from the navigation bar, where it's wanted
private struct HomeSearch: ViewModifier {
    let isOn: Bool
    @Binding var query: String

    func body(content: Content) -> some View {
        if isOn {
            content
                .searchable(text: $query, prompt: "Songs, moods, years, games")
        } else {
            content
        }
    }
}

/// The records standing in a row, flipped through like a jukebox's rack: the one in front faces you
/// with its label showing (spinning, if it's on), and the others turn away to the sides. Tap the one
/// in front to play it, or one to the side to bring it round.
private struct RecordWall: View {
    let records: [Song]
    @Binding var front: Song.ID?
    @Environment(Player.self) private var player

    private let size: CGFloat = 200

    var body: some View {
        GeometryReader { geometry in
            ScrollView(.horizontal) {
                LazyHStack(spacing: 0) {
                    ForEach(records) { song in
                        Button {
                            if song.id == (front ?? records.first?.id) {
                                if player.song?.id == song.id {
                                    player.togglePlayPause()
                                } else {
                                    player.play(song, in: records)
                                }
                            } else {
                                withAnimation(.snappy) {
                                    front = song.id
                                }
                            }
                        } label: {
                            Group {
                                if player.song?.id == song.id {
                                    SpinningRecord(song: song)
                                } else {
                                    VinylRecord(song: song)
                                }
                            }
                            .frame(width: size, height: size)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel(song.title)
                        .scrollTransition(.interactive, axis: .horizontal) { content, phase in
                            content
                                .rotation3DEffect(.degrees(phase.value * -60), axis: (x: 0, y: 1, z: 0), perspective: 0.5)
                                .scaleEffect(1 - (abs(phase.value) * 0.18))
                                .opacity(1 - (abs(phase.value) * 0.3))
                        }
                    }
                }
                .scrollTargetLayout()
            }
            .scrollIndicators(.hidden)
            .scrollTargetBehavior(.viewAligned)
            .scrollPosition(id: $front, anchor: .center)
            .safeAreaPadding(.horizontal, max(0, (geometry.size.width - size) / 2))
            .background(alignment: .bottom) {
                // (the neon glowing on the floor under them)
                Ellipse()
                    .fill(RadialGradient(colors: [Theme.pink.opacity(0.5), Theme.lilac.opacity(0.22), .clear],
                                         center: .center, startRadius: 0, endRadius: geometry.size.width * 0.42))
                    .frame(height: 46)
                    .padding(.horizontal, 24)
                    .offset(y: 8)
            }
        }
        .frame(height: size + 24)
        .sensoryFeedback(.selection, trigger: front)
    }
}

/// The record in front: its code, name and moods, its flip side if it has one, and a big play button
private struct FrontRecordCard: View {
    let song: Song
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player

    private var isOn: Bool {
        guard let current = player.song else { return false }
        return current.id == song.id || current.otherSide == song.id
    }

    var body: some View {
        HStack(spacing: 14) {
            VStack(alignment: .leading, spacing: 5) {
                HStack(spacing: 8) {
                    if let code = library.code(for: song) {
                        LEDChip(text: code, color: Theme.pink, size: 11)
                    }
                    Text(song.title)
                        .font(.title2.weight(.heavy))
                        .fontDesign(.rounded)
                        .lineLimit(1)
                        .minimumScaleFactor(0.7)
                }
                Text(song.subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                if let flip = library.flipSide(of: song) {
                    Button {
                        player.play(flip, in: [flip] + library.records.filter { $0.id != song.id })
                    } label: {
                        Label("Flip side: \(flip.title)", systemImage: "arrow.triangle.2.circlepath")
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(Theme.lilac)
                            .lineLimit(1)
                    }
                    .buttonStyle(.plain)
                }
            }
            Spacer(minLength: 0)
            Button {
                if isOn {
                    player.togglePlayPause()
                } else {
                    player.play(song, in: library.records)
                }
            } label: {
                Image(systemName: isOn && player.isPlaying ? "pause.fill" : "play.fill")
                    .font(.title2.weight(.bold))
                    .contentTransition(.symbolEffect(.replace))
                    .foregroundStyle(Theme.ink)
                    .frame(width: 58, height: 58)
                    .background(LinearGradient(colors: [Color(red: 1, green: 0.62, blue: 0.88), Theme.pink], startPoint: .topLeading, endPoint: .bottomTrailing), in: Circle())
                    .shadow(color: Theme.pink.opacity(0.5), radius: 14, y: 6)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isOn && player.isPlaying ? "Pause" : "Play \(song.title)")
            .sensoryFeedback(.impact(weight: .medium), trigger: player.isPlaying)
        }
        .padding(16)
        .glassEffect(.regular, in: RoundedRectangle(cornerRadius: 26, style: .continuous))
    }
}

/// One row of title strips: its letter and mood, then its first few records, two to a line
private struct RowShelf: View {
    let row: JukeboxRow
    private let shown = 6

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 9) {
                LEDChip(text: row.letter, color: row.tint, size: 12)
                Text(row.name)
                    .font(.title3.weight(.heavy))
                    .fontDesign(.rounded)
                Text("\(row.songs.count)")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.secondary)
                Spacer()
                if row.songs.count > shown {
                    NavigationLink(value: row) {
                        Text("See all")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(Theme.pink)
                    }
                }
            }
            .padding(.horizontal, 20)
            LazyVGrid(columns: [GridItem(.flexible(), spacing: 8), GridItem(.flexible(), spacing: 8)], spacing: 8) {
                ForEach(Array(row.songs.prefix(shown).enumerated()), id: \.element.id) { index, song in
                    TitleStrip(song: song, code: row.letter + String(index + 1), tint: row.tint, queue: row.songs)
                }
            }
            .padding(.horizontal, 16)
        }
    }
}

/// A jukebox title strip: the record's cover, its name, its code in its row's color, and how long it
/// is. Tap it to play from it (and the rest of the row after it).
struct TitleStrip: View {
    let song: Song
    let code: String
    let tint: Color
    let queue: [Song]
    @Environment(Player.self) private var player

    var body: some View {
        let isOn = player.song?.id == song.id
        Button {
            player.play(song, in: queue)
        } label: {
            HStack(spacing: 9) {
                Artwork(song: song, cornerRadius: 10)
                    .frame(width: 44, height: 44)
                VStack(alignment: .leading, spacing: 2) {
                    Text(song.title)
                        .font(.subheadline.weight(.bold))
                        .foregroundStyle(isOn ? Theme.pink : .white)
                        .lineLimit(1)
                    HStack(spacing: 5) {
                        Text(code)
                            .font(.system(size: 10, weight: .heavy, design: .monospaced))
                            .foregroundStyle(tint)
                        Text(song.lengthText)
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                }
                Spacer(minLength: 0)
                if isOn {
                    PlayingBars()
                }
            }
            .padding(.leading, 7)
            .padding(.trailing, 10)
            .frame(height: 60)
            .background(.white.opacity(isOn ? 0.12 : 0.07), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .strokeBorder(.white.opacity(0.14), lineWidth: 1)
            }
            .overlay(alignment: .leading) {
                Capsule()
                    .fill(tint)
                    .frame(width: 3)
                    .padding(.vertical, 14)
            }
            .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        }
        .buttonStyle(.plain)
        .contextMenu {
            SongActions(song: song, in: queue)
        }
        .accessibilityLabel("\(code), \(song.title)")
    }
}

/// All of a row's records, with their codes
private struct RowList: View {
    let row: JukeboxRow
    @Environment(Player.self) private var player

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 0) {
                ForEach(Array(row.songs.enumerated()), id: \.element.id) { index, song in
                    Button {
                        player.play(song, in: row.songs)
                    } label: {
                        HStack(spacing: 8) {
                            Text(row.letter + String(index + 1))
                                .font(.system(size: 12, weight: .heavy, design: .monospaced))
                                .foregroundStyle(row.tint)
                                .frame(width: 34, alignment: .leading)
                            SongRow(song: song, isCurrent: player.song?.id == song.id)
                        }
                        .padding(.leading, 10)
                    }
                    .buttonStyle(.plain)
                    .contextMenu {
                        SongActions(song: song, in: row.songs)
                    }
                }
            }
            .padding(.horizontal, 8)
            .padding(.vertical, 8)
        }
        .scrollIndicators(.hidden)
        .nightSky()
        .navigationTitle("\(row.letter) · \(row.name)")
        .toolbar {
            ToolbarItem {
                Button {
                    player.shuffleAll(row.songs)
                } label: {
                    Label("Shuffle", systemImage: "shuffle")
                }
            }
        }
    }
}

/// What a search found, as rows of the list
private struct SearchResults: View {
    let query: String
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player

    var body: some View {
        let songs = library.songs(tag: nil, matching: query, sortedBy: .newest)
        if songs.isEmpty {
            ContentUnavailableView.search(text: query)
                .padding(.top, 40)
        } else {
            LazyVStack(spacing: 0) {
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
            }
            .padding(.horizontal, 10)
        }
    }
}
