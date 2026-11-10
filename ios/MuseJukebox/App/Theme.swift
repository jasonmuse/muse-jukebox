import SwiftUI

/// The jukebox's colors: a deep night blue, and its switches' pink to lilac to sky blue glow
enum Theme {
    static let night = Color(red: 0.118, green: 0.102, blue: 0.302) // #1e1a4d
    static let ink = Color(red: 0.035, green: 0.035, blue: 0.09)
    static let pink = Color(red: 1, green: 0.525, blue: 0.839) // #ff86d6
    static let lilac = Color(red: 0.702, green: 0.608, blue: 1) // #b39bff
    static let sky = Color(red: 0.498, green: 0.902, blue: 1) // #7fe6ff

    static let glow = LinearGradient(colors: [pink, lilac, sky], startPoint: .leading, endPoint: .trailing)

    /// The night sky behind everything
    static let backdrop = LinearGradient(colors: [night, ink], startPoint: .top, endPoint: .bottom)

    /// The rings' colors, inner to outer
    static let rings: [Color] = [pink, lilac, sky]
}

extension View {
    /// The night sky, edge to edge
    func nightBackdrop() -> some View {
        background {
            Theme.backdrop.ignoresSafeArea()
        }
    }
}
