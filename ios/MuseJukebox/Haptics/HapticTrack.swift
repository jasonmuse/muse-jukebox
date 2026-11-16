import Foundation

/// A song's haptic track (haptics/<song>.json, from tools/make-haptics.py): every tap, worked out
/// ahead of time from the song's beats, the way Apple's own haptic tracks come with Apple Music's songs
struct HapticTrack: Decodable, Sendable {
    struct Tap: Sendable {
        /// When it lands, in seconds of the song's file
        let time: Double
        /// How hard, out of the song's hardest hits (0–1)
        let power: Double
        /// 0 a deep thud (a kick), 1 a sharp tick (a hi-hat)
        let crisp: Double
        /// On a beat, or one of the hits between them
        let isBeat: Bool
    }

    let bpm: Double?
    let taps: [Tap]

    enum CodingKeys: String, CodingKey {
        case bpm, taps
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        bpm = try values.decodeIfPresent(Double.self, forKey: .bpm)
        let rows = try values.decode([[Double]].self, forKey: .taps)
        taps = rows.compactMap { row in
            guard row.count >= 3 else { return nil }
            return Tap(time: row[0], power: row[1], crisp: row[2], isBeat: row.count < 4 || row[3] > 0.5)
        }
    }

    /// The first tap after `time`
    func firstTap(after time: Double) -> Int {
        var low = 0
        var high = taps.count
        while low < high {
            let middle = (low + high) / 2
            if taps[middle].time <= time {
                low = middle + 1
            } else {
                high = middle
            }
        }
        return low
    }

    /// The last tap at or before `time`
    func lastTap(atOrBefore time: Double, beatsOnly: Bool = false) -> Tap? {
        var index = firstTap(after: time) - 1
        while index >= 0 {
            if !beatsOnly || taps[index].isBeat {
                return taps[index]
            }
            index -= 1
        }
        return nil
    }
}

/// The haptic tracks: from the site (so a song that's been redone gets its new one), or the copy
/// built into the app when there's no signal
actor HapticTrackStore {
    private var tracks: [String: HapticTrack] = [:]

    func track(for song: Song) async -> HapticTrack? {
        if let kept = tracks[song.haptics] {
            return kept
        }
        var track: HapticTrack?
        let request = URLRequest(url: Site.url(song.haptics), cachePolicy: .useProtocolCachePolicy, timeoutInterval: 4)
        if let (data, response) = try? await URLSession.shared.data(for: request),
           (response as? HTTPURLResponse)?.statusCode == 200 {
            track = try? JSONDecoder().decode(HapticTrack.self, from: data)
        }
        if track == nil {
            let name = URL(fileURLWithPath: song.haptics).deletingPathExtension().lastPathComponent
            if let url = Bundle.main.url(forResource: name, withExtension: "json", subdirectory: "haptics"),
               let data = try? Data(contentsOf: url) {
                track = try? JSONDecoder().decode(HapticTrack.self, from: data)
            }
        }
        if let track {
            tracks[song.haptics] = track
        }
        return track
    }
}
