import SwiftUI

/// Fold FX's rack (iPhone Duo): how far in the sound is, as a needle from open to folded with the
/// hinge's angle under it; off, live (following the hinge) or locked where it is; and the six sounds
/// to pick from, each saying what folding does
struct FoldFXRack: View {
    @Environment(DuoState.self) private var duo
    @Environment(Player.self) private var player

    private enum Mode: Hashable {
        case off, live, locked
    }

    private var mode: Mode {
        switch duo.foldFX {
        case .off: .off
        case .live: .live
        case .locked: .locked
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                FoldGauge(amount: duo.foldFXAmount, detail: detail, tint: duo.foldFX == .off ? .white : duo.foldFXTint)
                    // (it swings round when it's turned on, off or locked; following the hinge it
                    // just moves with it, many times a second, not easing after it each time)
                    .animation(.snappy, value: mode)
                Picker("Fold FX", selection: Binding(get: { mode }, set: { choose($0) })) {
                    Text("Off").tag(Mode.off)
                    Text("Live").tag(Mode.live)
                    Label("Lock", systemImage: "lock.fill").tag(Mode.locked)
                }
                .pickerStyle(.segmented)
                Text("Sounds")
                    .font(.title3.weight(.heavy))
                    .fontDesign(.rounded)
                    .padding(.top, 4)
                LazyVGrid(columns: [GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10)], spacing: 10) {
                    ForEach(Player.FoldEffect.allCases) { effect in
                        SoundTile(effect: effect, isOn: duo.foldEffect == effect) {
                            duo.choose(effect)
                            if duo.foldFX == .off {
                                duo.foldFX = .live
                            }
                            player.follow(duo)
                        }
                    }
                }
            }
            .padding(20)
        }
        .scrollIndicators(.hidden)
        .nightSky(glow: false)
        .navigationTitle("Fold FX")
        .sensoryFeedback(.selection, trigger: duo.foldEffect)
        .sensoryFeedback(.selection, trigger: duo.foldFX)
    }

    private var detail: String {
        switch duo.foldFX {
        case .off:
            return "Off: pick a sound to go live"
        case .locked:
            return "Locked: stays put, open or closed"
        case .live:
            return duo.hinge == .partiallyOpen ? "Hinge at \(Int(duo.angle.rounded()))°" : "Fold the phone to bring it in"
        }
    }

    private func choose(_ mode: Mode) {
        switch mode {
        case .off:
            duo.foldFX = .off
        case .live:
            duo.foldFX = .live
        case .locked:
            duo.foldFX = .locked(duo.heldOpenness)
        }
        player.follow(duo)
    }
}

/// How far in the sound is: a needle sweeping an arc from open (left) to folded (right)
private struct FoldGauge: View {
    let amount: Double
    let detail: String
    let tint: Color

    var body: some View {
        VStack(spacing: 4) {
            ZStack(alignment: .bottom) {
                GaugeArc(progress: 1)
                    .stroke(.white.opacity(0.12), style: StrokeStyle(lineWidth: 14, lineCap: .round))
                GaugeArc(progress: amount)
                    .stroke(LinearGradient(colors: [Theme.sky, Theme.lilac, Theme.pink], startPoint: .leading, endPoint: .trailing),
                            style: StrokeStyle(lineWidth: 14, lineCap: .round))
                    .shadow(color: Theme.sky.opacity(0.6), radius: 8)
                VStack(spacing: 2) {
                    Text("\(Int((amount * 100).rounded()))%")
                        .font(.system(size: 42, weight: .heavy, design: .rounded))
                        .foregroundStyle(tint)
                        .contentTransition(.numericText())
                    Text(detail)
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                        .minimumScaleFactor(0.8)
                }
                .padding(.bottom, 2)
            }
            .frame(height: 150)
            HStack {
                Text("Open")
                Spacer()
                Text("Folded")
            }
            .font(.caption.weight(.semibold))
            .foregroundStyle(.secondary)
        }
        .padding(18)
        .glassEffect(.regular, in: RoundedRectangle(cornerRadius: 26, style: .continuous))
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Fold FX: \(Int((amount * 100).rounded())) percent. \(detail)")
    }
}

/// The top half of a circle, drawn from its left end round as far as `progress` (0 to 1) goes
private struct GaugeArc: Shape {
    var progress: Double

    var animatableData: Double {
        get { progress }
        set { progress = newValue }
    }

    func path(in rect: CGRect) -> Path {
        let radius = min(rect.width / 2, rect.height) - 10
        let center = CGPoint(x: rect.midX, y: rect.maxY - 6)
        let shown = min(max(progress, 0), 1)
        var path = Path()
        let steps = 72
        for step in 0...steps {
            let angle = Double.pi + (Double.pi * shown * Double(step) / Double(steps))
            let point = CGPoint(x: center.x + (radius * CGFloat(cos(angle))), y: center.y + (radius * CGFloat(sin(angle))))
            if step == 0 {
                path.move(to: point)
            } else {
                path.addLine(to: point)
            }
        }
        return path
    }
}

/// One of the sounds: its symbol, name and what folding does, lit up when it's the one that's on
private struct SoundTile: View {
    let effect: Player.FoldEffect
    let isOn: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Image(systemName: effect.symbol)
                        .font(.title2.weight(.semibold))
                        .foregroundStyle(effect.tint)
                    Spacer()
                    if isOn {
                        Text("ON")
                            .font(.caption2.weight(.black))
                            .foregroundStyle(Theme.ink)
                            .padding(.horizontal, 7)
                            .padding(.vertical, 3)
                            .background(effect.tint, in: Capsule())
                    }
                }
                Text(effect.name)
                    .font(.headline)
                Text(effect.blurb)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2, reservesSpace: true)
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(isOn ? effect.tint.opacity(0.16) : .white.opacity(0.06),
                        in: RoundedRectangle(cornerRadius: 20, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 20, style: .continuous)
                    .strokeBorder(isOn ? effect.tint.opacity(0.65) : .white.opacity(0.12), lineWidth: 1)
            }
            .shadow(color: effect.tint.opacity(isOn ? 0.3 : 0), radius: isOn ? 12 : 0)
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(isOn ? .isSelected : [])
    }
}
