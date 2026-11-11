# Muse Jukebox for iPhone

Every Muse Tune in a native app, with your iPhone tapping along to the music the way Music Haptics
does for Apple Music. Made for iPhone Duo.

## What's in it

- **The jukebox.** Every song as a cover in a grid, the featured ones big at the top, moods to filter
  by, search, sort and shuffle. Songs stream from muse-jukebox.pages.dev and are kept once they've
  played, so they play again without signal.
- **Now Playing.** The sleeve with the record sliding out of it and spinning at 33⅓, the song's wave
  to scrub along, Liquid Glass controls, shuffle and repeat, Up Next and AirPlay, with the cover
  glowing behind it all. Countdown Island flips to its slowed side B, and the record glides down to
  the new speed. The lock screen, Control Center and headphone buttons all work.
- **Music Haptics.** Every song comes with a haptic track (`haptics/<song>.json`, made by
  `tools/make-haptics.py` with the same beat tracker as the website's penguins):
  - a tap on every beat, harder where the song's loud and the beat hits hard;
  - a deep thud for a kick and a crisp tick for a snare or hi-hat;
  - lighter taps for the strongest hits between the beats;
  - nothing where the song goes quiet.

  The app plays the track with Core Haptics, timed to the sample that's playing, and rings pulse out
  behind the record with every tap. Its settings look like iOS's own: the switch, Play Sample, Full
  Mix or Beats Only, and Light, Medium or Strong. `MusicHapticsSupported` lists the app under
  Settings › Accessibility › Music Haptics, and turning that switch on or off turns the app's haptics
  on or off. The switch in the app changes them in between.
- **iPhone Duo** (iOS 27.1):
  - **Closed:** the tab bar and toolbar move into the side strip, like the system apps.
  - **Open:** the gatefold. Now Playing and the jukebox sit side by side like a record sleeve opened
    out (`ArrangementView`), a page each either side of the fold, with search right on the songs'
    page. Before anything's on, the featured song waits on the left page with a Play button.
  - **Propped up like a laptop:** Now Playing becomes the stage. The record and the song's name
    fill the half that's standing up, big enough to see from across the room, while the controls and
    the songs go on the half lying flat, within reach. This follows Apple's tabletop guidance for
    media controls.
  - **Fold FX:** turn it on and folding the Duo sweeps a low-pass filter over the music, like a DJ's
    filter knob. The taps go softer and duller along with it. It reads the hinge angle live with
    `onHingeChange`.

## Building it

1. Open `MuseJukebox.xcodeproj` in Xcode 27.1 or later. The Duo APIs need the iOS 27.1 SDK.
2. MuseJukebox target › Signing & Capabilities: choose your team. Change the bundle identifier
   (`app.muselabs.jukebox`) if you like.
3. Run it on an iPhone with iOS 26 or later. The Simulator has no haptics, but Device Hub's iPhone Duo
   can open, close, fold and rotate to show the Duo layouts.
4. Settings › Accessibility › Music Haptics: turn it on, and Muse Jukebox is listed. Play a song.

GitHub's Macs build it with Xcode 27.1 on every push (no warnings), then run it in the Simulator on
the newest iPhone and on iPhone Duo closed, open, and propped up like a laptop, and keep a picture
of each (Actions › iPhone app › the run › screenshots). `ios/Simulator/fold.m` does the folding,
which the Simulator's command line can't.

## Trying it without a Mac

GitHub builds the app on its own Macs (Xcode 27.1) whenever `ios/` changes: Actions › iPhone app.
To get it onto your phone from there, through TestFlight, do this once (all of it works in a
browser on your phone):

1. **The app in App Store Connect.** appstoreconnect.apple.com › Apps › + › New App: iOS, name
   Muse Jukebox, bundle ID `app.muselabs.jukebox` (if it isn't offered, add it as an identifier at
   developer.apple.com first, or tell Claude yours and it'll change the project), any SKU.
2. **A key for GitHub.** App Store Connect › Users and Access › Integrations › App Store Connect API
   › Team Keys › +, with Admin access (it lets GitHub's Mac make the signing certificate). Note its
   Key ID and the Issuer ID above the list, and download the key (a `.p8` file: it can only be
   downloaded once).
3. **The secrets.** github.com/jasonmuse/muse-jukebox › Settings › Secrets and variables › Actions ›
   New repository secret, four times:
   - `ASC_KEY_ID`: the Key ID
   - `ASC_ISSUER_ID`: the Issuer ID
   - `ASC_KEY`: everything in the `.p8` file, the BEGIN and END lines too
   - `APPLE_TEAM_ID`: your Team ID (developer.apple.com › Account › Membership details)
4. **A build.** Actions › iPhone app › Run workflow (on the branch with the app), TestFlight ticked.
5. **Your phone.** Once App Store Connect has processed the build (about 15 minutes), TestFlight ›
   Internal Testing: add yourself. Then install it from the TestFlight app.

Builds after that are just step 4.

## Adding songs

After adding a song to `script.js` (and running `tools/make-waves.py`, as before):

```
python3 tools/make-haptics.py
python3 tools/make-songs.py
```

Commit `haptics/` and `songs.json`. Once the site's deployed, the app picks the new songs up without
an update. The copies built into the app are for when it first opens without signal.

## Good to know

- The taps play while the app's open. With the screen locked the music plays on and the taps rest
  until you're back (iOS doesn't play an app's haptics in the background).
- Most iPads have no Taptic Engine, so they play the music without the haptics settings.
- Apple's own haptic tracks (the ones Apple Music plays) only exist for songs in Apple's catalog,
  found by their ISRC. These songs have their own, made from their beats. If the songs ever go out on
  Apple Music, the app could also hand iOS each song's ISRC
  (`MPNowPlayingInfoPropertyInternationalStandardRecordingCode`).
- The icon is the site's 512px icon scaled up: swap in a sharp 1024px one before it goes to the
  App Store.
