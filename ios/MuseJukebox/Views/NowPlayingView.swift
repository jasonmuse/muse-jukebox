import AVKit
import CoreImage
import SwiftUI

/// The song that's on, now spinning: its record on the turntable's platter with the tonearm down on
/// it (rings pulsing out behind with every haptic tap, neon tubes glowing up the sides), its code on
/// an LED display, its two sides if it has them, its wave to scrub along, the controls, and a few
/// labeled tools (Fold FX on iPhone Duo, the haptics, what's coming up). On iPhone Duo propped up
/// like a laptop it's the stage: just the record and the song, big enough to see from across the
/// room, while the controls go on the half that's lying flat.
struct NowPlayingView: View {
    enum Style {
        case sheet, page, stage
    }

    var style: Style = .sheet

    @Environment(Player.self) private var player
    @Environment(Library.self) private var library
    @Environment(HapticsSettings.self) private var settings
    @Environment(\.dismiss) private var dismiss
    @State private var showingHaptics = false
    @State private var showingQueue = false
    @State private var showingFoldFX = false

    /// While nothing's on, a page of its own (the gatefold) shows the first featured song, ready to play
    private var waiting: Song? {
        style == .sheet ? nil : (library.featured.first ?? library.songs.first)
    }

    var body: some View {
        Group {
            if let song = player.song ?? waiting {
                let isOn = player.song != nil
                GeometryReader { geometry in
                    let wide = geometry.size.width > geometry.size.height * 1.1
                    let layout = wide ? AnyLayout(HStackLayout(spacing: 28)) : AnyLayout(VStackLayout(spacing: 16))
                    VStack(spacing: 12) {
                        if style == .sheet && isOn {
                            TopBar(song: song)
                        }
                        layout {
                            Platter(song: song)
                                .frame(maxWidth: style == .stage ? .infinity : 470, maxHeight: style == .stage ? .infinity : 330)
                            if style != .stage {
                                VStack(spacing: 16) {
                                    SongHeading(song: song)
                                    if isOn {
                                        if let other = library.flipSide(of: song) {
                                            SideSwitch(song: song, other: other)
                                        }
                                        Scrubber()
                                        Transport()
                                        ToolsRow(showingHaptics: $showingHaptics, showingQueue: $showingQueue, showingFoldFX: $showingFoldFX)
                                    } else {
                                        PlayButton(song: song)
                                    }
                                }
                                .frame(maxWidth: 460)
                            } else {
                                VStack(spacing: 22) {
                                    SongHeading(song: song, large: true)
                                    if !isOn {
                                        PlayButton(song: song)
                                    }
                                }
                            }
                        }
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                    }
                    .padding(.horizontal, 24)
                    .padding(.vertical, style == .sheet ? 14 : 20)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
            } else {
                ContentUnavailableView {
                    Label("Nothing's playing", systemImage: "opticaldisc")
                } description: {
                    Text("Pick a song and it'll spin here.")
                } actions: {
                    // (a random song, then the rest shuffled: the jukebox's dice)
                    Button {
                        player.shuffleAll(library.songs)
                    } label: {
                        Label("Play something random", systemImage: "die.face.5")
                            .font(.headline)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 4)
                    }
                    .buttonStyle(.glassProminent)
                    .disabled(library.songs.isEmpty)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .overlay {
            if style == .sheet && player.song != nil {
                NeonTubes()
                    .padding(.horizontal, 5)
            }
        }
        // (behind, not beside: a blurred cover filling the screen mustn't make the screen any wider)
        .background {
            Backdrop(image: player.artwork)
        }
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showingHaptics) {
            HapticsSheet()
        }
        .sheet(isPresented: $showingQueue) {
            UpNextSheet()
        }
        .sheet(isPresented: $showingFoldFX) {
            FoldFXSheet()
        }
    }
}

/// Fold FX's rack, in a sheet of its own
private struct FoldFXSheet: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            FoldFXRack()
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .confirmationAction) {
                        Button("Done") { dismiss() }
                    }
                }
        }
        .presentationDetents([.medium, .large])
        .preferredColorScheme(.dark)
    }
}

