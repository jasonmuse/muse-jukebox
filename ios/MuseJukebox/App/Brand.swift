import CoreText
import SwiftUI

/// The jukebox's look beyond its colors: "Muse" in the site's script, the glowing capitals of a
/// jukebox's selection display, and the night sky behind everything
enum Brand {
    /// The script "Muse" is written in, as on the site: Pacifico (SIL Open Font License; Fonts/ has
    /// the font and its license). It's registered the first time it's asked for.
    static let script: String? = {
        let bundled = (Bundle.main.urls(forResourcesWithExtension: "ttf", subdirectory: nil) ?? [])
            + (Bundle.main.urls(forResourcesWithExtension: "ttf", subdirectory: "Fonts") ?? [])
        for url in bundled {
            CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
        }
        let name = "Pacifico-Regular"
        let font = CTFontCreateWithName(name as CFString, 12, nil)
        return CTFontCopyPostScriptName(font) as String == name ? name : nil
    }()

    /// The neon "Muse" glows in on the site: pink, orange, cream, sky blue and lilac
    static let neon = LinearGradient(colors: [Theme.pink, Theme.orange, Theme.cream, Theme.sky, Theme.lilac],
                                     startPoint: .leading, endPoint: .trailing)

    /// The selection display's amber
    static let amber = Color(red: 1, green: 0.784, blue: 0.38) // #ffc861

    /// Behind an LED display's lettering
    static let ledGlass = Color(red: 0.04, green: 0.04, blue: 0.09)
}

extension Theme {
    static let orange = Color(red: 1, green: 0.702, blue: 0.42) // #ffb36b
    static let mint = Color(red: 0.612, green: 0.961, blue: 0.784) // #9cf5c8
    static let cream = Color(red: 1, green: 0.945, blue: 0.659) // #fff1a8

    /// The rows' colors, A on: each row of the jukebox has its own
    static let rowColors: [Color] = [pink, sky, orange, lilac, mint, cream]
}

extension JukeboxRow {
    /// The row's color (its letter on the selector, the edge of its title strips)
    var tint: Color {
        Theme.rowColors[index % Theme.rowColors.count]
    }
}

/// "Muse" in the site's neon script, tilted a little and glowing
struct MuseWordmark: View {
    var size: CGFloat = 34

    var body: some View {
        Text("Muse")
            .font(Brand.script.map { Font.custom($0, size: size) } ?? .system(size: size, weight: .heavy, design: .serif).italic())
            .foregroundStyle(Brand.neon)
            .shadow(color: Theme.pink.opacity(0.55), radius: size * 0.18)
            .rotationEffect(.degrees(-3))
            .accessibilityLabel("Muse")
    }
}

/// Lettering like a jukebox's LED display: heavy monospaced capitals, glowing in their color
struct LEDText: View {
    let text: String
    var color: Color = Brand.amber
    var size: CGFloat = 11

    var body: some View {
        Text(text.uppercased())
            .font(.system(size: size, weight: .heavy, design: .monospaced))
            .tracking(size * 0.16)
            .foregroundStyle(color)
            .shadow(color: color.opacity(0.85), radius: size * 0.35)
            .lineLimit(1)
    }
}

/// A little LED window, for a record's code ("B3") or what the jukebox is doing
struct LEDChip: View {
    let text: String
    var color: Color = Theme.pink
    var size: CGFloat = 11

    var body: some View {
        LEDText(text: text, color: color, size: size)
            .padding(.horizontal, size * 0.7)
            .padding(.vertical, size * 0.4)
            .background(Brand.ledGlass, in: RoundedRectangle(cornerRadius: size * 0.6, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: size * 0.6, style: .continuous)
                    .strokeBorder(.white.opacity(0.12), lineWidth: 1)
            }
    }
}

/// The night sky: deep blue, a scatter of stars that stay where they are, and the jukebox's pink,
/// lilac and sky blue glowing in it
struct NightSky: View {
    var glow = true

    var body: some View {
        ZStack {
            Theme.backdrop
            Canvas { context, size in
                var dice = SeededGenerator(seed: 7)
                for _ in 0..<150 {
                    let x = Double.random(in: 0...1, using: &dice) * size.width
                    let y = Double.random(in: 0...1, using: &dice) * size.height
                    let radius = Double.random(in: 0.35...1.3, using: &dice)
                    let brightness = Double.random(in: 0.2...0.85, using: &dice)
                    let star = Path(ellipseIn: CGRect(x: x - radius, y: y - radius, width: radius * 2, height: radius * 2))
                    context.fill(star, with: .color(.white.opacity(brightness)))
                }
            }
            if glow {
                RadialGradient(colors: [Theme.pink.opacity(0.26), .clear], center: UnitPoint(x: 0.12, y: 0.16), startRadius: 0, endRadius: 330)
                RadialGradient(colors: [Theme.sky.opacity(0.18), .clear], center: UnitPoint(x: 0.92, y: 0.3), startRadius: 0, endRadius: 300)
                RadialGradient(colors: [Theme.lilac.opacity(0.16), .clear], center: UnitPoint(x: 0.5, y: 0.55), startRadius: 0, endRadius: 380)
            }
        }
        .ignoresSafeArea()
        .accessibilityHidden(true)
    }
}

extension View {
    /// The night sky behind, edge to edge
    func nightSky(glow: Bool = true) -> some View {
        background {
            NightSky(glow: glow)
        }
    }
}

/// Random numbers that come out the same every time (so the stars stay put)
struct SeededGenerator: RandomNumberGenerator {
    private var state: UInt64

    init(seed: UInt64) {
        state = seed &* 0x9E37_79B9_7F4A_7C15
    }

    mutating func next() -> UInt64 {
        state &+= 0x9E37_79B9_7F4A_7C15
        var mixed = state
        mixed = (mixed ^ (mixed >> 30)) &* 0xBF58_476D_1CE4_E5B9
        mixed = (mixed ^ (mixed >> 27)) &* 0x94D0_49BB_1331_11EB
        return mixed ^ (mixed >> 31)
    }
}
