#!/usr/bin/env python3
"""Writes history.json: every change to the jukebox, newest first, from the git log (the history on
the back of the jukebox reads it). Run it from the repo root now and then:

    python3 tools/make-history.py

It doesn't have to be run after every change: the page picks up anything newer than history.json
from GitHub by itself. Merges are left out (they only bring changes in). ERAS names the months.
"""
import json
import subprocess

ERAS = {
    "2024-10": "The first jukebox",
    "2024-12": "A new song",
    "2025-01": "Drift drops in",
    "2025-04": "Mobile, again",
    "2025-11": "A new look",
    "2026-02": "The overhaul",
    "2026-03": "A lotta lot",
    "2026-07": "Countdown Island",
    "2026-08": "Marquees and Exhale",
    "2026-10": "Jukebot moves in",
    "2026-11": "The penguins dance",
}


def changes():
    log = subprocess.run(
        ["git", "log", "--no-merges", "--date=short", "--format=%h%x09%ad%x09%s"],
        capture_output=True, check=True, text=True, encoding="utf-8").stdout
    for line in log.splitlines():
        sha, date, text = line.split("\t", 2)
        yield {"sha": sha, "date": date, "text": text.strip()}


def main():
    history = {"eras": ERAS, "changes": list(changes())}
    with open("history.json", "w", encoding="utf-8", newline="\n") as output:
        json.dump(history, output, ensure_ascii=False, indent=1)
        output.write("\n")
    print(f"{len(history['changes'])} changes, back to {history['changes'][-1]['date']}")


if __name__ == "__main__":
    main()
