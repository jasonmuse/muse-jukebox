import SwiftUI

/// The selector: punch in a record's code, like on a real jukebox. A letter for the row, a number for
/// the record, and its name lights up on the display; then play it, or line it up to play next. Every
/// key clicks under your finger.
struct SelectorView: View {
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player
    @State private var letter: String?
    @State private var number = ""
    @State private var presses = 0

    private var code: String {
        (letter ?? "") + number
    }

    private var row: JukeboxRow? {
        library.rows.first { $0.letter == letter }
    }

    private var song: Song? {
        number.isEmpty ? nil : library.song(atCode: code)
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    display
                    letterKeys
                    numberKeys
                        .padding(.top, 4)
                    actions
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 28)
            }
            .scrollIndicators(.hidden)
            .nightSky()
            .navigationTitle("Selector")
            .sensoryFeedback(.impact(flexibility: .rigid, intensity: 0.8), trigger: presses)
        }
    }

    // MARK: - The display

    private var display: some View {
        HStack(alignment: .center, spacing: 14) {
            VStack(alignment: .leading, spacing: 4) {
                LEDText(text: "Selection", color: Brand.amber.opacity(0.7), size: 10)
                HStack(spacing: 6) {
                    Text(code.isEmpty ? "––" : code)
                        .font(.system(size: 48, weight: .heavy, design: .monospaced))
                        .foregroundStyle(Brand.amber)
                        .shadow(color: Brand.amber.opacity(0.9), radius: 8)
                        .contentTransition(.numericText())
                    TimelineView(.periodic(from: .now, by: 0.5)) { context in
                        let lit = Int(context.date.timeIntervalSinceReferenceDate * 2) % 2 == 0
                        Rectangle()
                            .fill(Brand.amber)
                            .frame(width: 4, height: 40)
                            .opacity(lit ? 0.9 : 0)
                            .shadow(color: Brand.amber, radius: 6)
                    }
                }
            }
            Spacer(minLength: 8)
            if let song {
                VStack(alignment: .trailing, spacing: 4) {
                    Artwork(song: song, cornerRadius: 12)
                        .frame(width: 54, height: 54)
                    Text(song.title)
                        .font(.headline)
                        .lineLimit(1)
                    Text(song.subtitle)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
                .transition(.opacity.combined(with: .scale(scale: 0.95)))
            } else {
                Text(hint)
                    .font(.footnote.weight(.medium))
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.trailing)
            }
        }
        .padding(18)
        .frame(minHeight: 118)
        .background {
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .fill(LinearGradient(colors: [Color(red: 0.04, green: 0.035, blue: 0.07), Color(red: 0.07, green: 0.063, blue: 0.13)],
                                     startPoint: .top, endPoint: .bottom))
        }
        .overlay {
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .strokeBorder(Brand.amber.opacity(0.3), lineWidth: 1)
        }
        .shadow(color: Brand.amber.opacity(0.18), radius: 18)
        .animation(.snappy, value: code)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(song.map { "\(code): \($0.title)" } ?? (code.isEmpty ? "No selection" : "Selection \(code)"))
    }

    private var hint: String {
        guard let row else { return "Pick a row,\nthen a number" }
        if number.isEmpty {
            return "\(row.name)\n1 to \(row.songs.count)"
        }
        return "Nothing at \(code)"
    }

    // MARK: - The keys

    private var letterKeys: some View {
        LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 5), spacing: 8) {
            ForEach(library.rows) { row in
                let chosen = letter == row.letter
                Button {
                    letter = row.letter
                    number = ""
                    presses += 1
                } label: {
                    VStack(spacing: 3) {
                        Text(row.letter)
                            .font(.system(size: 20, weight: .heavy, design: .monospaced))
                        Text(row.name)
                            .font(.system(size: 9, weight: .semibold))
                            .lineLimit(1)
                            .minimumScaleFactor(0.7)
                            .foregroundStyle(chosen ? row.tint : .secondary)
                    }
                    .foregroundStyle(chosen ? row.tint : .white)
                    .frame(maxWidth: .infinity, minHeight: 56)
                    .background(chosen ? row.tint.opacity(0.18) : .white.opacity(0.07),
                                in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                    .overlay {
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .strokeBorder(chosen ? row.tint.opacity(0.7) : .white.opacity(0.14), lineWidth: 1)
                    }
                    .shadow(color: chosen ? row.tint.opacity(0.45) : .clear, radius: 10)
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Row \(row.letter), \(row.name)")
                .accessibilityAddTraits(chosen ? .isSelected : [])
            }
        }
    }

    private var numberKeys: some View {
        LazyVGrid(columns: Array(repeating: GridItem(.fixed(76), spacing: 22), count: 3), spacing: 14) {
            ForEach(["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "🎲"], id: \.self) { key in
                Button {
                    press(key)
                } label: {
                    Group {
                        switch key {
                        case "⌫":
                            Image(systemName: "delete.left")
                                .font(.title2.weight(.medium))
                        case "🎲":
                            Image(systemName: "die.face.5")
                                .font(.title2.weight(.medium))
                        default:
                            Text(key)
                                .font(.system(size: 32, weight: .regular, design: .rounded))
                        }
                    }
                    .foregroundStyle(.white)
                    .frame(width: 70, height: 70)
                    .glassEffect(.regular.interactive(), in: Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(key == "⌫" ? "Delete" : key == "🎲" ? "Surprise me" : key)
            }
        }
    }

    private func press(_ key: String) {
        presses += 1
        switch key {
        case "⌫":
            if !number.isEmpty {
                number.removeLast()
            } else {
                letter = nil
            }
        case "🎲":
            guard let row = library.rows.randomElement(), !row.songs.isEmpty else { return }
            letter = row.letter
            number = String(Int.random(in: 1...row.songs.count))
        default:
            guard letter != nil, number.count < 2, !(number.isEmpty && key == "0") else { return }
            number += key
        }
    }

    // MARK: - Play

    private var actions: some View {
        HStack(spacing: 10) {
            Button {
                if let song, let row {
                    player.play(song, in: row.songs)
                }
            } label: {
                Label(song == nil ? "Play" : "Play \(code)", systemImage: "play.fill")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
            }
            .buttonStyle(.glassProminent)
            .tint(Theme.pink)
            .disabled(song == nil)

            Button {
                if let song {
                    player.playNext(song)
                }
            } label: {
                Label("Play next", systemImage: "text.line.first.and.arrowtriangle.forward")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
            }
            .buttonStyle(.glass)
            .disabled(song == nil)
        }
    }
}
