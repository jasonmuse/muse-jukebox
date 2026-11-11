import SwiftUI

/// On a phone: the songs and search as tabs, the song that's on along the bottom, and Now Playing
/// a tap away. With room for both (iPhone Duo open, an iPad): the gatefold, Now Playing and the
/// songs side by side.
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

private struct PhoneLayout: View {
    @State private var showingNowPlaying = RootView.showsNowPlaying

    var body: some View {
        TabView {
            Tab("Jukebox", systemImage: "music.note.house.fill") {
                NavigationStack {
                    LibraryView()
                }
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
