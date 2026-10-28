#!/usr/bin/env python3
"""Writes waves.json: each song's length and its "shape" (how loud it is along the way), which the
song list draws as a waveform. Run it from the repo root after adding songs (needs ffmpeg + numpy):

    python3 tools/make-waves.py
"""
import json
import os
import re
import subprocess

import numpy as np

LEVELS = 96  # points along each song
RANGE_DB = 36  # from the song's loudest stretch down to the bottom of the waveform
ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"  # 64 steps, one letter each
RATE = 22050


def song_files():
    """The songs the jukebox lists, in the order script.js has them."""
    with open("script.js", encoding="utf-8") as script:
        return list(dict.fromkeys(re.findall(r'"file":\s*"([^"]+)"', script.read())))


def measure(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "quiet", "-i", path, "-ac", "1", "-ar", str(RATE), "-f", "f32le", "-"],
        capture_output=True, check=True).stdout
    samples = np.frombuffer(raw, np.float32)
    duration = len(samples) / RATE
    edges = np.linspace(0, len(samples), LEVELS + 1).astype(int)
    loudness = np.array([
        10 * np.log10(np.mean(samples[a:b].astype(np.float64) ** 2) + 1e-12) if b > a else -120.0
        for a, b in zip(edges[:-1], edges[1:])])
    top = np.max(loudness)
    levels = np.clip((loudness - (top - RANGE_DB)) / RANGE_DB, 0, 1)
    return round(duration, 2), "".join(ALPHABET[int(round(level * 63))] for level in levels)


def main():
    waves = {}
    for path in song_files():
        if not os.path.exists(path):
            continue
        duration, shape = measure(path)
        waves[path] = {"duration": duration, "shape": shape}
        print(f"{path:44} {duration:7.2f}s  {shape}")
    with open("waves.json", "w", encoding="utf-8") as output:
        json.dump(waves, output, indent=1)
        output.write("\n")


if __name__ == "__main__":
    main()
