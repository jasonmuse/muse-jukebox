import AVKit
import SwiftUI

/// The song that's on: its sleeve with the record sliding out of it and spinning as it plays (rings
/// pulsing out behind with every haptic tap), its wave to scrub along, and the controls. On iPhone
/// Duo propped up like a laptop it's the stage: just the record and the song, big enough to see from
/// across the room, while the controls go on the half that's lying flat.
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

    var body: some View {
        ZStack {
            Backdrop(image: player.artwork)
            if let song = player.song {
                GeometryReader { geometry in
                    let wide = geometry.size.width > geometry.size.height * 1.1
                    let layout = wide ? AnyLayout(HStackLayout(spacing: 28)) : AnyLayout(VStackLayout(spacing: 22))
                    layout {
                        RecordDeck(song: song)
                            .frame(maxWidth: style == .stage ? .infinity : 470, maxHeight: style == .stage ? .infinity : 330)
                        if style != .stage {
                            VStack(spacing: 20) {
                                SongHeading(song: song)
                                Scrubber()
                                Transport()
                                ExtraControls(showingHaptics: $showingHaptics, showingQueue: $showingQueue)
                            }
                            .frame(maxWidth: 460)
                        } else {
                            SongHeading(song: song, large: true)
                        }
                    }
                    .padding(.horizontal, 24)
                    .padding(.vertical, style == .sheet ? 36 : 20)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
            } else {
                ContentUnavailableView("Nothing's playing", systemImage: "opticaldisc", description: Text("Pick a song and it'll spin here."))
            }
        }
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showingHaptics) {
            HapticsSheet()
        }
        .sheet(isPresented: $showingQueue) {
            UpNextSheet()
        }
    }
}

/// The cover, big and blurred, glowing behind everything
private struct Backdrop: View {
    let image: UIImage?

    var body: some View {
        ZStack {
            Theme.backdrop
            if let image {
                Image(uiImage: image.images?.first ?? image)
                    .resizable()
                    .scaledToFill()
                    .blur(radius: 70)
                    .saturation(1.5)
                    .opacity(0.55)
                    .transition(.opacity)
            }
            LinearGradient(colors: [.black.opacity(0.15), .black.opacity(0.65)], startPoint: .top, endPoint: .bottom)
        }
        .ignoresSafeArea()
        .animation(.easeInOut(duration: 0.6), value: image)
    }
}

/// The sleeve, with the record sliding out of it and spinning while the song plays (and tucked away
/// again when it's paused), and the haptics' rings pulsing out behind
private struct RecordDeck: View {
    let song: Song
    @Environment(Player.self) private var player

