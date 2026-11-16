#!/usr/bin/env python3
"""Writes haptics/*.json: each song's haptic track, the taps the Muse Jukebox app plays along to it.

A tap on every beat (harder where the song's loud and the beat hits hard, a deep thud for a kick
and a crisp tick for a snare or hi-hat), lighter taps for the strongest hits between the beats, and
none where it goes quiet: what the website's Haptics play (script.js, "Haptics: feel the music"),
from the same beat tracker as the penguins' dance, worked out ahead of time here so the app has
every tap from the first beat. Run it from the repo root after adding songs (needs ffmpeg + numpy):

    python3 tools/make-haptics.py

Each file is {"version": 1, "duration": s, "bpm": n, "taps": [[time (s), power, crisp, beat], ...]}:
how hard each tap is (0-1, out of the song's hardest hits: the app scales it to the strength
chosen), how crisp (0 a deep thud, 1 a sharp tick), and whether it's on a beat (1) or one of the
hits between them (0), for the app's Beats Only.
"""
import importlib.util
import json
import math
import os
import subprocess

import numpy as np

RATE = 22050
FFT_SIZE = 2048
HOP = 512  # 43 measurements a second
BANDS = 40  # from 30 Hz to 8 kHz, evenly spaced in pitch
BASS_BANDS = 12  # the ones under 160 Hz (a kick drum's)
FLOOR_DB = -60
TIGHTNESS = 600
ONSET_LAG = 0.03
PATH_STEP = 1.01
PATH_DRIFT = 2000
PATH_JUMP = 1.5
PATH_PRIOR = 0.5
HUSH_DEPTH_DB = 20
HUSH_MIN_SECONDS = 0.5
HUSH_EDGE_SECONDS = 0.15
RANGE_DB = 24
GAP_SECONDS = 0.09


def js_round(value):
    """Rounding as JavaScript's Math.round does it (halves up), so the numbers match script.js's."""
    return int(math.floor(value + 0.5))


def song_files():
    """The audio the jukebox's songs play (a song's "audio" when it plays another's file), read from
    script.js by make-songs.py"""
    spec = importlib.util.spec_from_file_location("make_songs", os.path.join(os.path.dirname(__file__), "make-songs.py"))
    make_songs = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(make_songs)
    audio = [track.get("audio") or track["file"] for track in make_songs.read_tracks()]
    return [path for path in dict.fromkeys(audio) if os.path.exists(path)]


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "quiet", "-i", path, "-ac", "1", "-ar", str(RATE), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)


def measure(samples):
    """Each frame's loudness in each band (dB), as script.js's measureBeatBands has it."""
    frame_count = int(math.floor(len(samples) / HOP)) + 1
    padded = np.concatenate([samples, np.zeros(FFT_SIZE)])
    window = 0.5 - (0.5 * np.cos((2 * np.pi * np.arange(FFT_SIZE)) / FFT_SIZE))
    bin_hz = RATE / FFT_SIZE
    edges = [js_round((30 * (8000 / 30) ** (band / BANDS)) / bin_hz) for band in range(BANDS + 1)]
    bins = []
    for band in range(BANDS):
        low = max(1, edges[band])
        bins.append((low, max(low + 1, edges[band + 1])))
    levels = np.empty((frame_count, BANDS))
    for first in range(0, frame_count, 1024):
        frames = np.arange(first, min(frame_count, first + 1024))
        spectrum = np.fft.rfft(padded[frames[:, None] * HOP + np.arange(FFT_SIZE)[None, :]] * window, axis=1)
        power = (spectrum.real ** 2) + (spectrum.imag ** 2)
        for band, (low, high) in enumerate(bins):
            levels[frames, band] = np.maximum(FLOOR_DB, 10 * np.log10(power[:, low:high].mean(axis=1) + 1e-10))
    return levels


