#!/usr/bin/env node
// Writes history.json and the pictures in history/: the jukebox's big moments, newest first, each
// with a tiny picture of how the jukebox looked then (the history on the back of the jukebox reads
// them). Each moment's version of the jukebox is checked out from git as it was, served here, and
// photographed in headless Chrome on a phone-sized screen. Run it from the repo root after adding a
// moment to MOMENTS (oldest first; "commit" is the version to photograph, "pose" how):
//
//     node tools/make-history.mjs
//
// Needs Node 22 or newer, git, and Google Chrome (set CHROME to its path if it isn't found).
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

// pose: "front" as it opens, "playing" with the first song on, "back" turned round
const MOMENTS = [
    { date: "2024-10-27", title: "The jukebox opens", commit: "6c20faa", pose: "front",
        text: "Four songs with plain players and no covers yet, a tag filter, and the frog quest badge." },
    { date: "2024-10-30", title: "Penguins and covers", commit: "0b22a95", pose: "front",
        text: "The jukebox gets its look: two penguins keeping watch, a welcome note, cover art and Play buttons." },
    { date: "2024-12-06", title: "Callout", commit: "bcf5a54", pose: "front",
        text: "The first new song since opening week." },
    { date: "2025-01-14", title: "Drift drops in", commit: "f9adf90", pose: "front",
        text: "A new song to start 2025." },
    { date: "2025-04-05", title: "Made for phones", commit: "9cc3742", pose: "front",
        text: "Rebuilt to fit properly on a phone." },
    { date: "2025-11-17", title: "A new look", commit: "558338f", pose: "front",
        text: "Darker, starrier colors, a better fit on phones, and Dropoff." },
    { date: "2026-02-18", title: "The overhaul", commit: "992da60", pose: "front",
        text: "Bigger cover art on every song, and three new ones: Runaway, Leafed and the Gallery remix." },
    { date: "2026-03-04", title: "A lotta lot", commit: "fc68342", pose: "front",
        text: "A whole catalog of older songs moves in, with sorting, a tag picker and 10-second skips." },
    { date: "2026-07-31", title: "Countdown Island", commit: "04c200d", pose: "front",
        text: "Countdown Island arrives, along with its slowed-down twin." },
    { date: "2026-08-10", title: "Marquees and Exhale", commit: "3923ccd", pose: "front",
        text: "Long tags scroll along like marquees, and Exhale joins." },
    { date: "2026-10-25", title: "Keep it playing", commit: "79a2056", pose: "playing",
        text: "Songs can play on one after another (shuffled, if you like), even with the screen off, and the record scratches like a DJ's." },
    { date: "2026-10-25", title: "Jukebot moves in", commit: "79a2056", pose: "back",
        text: "The jukebox turns round, and on its back lives Jukebot: a little robot with bugs in his wiring for you to fix." },
    { date: "2026-10-26", title: "A real cabinet", commit: "e2ebc31", pose: "playing",
        text: "A proper jukebox cabinet that turns round in 3D, speakers that pulse to the beat, songs that blend into each other, and a face for Jukebot." },
    { date: "2026-10-28", title: "Waves and lights", commit: "da3cc3b", pose: "playing",
        text: "Every song gets its own wave to scrub along, the lights and equalizer follow the music, and Jukebot's repair job gets an ending (and a secret)." },
    { date: "2026-10-29", title: "Side A, side B", commit: "ed20642", pose: "playing",
        text: "Countdown Island flips over to its slowed side B, an LED sign scrolls along the front, and the penguins can dance to the beat." },
    { date: "2026-10-31", title: "Turn it by hand", commit: "0699eaf", pose: "front",
        text: "Grab the jukebox by its side and turn it round yourself. Plus a new Queen Moth and a fresher record clack." },
    { date: "2026-11-01", title: "New menus", commit: "03a0543", pose: "playing",
        text: "New Sort and Tag menus, penguins that dance along with you, and the playing song's cover fills its row." },
    { date: "2026-11-02", title: "A history on the back", commit: "HEAD", pose: "back",
        text: "This history, a bigger wordmark with a soft glow, and side flips that glide on iPhones." }
];