    var body: some View {
        GeometryReader { geometry in
            let side = min(geometry.size.width / 1.45, geometry.size.height)
            ZStack {
                HapticPulse()
                    .frame(width: side * 1.1, height: side * 1.1)
                    .offset(x: side * 0.085)
                SpinningRecord(song: song)
                    .frame(width: side * 0.96, height: side * 0.96)
                    .offset(x: player.isPlaying ? side * 0.235 : -side * 0.005)
                    .animation(.spring(response: 0.7, dampingFraction: 0.78), value: player.isPlaying)
                Artwork(song: song, size: .large, animated: true, cornerRadius: side * 0.06)
                    .frame(width: side, height: side)
                    .shadow(color: .black.opacity(0.5), radius: 24, x: 8, y: 14)
                    .offset(x: -side * 0.215)
                    .scaleEffect(player.isPlaying ? 1 : 0.96)
                    .animation(.spring(response: 0.5, dampingFraction: 0.8), value: player.isPlaying)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .aspectRatio(1.45, contentMode: .fit)
    }
}

/// The record, turning at 33⅓ with the song (slower for a slowed side, still when it's paused), with a
/// sheen that stays where it is as the record turns under it
private struct SpinningRecord: View {
    let song: Song
    @Environment(Player.self) private var player

    var body: some View {
        TimelineView(.animation(paused: !player.isPlaying)) { _ in
            VinylRecord(song: song)
                .rotationEffect(.degrees(player.currentTime * 200))
        }
        .overlay {
            AngularGradient(colors: [.clear, .white.opacity(0.13), .clear, .clear, .white.opacity(0.08), .clear, .clear], center: .center)
                .clipShape(Circle())
                .blendMode(.screen)
                .allowsHitTesting(false)
        }
    }
}

/// A black record with fine grooves, and the cover for a label
struct VinylRecord: View {
    let song: Song

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
            .shadow(color: .black.opacity(0.55), radius: 18, y: 10)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
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

/// The song's wave: played part lit up, drag along it to move about the song
struct Scrubber: View {
    @Environment(Player.self) private var player
    @State private var dragging: Double?

    var body: some View {
        VStack(spacing: 6) {
            GeometryReader { geometry in
                TimelineView(.animation(paused: !player.isPlaying || dragging != nil)) { _ in
                    WaveformBars(levels: player.song?.waveform ?? [], progress: dragging ?? player.progress)
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

/// The wave's bars: a mirror of how loud the song is along the way
struct WaveformBars: View {
    let levels: [Double]
    let progress: Double

    var body: some View {
        Canvas { context, size in
            let shown = levels.isEmpty ? Array(repeating: 0.3, count: 64) : levels
            let count = shown.count
            let step = size.width / CGFloat(count)
            let barWidth = max(1.5, step * 0.62)
            var played = Path()
            var unplayed = Path()
            for (index, level) in shown.enumerated() {
                let height = max(3, size.height * (0.12 + (0.88 * level)))
                let x = (CGFloat(index) * step) + ((step - barWidth) / 2)
                let bar = Path(roundedRect: CGRect(x: x, y: (size.height - height) / 2, width: barWidth, height: height), cornerRadius: barWidth / 2)
                if (Double(index) + 0.5) / Double(count) <= progress {
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

    var body: some View {
        GlassEffectContainer(spacing: 18) {
            HStack(spacing: compact ? 14 : 22) {
                button("backward.fill", label: "Previous", size: compact ? 44 : 58) { player.previous() }
                Button {
                    player.togglePlayPause()
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
                .sensoryFeedback(.impact(weight: .medium), trigger: player.isPlaying)
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

/// Shuffle, repeat, the other side, the haptics, what's next, and where the sound goes
private struct ExtraControls: View {
    @Binding var showingHaptics: Bool
    @Binding var showingQueue: Bool
    @Environment(Player.self) private var player
    @Environment(Library.self) private var library
    @Environment(HapticsSettings.self) private var settings
    @Environment(DuoState.self) private var duo

    var body: some View {
        HStack(spacing: 6) {
            toggle(player.shuffle ? "shuffle.circle.fill" : "shuffle", label: "Shuffle", on: player.shuffle) {
                player.shuffle.toggle()
            }
            toggle(repeatSymbol, label: "Repeat", on: player.repeatMode != .off) {
                player.repeatMode = player.repeatMode.next
            }
            if let song = player.song, let otherID = song.otherSide, let other = library.song(id: otherID) {
                Button {
                    player.flip(to: other)
                } label: {
                    Text(song.side == "B" ? "A" : "B")
                        .font(.system(size: 15, weight: .heavy, design: .rounded))
                        .frame(width: 44, height: 44)
                        .glassEffect(.regular.interactive(), in: Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Flip to side \(song.side == "B" ? "A" : "B")")
            }
            if duo.isFoldable {
                toggle("dial.medium.fill", label: "Fold FX", on: duo.foldFXOn) {
                    duo.foldFXOn.toggle()
                    player.setFilterOpenness(duo.foldFXOn ? duo.foldFXOpenness : 1)
                }
            }
            if settings.isSupported {
                Button {
                    showingHaptics = true
                } label: {
                    StrengthRings(strength: settings.strength, lit: settings.isOn)
                        .frame(width: 22, height: 22)
                        .frame(width: 44, height: 44)
                        .glassEffect(.regular.interactive(), in: Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Music Haptics")
            }
            toggle("list.bullet", label: "Up Next", on: false) {
                showingQueue = true
            }
            AirPlayButton()
                .frame(width: 44, height: 44)
                .glassEffect(.regular.interactive(), in: Circle())
        }
        .font(.system(size: 17, weight: .semibold))
        .foregroundStyle(.white)
    }

    private var repeatSymbol: String {
        player.repeatMode == .one ? "repeat.1" : "repeat"
    }

    private func toggle(_ symbol: String, label: String, on: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: symbol)
                .frame(width: 44, height: 44)
                .foregroundStyle(on ? Theme.pink : .white)
                .glassEffect(.regular.interactive(), in: Circle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(label)
        .accessibilityAddTraits(on ? .isSelected : [])
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

/// What's playing after this one
private struct UpNextSheet: View {
    @Environment(Player.self) private var player
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
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
                    }
                }
            }
            .navigationTitle("Up Next")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }
}
