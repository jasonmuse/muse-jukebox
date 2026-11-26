import AVKit
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

/// The cover, big and blurred, glowing behind everything
private struct Backdrop: View {
    let image: UIImage?

    var body: some View {
        Theme.backdrop
            .overlay {
                if let image {
                    Image(uiImage: image.images?.first ?? image)
                        .resizable()
                        .scaledToFill()
                        .blur(radius: 70)
                        .saturation(1.5)
                        .opacity(0.55)
                        .transition(.opacity)
                }
            }
            .overlay {
                LinearGradient(colors: [.black.opacity(0.15), .black.opacity(0.65)], startPoint: .top, endPoint: .bottom)
            }
            .clipped()
            .ignoresSafeArea()
            .animation(.easeInOut(duration: 0.6), value: image)
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
/// sheen that stays where it is as the record turns under it
struct SpinningRecord: View {
    let song: Song
    var shadowed = true
    @Environment(Player.self) private var player

    var body: some View {
        TimelineView(.animation(paused: !player.isPlaying)) { _ in
            VinylRecord(song: song, shadowed: shadowed)
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
            .shadow(color: .black.opacity(shadowed ? 0.55 : 0), radius: shadowed ? 18 : 0, y: shadowed ? 10 : 0)
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

/// The wave's bars: a mirror of how loud the song is along the way, drawn as the site draws it
struct WaveformBars: View {
    let levels: [Double]
    let progress: Double

    var body: some View {
        Canvas { context, size in
            let shown = levels.isEmpty ? Array(repeating: 0.62, count: 64) : levels
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
        }
        .allowsHitTesting(false)
        .accessibilityHidden(true)
    }

    private func tube(flare: Double, clock: Double, playing: Bool, seed: Double) -> some View {
        Canvas { context, size in
            let shape = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: size.width / 2)
            context.fill(shape, with: .linearGradient(Gradient(colors: Theme.rings), startPoint: .zero, endPoint: CGPoint(x: 0, y: size.height)))
            guard playing else { return }
            for bubble in 0..<6 {
                let speed = 38 + (Double(bubble) * 7)
                let travel = Double(size.height) + 20
                let rise = ((clock * speed) + (Double(bubble) * 97) + (seed * 50)).truncatingRemainder(dividingBy: travel)
                let radius = size.width * (0.26 + (0.06 * CGFloat(bubble % 3)))
                let y = size.height + 10 - CGFloat(rise)
                context.fill(Path(ellipseIn: CGRect(x: (size.width / 2) - radius, y: y - radius, width: radius * 2, height: radius * 2)),
                             with: .color(.white.opacity(0.75)))
            }
        }
        .frame(width: 7)
        .opacity(0.5 + (0.5 * flare))
        .shadow(color: Theme.lilac.opacity(0.35 + (0.5 * flare)), radius: 6 + (10 * flare))
        .padding(.vertical, 120)
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
