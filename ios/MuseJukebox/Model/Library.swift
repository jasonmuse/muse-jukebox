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
    /// The jukebox's rows, A on, each with its records in order (`sortIntoRows` says which)
    private(set) var rows: [JukeboxRow] = []
    /// Every record, newest first: a song with two sides is one record (its flip side's on the back)
    private(set) var records: [Song] = []

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
        sortIntoRows()
    }

    /// The site's list, if there's signal
    func refresh() async {
        guard let (data, response) = try? await URLSession.shared.data(from: Site.url("songs.json")),
              (response as? HTTPURLResponse)?.statusCode == 200,
              let catalog = try? JSONDecoder().decode(SongCatalog.self, from: data),
              !catalog.songs.isEmpty else { return }
        songs = catalog.songs
        sortIntoRows()
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
        return Self.ordered(chosen, by: sort)
    }

    static func ordered(_ songs: [Song], by sort: Sort) -> [Song] {
        switch sort {
        case .newest:
            return songs.sorted { a, b in
                if a.featured != b.featured { return a.featured }
                if a.yearValue != b.yearValue { return a.yearValue > b.yearValue }
                return a.title.localizedStandardCompare(b.title) == .orderedAscending
            }
        case .oldest:
            return songs.sorted { a, b in
                if a.yearValue != b.yearValue { return a.yearValue < b.yearValue }
                return a.title.localizedStandardCompare(b.title) == .orderedAscending
            }
        case .title:
            return songs.sorted { $0.title.localizedStandardCompare($1.title) == .orderedAscending }
        }
    }

    // MARK: - The jukebox's rows and codes

    /// Tags that file songs away rather than say how they sound: no row of their own
    private static let filing: Set<String> = ["Featured", "Old", "Archive", "Unsorted", "Slowed"]

    /// Whether a song is the flip side of a record that's here (Countdown Paused, Countdown
    /// Island's side B): it's on the back of that record, not a record of its own
    func isFlipSide(_ song: Song) -> Bool {
        guard song.side == "B", let other = song.otherSide else { return false }
        return self.song(id: other) != nil
    }

    /// A record's other side, if it has one
    func flipSide(of song: Song) -> Song? {
        song.otherSide.flatMap { self.song(id: $0) }
    }

    /// The record at a code ("C3": row C's third), if there's one there
    func song(atCode code: String) -> Song? {
        guard let letter = code.first, let number = Int(code.dropFirst()), number > 0,
              let row = rows.first(where: { $0.letter == String(letter) }), number <= row.songs.count else { return nil }
        return row.songs[number - 1]
    }

    /// A song's code: where it is in the first row it's in (a flip side has its record's)
    func code(for song: Song) -> String? {
        let record = isFlipSide(song) ? (flipSide(of: song) ?? song) : song
        for row in rows {
            if let index = row.songs.firstIndex(where: { $0.id == record.id }) {
                return row.letter + String(index + 1)
            }
        }
        return nil
    }

    /// The rows, as on a real jukebox: A, the newest (the featured songs, then the newest year's);
    /// then a row for each mood with five songs or more, the biggest first (up to eight of them);
    /// then the rest, so every record has a code. A record can be in more than one row.
    private func sortIntoRows() {
        let records = Self.ordered(songs.filter { !isFlipSide($0) }, by: .newest)
        var rows: [JukeboxRow] = []
        func add(_ name: String, _ songs: [Song]) {
            guard !songs.isEmpty, rows.count < 26 else { return }
            let letter = String(Character(UnicodeScalar(UInt8(65 + rows.count))))
            rows.append(JukeboxRow(index: rows.count, letter: letter, name: name, songs: songs))
        }
        let newestYear = records.map(\.yearValue).max() ?? 0
        add("New", records.filter { $0.featured || $0.yearValue == newestYear })
        let moods = tags.filter { tag in
            !Self.filing.contains(tag) && records.filter { $0.tags.contains(tag) }.count >= 5
        }
        for mood in moods.prefix(8) {
            add(mood, records.filter { $0.tags.contains(mood) })
        }
        let placed = Set(rows.flatMap { $0.songs.map(\.id) })
        add("More", records.filter { !placed.contains($0.id) })
        self.records = records
        self.rows = rows
    }
}

/// A row of the jukebox: a letter and a mood, and the records under it (B: Chill, and B1 its first)
struct JukeboxRow: Identifiable, Hashable, Sendable {
    let index: Int
    let letter: String
    let name: String
    let songs: [Song]

    var id: String { letter }
}
