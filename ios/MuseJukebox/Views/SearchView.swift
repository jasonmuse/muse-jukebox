import SwiftUI

/// Search: songs by name, mood, year or game. Before anything's typed, the moods as big tiles.
struct SearchView: View {
    @Environment(Library.self) private var library
    @State private var query = ""

    var body: some View {
        NavigationStack {
            ScrollView {
                if query.isEmpty {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 12)], spacing: 12) {
                        ForEach(Array(library.tags.enumerated()), id: \.element) { index, tag in
                            NavigationLink(value: tag) {
                                MoodTile(tag: tag, color: Theme.rings[index % Theme.rings.count])
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding()
                } else {
                    let results = library.songs(tag: nil, matching: query, sortedBy: .newest)
                    if results.isEmpty {
                        ContentUnavailableView.search(text: query)
                            .padding(.top, 60)
                    } else {
                        SongGrid(songs: results)
                            .padding()
                    }
                }
            }
            .scrollIndicators(.hidden)
            .nightBackdrop()
            .navigationTitle("Search")
            .searchable(text: $query, prompt: "Songs, moods, years, games")
            .navigationDestination(for: String.self) { tag in
                ScrollView {
                    SongGrid(songs: library.songs(tag: tag, sortedBy: .newest))
                        .padding()
                }
                .nightBackdrop()
                .navigationTitle(tag)
            }
        }
    }
}

private struct MoodTile: View {
    let tag: String
    let color: Color

    var body: some View {
        Text(tag)
            .font(.title3.weight(.bold))
            .fontDesign(.rounded)
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity, minHeight: 90, alignment: .bottomLeading)
            .padding(14)
            .background(
                LinearGradient(colors: [color.opacity(0.85), Theme.night], startPoint: .topLeading, endPoint: .bottomTrailing),
                in: RoundedRectangle(cornerRadius: 18, style: .continuous)
            )
    }
}