def tempo_windows(onsets, rate):
    """The onsets' autocorrelation in 8 second windows, 2 seconds apart (measureTempoWindows)."""
    length = js_round(8 * rate)
    min_lag = max(1, js_round((60 * rate) / 260))
    max_lag = min(length - 1, js_round((60 * rate) / 40))
    hann = 0.5 - (0.5 * np.cos((2 * np.pi * np.arange(length)) / (length - 1)))
    windows = []
    start = -(length // 2)
    count = len(onsets)
    while start + (length / 2) < count:
        index = np.arange(start, start + length)
        inside = (index >= 0) & (index < count)
        piece = np.where(inside, onsets[np.clip(index, 0, count - 1)], 0) * hann
        energy = float(np.dot(piece, piece))
        if energy > 0:
            full = np.correlate(piece, piece, mode="full")[length - 1:]
            correlation = np.zeros(max_lag + 1)
            correlation[min_lag:max_lag + 1] = full[min_lag:max_lag + 1] / energy
            windows.append((start + (length / 2), correlation))
        start += js_round(rate * 2)
    return windows, min_lag, max_lag


def pick_beat_lag(correlation, count, min_lag, max_lag, rate):
    """The likeliest beat length in frames, leaning towards 120 BPM (pickBeatLag)."""
    best_lag = js_round((60 * rate) / 120)
    best = -math.inf
    for lag in range(min_lag, max_lag + 1):
        bpm = (60 * rate) / lag
        score = math.log1p(1e6 * max(0.0, correlation[lag] / count)) - (0.5 * math.log2(bpm / 120) ** 2)
        if score > best:
            best = score
            best_lag = lag
    lag = float(best_lag)
    if min_lag < best_lag < max_lag:
        before = correlation[best_lag - 1]
        after = correlation[best_lag + 1]
        curve = before - (2 * correlation[best_lag]) + after
        if curve < 0:
            lag += max(-0.5, min(0.5, (0.5 * (before - after)) / curve))
    return lag


def tempo_path(windows, min_lag, max_lag, frame_count, rate):
    """The beat length as the song goes (findTempoPath): Viterbi through the windows."""
    if len(windows) < 3:
        return None
    lags = []
    bpm = 40.0
    while bpm <= 260:
        lag = (60 * rate) / bpm
        if min_lag <= lag <= max_lag - 1:
            lags.append(lag)
        bpm *= PATH_STEP
    count = len(lags)
    if not count:
        return None
    lags = np.array(lags)
    whole = np.floor(lags).astype(int)
    part = lags - whole
    prior = PATH_PRIOR * np.log2(((60 * rate) / lags) / 120) ** 2
    fits = []
    for _, correlation in windows:
        best = max(0.0, float(correlation[min_lag:max_lag + 1].max()))
        value = (correlation[whole] * (1 - part)) + (correlation[whole + 1] * part)
        ratio = value / best if best > 0 else np.zeros(count)
        fits.append(np.log(np.maximum(1e-3, ratio)) - prior)
    step_costs = []
    apart = 0
    while len(step_costs) < count:
        cost = PATH_DRIFT * (apart * math.log(PATH_STEP)) ** 2
        if cost >= PATH_JUMP:
            break
        step_costs.append(cost)
        apart += 1
    reach = len(step_costs)
    totals = fits[0].copy()
    came_from = []
    for index in range(1, len(fits)):
        jump_from = int(np.argmax(totals))
        following = np.empty(count)
        back = np.empty(count, dtype=int)
        for state in range(count):
            best = totals[jump_from] - PATH_JUMP
            best_from = jump_from
            for apart in range(1 - reach, reach):
                other = state + apart
                if 0 <= other < count:
                    value = totals[other] - step_costs[abs(apart)]
                    if value > best:
                        best = value
                        best_from = other
            following[state] = best + fits[index][state]
            back[state] = best_from
        totals = following
        came_from.append(back)
    state = int(np.argmax(totals))
    path = np.empty(len(fits))
    path[-1] = lags[state]
    for index in range(len(fits) - 1, 0, -1):
        state = came_from[index - 1][state]
        path[index - 1] = lags[state]
    centres = [centre for centre, _ in windows]
    periods = np.empty(frame_count)
    at = 0
    for frame in range(frame_count):
        while at + 1 < len(windows) and centres[at + 1] <= frame:
            at += 1
        following = min(len(windows) - 1, at + 1)
        span = centres[following] - centres[at]
        along = max(0.0, min(1.0, (frame - centres[at]) / span)) if span > 0 else 0.0
        periods[frame] = path[at] + ((path[following] - path[at]) * along)
    return periods


def track_beats(onsets, period, periods):
    """Ellis's dynamic programming (trackBeats): the beats' frames, and how hard each one hits."""
    count = len(onsets)
    spread = float(np.sqrt(np.mean((onsets - onsets.mean()) ** 2))) or 1.0
    reach = max(1, math.ceil((period * 3) / 32))
    weights = np.exp(-0.5 * ((np.arange(-reach, reach + 1) * 32) / period) ** 2)
    local = np.correlate(np.concatenate([np.zeros(reach), onsets / spread, np.zeros(reach)]), weights, mode="valid")
    local_max = float(local.max()) if count else 0.0

    tables = {}

    def gaps_for(beat_length):
        nearest = js_round(beat_length / 2)
        furthest = js_round(beat_length * 2)
        costs = np.zeros(furthest + 1)
        gaps = np.arange(nearest, furthest + 1)
        costs[nearest:] = TIGHTNESS * np.log(gaps / beat_length) ** 2
        return nearest, furthest, costs

    steady = gaps_for(period)

    def gaps_at(index):
        if periods is None:
            return steady
        key = js_round(periods[min(len(periods) - 1, index)] * 4)
        if key not in tables:
            tables[key] = gaps_for(key / 4)
        return tables[key]

    score = np.zeros(count)
    before = np.full(count, -1)
    started = False
    for index in range(count):
        nearest, furthest, costs = gaps_at(index)
        best = 0.0
        came = -1
        longest = min(furthest, index)
        if longest >= nearest:
            gaps = np.arange(nearest, longest + 1)
            values = score[index - gaps] - costs[gaps]
            pick = int(np.argmax(values))
            best = float(values[pick])
            came = int(index - gaps[pick])
        score[index] = local[index] + (best if came >= 0 else 0.0)
        if started or local[index] >= 0.01 * local_max:
            before[index] = came
            started = True

    peaks = sorted(score[index] for index in range(1, count - 1) if score[index] > score[index - 1] and score[index] >= score[index + 1])
    typical = peaks[len(peaks) // 2] if peaks else 0.0
    last = count - 1
    for index in range(count - 2, 0, -1):
        if score[index] > score[index - 1] and score[index] >= score[index + 1] and score[index] >= 0.5 * typical:
            last = index
            break
    frames = []
    index = last
    while index >= 0:
        frames.append(index)
        index = before[index]
    frames.reverse()

    # Weak beats at the ends are left off (a quiet intro or fade-out isn't danced to)
    hits = [float(local[frame]) for frame in frames]
    typical_hit = math.sqrt(sum(hit * hit for hit in hits) / max(1, len(hits)))
    first_kept = 0
    last_kept = len(frames)
    while first_kept < last_kept and hits[first_kept] < 0.5 * typical_hit:
        first_kept += 1
    while last_kept > first_kept and hits[last_kept - 1] < 0.5 * typical_hit:
        last_kept -= 1
    kept_hits = hits[first_kept:last_kept]
    ordered = sorted(kept_hits)
    loud = ordered[int(len(ordered) * 0.9)] if ordered else 1.0
    loud = loud or 1.0
    return frames[first_kept:last_kept], [min(1.0, hit / loud) for hit in kept_hits]


def find_hushes(loudness, rate):
    """Where it goes (nearly) silent for half a second or more (findSongHushes)."""
    if len(loudness) < rate * 10:
        return []
    ordered = np.sort(loudness)
    quiet_below = ordered[int(len(ordered) * 0.9)] - HUSH_DEPTH_DB
    edge = max(1, js_round(HUSH_EDGE_SECONDS * rate))
    hushes = []
    run_start = -1
    for frame in range(len(loudness) + 1):
        quiet = frame < len(loudness) and loudness[frame] < quiet_below
        if quiet and run_start < 0:
            run_start = frame
        if quiet or run_start < 0:
            continue
        start = (run_start + edge) / rate
        end = (frame - edge) / rate
        if end - start >= HUSH_MIN_SECONDS:
            hushes.append((start, end))
        run_start = -1
    return hushes


def make_taps(beats, strengths, onsets, bass_share, loudness, rate, hushes, centre):
    """The taps (makeHapticTaps in script.js): [time, power, crisp, beat] each."""
    last_frame_index = len(onsets) - 1

    def frame_at(time):
        return min(last_frame_index, max(0, js_round((time - centre) * rate)))

    ordered = np.sort(loudness)
    loud = ordered[int(len(ordered) * 0.9)] if len(ordered) else 0.0

    def level_at(frame):
        level = float(loudness[max(0, frame - 2):frame + 3].max())
        return min(1.0, max(0.0, 1 - ((loud - level) / RANGE_DB)))

    def crisp_at(frame):
        near = slice(max(0, frame - 1), frame + 2)
        rise = float(onsets[near].sum())
        share = float((onsets[near] * bass_share[near]).sum()) / rise if rise > 0 else 0.3
        return min(0.9, max(0.1, 0.8 - share))

    def in_hush(time):
        return any(start <= time < end for start, end in hushes)

    taps = []
    for time, strength in zip(beats, strengths):
        if in_hush(time):
            continue
        frame = frame_at(time)
        taps.append([time, (0.45 + (0.55 * strength)) * (0.3 + (0.7 * level_at(frame))), crisp_at(frame), 1])

    # The strongest hits between the beats: onset peaks a quarter of a beat or more from either
    # beat, at least as strong as a typical beat
    beat_hits = sorted(float(onsets[max(0, frame_at(time) - 1):frame_at(time) + 2].max()) for time in beats)
    typical_hit = beat_hits[len(beat_hits) // 2] if beat_hits else 0.0
    typical_hit = typical_hit or math.inf
    last_frame = frame_at(beats[-1])
    before = 0
    for frame in range(frame_at(beats[0]) + 1, last_frame):
        onset = onsets[frame]
        if onset < typical_hit or onset <= onsets[frame - 1] or onset < onsets[frame + 1]:
            continue
        time = (frame / rate) + centre
        while before + 2 < len(beats) and beats[before + 1] <= time:
            before += 1
        quarter = (beats[before + 1] - beats[before]) / 4
        if time - beats[before] < quarter or beats[before + 1] - time < quarter or in_hush(time):
            continue
        extra = min(1.0, (onset - typical_hit) / typical_hit)
        taps.append([time, (0.35 + (0.25 * extra)) * (0.3 + (0.7 * level_at(frame))), crisp_at(frame), 0])

    taps.sort(key=lambda tap: tap[0])
    kept = []
    for tap in taps:
        if kept and tap[0] - kept[-1][0] < GAP_SECONDS:
            if tap[1] > kept[-1][1]:
                kept[-1] = tap
            continue
        kept.append(tap)
    return [[round(float(time), 3), round(float(min(1.0, power)), 3), round(float(crisp), 2), beat] for time, power, crisp, beat in kept]


def haptic_track(path):
    samples = decode(path)
    levels = measure(samples)
    rises = np.maximum(0, np.diff(levels, axis=0))
    onsets = np.zeros(len(levels))
    onsets[1:] = rises.sum(axis=1) / BANDS
    bass_share = np.zeros(len(levels))
    total = rises.sum(axis=1)
    bass_share[1:] = np.where(total > 0, rises[:, :BASS_BANDS].sum(axis=1) / np.maximum(total, 1e-12), 0)
    loudness = 10 * np.log10((10 ** (levels / 10)).mean(axis=1))
    rate = RATE / HOP
    duration = len(samples) / RATE
    track = {"version": 1, "duration": round(duration, 2), "bpm": None, "taps": []}
    if duration < 8:
        return track
    windows, min_lag, max_lag = tempo_windows(onsets, rate)
    sums = np.zeros(max_lag + 1)
    for _, correlation in windows:
        sums += correlation
    period = pick_beat_lag(sums, max(1, len(windows)), min_lag, max_lag, rate)
    frames, strengths = track_beats(onsets, period, tempo_path(windows, min_lag, max_lag, len(onsets), rate))
    if len(frames) < 2:
        return track
    centre = ((FFT_SIZE / 2) / RATE) + ONSET_LAG
    beats = [(frame / rate) + centre for frame in frames]
    track["bpm"] = round((60 * rate) / period, 1)
    track["taps"] = make_taps(beats, strengths, onsets, bass_share, loudness, rate, find_hushes(loudness, rate), centre)
    return track


def main():
    os.makedirs("haptics", exist_ok=True)
    for path in song_files():
        track = haptic_track(path)
        name = os.path.splitext(os.path.basename(path))[0]
        with open(os.path.join("haptics", f"{name}.json"), "w", encoding="utf-8") as output:
            json.dump(track, output, separators=(",", ":"))
            output.write("\n")
        print(f"{path:44} {track['duration']:7.2f}s  {track['bpm'] or '-':>6} BPM  {len(track['taps']):4} taps")


if __name__ == "__main__":
    main()
