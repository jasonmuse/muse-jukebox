# Muse Jukebox for iPhone

The jukebox in an app, so an iPhone can tap along to the music, the way Music Haptics does for
Apple Music. It has to be an app: iOS only lists apps under Settings › Accessibility › Music
Haptics, and since iOS 26.5 Safari only lets a page make the phone tap at the moment you touch the
screen (WebKit bug 309082).

## How it works

- The app opens https://muse-jukebox.pages.dev in a web view. Nothing's bundled, so every change
  to the site is in the app straight away, and the site's service worker keeps it for when there's
  no signal (the jukebox is an app-bound domain, which is what lets the service worker run).
- The page works out the taps from each song's beats (`script.js`, "Haptics: feel the music") and
  hands them to the app a moment before they're due. The app plays them with Core Haptics: harder
  where the song's loud and the beat hits hard, a deep thud for a kick, a crisp tick for a snare.
- `MusicHapticsSupported` in `Info.plist` puts the app under Available Apps in Settings ›
  Accessibility › Music Haptics. Turning that switch on or off turns the jukebox's haptics on or
  off; the Haptics switch on the jukebox's back (and its strength rings: light, medium, strong)
  changes them in between.
- Jukebot's buzzes (`navigator.vibrate`, which Safari doesn't have) come through as taps too.

`JukeboxBridge.swift` lists what the page and the app say to each other.

## Building it

1. Open `MuseJukebox.xcodeproj` in Xcode 16 or later.
2. MuseJukebox target › Signing & Capabilities: choose your team (and change the bundle identifier,
   `app.muselabs.jukebox`, if you like).
3. Run it on an iPhone with iOS 18 or later. The Simulator has no haptics.
4. Settings › Accessibility › Music Haptics: turn it on, and Muse Jukebox is listed. Play a song.

## Good to know

- The taps play while the jukebox is on screen. Music carries on with the screen locked; the taps
  pause until you're back.
- Most iPads have no Taptic Engine: the app works there, without the Haptics setting.
- Apple's own haptic tracks (what Apple Music plays) are only for songs in Apple's catalog, found by
  their ISRC. If the songs go out on Apple Music, the app could hand iOS each song's ISRC
  (`MPNowPlayingInfoPropertyInternationalStandardRecordingCode`) and iOS would play Apple's track
  for it instead.
- The icon is the site's 512px icon scaled up: swap in a sharp 1024px one before it goes to the
  App Store.
- App Review is wary of apps that are only a website. The native haptics, the Music Haptics listing
  and playing on with the screen locked are what this one adds.
- Debug builds can be looked inside from Safari's Develop menu. To try it against a copy of the
  site on your computer, add that host to `WKAppBoundDomains` and change `JukeboxBridge.host` and
  `home` to it.
