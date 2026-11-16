import AVFoundation
import SwiftUI

/// Muse Jukebox: every Muse Tune, with the phone tapping along to the music. Each song comes with a
/// haptic track (worked out from its beats), played with Core Haptics in time with the song. iOS
/// lists the app under Settings › Accessibility › Music Haptics, and its haptics follow that switch.
/// Made for iPhone Duo too: a gatefold when it's open, a stage and a deck when it's propped up like
/// a laptop, and Fold FX, a filter you sweep by folding it.
@main
struct MuseJukeboxApp: App {
    @State private var library: Library
    @State private var player: Player
    @State private var settings: HapticsSettings
    @State private var conductor: HapticsConductor
    @State private var duo = DuoState()

    init() {
        // The songs play like music: past the silent switch, and on with the screen locked
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
        // Room to keep the covers and haptic tracks between visits (the site says when they've changed)
        URLCache.shared = URLCache(memoryCapacity: 16 * 1024 * 1024, diskCapacity: 300 * 1024 * 1024)
        let player = Player()
        let settings = HapticsSettings()
        _library = State(initialValue: Library())
        _player = State(initialValue: player)
        _settings = State(initialValue: settings)
        _conductor = State(initialValue: HapticsConductor(player: player, settings: settings))
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(library)
                .environment(player)
                .environment(settings)
                .environment(conductor)
                .environment(duo)
                .task {
                    await library.refresh()
                }
        }
    }
}
