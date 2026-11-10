import SwiftUI

/// The jukebox's songs: the featured ones big at the top, a row of moods to filter by, and every song
/// as a cover in a grid. Tap one to play it (and the ones after it).
struct LibraryView: View {
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player
    @Environment(HapticsSettings.self) private var settings
    /// Set to show the transport controls above the songs (iPhone Duo propped up like a laptop: the
    /// controls go on the half that's lying flat)
    var showsDeck = false

    @State private var tag: String?
    @State private var sort: Library.Sort = .newest
    @State private var showingHaptics = false

    private var songs: [Song] {
        library.songs(tag: tag, sortedBy: sort)
    }

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 24) {
                if showsDeck {
                    DeckControls()
                        .padding(.horizontal)
                }
                if tag == nil && !library.featured.isEmpty && !showsDeck {
                    FeaturedCarousel(songs: library.featured) { song in
                        player.play(song, in: library.featured + songs.filter { !$0.featured })
                    }
                }
                MoodChips(tags: library.tags, selection: $tag)
                SongGrid(songs: songs)
                    .padding(.horizontal)
            }
            .padding(.vertical, 12)
        }
        .scrollIndicators(.hidden)
        .nightBackdrop()
        .navigationTitle("Jukebox")
        .toolbar {
            ToolbarItem {
                Menu {
                    Picker("Sort", selection: $sort) {
                        ForEach(Library.Sort.allCases) { sort in
                            Text(sort.name).tag(sort)
                        }
                    }
                } label: {
                    Label("Sort", systemImage: "arrow.up.arrow.down")
                }
            }
            ToolbarItem {
                Button {
                    player.shuffleAll(songs)
                } label: {
                    Label("Shuffle", systemImage: "shuffle")
                }
            }
            if settings.isSupported {
                ToolbarItem {
                    Button {
                        showingHaptics = true
                    } label: {
                        Label("Music Haptics", systemImage: settings.isOn ? "waveform.path" : "waveform.path.badge.minus")
                    }
                }
            }
        }
        .sheet(isPresented: $showingHaptics) {
            HapticsSheet()
        }
    }
}

/// The featured songs, a big card each, swiped through
struct FeaturedCarousel: View {
    let songs: [Song]
    let play: (Song) -> Void

    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: 14) {
                ForEach(songs) { song in
                    Button {
                        play(song)
                    } label: {
                        FeaturedCard(song: song)
                    }
                    .buttonStyle(.plain)
                    .containerRelativeFrame(.horizontal, count: 1, spacing: 14)
                }
            }
            .scrollTargetLayout()
        }
        .scrollTargetBehavior(.viewAligned)
        .scrollIndicators(.hidden)
        .contentMargins(.horizontal, 16, for: .scrollContent)
    }
}

private struct FeaturedCard: View {
    let song: Song

    var body: some View {
        ZStack(alignment: .bottomLeading) {
            Artwork(song: song, cornerRadius: 26)
            LinearGradient(colors: [.clear, .black.opacity(0.75)], startPoint: .center, endPoint: .bottom)
                .clipShape(RoundedRectangle(cornerRadius: 26, style: .continuous))
            HStack(alignment: .bottom) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("FEATURED")
                        .font(.caption.weight(.heavy))
                        .tracking(1.5)
                        .foregroundStyle(Theme.pink)
                    Text(song.title)
                        .font(.title.weight(.bold))
                        .fontDesign(.rounded)
                        .foregroundStyle(.white)
                    Text(song.game.map { "From \($0.name)" } ?? song.subtitle)
                        .font(.subheadline)
                        .foregroundStyle(.white.opacity(0.75))
                }
                Spacer()
                Image(systemName: "play.fill")
                    .font(.title2)
                    .foregroundStyle(.white)
                    .frame(width: 54, height: 54)
                    .glassEffect(.regular.interactive(), in: Circle())
            }
            .padding(20)
        }
        .aspectRatio(1.35, contentMode: .fit)
        .shadow(color: Theme.lilac.opacity(0.25), radius: 24, y: 10)
    }
}

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

/// Every song, as a cover with its name under it
struct SongGrid: View {
    let songs: [Song]
    @Environment(Player.self) private var player

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 150, maximum: 230), spacing: 16)], spacing: 22) {
            ForEach(songs) { song in
                Button {
                    player.play(song, in: songs)
                } label: {
                    SongCard(song: song, isCurrent: player.song?.audio == song.audio && player.song?.id == song.id)
                }
                .buttonStyle(.plain)
                .contextMenu {
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
        }
    }
}

struct SongCard: View {
    let song: Song
    var isCurrent = false

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Artwork(song: song, cornerRadius: 18)
                .aspectRatio(1, contentMode: .fit)
                .overlay(alignment: .bottomTrailing) {
                    if isCurrent {
                        PlayingBars()
                            .padding(8)
                            .glassEffect(.regular, in: Capsule())
                            .padding(8)
                    }
                }
                .shadow(color: .black.opacity(0.35), radius: 10, y: 6)
            VStack(alignment: .leading, spacing: 2) {
                Text(song.title)
                    .font(.headline)
                    .fontDesign(.rounded)
                    .lineLimit(1)
                Text(song.subtitle)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
        }
        .contentShape(Rectangle())
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
                    Capsule()
                        .fill(Theme.rings[bar])
                        .frame(width: 3, height: player.isPlaying ? 5 + (8 * abs(sin((time * 5) + (Double(bar) * 1.7)))) : 5)
                }
            }
            .frame(height: 13, alignment: .bottom)
        }
    }
}
