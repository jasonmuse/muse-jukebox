import ImageIO
import SwiftUI
import UIKit

/// The songs' covers, from the site. Each is decoded at the size it's shown (some covers are big
/// animated gifs: decoded whole, one would take hundreds of megabytes), its frames only where it
/// moves, and kept in a cache iOS can empty when it needs the memory.
@MainActor
final class ArtworkStore {
    static let shared = ArtworkStore()

    private let images = NSCache<NSString, UIImage>()
    private var fetching: [String: Task<(UIImage, Int)?, Never>] = [:]

    init() {
        images.totalCostLimit = 96 * 1024 * 1024
    }

    func cached(_ path: String, maxPixels: Int, animated: Bool = false) -> UIImage? {
        images.object(forKey: Self.key(path, maxPixels, animated) as NSString)
    }

    func image(for path: String, maxPixels: Int, animated: Bool = false) async -> UIImage? {
        let key = Self.key(path, maxPixels, animated)
        if let image = images.object(forKey: key as NSString) {
            return image
        }
        if let underway = fetching[key] {
            return await underway.value?.0
        }
        let url = Site.url(path)
        let task = Task<(UIImage, Int)?, Never>.detached(priority: .userInitiated) {
            guard let (data, response) = try? await URLSession.shared.data(from: url),
                  (response as? HTTPURLResponse)?.statusCode == 200 else { return nil }
            return ArtworkStore.decode(data, maxPixels: maxPixels, animated: animated)
        }
        fetching[key] = task
        let decoded = await task.value
        fetching[key] = nil
        guard let (image, cost) = decoded else { return nil }
        images.setObject(image, forKey: key as NSString, cost: cost)
        return image
    }

    private static func key(_ path: String, _ maxPixels: Int, _ animated: Bool) -> String {
        "\(path)|\(maxPixels)|\(animated ? "moving" : "still")"
    }

    /// The image no bigger than `maxPixels` across (and how many bytes it takes): a still, or up to 40
    /// of an animated gif's frames, spread evenly through it and taking as long altogether as it did
    nonisolated static func decode(_ data: Data, maxPixels: Int, animated: Bool) -> (UIImage, Int)? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil) else { return nil }
        let options: [CFString: Any] = [
            kCGImageSourceCreateThumbnailFromImageAlways: true,
            kCGImageSourceCreateThumbnailWithTransform: true,
            kCGImageSourceShouldCacheImmediately: true,
            kCGImageSourceThumbnailMaxPixelSize: maxPixels
        ]
        let count = CGImageSourceGetCount(source)
        guard animated && count > 1 else {
            guard let still = CGImageSourceCreateThumbnailAtIndex(source, 0, options as CFDictionary) else { return nil }
            return (UIImage(cgImage: still), still.bytesPerRow * still.height)
        }
        var length: TimeInterval = 0
        for index in 0..<count {
            length += frameDelay(source, index)
        }
        let step = max(1, Int((Double(count) / 40).rounded(.up)))
        var frames: [UIImage] = []
        var cost = 0
        for index in stride(from: 0, to: count, by: step) {
            guard let frame = CGImageSourceCreateThumbnailAtIndex(source, index, options as CFDictionary) else { continue }
            frames.append(UIImage(cgImage: frame))
            cost += frame.bytesPerRow * frame.height
        }
        guard let first = frames.first else { return nil }
        return (UIImage.animatedImage(with: frames, duration: length) ?? first, cost)
    }

    nonisolated private static func frameDelay(_ source: CGImageSource, _ index: Int) -> TimeInterval {
        let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any]
        let gif = properties?[kCGImagePropertyGIFDictionary] as? [CFString: Any]
        let delay = (gif?[kCGImagePropertyGIFUnclampedDelayTime] as? Double) ?? (gif?[kCGImagePropertyGIFDelayTime] as? Double) ?? 0.1
        return delay < 0.02 ? 0.1 : delay
    }
}

/// A song's cover, filling its frame. Small (a grid, a list, the record's label) or large (a big
/// card, the sleeve on Now Playing); an animated cover only moves where it's asked to, on the sleeve.
struct Artwork: View {
    enum Size {
        case small, large
    }

    let song: Song?
    var size: Size = .small
    var animated = false
    var cornerRadius: CGFloat = 14

    @State private var image: UIImage?

    private var source: (path: String, maxPixels: Int, animated: Bool)? {
        guard let song else { return nil }
        switch size {
        case .small:
            return (song.thumbnail ?? song.cover, 420, false)
        case .large:
            return (song.cover, animated ? 480 : 1100, animated)
        }
    }

    private var sourceKey: String {
        source.map { "\($0.path)|\($0.maxPixels)|\($0.animated)" } ?? ""
    }

    var body: some View {
        ZStack {
            Rectangle()
                .fill(LinearGradient(colors: [Theme.night, Theme.lilac.opacity(0.35)], startPoint: .topLeading, endPoint: .bottomTrailing))
            if let image {
                if image.images != nil {
                    AnimatedImage(image: image)
                } else {
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFill()
                }
            } else {
                Image(systemName: "music.note")
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundStyle(.white.opacity(0.35))
            }
        }
        .grayscale(song?.grayscale == true ? 1 : 0)
        .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
        .task(id: sourceKey) {
            guard let source else {
                image = nil
                return
            }
            let store = ArtworkStore.shared
            image = store.cached(source.path, maxPixels: source.maxPixels, animated: source.animated)
            if image == nil {
                image = await store.image(for: source.path, maxPixels: source.maxPixels, animated: source.animated)
            }
        }
    }
}

/// An animated gif, playing (SwiftUI's Image only shows its first frame)
private struct AnimatedImage: UIViewRepresentable {
    let image: UIImage

    func makeUIView(context: Context) -> UIImageView {
        let view = UIImageView()
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.setContentHuggingPriority(.defaultLow, for: .horizontal)
        view.setContentHuggingPriority(.defaultLow, for: .vertical)
        view.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        view.setContentCompressionResistancePriority(.defaultLow, for: .vertical)
        return view
    }

    func updateUIView(_ view: UIImageView, context: Context) {
        if view.image !== image {
            view.image = image
        }
        if !view.isAnimating {
            view.startAnimating()
        }
    }

    func sizeThatFits(_ proposal: ProposedViewSize, uiView: UIImageView, context: Context) -> CGSize? {
        proposal.replacingUnspecifiedDimensions()
    }
}
