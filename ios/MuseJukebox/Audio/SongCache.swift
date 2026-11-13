import Foundation

/// Each song's file, fetched from the site once and kept (in Caches: iOS can clear it when it needs
/// the room, and the song's fetched again next time)
actor SongCache {
    private let folder = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        .appending(path: "Songs", directoryHint: .isDirectory)
    private var fetching: [String: Task<URL, Error>] = [:]

    func file(for song: Song) async throws -> URL {
        let kept = keptFile(for: song)
        if FileManager.default.fileExists(atPath: kept.path(percentEncoded: false)) {
            return kept
        }
        if let underway = fetching[song.audio] {
            return try await underway.value
        }
        let folder = folder
        let source = Site.url(song.audio)
        let task = Task { () throws -> URL in
            try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
            let (downloaded, response) = try await URLSession.shared.download(from: source)
            // (a song that isn't there comes back as the site's page, not an error: only sound is kept)
            guard let http = response as? HTTPURLResponse, http.statusCode == 200,
                  http.mimeType?.hasPrefix("audio") == true else {
                try? FileManager.default.removeItem(at: downloaded)
                throw URLError(.badServerResponse)
            }
            try? FileManager.default.removeItem(at: kept)
            try FileManager.default.moveItem(at: downloaded, to: kept)
            return kept
        }
        fetching[song.audio] = task
        defer { fetching[song.audio] = nil }
        return try await task.value
    }

    /// Whatever's kept for a song that wouldn't play goes, so it's fetched afresh next time
    func forget(_ song: Song) {
        try? FileManager.default.removeItem(at: keptFile(for: song))
    }

    private func keptFile(for song: Song) -> URL {
        folder.appending(path: URL(fileURLWithPath: song.audio).lastPathComponent)
    }
}
