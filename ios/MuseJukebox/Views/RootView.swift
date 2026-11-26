import SwiftUI

/// On a phone: the jukebox, the selector, Jukebot and search as tabs, the song that's on along the
/// bottom, and Now Playing a tap away. With room for both (iPhone Duo open, an iPad): the gatefold,
/// Now Playing and the jukebox side by side.
struct RootView: View {
    @Environment(\.horizontalSizeClass) private var widthClass
    @Environment(\.verticalSizeClass) private var heightClass
    @Environment(Library.self) private var library
    @Environment(Player.self) private var player

    var body: some View {
        Group {
            if widthClass == .regular && heightClass == .regular {
                Gatefold()
            } else {
                PhoneLayout()
            }
        }
        .modifier(DuoReader())
        .tint(Theme.pink)
        .preferredColorScheme(.dark)
        .task {
            // Opened with -showNowPlaying (for pictures of it, taken in the Simulator): the first
            // featured song, on
            if Self.showsNowPlaying, let song = library.featured.first ?? library.songs.first {
                player.play(song, in: library.songs)
            }
        }
    }

    nonisolated static let showsNowPlaying = ProcessInfo.processInfo.arguments.contains("-showNowPlaying")
}

/// The jukebox's four tabs: the jukebox itself (its records and title strips), the selector to punch
/// in a code, Jukebot in the back, and search
private struct PhoneLayout: View {
    @State private var showingNowPlaying = RootView.showsNowPlaying

    var body: some View {
        TabView {
            Tab("Jukebox", systemImage: "opticaldisc") {
                NavigationStack {
                    JukeboxHome()
                }
            }
            Tab("Selector", systemImage: "circle.grid.3x3.fill") {
                SelectorView()
            }
            Tab("Jukebot", systemImage: "cpu") {
                JukebotView()
            }
            Tab(role: .search) {
                SearchView()
            }
        }
        .tabViewBottomAccessory {
            MiniPlayer {
                showingNowPlaying = true
            }
        }
        .tabBarMinimizeBehavior(.onScrollDown)
        .sheet(isPresented: $showingNowPlaying) {
            NowPlayingView(style: .sheet)
                .presentationDragIndicator(.visible)
        }
    }
}
