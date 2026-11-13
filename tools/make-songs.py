#!/usr/bin/env python3
"""Writes songs.json: the jukebox's songs as the Muse Jukebox app reads them (the songs in script.js,
with each one's length and wave from waves.json and where its haptic track is). The app gets it from
the site, and builds with the copy here inside it for when it first opens without signal. Run it from
the repo root after adding songs, once make-waves.py and make-haptics.py have been run:

    python3 tools/make-songs.py
"""
import json
import os
import re

# Games that are on the App Store too: the app opens their App Store page instead
APP_STORE = {
    "https://amused.itch.io/frog-quest": "https://apps.apple.com/us/app/frog-quest/id6761079354",
}


def read_tracks():
    """The tracks array at the top of script.js: JSON, apart from its comments and trailing commas."""
    with open("script.js", encoding="utf-8") as script:
        source = script.read()
    start = source.index("const tracks = [") + len("const tracks = ")
    end = source.index("\n];", start) + 2
    text = source[start:end]
    out = []
    index = 0
    in_string = False
    while index < len(text):
        char = text[index]
        if in_string:
            out.append(char)
            if char == "\\":
                out.append(text[index + 1])
                index += 1
            elif char == '"':
                in_string = False
        elif char == '"':
            in_string = True
            out.append(char)
        elif text.startswith("//", index):
            index = text.index("\n", index)
            continue
        else:
            out.append(char)
        index += 1
    return json.loads(re.sub(r",(\s*[}\]])", r"\1", "".join(out)))


def stem(path):
    return os.path.splitext(os.path.basename(path))[0]


def main():
    with open("waves.json", encoding="utf-8") as waves_file:
        waves = json.load(waves_file)
    songs = []
    for track in read_tracks():
        audio = track.get("audio") or track["file"]
        wave = waves.get(track["file"]) or waves.get(audio) or {}
        other = track.get("sideB") or track.get("sideA")
        song = {
            "id": stem(track["file"]),
            "title": track["title"],
            "audio": audio,
            "rate": track.get("rate", 1),
            "cover": track["cover"],
            "tags": track.get("tags", []),
            "year": track.get("date", ""),
            "featured": bool(track.get("featured")),
            "haptics": f"haptics/{stem(audio)}.json",
        }
        if track.get("thumbnail"):
            song["thumbnail"] = track["thumbnail"]
        if wave:
            song["duration"] = wave["duration"]
            song["shape"] = wave["shape"]
        if other:
            song["side"] = "B" if track.get("sideA") else "A"
            song["otherSide"] = stem(other)
        if track.get("grayscaleCover"):
            song["grayscale"] = True
        if track.get("game"):
            game = {"name": track["game"]["name"], "url": track["game"]["url"]}
            if track["game"]["url"] in APP_STORE:
                game["appStore"] = APP_STORE[track["game"]["url"]]
            song["game"] = game
        missing = [path for path in (audio, song["haptics"]) if not os.path.exists(path)]
        if missing:
            print(f"  {song['title']}: missing {', '.join(missing)}")
        songs.append(song)
    with open("songs.json", "w", encoding="utf-8") as output:
        json.dump({"version": 1, "songs": songs}, output, indent=1, ensure_ascii=False)
        output.write("\n")
    print(f"{len(songs)} songs → songs.json")


if __name__ == "__main__":
    main()
