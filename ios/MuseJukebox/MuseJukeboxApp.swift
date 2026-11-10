import AVFoundation
import SwiftUI

/// Muse Jukebox for iPhone: the jukebox website (muse-jukebox.pages.dev), with the phone tapping
/// along to the music. The page works out the taps from each song's beats and hands them over; the
/// app plays them with Core Haptics. iOS lists the app under Settings > Accessibility > Music
/// Haptics, and the jukebox's haptics come on and go off with that switch (the switch on the
/// jukebox's back changes them in between).
@main
struct MuseJukeboxApp: App {
    init() {
        // The songs play like music: past the silent switch, and on with the screen locked
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
    }

    var body: some Scene {
        WindowGroup {
            JukeboxScreen()
        }
    }
}