/// Along the top: close, the record's code on an LED display, and where the sound goes
private struct TopBar: View {
    let song: Song
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        HStack {
            Button {
                dismiss()
            } label: {
                Image(systemName: "chevron.down")
                    .font(.headline)
                    .foregroundStyle(.white)
                    .frame(width: 40, height: 40)
                    .glassEffect(.regular.interactive(), in: Circle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Close")
            Spacer()
            LEDChip(text: [library.code(for: song), player.isPlaying ? "Now spinning" : "Paused"].compactMap { $0 }.joined(separator: " · "),
                    color: Theme.pink, size: 11)
            Spacer()
            AirPlayButton()
                .frame(width: 40, height: 40)
                .glassEffect(.regular.interactive(), in: Circle())
        }
    }
}

/// The cover, big and blurred, glowing behind everything. It's blurred once, small and away from the
/// main thread, then stretched to fill the screen: blurring it live at that size cost every frame.
private struct Backdrop: View {
    let image: UIImage?
    @State private var blurred: UIImage?

    var body: some View {
        Theme.backdrop
            .overlay {
                if let blurred {
                    Image(uiImage: blurred)
                        .resizable()
                        .interpolation(.high)
                        .scaledToFill()
                        .opacity(0.55)
                        .transition(.opacity)
                }
            }
            .overlay {
                LinearGradient(colors: [.black.opacity(0.15), .black.opacity(0.65)], startPoint: .top, endPoint: .bottom)
            }
            .clipped()
            .ignoresSafeArea()
            .animation(.easeInOut(duration: 0.6), value: blurred)
            .task(id: image.map { ObjectIdentifier($0) }) {
                guard let image else {
                    blurred = nil
                    return
                }
                blurred = await BlurredCover.make(from: image.images?.first ?? image)
            }
    }
}

/// A cover blurred for the backdrop: small (stretched across the screen and blurred this much,
/// nothing's lost), with its colors turned up by half
private enum BlurredCover {
    private static let context = CIContext(options: [.cacheIntermediates: false])
    /// How many pixels across it's made
    private static let side: CGFloat = 128

    static func make(from image: UIImage) async -> UIImage? {
        guard let source = image.cgImage else { return nil }
        return await Task.detached(priority: .utility) { () -> UIImage? in
            let cover = CIImage(cgImage: source)
            let scale = BlurredCover.side / max(cover.extent.width, cover.extent.height, 1)
            let small = cover.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
            let frame = small.extent.integral
            // (as blurred as a 70-point blur on the cover stretched to fill the screen)
            let blurred = small.clampedToExtent()
                .applyingGaussianBlur(sigma: 7)
                .applyingFilter("CIColorControls", parameters: [kCIInputSaturationKey: 1.5])
                .cropped(to: frame)
            guard let made = BlurredCover.context.createCGImage(blurred, from: frame) else { return nil }
            return UIImage(cgImage: made)
        }.value
    }
}

/// The record on the turntable's platter, turning while the song plays, with the tonearm swung in
/// over the grooves (and back off when it's paused), and the haptics' rings pulsing out behind
private struct Platter: View {
    let song: Song
    @Environment(Player.self) private var player

