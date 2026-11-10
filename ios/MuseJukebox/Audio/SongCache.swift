import Foundation

/// Each song's file, fetched from the site once and kept (in Caches: iOS can clear it when it needs
/// the room, and the song's fetched again next time)
actor SongCache {
    private let folder = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        .appending(path: "Songs", directoryHint: .isDirectory)
    private var fetching: [String: Task<URL, Error>] = [:]

    func file(for song: Song) async throws -> URL {
        let kept = folder.appending(path: URL(fileURLWithPath: song.audio).lastPathComponent)
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
            guard (response as? HTTPURLResponse)?.statusCode == 200 else {
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
}
