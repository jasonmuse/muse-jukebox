import SwiftUI

/// Jukebot, the robot who lives in the back of the jukebox. His settings live here (the haptics, and
/// Fold FX's sound on iPhone Duo), with links to the rest of Muse; his repair game is on its way.
struct JukebotView: View {
    @Environment(HapticsSettings.self) private var settings
    @Environment(HapticsConductor.self) private var conductor
    @Environment(DuoState.self) private var duo

    var body: some View {
        @Bindable var settings = settings
        NavigationStack {
            List {
                Section {
                    JukebotCard()
                        .listRowInsets(EdgeInsets())
                        .listRowBackground(Color.clear)
                }

                if settings.isSupported {
                    Section {
                        Toggle("Music Haptics", isOn: $settings.isOn)
                            .tint(Theme.pink)
                        if settings.isOn {
                            Picker("Intensity", selection: $settings.strength) {
                                ForEach(HapticsSettings.Strength.allCases) { strength in
                                    Text(strength.name).tag(strength)
                                }
                            }
                            Picker("Taps", selection: $settings.mix) {
                                ForEach(HapticsSettings.Mix.allCases) { mix in
                                    Text(mix.name).tag(mix)
                                }
                            }
                            Button(conductor.isPlayingSample ? "Stop the Sample" : "Feel a Sample") {
                                if conductor.isPlayingSample {
                                    conductor.stopSample()
                                } else {
                                    conductor.playSample()
                                }
                            }
                        }
                    } header: {
                        Text("Haptics")
                    } footer: {
                        Text("Your iPhone taps along to every song: harder where it's loud, a deep thud for a kick, a crisp tick for a snare. It follows Music Haptics in Settings › Accessibility.")
                    }
                }

                if duo.isFoldable {
                    Section {
                        NavigationLink {
                            FoldFXRack()
                        } label: {
                            LabeledContent("Fold FX sound", value: duo.foldEffect.name)
                        }
                    } header: {
                        Text("iPhone Duo")
                    } footer: {
                        Text("Fold the phone to bring the sound in over the music.")
                    }
                }

                Section("Muse") {
                    Link(destination: URL(string: "https://muse-jukebox.pages.dev")!) {
                        Label("The jukebox on the web", systemImage: "globe")
                    }
                    Link(destination: URL(string: "https://amused.itch.io/frog-quest")!) {
                        Label("Frog Quest", systemImage: "gamecontroller")
                    }
                    Link(destination: URL(string: "https://ko-fi.com/jasonmuse")!) {
                        Label("Buy me a coffee", systemImage: "cup.and.saucer")
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .nightSky()
            .navigationTitle("Jukebot")
            .animation(.default, value: settings.isOn)
            .onDisappear {
                conductor.stopSample()
            }
        }
    }
}

/// Jukebot himself: his glitching face, what he has to say, and the six steps of his repair job
private struct JukebotCard: View {
    private let steps = ["screwdriver", "ladybug", "bolt", "memorychip", "crown", "checkmark"]

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 14) {
                JukebotFace()
                    .frame(width: 96, height: 82)
                VStack(alignment: .leading, spacing: 4) {
                    Text("Bugs got in my wiring again…")
                        .font(.headline)
                    Text("My repair job's coming in the next update. Every screw, squish and spark will buzz in your hand.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            HStack(spacing: 6) {
                ForEach(steps, id: \.self) { symbol in
                    Image(systemName: symbol)
                        .font(.caption.weight(.bold))
                        .foregroundStyle(.white.opacity(0.6))
                        .frame(width: 30, height: 30)
                        .background(.white.opacity(0.1), in: Circle())
                }
                Spacer(minLength: 0)
                Text("6 steps to fix")
                    .font(.caption.weight(.bold))
                    .foregroundStyle(.secondary)
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel("Repair job: 6 steps, coming soon")
        }
        .padding(18)
        .glassEffect(.regular, in: RoundedRectangle(cornerRadius: 26, style: .continuous))
        .padding(.vertical, 4)
    }
}

/// Jukebot's face on his little screen: red crosses for eyes and a wobbly mouth, while he's broken
struct JukebotFace: View {
    var body: some View {
        Canvas { context, size in
            let width = size.width
            let height = size.height
            let screen = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: min(width, height) * 0.22)
            context.fill(screen, with: .linearGradient(
                Gradient(colors: [Color(red: 0.086, green: 0.125, blue: 0.227), Color(red: 0.027, green: 0.043, blue: 0.086)]),
                startPoint: .zero, endPoint: CGPoint(x: 0, y: height)))
            context.stroke(screen, with: .color(Color(red: 0.24, green: 0.2, blue: 0.44)), lineWidth: 4)

            let red = Color(red: 1, green: 0.3, blue: 0.43)
            let reach = min(width, height) * 0.11
            for centerX in [width * 0.32, width * 0.68] {
                let centerY = height * 0.38
                var cross = Path()
                cross.move(to: CGPoint(x: centerX - reach, y: centerY - reach))
                cross.addLine(to: CGPoint(x: centerX + reach, y: centerY + reach))
                cross.move(to: CGPoint(x: centerX + reach, y: centerY - reach))
                cross.addLine(to: CGPoint(x: centerX - reach, y: centerY + reach))
                context.stroke(cross, with: .color(red), style: StrokeStyle(lineWidth: 4.5, lineCap: .square))
            }

            var mouth = Path()
            let mouthY = height * 0.72
            mouth.move(to: CGPoint(x: width * 0.25, y: mouthY))
            for step in 1...6 {
                let x = width * 0.25 + (width * 0.5 * CGFloat(step) / 6)
                let y = step % 2 == 0 ? mouthY : mouthY - (height * 0.07)
                mouth.addLine(to: CGPoint(x: x, y: y))
            }
            context.stroke(mouth, with: .color(Theme.pink), style: StrokeStyle(lineWidth: 3.5, lineJoin: .miter))
        }
        .shadow(color: Color(red: 1, green: 0.3, blue: 0.43).opacity(0.3), radius: 12)
        .accessibilityHidden(true)
    }
}
