import SwiftUI

/// On a phone: the songs and search as tabs, the song that's on along the bottom, and Now Playing
/// a tap away. With room for both (iPhone Duo open, an iPad): the gatefold, Now Playing and the
/// songs side by side.
struct RootView: View {
    @Environment(\.horizontalSizeClass) private var widthClass
    @Environment(\.verticalSizeClass) private var heightClass

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
    }
}

private struct PhoneLayout: View {
    @State private var showingNowPlaying = false

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
