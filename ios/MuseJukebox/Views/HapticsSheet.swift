import SwiftUI

/// The haptics' settings, laid out like iOS's own Music Haptics page: the switch, a sample to feel,
/// the full mix or just the beats, and how hard, picked from three tiles of rings
struct HapticsSheet: View {
    @Environment(HapticsSettings.self) private var settings
    @Environment(HapticsConductor.self) private var conductor
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        @Bindable var settings = settings
        NavigationStack {
            Form {
                Section {
                    Toggle("Music Haptics", isOn: $settings.isOn)
                        .tint(Theme.pink)
                } footer: {
                    Text("Your iPhone taps along to every song: harder where it's loud, a deep thud for a kick, a crisp tick for a snare. It follows Music Haptics in Settings › Accessibility, and this switch changes it in between.")
                }

                if settings.isOn {
                    Section {
                        Button(conductor.isPlayingSample ? "Stop Sample" : "Play Sample") {
                            if conductor.isPlayingSample {
                                conductor.stopSample()
                            } else {
                                conductor.playSample()
                            }
                        }
                    }

                    Section {
                        Picker("Customize", selection: $settings.mix) {
                            ForEach(HapticsSettings.Mix.allCases) { mix in
                                Text(mix.name).tag(mix)
                            }
                        }
                        .pickerStyle(.inline)
                        .labelsHidden()
                    } header: {
                        Text("Customize")
                    } footer: {
                        Text(settings.mix.detail)
                    }

                    Section("Intensity") {
                        HStack(spacing: 12) {
                            ForEach(HapticsSettings.Strength.allCases) { strength in
                                IntensityTile(strength: strength, selected: settings.strength == strength) {
                                    settings.strength = strength
                                    conductor.playSample()
                                }
                            }
                        }
                        .padding(.vertical, 6)
                        .listRowBackground(Color.clear)
                        .listRowInsets(EdgeInsets())
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .nightBackdrop()
            .navigationTitle("Music Haptics")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        conductor.stopSample()
                        dismiss()
                    }
                }
            }
            .animation(.default, value: settings.isOn)
        }
        .presentationDetents([.medium, .large])
        .preferredColorScheme(.dark)
        .onDisappear {
            conductor.stopSample()
        }
    }
}

/// One of the three strengths: a tile of rings, more of them lit the harder it is
private struct IntensityTile: View {
    let strength: HapticsSettings.Strength
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 10) {
                StrengthRings(strength: strength, lit: selected, showsAll: false)
                    .frame(width: 58, height: 58)
                    .frame(maxWidth: .infinity)
                    .aspectRatio(1, contentMode: .fit)
                    .padding(12)
                    .background(RoundedRectangle(cornerRadius: 18, style: .continuous).fill(.white.opacity(selected ? 0.12 : 0.06)))
                Text(strength.name)
                    .font(.subheadline.weight(.semibold))
                    .padding(.horizontal, 12)
                    .padding(.vertical, 5)
                    .foregroundStyle(selected ? Theme.ink : .primary)
                    .background {
                        if selected {
                            Capsule().fill(Theme.glow)
                        }
                    }
            }
        }
        .buttonStyle(.plain)
        .accessibilityLabel(strength.name)
        .accessibilityAddTraits(selected ? .isSelected : [])
        .sensoryFeedback(.selection, trigger: selected)
    }
}

/// Rings like a tap spreading out: one for light, two for medium, three for strong (lit pink, lilac
/// and sky blue)
struct StrengthRings: View {
    let strength: HapticsSettings.Strength
    var lit = true
    /// Show all three, the ones above the strength faint (otherwise only the strength's own)
    var showsAll = true

    var body: some View {
        GeometryReader { geometry in
            let size = min(geometry.size.width, geometry.size.height)
            ZStack {
                ForEach(0..<3, id: \.self) { ring in
                    if showsAll || ring < strength.rings {
                        Circle()
                            .stroke(ring < strength.rings && lit ? Theme.rings[ring] : Color.white.opacity(ring < strength.rings ? 0.55 : 0.2),
                                    lineWidth: max(1.5, size * 0.06))
                            .frame(width: size * (0.3 + (0.35 * Double(ring))), height: size * (0.3 + (0.35 * Double(ring))))
                    }
                }
            }
            .frame(width: size, height: size)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }
}

/// Rings pulsing out with every tap of the song's haptic track, so the taps can be seen as well as felt
struct HapticPulse: View {
    @Environment(Player.self) private var player
    @Environment(HapticsSettings.self) private var settings
    @Environment(HapticsConductor.self) private var conductor

    var body: some View {
        TimelineView(.animation(paused: !player.isPlaying || !settings.isActive)) { _ in
            let time = player.currentTime
            let tap = conductor.track?.lastTap(atOrBefore: time, beatsOnly: settings.mix == .beats)
            let since = tap.map { (time - $0.time) / max(player.rate, 0.1) } ?? 10
            let strength = (tap?.power ?? 0) * (0.35 + (0.65 * player.filterOpenness))
            let showing = settings.isActive && player.isPlaying && since < 0.9
            Canvas { context, size in
                guard showing else { return }
                let center = CGPoint(x: size.width / 2, y: size.height / 2)
                let largest = min(size.width, size.height) / 2
                for ring in 0..<3 {
                    let along = min(1, max(0, (since - (Double(ring) * 0.07)) / 0.75))
                    guard along > 0 else { continue }
                    let radius = largest * (0.55 + (0.45 * along))
                    let fade = (1 - along) * strength
                    let circle = Path(ellipseIn: CGRect(x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2))
                    context.stroke(circle, with: .color(Theme.rings[ring].opacity(fade * 0.9)), lineWidth: 2 + (6 * fade))
                }
            }
        }
        .allowsHitTesting(false)
    }
}
