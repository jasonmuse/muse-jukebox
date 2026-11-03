// The jukebox offline: a service worker that keeps the jukebox itself and the songs you've listened
// to, so it opens without signal (from the home screen, say) and plays what it's kept.
// - The page and its code (and its .json) come from the network whenever there is one, so an update
//   is always there straight away; what was kept is only for when there isn't (or it's too slow).
// - Pictures and fonts come from what was kept, refreshed in the background.
// - Songs (and the video behind the jukebox) come from what was kept if they're there, in the byte
//   ranges a player asks for; otherwise from the network, keeping any whole song the page fetches.
//   The page asks for a song to be kept once it's been listened to for a while (script.js).
const VERSION = "1";
const SHELL_CACHE = `jukebox-shell-${VERSION}`;
const PICTURE_CACHE = `jukebox-pictures-${VERSION}`;
const SONG_CACHE = `jukebox-songs-${VERSION}`;
const CACHES = [SHELL_CACHE, PICTURE_CACHE, SONG_CACHE];
const SHELL_WAIT_MS = 4000; // the network this long for the page's own files, then what was kept

// What the jukebox needs to open at all (the rest is kept as it's used)
const SHELL = [
    "./",
    "index.html",
    "script.js",
    "jukebot.js",
    "styles.css",
    "manifest.webmanifest",
    "waves.json",
    "history.json",
    "images/penguin.gif",
    "images/record.png",
    "images/itchyscratchy.gif",
    "images/frogblinkie.gif",
    "images/kofiblinkie.gif",
    "images/app-icon-180.png",
    "images/app-icon-192.png",
    "images/app-icon-512.png",
    "images/where.mp4",
    "audio/jukeboxswitch.mp3"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys()
        .then((names) => Promise.all(names.filter((name) => name.startsWith("jukebox-") && !CACHES.includes(name)).map((name) => caches.delete(name))))
        .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    if (url.origin === self.location.origin) {
        if (/\.(mp3|mp4|webm)$/i.test(url.pathname)) {
            event.respondWith(fromSongs(request));
        } else if (request.mode === "navigate" || /\.(html|js|css|json|webmanifest)$/i.test(url.pathname) || url.pathname.endsWith("/")) {
            event.respondWith(networkFirst(request));
        } else if (/\.(png|gif|webp|jpe?g|svg|ico)$/i.test(url.pathname)) {
            event.respondWith(keptThenRefreshed(request, PICTURE_CACHE));
        }
    } else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
        event.respondWith(keptThenRefreshed(request, PICTURE_CACHE));
    }
});

// The network's answer (kept for next time), or what was kept if there's no network, or it's slow
async function networkFirst(request) {
    const cache = await caches.open(SHELL_CACHE);
    const key = shellKey(request);
    const network = fetch(request).then((response) => {
        if (response.ok && !response.redirected) cache.put(key, response.clone()).catch(() => {});
        return response;
    });
    const kept = () => cache.match(key);
    try {
        return await Promise.race([
            network,
            new Promise((resolve, reject) => setTimeout(() => kept().then((match) => (match ? resolve(match) : network.then(resolve, reject))), SHELL_WAIT_MS))
        ]);
    } catch (error) {
        const match = await kept();
        if (match) return match;
        throw error;
    }
}

// (the page is kept as the jukebox's address, whatever was on the end of it; its files without theirs)
function shellKey(request) {
    if (request.mode === "navigate") return new URL("./", self.registration.scope).href;
    return songKey(request.url);
}

// What was kept straight away (fetched afresh behind it), or the network's answer, kept
async function keptThenRefreshed(request, cacheName) {
    const cache = await caches.open(cacheName);
    const match = await cache.match(request);
    const network = fetch(request).then((response) => {
        if (response.ok || response.type === "opaque") cache.put(request, response.clone()).catch(() => {});
        return response;
    });
    if (match) {
        network.catch(() => {});
        return match;
    }
    return network;
}

// A song from what was kept, whole or the byte range asked for; otherwise from the network (a whole
// song that comes that way, as when the page fetches the next one, is kept as it goes by)
async function fromSongs(request) {
    const key = songKey(request.url);
    const cache = await caches.open(SONG_CACHE);
    const kept = await cache.match(key) || await caches.match(key, { cacheName: SHELL_CACHE });
    if (kept) return answerRange(request, kept);
    const response = await fetch(request);
    if (response.status === 200 && !request.headers.has("range") && /\.mp3$/i.test(new URL(key).pathname)) {
        cache.put(key, response.clone()).catch(() => {});
    }
    return response;
}

function songKey(url) {
    const key = new URL(url);
    key.search = "";
    key.hash = "";
    return key.href;
}

// (the last couple of songs asked for stay in memory: a player asks for a lot of little ranges)
const recentSongs = new Map();

async function answerRange(request, kept) {
    const range = /^bytes=(\d*)-(\d*)$/.exec((request.headers.get("range") || "").trim());
    const type = kept.headers.get("Content-Type") || "application/octet-stream";
    if (!range || (range[1] === "" && range[2] === "")) return kept;
    const key = songKey(request.url);
    let blob = recentSongs.get(key);
    if (!blob) {
        blob = await kept.blob();
        recentSongs.set(key, blob);
        while (recentSongs.size > 2) recentSongs.delete(recentSongs.keys().next().value);
    }
    const size = blob.size;
    let start;
    let end;
    if (range[1] === "") {
        start = Math.max(0, size - Number(range[2]));
        end = size - 1;
    } else {
        start = Number(range[1]);
        end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    }
    if (start >= size || start > end) {
        return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }
    return new Response(blob.slice(start, end + 1), {
        status: 206,
        headers: {
            "Content-Type": type,
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Content-Length": String(end - start + 1),
            "Accept-Ranges": "bytes"
        }
    });
}

// "Keep this song": it's fetched whole and kept (once), to play without signal later
const keeping = new Map();

self.addEventListener("message", (event) => {
    const data = event.data || {};
    if (data.type === "keep-song" && typeof data.url === "string") event.waitUntil(keepSong(data.url));
});

async function keepSong(url) {
    const key = songKey(url);
    if (new URL(key).origin !== self.location.origin || keeping.has(key)) return keeping.get(key);
    const cache = await caches.open(SONG_CACHE);
    if (await cache.match(key)) return undefined;
    const job = fetch(key)
        .then((response) => (response.status === 200 ? cache.put(key, response) : undefined))
        .catch(() => {})
        .finally(() => keeping.delete(key));
    keeping.set(key, job);
    return job;
}
