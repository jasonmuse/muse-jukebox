import Foundation

/// Where the jukebox lives: songs, covers and haptic tracks all come from the site
enum Site {
    static let base = URL(string: "https://muse-jukebox.pages.dev/")!

    static func url(_ path: String) -> URL {
        base.appending(path: path)
    }
}

/// One of the jukebox's songs, as songs.json has it (tools/make-songs.py writes it from script.js)
struct Song: Identifiable, Hashable, Decodable, Sendable {
    let id: String
    let title: String
    /// The file it plays (Countdown Paused plays Countdown Island's, slowed down)
    let audio: String
    /// How fast it plays its file: under 1 for a slowed side (the pitch goes down with it)
    let rate: Double
    let cover: String
    let thumbnail: String?
    let tags: [String]
    let year: String
    let featured: Bool
    let haptics: String
    let duration: Double?
    let shape: String?
    /// "A" or "B" for a song with two sides, and the other side's id
    let side: String?
    let otherSide: String?
    let grayscale: Bool
    let game: Game?

    struct Game: Hashable, Decodable, Sendable {
        let name: String
        let url: String
        let appStore: String?

        /// The App Store page when there is one, otherwise the game's own page
        var link: URL? {
            URL(string: appStore ?? url)
        }
    }

    enum CodingKeys: String, CodingKey {
        case id, title, audio, rate, cover, thumbnail, tags, year, featured, haptics, duration, shape, side, otherSide, grayscale, game
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        id = try values.decode(String.self, forKey: .id)
        title = try values.decode(String.self, forKey: .title)
        audio = try values.decode(String.self, forKey: .audio)
        rate = try values.decodeIfPresent(Double.self, forKey: .rate) ?? 1
        cover = try values.decode(String.self, forKey: .cover)
        thumbnail = try values.decodeIfPresent(String.self, forKey: .thumbnail)
        tags = try values.decodeIfPresent([String].self, forKey: .tags) ?? []
        year = try values.decodeIfPresent(String.self, forKey: .year) ?? ""
        featured = try values.decodeIfPresent(Bool.self, forKey: .featured) ?? false
        haptics = try values.decode(String.self, forKey: .haptics)
        duration = try values.decodeIfPresent(Double.self, forKey: .duration)
        shape = try values.decodeIfPresent(String.self, forKey: .shape)
        side = try values.decodeIfPresent(String.self, forKey: .side)
        otherSide = try values.decodeIfPresent(String.self, forKey: .otherSide)
        grayscale = try values.decodeIfPresent(Bool.self, forKey: .grayscale) ?? false
        game = try values.decodeIfPresent(Game.self, forKey: .game)
    }

    /// The year as a number for sorting (the secret song's "?????" goes last)
    var yearValue: Int {
        Int(year) ?? 0
    }

    /// The tags worth showing (the Featured tag's already said by where the song is)
    var shownTags: [String] {
        tags.filter { $0 != "Featured" }
    }

    var subtitle: String {
        ([year] + shownTags.prefix(2)).filter { !$0.isEmpty }.joined(separator: " · ")
    }

    /// The song's wave (from waves.json): how loud it is at 96 points along, 0 to 1
    var waveform: [Double] {
        guard let shape else { return [] }
        let alphabet = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_")
        return shape.map { letter in
            Double(alphabet.firstIndex(of: letter) ?? 0) / 63
        }
    }
}

struct SongCatalog: Decodable {
    let version: Int
    let songs: [Song]
}
