import ImageIO
import SwiftUI
import UIKit

/// The songs' covers, from the site, each fetched once (an animated gif keeps all its frames)
@MainActor
final class ArtworkStore {
    static let shared = ArtworkStore()

    private var images: [String: UIImage] = [:]
    private var fetching: [String: Task<UIImage?, Never>] = [:]

    func cached(_ path: String) -> UIImage? {
        images[path]
    }

    func image(for path: String) async -> UIImage? {
        if let image = images[path] {
            return image
        }
        if let underway = fetching[path] {
            return await underway.value
        }
        let url = Site.url(path)
        let task = Task<UIImage?, Never>.detached(priority: .userInitiated) {
            guard let (data, response) = try? await URLSession.shared.data(from: url),
                  (response as? HTTPURLResponse)?.statusCode == 200 else { return nil }
            return ArtworkStore.decode(data)
        }
        fetching[path] = task
        let image = await task.value
        fetching[path] = nil
        if let image {
            images[path] = image
        }
        return image
    }

    /// A still image, or every frame of an animated gif
    nonisolated static func decode(_ data: Data) -> UIImage? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil) else { return nil }
        let count = CGImageSourceGetCount(source)
        guard count > 1 else { return UIImage(data: data) }
        var frames: [UIImage] = []
        var length: TimeInterval = 0
        for index in 0..<min(count, 150) {
            guard let frame = CGImageSourceCreateImageAtIndex(source, index, nil) else { continue }
            let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any]
            let gif = properties?[kCGImagePropertyGIFDictionary] as? [CFString: Any]
            let delay = (gif?[kCGImagePropertyGIFUnclampedDelayTime] as? Double) ?? (gif?[kCGImagePropertyGIFDelayTime] as? Double) ?? 0.1
            length += delay < 0.02 ? 0.1 : delay
            frames.append(UIImage(cgImage: frame))
        }
        return UIImage.animatedImage(with: frames, duration: length) ?? frames.first
    }
}

/// A song's cover, filling its frame. Still unless `animated` (an animated cover only moves where it's
/// the star: on the Now Playing screen).
struct Artwork: View {
    let song: Song?
    var animated = false
    var cornerRadius: CGFloat = 14

    @State private var image: UIImage?

    var body: some View {
        ZStack {
            Rectangle()
                .fill(LinearGradient(colors: [Theme.night, Theme.lilac.opacity(0.35)], startPoint: .topLeading, endPoint: .bottomTrailing))
            if let image {
                if animated && image.images != nil {
                    AnimatedImage(image: image)
                } else {
                    Image(uiImage: image.images?.first ?? image)
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
        .task(id: song?.cover) {
            guard let path = song?.cover else {
                image = nil
                return
            }
            image = ArtworkStore.shared.cached(path)
            if image == nil {
                image = await ArtworkStore.shared.image(for: path)
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
