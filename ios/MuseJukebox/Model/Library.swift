import Foundation
import Observation

/// The jukebox's songs: the copy built into the app straight away, then the site's (new songs turn
/// up without an update), kept for next time
@MainActor
@Observable
final class Library {
    enum Sort: String, CaseIterable, Identifiable {
        case newest, oldest, title

        var id: String { rawValue }

        var name: String {
            switch self {
            case .newest: "Newest"
            case .oldest: "Oldest"
            case .title: "A to Z"
            }
        }
    }

    private(set) var songs: [Song] = []

    private let keptCopy = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        .appending(path: "songs.json")

    init() {
        let kept = try? Data(contentsOf: keptCopy)
        let builtIn = Bundle.main.url(forResource: "songs", withExtension: "json").flatMap { try? Data(contentsOf: $0) }
        for data in [kept, builtIn].compactMap({ $0 }) {
            if let catalog = try? JSONDecoder().decode(SongCatalog.self, from: data), !catalog.songs.isEmpty {
                songs = catalog.songs
                break
            }
        }
    }

    /// The site's list, if there's signal
    func refresh() async {
        guard let (data, response) = try? await URLSession.shared.data(from: Site.url("songs.json")),
              (response as? HTTPURLResponse)?.statusCode == 200,
              let catalog = try? JSONDecoder().decode(SongCatalog.self, from: data),
              !catalog.songs.isEmpty else { return }
        songs = catalog.songs
        try? data.write(to: keptCopy, options: .atomic)
    }

    func song(id: String) -> Song? {
        songs.first { $0.id == id }
    }

    var featured: [Song] {
        songs.filter(\.featured)
    }

    /// Every tag, the ones most songs have first
    var tags: [String] {
        var counts: [String: Int] = [:]
        for song in songs {
            for tag in song.shownTags where !tag.hasPrefix("?") {
                counts[tag, default: 0] += 1
            }
        }
        return counts.sorted { $0.value == $1.value ? $0.key < $1.key : $0.value > $1.value }.map(\.key)
    }

    /// The songs with a tag (all of them for nil), matching a search, in an order
    func songs(tag: String?, matching query: String = "", sortedBy sort: Sort) -> [Song] {
        let words = query.lowercased().split(separator: " ").map(String.init)
        let chosen = songs.filter { song in
            guard tag == nil || song.tags.contains(tag!) else { return false }
            guard !words.isEmpty else { return true }
            let text = ([song.title, song.year, song.game?.name ?? ""] + song.tags).joined(separator: " ").lowercased()
            return words.allSatisfy { text.contains($0) }
        }
        switch sort {
        case .newest:
            return chosen.sorted { a, b in
                if a.featured != b.featured { return a.featured }
                if a.yearValue != b.yearValue { return a.yearValue > b.yearValue }
                return a.title.localizedStandardCompare(b.title) == .orderedAscending
            }
        case .oldest:
            return chosen.sorted { a, b in
                if a.yearValue != b.yearValue { return a.yearValue < b.yearValue }
                return a.title.localizedStandardCompare(b.title) == .orderedAscending
            }
        case .title:
            return chosen.sorted { $0.title.localizedStandardCompare($1.title) == .orderedAscending }
        }
    }
}