const WIDTH = 390;
const HEIGHT = 844;
const SMALL_WIDTH = 120; // px: the tiny picture in the list
const PICTURE_WIDTH = 585; // px: the bigger one a tap shows (sharp enough at a phone's size)
const IPHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";
const CHROME = process.env.CHROME || [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium"
].find((file) => fs.existsSync(file));
const TYPES = {
    ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp",
    ".svg": "image/svg+xml", ".ico": "image/x-icon", ".mp3": "audio/mpeg", ".woff2": "font/woff2", ".xml": "application/xml",
    ".txt": "text/plain", ".webmanifest": "application/manifest+json"
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The checked-out jukebox, served as GitHub Pages would (byte ranges too, so its songs can play)
function serve(root) {
    const server = http.createServer((request, response) => {
        let file = path.join(root, decodeURIComponent(new URL(request.url, "http://local").pathname));
        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
        if (!file.startsWith(root) || !fs.existsSync(file)) {
            response.writeHead(404).end();
            return;
        }
        const size = fs.statSync(file).size;
        const headers = { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Accept-Ranges": "bytes", "Cache-Control": "no-store" };
        const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || "");
        if (range && (range[1] || range[2])) {
            const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
            const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
            response.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
            fs.createReadStream(file, { start, end }).pipe(response);
            return;
        }
        response.writeHead(200, { ...headers, "Content-Length": size });
        fs.createReadStream(file).pipe(response);
    });
    return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

// Headless Chrome, driven over its DevTools protocol
async function openChrome(profile) {
    const port = 9300 + Math.floor(Math.random() * 600);
    const chrome = spawn(CHROME, [
        "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--mute-audio", "--hide-scrollbars",
        "--autoplay-policy=no-user-gesture-required", "--no-first-run", "--no-default-browser-check", `--window-size=${WIDTH},${HEIGHT}`, "about:blank"
    ], { stdio: "ignore" });
    let target = null;
    for (let attempt = 0; attempt < 80 && !target; attempt += 1) {
        await sleep(200);
        try {
            target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((item) => item.type === "page");
        } catch (error) {
            // not up yet
        }
    }
    if (!target) throw new Error("Chrome didn't start");
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
        socket.addEventListener("open", resolve);
        socket.addEventListener("error", reject);
    });
    let nextId = 0;
    const pending = new Map();
    const loadWaiters = [];
    socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.id && pending.has(message.id)) {
            pending.get(message.id)(message);
            pending.delete(message.id);
        } else if (message.method === "Page.loadEventFired") {
            loadWaiters.splice(0).forEach((resolve) => resolve());
        }
    });
    const send = (method, params = {}) => new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, (message) => (message.error ? reject(new Error(`${method}: ${message.error.message}`)) : resolve(message.result)));
        socket.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async (expression) => {
        const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true, userGesture: true });
        return result.result ? result.result.value : undefined;
    };
    const load = async (url) => {
        const loaded = new Promise((resolve) => loadWaiters.push(resolve));
        await send("Page.navigate", { url });
        await loaded;
    };
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Network.enable");
    await send("Network.setCacheDisabled", { cacheDisabled: true });
    await send("Emulation.setUserAgentOverride", { userAgent: IPHONE_UA, platform: "iPhone" });
    await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: true });
    await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    return { chrome, socket, send, evaluate, load };
}

// The first of these on the page that's there gets a tap (they changed over the years)
const tap = (selectors, text) => `(() => {
    let target = ${JSON.stringify(selectors)}.map((selector) => document.querySelector(selector)).find(Boolean);
    if (!target) target = Array.from(document.querySelectorAll("button, [role=button], a")).find((element) => element.textContent.trim().toLowerCase().includes(${JSON.stringify(text)}));
    if (target) target.click();
    return Boolean(target);
})()`;

async function main() {
    if (!CHROME) throw new Error("Chrome wasn't found: set CHROME to its path");
    const repo = process.cwd();
    if (!fs.existsSync(path.join(repo, ".git"))) throw new Error("Run it from the repo root");
    const work = fs.mkdtempSync(path.join(os.tmpdir(), "jukebox-history-"));
    const tree = path.join(work, "tree");
    const profile = path.join(work, "chrome");
    execFileSync("git", ["worktree", "add", "--detach", tree, "HEAD"], { stdio: "ignore" });
    const server = await serve(tree);
    const page = await openChrome(profile);
    try {
        fs.mkdirSync(path.join(repo, "history"), { recursive: true });
        const names = new Map();
        const written = [];
        for (const moment of MOMENTS) {
            execFileSync("git", ["-C", tree, "checkout", "-q", "--detach", moment.commit === "HEAD" ? execFileSync("git", ["rev-parse", "HEAD"]).toString().trim() : moment.commit]);
            await page.load(`http://127.0.0.1:${server.address().port}/?photo=${Date.now()}`);
            await page.evaluate("document.fonts ? document.fonts.ready.then(() => true) : true");
            await sleep(3200);
            if (moment.pose === "playing") {
                await page.evaluate(tap(["#track-list .track .play-button", ".play-button", ".play-btn"], "play"));
                await sleep(3200);
            } else if (moment.pose === "back") {
                await page.evaluate(tap(['[data-flip-jukebox="back"]', ".flip-sign"], "flip me"));
                await sleep(1800);
            }
            // (two moments on one day: the second is "-2")
            const count = (names.get(moment.date) || 0) + 1;
            names.set(moment.date, count);
            const name = `history/${moment.date}${count > 1 ? `-${count}` : ""}`;
            const shoot = async (scale, file) => {
                const shot = await page.send("Page.captureScreenshot", { format: "webp", quality: 72, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale } });
                fs.writeFileSync(path.join(repo, file), Buffer.from(shot.data, "base64"));
            };
            await shoot(PICTURE_WIDTH / WIDTH / 2, `${name}.webp`);
            await shoot(SMALL_WIDTH / WIDTH / 2, `${name}-small.webp`);
            await page.evaluate("localStorage.clear(); sessionStorage.clear(); true");
            written.push({ date: moment.date, title: moment.title, text: moment.text, picture: `${name}.webp`, small: `${name}-small.webp` });
            console.log(`${moment.date}  ${moment.title}  (${moment.pose})`);
        }
        const history = { moments: written.reverse() };
        fs.writeFileSync(path.join(repo, "history.json"), `${JSON.stringify(history, null, 1)}\n`);
        console.log(`${written.length} moments written to history.json and history/`);
    } finally {
        page.socket.close();
        page.chrome.kill();
        server.close();
        await sleep(500);
        execFileSync("git", ["worktree", "remove", "--force", tree], { stdio: "ignore" });
        try {
            fs.rmSync(work, { recursive: true, force: true });
        } catch (error) {
            // (Chrome's still letting go of its profile: the system's temp clean-up gets it)
        }
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