    var body: some View {
        GeometryReader { geometry in
            let side = min(geometry.size.width / 1.12, geometry.size.height)
            ZStack {
                HapticPulse()
                    .frame(width: side * 1.16, height: side * 1.16)
                Circle()
                    .fill(RadialGradient(colors: [Color(white: 0.2), Color(white: 0.09), Color(white: 0.17)],
                                         center: .center, startRadius: side * 0.3, endRadius: side * 0.5))
                    .overlay {
                        Circle()
                            .strokeBorder(LinearGradient(colors: [.white.opacity(0.35), .white.opacity(0.04)], startPoint: .top, endPoint: .bottom),
                                          lineWidth: 2)
                    }
                    .frame(width: side, height: side)
                    .shadow(color: .black.opacity(0.6), radius: 26, y: 16)
                SpinningRecord(song: song)
                    .frame(width: side * 0.93, height: side * 0.93)
                Tonearm(down: player.isPlaying)
                    .frame(width: side, height: side)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .aspectRatio(1.12, contentMode: .fit)
    }
}

/// The tonearm: its pivot off to the top right, swung in over the grooves while the record plays and
/// lifted back off when it's paused
private struct Tonearm: View {
    let down: Bool

    var body: some View {
        GeometryReader { geometry in
            let side = min(geometry.size.width, geometry.size.height)
            let pivot = CGPoint(x: side * 0.97, y: side * 0.07)
            ZStack {
                VStack(spacing: 0) {
                    Capsule()
                        .fill(LinearGradient(colors: [Color(white: 0.96), Color(white: 0.6)], startPoint: .leading, endPoint: .trailing))
                        .frame(width: side * 0.032, height: side * 0.66)
                    RoundedRectangle(cornerRadius: side * 0.012, style: .continuous)
                        .fill(LinearGradient(colors: [Color(white: 0.92), Color(white: 0.7)], startPoint: .top, endPoint: .bottom))
                        .frame(width: side * 0.07, height: side * 0.1)
                        .rotationEffect(.degrees(-28), anchor: .top)
                }
                .shadow(color: .black.opacity(0.45), radius: 6, x: 3, y: 5)
                .rotationEffect(.degrees(down ? 18 : 4), anchor: .top)
                .position(x: pivot.x, y: pivot.y + (side * 0.38))
                Circle()
                    .fill(RadialGradient(colors: [.white, Color(white: 0.8), Color(white: 0.48)],
                                         center: UnitPoint(x: 0.38, y: 0.32), startRadius: 0, endRadius: side * 0.06))
                    .frame(width: side * 0.11, height: side * 0.11)
                    .shadow(color: .black.opacity(0.4), radius: 5, y: 3)
                    .position(pivot)
            }
            .animation(.spring(response: 0.9, dampingFraction: 0.82), value: down)
        }
        .allowsHitTesting(false)
        .accessibilityHidden(true)
    }
}

/// The record, turning at 33⅓ with the song (slower for a slowed side, still when it's paused), with a
/// sheen and its shadow that stay where they are as it turns under them
struct SpinningRecord: View {
    let song: Song
    var shadowed = true
    @Environment(Player.self) private var player

    var body: some View {
        // (only the record turns: a shadow turning with it would wheel round and round it)
        TimelineView(.animation(paused: !player.isPlaying)) { _ in
            VinylRecord(song: song, shadowed: false)
                .rotationEffect(.degrees(player.currentTime * 200))
        }
        .overlay {
            // (white laid over the record lightens it just as a screen blend does, without the
            // blend's extra pass every frame)
            AngularGradient(colors: [.clear, .white.opacity(0.13), .clear, .clear, .white.opacity(0.08), .clear, .clear], center: .center)
                .clipShape(Circle())
                .allowsHitTesting(false)
        }
        .background {
            if shadowed {
                RecordShadow()
            }
        }
    }
}

/// A black record with fine grooves, and the cover for a label
struct VinylRecord: View {
    let song: Song
    var shadowed = true

    var body: some View {
        GeometryReader { geometry in
            let size = min(geometry.size.width, geometry.size.height)
            ZStack {
                Circle()
                    .fill(RadialGradient(colors: [Color(white: 0.17), Color(white: 0.04)], center: .center, startRadius: size * 0.1, endRadius: size * 0.5))
                Canvas { context, canvasSize in
                    let center = CGPoint(x: canvasSize.width / 2, y: canvasSize.height / 2)
                    for groove in 0..<28 {
                        let radius = size * (0.24 + (Double(groove) * 0.0092))
                        let ring = Path(ellipseIn: CGRect(x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2))
                        context.stroke(ring, with: .color(.white.opacity(groove % 3 == 0 ? 0.07 : 0.035)), lineWidth: 0.8)
                    }
                }
                Artwork(song: song, cornerRadius: size)
                    .frame(width: size * 0.38, height: size * 0.38)
                Circle()
                    .fill(Theme.ink)
                    .frame(width: size * 0.03, height: size * 0.03)
            }
            .frame(width: size, height: size)
            .background {
                if shadowed {
                    RecordShadow()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }
}

/// A record's shadow on whatever's under it: soft, and a little below. It's drawn as a gradient
/// rather than blurred, so it costs next to nothing, even under records flying past in the wall.
struct RecordShadow: View {
    /// How far it shades off, either side of the record's edge
    private let softness: CGFloat = 10

    var body: some View {
        GeometryReader { geometry in
            let radius = min(geometry.size.width, geometry.size.height) / 2
            let reach = radius + (softness * 3)
            Circle()
                .fill(RadialGradient(stops: stops(radius: radius, reach: reach), center: .center, startRadius: 0, endRadius: reach))
                .frame(width: reach * 2, height: reach * 2)
                .position(x: geometry.size.width / 2, y: (geometry.size.height / 2) + 10)
        }
        .allowsHitTesting(false)
        .accessibilityHidden(true)
    }

    /// A blurred disc's edge: dark inside it, shading off over a few points either side of the edge
    private func stops(radius: CGFloat, reach: CGFloat) -> [Gradient.Stop] {
        let edge: [(past: CGFloat, left: Double)] = [(-2, 0.98), (-1, 0.84), (0, 0.5), (1, 0.16), (2, 0.02), (3, 0)]
        let shading = edge.map { point in
            Gradient.Stop(color: .black.opacity(0.55 * point.left), location: max(0, (radius + (point.past * softness)) / reach))
        }
        return [Gradient.Stop(color: .black.opacity(0.55), location: 0)] + shading
    }
}

/// The song's name, and where it's from
private struct SongHeading: View {
    let song: Song
    var large = false
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player

    var body: some View {
        VStack(spacing: 6) {
            Text(song.title)
                .font(large ? .system(size: 52, weight: .heavy, design: .rounded) : .title.weight(.bold))
                .fontDesign(.rounded)
                .multilineTextAlignment(.center)
                .lineLimit(2)
                .minimumScaleFactor(0.6)
            HStack(spacing: 8) {
                Text(song.subtitle)
                    .foregroundStyle(.secondary)
                if let game = song.game, let link = game.link {
                    Link(destination: link) {
                        Label(game.name, systemImage: "gamecontroller.fill")
                            .font(.caption.weight(.semibold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .glassEffect(.regular.interactive(), in: Capsule())
                    }
                }
            }
            .font(.subheadline)
            if player.couldNotLoad {
                Label("Couldn't load this song. Check your connection.", systemImage: "wifi.exclamationmark")
                    .font(.footnote)
                    .foregroundStyle(Theme.pink)
            }
        }
    }
}

/// Play, for the song that's waiting while nothing's on: it, then the rest of the featured songs, then
/// the others
private struct PlayButton: View {
    let song: Song
    @Environment(Player.self) private var player
    @Environment(Library.self) private var library

    var body: some View {
        Button {
            player.play(song, in: library.featured + library.songs.filter { !$0.featured })
        } label: {
            Label("Play", systemImage: "play.fill")
                .font(.title3.weight(.bold))
                .fontDesign(.rounded)
                .padding(.horizontal, 30)
                .padding(.vertical, 16)
                .foregroundStyle(.white)
                .glassEffect(.regular.tint(Theme.pink.opacity(0.45)).interactive(), in: Capsule())
        }
        .buttonStyle(.plain)
    }
}

/// The song's wave: played part lit up, drag along it to move about the song
struct Scrubber: View {
    @Environment(Player.self) private var player
    @State private var dragging: Double?

    var body: some View {
        let levels = player.song?.waveform ?? []
        VStack(spacing: 6) {
            GeometryReader { geometry in
                // (another bar lights up every second or two: so it's checked four times a second, and
                // the bars are only drawn again when one does, rather than every frame)
                TimelineView(.animation(minimumInterval: 0.25, paused: !player.isPlaying || dragging != nil)) { _ in
                    WaveformBars(levels: levels, lit: WaveformBars.litCount(at: dragging ?? player.progress, of: levels))
                }
                .contentShape(Rectangle())
                .gesture(
                    DragGesture(minimumDistance: 0)
                        .onChanged { value in
                            dragging = fraction(value.location.x, of: geometry.size.width)
                        }
                        .onEnded { value in
                            player.seek(to: fraction(value.location.x, of: geometry.size.width) * player.duration)
                            dragging = nil
                        }
                )
            }
            .frame(height: 52)
            .sensoryFeedback(.selection, trigger: dragging == nil)
            TimelineView(.periodic(from: .now, by: 0.5)) { _ in
                let rate = max(player.rate, 0.1)
                let shown = (dragging.map { $0 * player.duration } ?? player.currentTime) / rate
                HStack {
                    Text(formatTime(shown))
                    Spacer()
                    Text("-" + formatTime(max(0, (player.duration / rate) - shown)))
                }
                .font(.caption.monospacedDigit().weight(.medium))
                .foregroundStyle(.secondary)
            }
        }
    }

    private func fraction(_ x: CGFloat, of width: CGFloat) -> Double {
        min(max(Double(x / max(width, 1)), 0), 1)
    }

    private func formatTime(_ seconds: Double) -> String {
        let whole = Int(seconds.rounded(.down))
        return String(format: "%d:%02d", whole / 60, whole % 60)
    }
}

/// The wave's bars: a mirror of how loud the song is along the way, drawn as the site draws it, lit
/// as far as the song's got
struct WaveformBars: View {
    let levels: [Double]
    /// How many of the bars are lit, from the left
    let lit: Int

    /// Bars all the same height, while the song's wave isn't known
    private static let placeholder = Array(repeating: 0.62, count: 64)

    /// How many of a wave's bars are lit `progress` (0 to 1) of the way along it: each one once the
    /// song's halfway along it
    static func litCount(at progress: Double, of levels: [Double]) -> Int {
        let count = levels.isEmpty ? placeholder.count : levels.count
        guard progress.isFinite else { return 0 }
        return Int((min(max(progress, 0), 1) * Double(count)).rounded())
    }

    var body: some View {
        Canvas { context, size in
            let shown = levels.isEmpty ? Self.placeholder : levels
            let count = shown.count
            let step = size.width / CGFloat(count)
            let barWidth = max(1.5, step * 0.62)
            var played = Path()
            var unplayed = Path()
            for (index, level) in shown.enumerated() {
                // (most of a song sits near the top of its range, so the top's spread out)
                let height = max(barWidth, size.height * CGFloat(pow(level, 2.4)))
                let x = (CGFloat(index) * step) + ((step - barWidth) / 2)
                let bar = Path(roundedRect: CGRect(x: x, y: (size.height - height) / 2, width: barWidth, height: height), cornerRadius: barWidth / 2)
                if index < lit {
                    played.addPath(bar)
                } else {
                    unplayed.addPath(bar)
                }
            }
            context.fill(unplayed, with: .color(.white.opacity(0.22)))
            context.fill(played, with: .linearGradient(Gradient(colors: Theme.rings), startPoint: .zero, endPoint: CGPoint(x: size.width, y: 0)))
        }
    }
}

/// Back, play or pause, and on: in glass
struct Transport: View {
    var compact = false
    @Environment(Player.self) private var player
    @State private var presses = 0

    var body: some View {
        GlassEffectContainer(spacing: 18) {
            HStack(spacing: compact ? 14 : 22) {
                button("backward.fill", label: "Previous", size: compact ? 44 : 58) { player.previous() }
                Button {
                    player.togglePlayPause()
                    presses += 1
                } label: {
                    ZStack {
                        if player.isLoading {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Image(systemName: player.isPlaying ? "pause.fill" : "play.fill")
                                .font(.system(size: compact ? 26 : 34, weight: .bold))
                                .contentTransition(.symbolEffect(.replace))
                        }
                    }
                    .frame(width: compact ? 62 : 84, height: compact ? 62 : 84)
                    .foregroundStyle(.white)
                    .glassEffect(.regular.tint(Theme.pink.opacity(0.45)).interactive(), in: Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(player.isPlaying ? "Pause" : "Play")
                // (a thump for the press, not whenever the song stops or starts: the next song
                // coming on, say, or the lock screen's button)
                .sensoryFeedback(.impact(weight: .medium), trigger: presses)
                button("forward.fill", label: "Next", size: compact ? 44 : 58) { player.next() }
            }
        }
    }

    private func button(_ symbol: String, label: String, size: CGFloat, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: symbol)
                .font(.system(size: size * 0.36, weight: .semibold))
                .frame(width: size, height: size)
                .foregroundStyle(.white)
                .glassEffect(.regular.interactive(), in: Circle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(label)
    }
}

/// The record's two sides, when it has two: flip to the other one (the record glides to its speed,
/// right where it is)
private struct SideSwitch: View {
    let song: Song
    let other: Song
    @Environment(Player.self) private var player

    var body: some View {
        let sideA = song.side == "B" ? other : song
        let sideB = song.side == "B" ? song : other
        Picker("Side", selection: Binding(get: { song.id }, set: { chosen in
            if chosen != song.id {
                player.flip(to: other)
            }
        })) {
            Text("Side A · \(name(of: sideA))").tag(sideA.id)
            Text("Side B · \(name(of: sideB))").tag(sideB.id)
        }
        .pickerStyle(.segmented)
        .sensoryFeedback(.selection, trigger: song.id)
    }

    private func name(of side: Song) -> String {
        side.rate < 0.99 ? "Slowed" : "Original"
    }
}

/// The few things beside the controls, each saying what it is and what it's doing: Fold FX (on
/// iPhone Duo only), the haptics, and what's coming up next
private struct ToolsRow: View {
    @Binding var showingHaptics: Bool
    @Binding var showingQueue: Bool
    @Binding var showingFoldFX: Bool
    @Environment(Player.self) private var player
    @Environment(Library.self) private var library
    @Environment(HapticsSettings.self) private var settings
    @Environment(DuoState.self) private var duo

    var body: some View {
        HStack(spacing: 8) {
            if duo.isFoldable {
                tool(symbol: duo.foldEffect.symbol, name: "Fold FX", state: duo.foldFXStatus,
                     tint: duo.foldFX == .off ? nil : duo.foldFXTint) {
                    showingFoldFX = true
                }
            }
            if settings.isSupported {
                tool(symbol: "iphone.radiowaves.left.and.right", name: "Haptics",
                     state: settings.isOn ? "On · \(settings.strength.name)" : "Off",
                     tint: settings.isOn ? Theme.pink : nil) {
                    showingHaptics = true
                }
            }
            tool(symbol: "list.bullet", name: "Coming up", state: comingUp, tint: nil) {
                showingQueue = true
            }
        }
    }

    private var comingUp: String {
        guard let next = player.upNext.first else { return "Nothing yet" }
        return [library.code(for: next), next.title].compactMap { $0 }.joined(separator: " · ")
    }

    private func tool(symbol: String, name: String, state: String, tint: Color?, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: symbol)
                    .font(.body.weight(.semibold))
                    .foregroundStyle(tint ?? .white)
                    .frame(width: 22)
                VStack(alignment: .leading, spacing: 1) {
                    Text(name)
                        .font(.footnote.weight(.bold))
                        .foregroundStyle(.white)
                    Text(state)
                        .font(.caption2.weight(.semibold))
                        .foregroundStyle(tint ?? Color.white.opacity(0.6))
                        .lineLimit(1)
                }
                Spacer(minLength: 0)
            }
            .padding(.horizontal, 10)
            .frame(maxWidth: .infinity, minHeight: 56)
            .glassEffect(.regular.interactive(), in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(name)
        .accessibilityValue(state)
        .accessibilityAddTraits(.isButton)
    }
}

/// Two neon tubes down the sides, like a jukebox's bubble tubes: they flare up with each tap of the
/// haptics, and bubbles rise up them while the song plays
private struct NeonTubes: View {
    @Environment(Player.self) private var player
    @Environment(HapticsSettings.self) private var settings
    @Environment(HapticsConductor.self) private var conductor

    /// Room either side of a tube for its glow
    private static let room: CGFloat = 18

    var body: some View {
        TimelineView(.animation(paused: !player.isPlaying)) { context in
            let time = player.currentTime
            let tap = conductor.track?.lastTap(atOrBefore: time, beatsOnly: settings.mix == .beats)
            let since = tap.map { (time - $0.time) / max(player.rate, 0.1) } ?? 10
            let flare = settings.isActive && player.isPlaying ? max(0, 1 - (since / 0.35)) * (tap?.power ?? 0) : 0
            let clock = context.date.timeIntervalSinceReferenceDate
            let playing = player.isPlaying
            HStack {
                tube(flare: flare, clock: clock, playing: playing, seed: 0)
                Spacer()
                tube(flare: flare, clock: clock, playing: playing, seed: 1.7)
            }
            // (the tubes where they'd be without the room for their glow)
            .padding(.horizontal, -Self.room)
        }
        .allowsHitTesting(false)
        .accessibilityHidden(true)
    }

    private func tube(flare: Double, clock: Double, playing: Bool, seed: Double) -> some View {
        Canvas { context, size in
            let room = Self.room
            let tube = CGRect(x: room, y: room, width: max(1, size.width - (room * 2)), height: max(1, size.height - (room * 2)))
            let shine = 0.5 + (0.5 * flare)
            Self.glow(round: tube, reach: 6 + (10 * flare), color: Theme.lilac.opacity((0.35 + (0.5 * flare)) * shine), in: context)
            context.opacity = shine
            let shape = Path(roundedRect: tube, cornerRadius: tube.width / 2)
            context.fill(shape, with: .linearGradient(Gradient(colors: Theme.rings), startPoint: CGPoint(x: 0, y: tube.minY), endPoint: CGPoint(x: 0, y: tube.maxY)))
            guard playing else { return }
            var inside = context
            inside.clip(to: shape)
            for bubble in 0..<6 {
                let speed = 38 + (Double(bubble) * 7)
                let travel = Double(tube.height) + 20
                let rise = ((clock * speed) + (Double(bubble) * 97) + (seed * 50)).truncatingRemainder(dividingBy: travel)
                let radius = tube.width * (0.26 + (0.06 * CGFloat(bubble % 3)))
                let y = tube.maxY + 10 - CGFloat(rise)
                inside.fill(Path(ellipseIn: CGRect(x: tube.midX - radius, y: y - radius, width: radius * 2, height: radius * 2)),
                            with: .color(.white.opacity(0.75)))
            }
        }
        .frame(width: 7 + (Self.room * 2))
        .padding(.vertical, 120 - Self.room)
    }

    /// A tube's glow: a gradient out from its edge as far as `reach`, drawn rather than blurred (a
    /// blurred glow that changes with every tap is blurred afresh every frame)
    private static func glow(round tube: CGRect, reach: CGFloat, color: Color, in context: GraphicsContext) {
        let half = tube.width / 2
        let outer = half + reach
        // (how strong it is, out from the tube's middle: as strong under the tube as at its edge,
        // then fading away)
        let fade: [(out: CGFloat, strength: Double)] = [(half, 0.6), (half + (reach * 0.4), 0.22), (outer, 0)]
        // Down its sides, from the middle of one end to the middle of the other
        let sides = CGRect(x: tube.midX - outer, y: tube.minY + half, width: outer * 2, height: max(0, tube.height - tube.width))
        var across: [Gradient.Stop] = []
        for point in fade.reversed() {
            across.append(Gradient.Stop(color: color.opacity(point.strength), location: (outer - point.out) / (outer * 2)))
        }
        for point in fade {
            across.append(Gradient.Stop(color: color.opacity(point.strength), location: (outer + point.out) / (outer * 2)))
        }
        context.fill(Path(sides), with: .linearGradient(Gradient(stops: across), startPoint: CGPoint(x: sides.minX, y: 0),
                                                        endPoint: CGPoint(x: sides.maxX, y: 0)))
        // Round each end
        let around = [Gradient.Stop(color: color.opacity(0.6), location: 0)] + fade.map { point in
            Gradient.Stop(color: color.opacity(point.strength), location: point.out / outer)
        }
        for (end, above) in [(CGPoint(x: tube.midX, y: tube.minY + half), true), (CGPoint(x: tube.midX, y: tube.maxY - half), false)] {
            var cap = context
            cap.clip(to: Path(CGRect(x: end.x - outer, y: above ? end.y - outer : end.y, width: outer * 2, height: outer)))
            cap.fill(Path(ellipseIn: CGRect(x: end.x - outer, y: end.y - outer, width: outer * 2, height: outer * 2)),
                     with: .radialGradient(Gradient(stops: around), center: end, startRadius: 0, endRadius: outer))
        }
    }
}

/// Where the sound goes (AirPlay, Bluetooth...)
private struct AirPlayButton: UIViewRepresentable {
    func makeUIView(context: Context) -> AVRoutePickerView {
        let picker = AVRoutePickerView()
        picker.tintColor = .white
        picker.activeTintColor = UIColor(Theme.pink)
        picker.prioritizesVideoDevices = false
        return picker
    }

    func updateUIView(_ view: AVRoutePickerView, context: Context) {}
}

/// What's coming up after this one, with each record's code, and the two ways of going on: shuffle,
/// and repeat (all the songs, or just this one)
private struct UpNextSheet: View {
    @Environment(Player.self) private var player
    @Environment(Library.self) private var library
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section {
                    HStack(spacing: 10) {
                        mode(symbol: "shuffle", name: "Shuffle", state: player.shuffle ? "On" : "Off", on: player.shuffle) {
                            player.shuffle.toggle()
                        }
                        mode(symbol: player.repeatMode == .one ? "repeat.1" : "repeat", name: "Repeat", state: repeatName,
                             on: player.repeatMode != .off) {
                            player.repeatMode = player.repeatMode.next
                        }
                    }
                    .listRowInsets(EdgeInsets())
                    .listRowBackground(Color.clear)
                }
                Section("Coming up") {
                    if player.upNext.isEmpty {
                        Text("Nothing after this one.")
                            .foregroundStyle(.secondary)
                    }
                    ForEach(Array(player.upNext.enumerated()), id: \.offset) { _, song in
                        HStack(spacing: 12) {
                            Artwork(song: song, cornerRadius: 8)
                                .frame(width: 44, height: 44)
                            VStack(alignment: .leading) {
                                Text(song.title)
                                    .font(.body.weight(.semibold))
                                Text(song.subtitle)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                            if let code = library.code(for: song) {
                                Text(code)
                                    .font(.system(size: 12, weight: .heavy, design: .monospaced))
                                    .foregroundStyle(Theme.sky)
                            }
                        }
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .nightSky(glow: false)
            .navigationTitle("Up Next")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
            .sensoryFeedback(.selection, trigger: player.shuffle)
            .sensoryFeedback(.selection, trigger: player.repeatMode)
        }
        .presentationDetents([.medium, .large])
        .preferredColorScheme(.dark)
    }

    private var repeatName: String {
        switch player.repeatMode {
        case .off: "Off"
        case .all: "All songs"
        case .one: "This song"
        }
    }

    private func mode(symbol: String, name: String, state: String, on: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: symbol)
                    .font(.body.weight(.bold))
                    .foregroundStyle(on ? Theme.ink : .white)
                    .frame(width: 36, height: 36)
                    .background(on ? Theme.pink : Color.white.opacity(0.12), in: Circle())
                VStack(alignment: .leading, spacing: 1) {
                    Text(name)
                        .font(.headline)
                        .foregroundStyle(.white)
                    Text(state)
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(on ? Theme.pink : Color.white.opacity(0.6))
                }
                Spacer(minLength: 0)
            }
            .padding(.horizontal, 14)
            .frame(maxWidth: .infinity, minHeight: 64)
            .glassEffect(.regular.interactive(), in: RoundedRectangle(cornerRadius: 20, style: .continuous))
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(name)
        .accessibilityValue(state)
        .accessibilityAddTraits(on ? [.isButton, .isSelected] : .isButton)
    }
}
