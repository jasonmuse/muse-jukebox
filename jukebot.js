// Fix Jukebot: the jukebox is Jukebot, and it's on the fritz. Fixing it is one repair job in six
// steps: open the rear panel, sweep out the bugs, solder the broken wires, reboot its memory, beat
// the bug queen, then clean up and screw the panel back on. The panel stays off from the first
// step to the last (leave mid-job and it's just leaned back on). Once Jukebot's fixed there's Bug
// blitz, endless bugs for fun, and a secret.
(() => {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const EDGE = 4;
    const SCREW_HOLD_SECONDS = 0.7; // holding a screw turns it all the way out (or in) in this long
    const SCREW_TAP_TURN = 0.5; // a quick tap turns it halfway
    const ZAP_CHARGE_NEEDED = 6;
    const ZAP_RADIUS = 140;
    const GLOW_CHARGE_RANGE = 80;
    const SOLDER_SECONDS = 0.9; // holding the iron on a broken wire mends it in this long
    const BREAK_DRAIN = 0.4; // power (%) each broken wire leaks away a second
    const MEMORY_ROUNDS = [3, 4, 5, 6]; // lights to remember in each round of the memory step
    const MEMORY_COLORS = ["#ff86d6", "#7fe6ff", "#b79bff", "#ffe680"];
    const MEMORY_NOTES = ["\u266A", "\u266B", "\u266C", "\u2669"];
    const SECRET_BOOPS = 5; // boops in a row on the fixed Jukebot's sticker
    const MAX_SPLATS = 20;
    const STORAGE_KEY = "museJukeboxJukebot";
    const HAPPY_LINES = ["Super duper!", "Good as new!", "Beep boop, thank you!", "Back in the groove!"];
    const SQUASH_LINES = ["Splat!", "Got one!", "Squashed!", "Nice swing!", "Bzzt... gone."];
    const SIZZLE_LINES = ["Sizzle!", "Zapped!", "Tssss!"];
    const CHEW_LINES = ["Ow! It's chewing me!", "Hey! That's my core!", "Get it off me!"];
    const BOOP_LINES = ["Boop!", "Hehe, that tickles!", "Beep?"];
    const MEMORY_LINES = ["Got it!", "Yes! It's coming back!", "Beep! More!"];
    const MOODS = ["broken", "worried", "scared", "ouch", "happy", "excited"];
    // The repair job, step by step
    const JOB_STEPS = [
        {
            id: "open",
            title: "Open me up",
            goal: "Hold each of my 4 corner screws to twist it out.",
            done: "I'm open! Eek, look at this mess..."
        },
        {
            id: "sweep",
            title: "Bug sweep",
            goal: "Swat every bug before it chews my chip. Leave the glowbugs alone: they recharge me!",
            done: "All swept out!",
            bugs: { fly: 6, beetle: 3 },
            glowbugs: 2,
            maxOnBoard: 4
        },
        {
            id: "wiring",
            title: "Fix my wiring",
            goal: "Hold the soldering iron on each sparking wire to mend it. Tap the fleas to zap them!",
            done: "Wires all fixed!",
            bugs: { hopper: 4 },
            glowbugs: 1,
            maxOnBoard: 2
        },
        {
            id: "memory",
            title: "Reboot my memory",
            goal: "Watch my memory lights, then tap them back in the same order.",
            done: "Memory restored!"
        },
        {
            id: "queen",
            title: "The bug queen",
            goal: "The Queen Moth is nesting in me! Bonk her, swat her swarm, and zap them when I'm charged.",
            done: "The queen is gone!",
            bugs: { fly: 5, beetle: 2, hopper: 2 },
            queen: true,
            queenHp: 10,
            glowbugs: 3,
            maxOnBoard: 5,
            speedScale: 1.12,
            drainScale: 1.1
        },
        {
            id: "close",
            title: "Close me up",
            goal: "Scrub off all the goo, then screw my panel back on.",
            done: ""
        }
    ];
    const MEMORY_STEP = JOB_STEPS.findIndex((step) => step.id === "memory");
    const STEP_ICONS = {
        open: '<circle cx="12" cy="12" r="7.5"/><path d="M9 9l6 6M15 9l-6 6"/>',
        sweep: '<ellipse cx="12" cy="13.5" rx="4.4" ry="5.8"/><path d="M12 7.7V4.5M9.4 5.2l1.4 2.2M14.6 5.2l-1.4 2.2M7.6 12H4.5M7.8 16.2l-2.8 2M16.4 12h3.1M16.2 16.2l2.8 2"/>',
        wiring: '<path d="M13 2.8 6 13.2h5.3l-1 8 7.7-11.2h-5.4z"/>',
        memory: '<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.6" cy="17.6" r="2.4"/><circle cx="16.6" cy="15.6" r="2.4"/>',
        queen: '<path d="M4.5 17 3.5 7.5l4.7 3.8L12 5l3.8 6.3 4.7-3.8-1 9.5z"/><path d="M5.5 20h13"/>',
        close: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="8.2" cy="8.2" r="1.3"/><circle cx="15.8" cy="8.2" r="1.3"/><circle cx="8.2" cy="15.8" r="1.3"/><circle cx="15.8" cy="15.8" r="1.3"/>'
    };
    const BUG_TYPES = {
        fly: { radius: 13, hp: 1, speed: [95, 140], goo: "#c8e64a", scale: 1.2, bite: 5, seek: 0.3, flier: true },
        beetle: { radius: 14, hp: 2, speed: [36, 52], goo: "#6fd36f", scale: 1.2, bite: 8, seek: 0.85 },
        hopper: { radius: 11, hp: 1, speed: [210, 260], goo: "#ff9a62", scale: 1.2, bite: 6, seek: 0.6, dodges: 2 },
        glowbug: { radius: 13, hp: 1, speed: [28, 40], goo: "#f4ff9a", scale: 1.2, friendly: true },
        queen: { radius: 30, hp: 6, speed: [44, 54], goo: "#c56cf0", scale: 1.3, bite: 0, seek: 0 }
    };

    function svgEl(tag, attributes, parent) {
        const element = document.createElementNS(SVG_NS, tag);
        Object.entries(attributes || {}).forEach(([name, value]) => element.setAttribute(name, value));
        if (parent) parent.appendChild(element);
        return element;
    }

    function randomBetween(min, max) {
        return min + (Math.random() * (max - min));
    }

    function pick(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    function shuffle(list) {
        const copy = [...list];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
        }
        return copy;
    }

    // Small seeded random so the circuit board looks the same every time
    function seededRandom(seed) {
        let state = seed;
        return () => {
            state = (state + 0x6D2B79F5) | 0;
            let value = Math.imul(state ^ (state >>> 15), 1 | state);
            value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
            return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
        };
    }

    // The bugs for a step of the job (or a wave of Bug blitz)
    function getBugConfig(step) {
        const bugs = step.bugs || {};
        return {
            flies: bugs.fly || 0,
            beetles: bugs.beetle || 0,
            hoppers: bugs.hopper || 0,
            queen: Boolean(step.queen),
            queenHp: step.queenHp || BUG_TYPES.queen.hp,
            glowbugs: step.glowbugs || 0,
            speedScale: step.speedScale || 1,
            seekBoost: step.seekBoost || 0,
            drainScale: step.drainScale || 1,
            maxOnBoard: step.maxOnBoard || 4
        };
    }

    // Bug blitz: every wave brings more bugs, faster and hungrier
    function getBlitzConfig(wave) {
        return getBugConfig({
            bugs: { fly: 3 + wave, beetle: Math.floor(wave / 2), hopper: Math.floor((wave - 1) / 2) },
            queen: wave % 4 === 0,
            queenHp: 6 + wave,
            glowbugs: 1 + Math.floor(wave / 3),
            speedScale: 1 + Math.min(0.9, (wave - 1) * 0.08),
            seekBoost: Math.min(0.3, (wave - 1) * 0.04),
            drainScale: 1 + Math.min(1.2, (wave - 1) * 0.12),
            maxOnBoard: Math.min(8, 3 + Math.floor(wave / 2))
        });
    }

    // How far the job's got (the step to do next; past the last step means fixed), plus Bug blitz's
    // best and the secret
    function readProgress() {
        const fresh = { version: 2, step: 0, jobSeconds: 0, bestJob: 0, squashed: 0, blitzBest: 0, gold: false, secretFound: false };
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
            if (saved.version !== 2) return fresh;
            const step = Math.round(Number(saved.step) || 0);
            return {
                version: 2,
                step: Math.max(0, Math.min(JOB_STEPS.length, step)),
                jobSeconds: Number(saved.jobSeconds) || 0,
                bestJob: Number(saved.bestJob) || 0,
                squashed: Number(saved.squashed) || 0,
                blitzBest: Number(saved.blitzBest) || 0,
                gold: saved.gold === true,
                secretFound: saved.secretFound === true
            };
        } catch (error) {
            return fresh;
        }
    }

    function saveProgress(progress) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (error) {
            // Storage unavailable; progress lasts for this visit only
        }
    }

    // Jukebot's face: an LED screen. Every expression is drawn; CSS shows the one for the current mood
    function getFaceMarkup(scale) {
        const f = (value) => (value * scale).toFixed(2);
        const eye = (side) => `
            <g transform="translate(${f(side * 22)} ${f(-6)})"><g class="jb-eye-lid">
                <rect class="jb-eye jb-eye--open" x="${f(-7)}" y="${f(-9)}" width="${f(14)}" height="${f(18)}" rx="${f(5)}"/>
                <circle class="jb-eye jb-eye--wide" r="${f(9)}"/>
                <path class="jb-eye jb-eye--happy" d="M${f(-8)} ${f(4)}Q0 ${f(-9)} ${f(8)} ${f(4)}"/>
                <path class="jb-eye jb-eye--x" d="M${f(-6)} ${f(-6)}L${f(6)} ${f(6)}M${f(6)} ${f(-6)}L${f(-6)} ${f(6)}"/>
                <path class="jb-eye jb-eye--chevron" d="M${f(-6 * side)} ${f(-7)}L${f(5 * side)} 0L${f(-6 * side)} ${f(7)}"/>
            </g></g>`;
        return `
            <rect class="jb-screen" x="${f(-52)}" y="${f(-32)}" width="${f(104)}" height="${f(64)}" rx="${f(12)}"/>
            <rect class="jb-screen-scan" x="${f(-52)}" y="${f(-32)}" width="${f(104)}" height="${f(64)}" rx="${f(12)}"/>
            <g class="jb-led-face">
                <g class="jb-look">${eye(-1)}${eye(1)}</g>
                <g class="jb-cheeks"><rect x="${f(-36)}" y="${f(7)}" width="${f(9)}" height="${f(4)}" rx="${f(2)}"/><rect x="${f(27)}" y="${f(7)}" width="${f(9)}" height="${f(4)}" rx="${f(2)}"/></g>
                <g transform="translate(0 ${f(17)})">
                    <path class="jb-mouth jb-mouth--wave" d="M${f(-14)} 0q${f(3.5)} ${f(-4)} ${f(7)} 0t${f(7)} 0t${f(7)} 0t${f(7)} 0"/>
                    <path class="jb-mouth jb-mouth--smile" d="M${f(-13)} ${f(-3)}Q0 ${f(9)} ${f(13)} ${f(-3)}"/>
                    <ellipse class="jb-mouth jb-mouth--o" rx="${f(5)}" ry="${f(6)}"/>
                    <path class="jb-mouth jb-mouth--zigzag" d="M${f(-14)} 0l${f(4)} ${f(-3)} ${f(4)} ${f(3)} ${f(4)} ${f(-3)} ${f(4)} ${f(3)} ${f(4)} ${f(-3)} ${f(4)} ${f(3)} ${f(4)} ${f(-3)}"/>
                    <path class="jb-mouth jb-mouth--grin" d="M${f(-14)} ${f(-4)}Q0 ${f(14)} ${f(14)} ${f(-4)}Z"/>
                </g>
            </g>
            <rect class="jb-screen-flash" x="${f(-52)}" y="${f(-32)}" width="${f(104)}" height="${f(64)}" rx="${f(12)}"/>`;
    }

    function drawBugArt(type, art) {
        if (type === "fly") {
            svgEl("ellipse", { class: "jb-wing jb-wing--left", cx: -7, cy: 1, rx: 8, ry: 4.5 }, art);
            svgEl("ellipse", { class: "jb-wing jb-wing--right", cx: 7, cy: 1, rx: 8, ry: 4.5 }, art);
            svgEl("ellipse", { class: "jb-fly-body", cx: 0, cy: 3, rx: 4.6, ry: 7.6 }, art);
            svgEl("path", { class: "jb-fly-stripes", d: "M-4 3h8M-3.4 6.6h6.8" }, art);
            svgEl("circle", { class: "jb-fly-eye", cx: -3.4, cy: -4.6, r: 3.8 }, art);
            svgEl("circle", { class: "jb-fly-eye", cx: 3.4, cy: -4.6, r: 3.8 }, art);
            svgEl("circle", { class: "jb-eye-shine", cx: -4.4, cy: -5.7, r: 1.1 }, art);
            svgEl("circle", { class: "jb-eye-shine", cx: 2.4, cy: -5.7, r: 1.1 }, art);
            return;
        }

        if (type === "beetle") {
            svgEl("path", { class: "jb-beetle-legs", d: "M-5-3-11-7M-6 1h-6M-5 5l-6 4M5-3l6-4M6 1h6M5 5l6 4" }, art);
            svgEl("path", { class: "jb-beetle-antennae", d: "M-2-10-4.5-14.5M2-10l2.5-4.5" }, art);
            svgEl("ellipse", { class: "jb-beetle-shell", cx: 0, cy: 2, rx: 7.4, ry: 9 }, art);
            svgEl("path", { class: "jb-beetle-seam", d: "M0-6v17" }, art);
            svgEl("circle", { class: "jb-beetle-spot", cx: -3.2, cy: 0, r: 1.6 }, art);
            svgEl("circle", { class: "jb-beetle-spot", cx: 3.4, cy: 5, r: 1.6 }, art);
            svgEl("path", { class: "jb-beetle-crack", d: "M-5-2l3 2.5-2 3 3 3M4-3l-2 3 2 2" }, art);
            svgEl("circle", { class: "jb-beetle-head", cx: 0, cy: -8, r: 4 }, art);
            return;
        }

        if (type === "hopper") {
            // Flea: big springy back legs
            svgEl("path", { class: "jb-hopper-legs", d: "M-3.5 3-10 7.5-7.5 12.5M3.5 3l6.5 4.5-2.5 5M-3-2.5-8-5M3-2.5l5-2.5" }, art);
            svgEl("ellipse", { class: "jb-hopper-body", cx: 0, cy: 1.5, rx: 5.6, ry: 7.2 }, art);
            svgEl("path", { class: "jb-hopper-shine", d: "M-2.6-3q2.4-2.2 4.8 0" }, art);
            svgEl("circle", { class: "jb-hopper-head", cx: 0, cy: -6.4, r: 3.4 }, art);
            svgEl("circle", { class: "jb-fly-eye", cx: -1.5, cy: -7.3, r: 1.2 }, art);
            svgEl("circle", { class: "jb-fly-eye", cx: 1.5, cy: -7.3, r: 1.2 }, art);
            return;
        }

        if (type === "glowbug") {
            svgEl("circle", { class: "jb-glow-halo", r: 16, fill: "url(#jb-glow)" }, art);
            svgEl("ellipse", { class: "jb-wing jb-glow-wing jb-wing--left", cx: -5, cy: 0, rx: 5, ry: 3 }, art);
            svgEl("ellipse", { class: "jb-wing jb-glow-wing jb-wing--right", cx: 5, cy: 0, rx: 5, ry: 3 }, art);
            svgEl("ellipse", { class: "jb-glow-tail", cx: 0, cy: 4.5, rx: 4.2, ry: 5.6 }, art);
            svgEl("ellipse", { class: "jb-glow-body", cx: 0, cy: -1.5, rx: 3.2, ry: 3.4 }, art);
            svgEl("circle", { class: "jb-glow-head", cx: 0, cy: -5.6, r: 2.6 }, art);
            return;
        }

        // Queen Moth (boss): a chunky, outlined cartoon sprite, like the boss fly of a certain old
        // swatting game. Her wings flap in two frames, as a sprite's would.
        [["up", "M-4-5C-13-21-32-22-31-7-30 2-17 4-5 0Z", "M-4 3C-15 4-25 13-20 21-15 27-7 16-3 9Z", -19, -9],
            ["down", "M-4-3C-17-12-33-6-30 5-27 13-15 9-5 2Z", "M-4 4C-13 9-19 20-13 25-8 28-5 17-3 10Z", -18, -1]].forEach(([frame, upper, lower, spotX, spotY]) => {
            const wings = svgEl("g", { class: `jb-queen-wings jb-queen-wings--${frame}` }, art);
            [-1, 1].forEach((side) => {
                const flip = side === 1 ? { transform: "scale(-1 1)" } : {};
                const half = svgEl("g", flip, wings);
                svgEl("path", { class: "jb-queen-wing", d: upper }, half);
                svgEl("path", { class: "jb-queen-wing jb-queen-wing--low", d: lower }, half);
                svgEl("circle", { class: "jb-queen-eyespot", cx: spotX, cy: spotY, r: 4.4 }, half);
                svgEl("circle", { class: "jb-queen-eyespot-dot", cx: spotX + 0.7, cy: spotY + 0.5, r: 1.9 }, half);
            });
        });
        svgEl("ellipse", { class: "jb-queen-abdomen", cx: 0, cy: 9.5, rx: 6.6, ry: 11.5 }, art);
        svgEl("path", { class: "jb-queen-bands", d: "M-6.2 6h12.4M-5.8 11.2h11.6M-4.6 16.2h9.2" }, art);
        svgEl("ellipse", { class: "jb-queen-ruff", cx: 0, cy: -2.5, rx: 8.6, ry: 5.2 }, art);
        svgEl("path", { class: "jb-queen-antennae", d: "M-2.6-15.4C-4.2-20.4-8.4-22.8-12-21.8M2.6-15.4C4.2-20.4 8.4-22.8 12-21.8" }, art);
        svgEl("path", { class: "jb-queen-feathers", d: "M-5.4-19.6l-1.4-2.2M-7.8-21.2l-.8-2.5M-10.2-21.9l-.1-2.6M5.4-19.6l1.4-2.2M7.8-21.2l.8-2.5M10.2-21.9l.1-2.6" }, art);
        svgEl("circle", { class: "jb-queen-head", cx: 0, cy: -10, r: 7.2 }, art);
        svgEl("ellipse", { class: "jb-queen-eye", cx: -3, cy: -11, rx: 2.7, ry: 3.3 }, art);
        svgEl("ellipse", { class: "jb-queen-eye", cx: 3, cy: -11, rx: 2.7, ry: 3.3 }, art);
        const pupils = svgEl("g", { class: "jb-queen-pupils" }, art);
        svgEl("circle", { class: "jb-queen-pupil", cx: -2.6, cy: -10.3, r: 1.35 }, pupils);
        svgEl("circle", { class: "jb-queen-pupil", cx: 3.4, cy: -10.3, r: 1.35 }, pupils);
        svgEl("path", { class: "jb-queen-brows", d: "M-5.8-15.4l4.4 2M5.8-15.4l-4.4 2" }, art);
        svgEl("path", { class: "jb-queen-mouth", d: "M-2.8-6.2q2.8 2.2 5.6 0" }, art);
        svgEl("path", { class: "jb-queen-fang", d: "M.9-5.6l.9 1.8.9-2z" }, art);
        svgEl("path", { class: "jb-queen-crown", d: "M-5.2-15.6-6.4-22l3.2 2.6 3.2-4.8 3.2 4.8 3.2-2.6-1.2 6.4z" }, art);
        svgEl("circle", { class: "jb-queen-gem", cx: 0, cy: -18.4, r: 1.2 }, art);
        // Seeing stars after a bonk
        const stars = svgEl("g", { class: "jb-queen-stars", transform: "translate(0 -27)" }, art);
        const spin = svgEl("g", { class: "jb-queen-stars-spin" }, stars);
        [0, 120, 240].forEach((angle) => {
            svgEl("path", { class: "jb-queen-star", d: "M0-3.4l1 2.1 2.3.3-1.7 1.6.4 2.3L0 1.7-2 2.8l.4-2.3-1.7-1.6 2.3-.3z", transform: `rotate(${angle}) translate(0 -8) rotate(${-angle})` }, spin);
        });
    }

    function init() {
        const root = document.getElementById("jukebot");
        if (!root) return;

        const internals = document.getElementById("jb-internals");
        const boardLayer = document.getElementById("jb-board");
        const core = document.getElementById("jb-core");
        const bugLayer = document.getElementById("jb-bugs");
        const splatLayer = document.getElementById("jb-splats");
        const repairLayer = document.getElementById("jb-repairs");
        const zapLayer = document.getElementById("jb-zaps");
        const fxLayer = document.getElementById("jb-fx");
        const tool = document.getElementById("jb-tool");
        const screws = Array.from(root.querySelectorAll(".jb-screw"));
        const lights = Array.from(document.querySelectorAll(".jb-light"));
        const statusText = document.getElementById("jb-status");
        const hudLevel = document.getElementById("jb-level");
        const hudBugs = document.getElementById("jb-bug-count");
        const hudPower = document.getElementById("jb-power");
        const hudPowerFill = document.getElementById("jb-power-fill");
        const hudPowerText = document.getElementById("jb-power-text");
        const hudTime = document.getElementById("jb-time");
        const comboBadge = document.getElementById("jb-combo");
        const speech = document.getElementById("jb-speech");
        const stickerFace = document.getElementById("jb-sticker-face");
        const stickerBoop = document.getElementById("jb-sticker-boop");
        const stickerTitle = document.getElementById("jb-sticker-title");
        const stickerText = document.getElementById("jb-sticker-text");
        const stickerSteps = document.getElementById("jb-sticker-steps");
        const stickerNote = document.getElementById("jb-sticker-note");
        const stickerActions = document.getElementById("jb-sticker-actions");
        const mission = document.getElementById("jb-mission");
        const missionSteps = document.getElementById("jb-mission-steps");
        const missionKicker = document.getElementById("jb-mission-kicker");
        const missionTitle = document.getElementById("jb-mission-title");
        const missionGoal = document.getElementById("jb-mission-goal");
        const missionStart = document.getElementById("jb-mission-start");
        const resultsOverlay = document.getElementById("jb-results");
        const resultsBadge = document.getElementById("jb-results-badge");
        const resultsTitle = document.getElementById("jb-results-title");
        const resultsStats = document.getElementById("jb-results-stats");
        const resultsNote = document.getElementById("jb-results-note");
        const resultsPrimary = document.getElementById("jb-results-primary");
        const resultsSecondary = document.getElementById("jb-results-secondary");

        let progress = readProgress();
        let game = null;
        let boardSplats = []; // goo left on the board by the job so far (it's cleaned up at the end)
        let resultsActions = { primary: null, secondary: null };
        let boops = [];
        let size = { width: 0, height: 0 };
        let coreLayout = { x: 0, y: 0, halfWidth: 66, halfHeight: 46, scale: 1 };
        let coreFace = null;
        let chargeLeds = [];
        let currentMood = null;
        let moodHoldUntil = 0;
        let comboTimer = null;
        let toolHideTimer = null;
        let speechTimer = null;
        let speechQuietUntil = 0;
        let pointerPoint = null;
        let lookOverride = null;
        let lastLook = { x: 0, y: 0 };
        let shownPowerLevel = "1.00"; // what the PWR LED shows
        const shownHud = {}; // what the HUD shows, so it's only touched when something changes
        let boardDirty = false;
        let boardDrawTimer = null;

        // The tools live above everything else on the page, so the panel's edges never cut them off
        document.body.appendChild(tool);

        const stickerFaceGroup = svgEl("g", { class: "jb-face jb-face--sticker" }, stickerFace);
        stickerFaceGroup.innerHTML = getFaceMarkup(0.5);

        // ───── Small helpers ─────
        function later(callback, delay) {
            const id = setTimeout(callback, delay);
            if (game) game.timers.push(id);
            return id;
        }

        function getBounds() {
            return { x0: EDGE, y0: EDGE, x1: size.width - EDGE, y1: size.height - EDGE };
        }

        function setMoodClass(mood) {
            if (mood === currentMood) return;
            currentMood = mood;
            MOODS.forEach((name) => root.classList.toggle(`mood-${name}`, name === mood));
        }

        // Jukebot's resting expression for what's going on right now
        function getBaseMood() {
            if (!game) return root.classList.contains("is-fixed") ? "happy" : "broken";
            if (["between", "clean", "screwin", "done"].includes(game.stage)) return "happy";
            if (game.stage === "memory") return "worried";
            if (game.stage === "swat" || game.stage === "wiring") {
                const chewed = game.bugs.some((bug) => bug.state === "alive" && bug.mode === "chew");
                return chewed || game.power < 25 ? "scared" : "worried";
            }
            return "broken";
        }

        // A quick reaction, then back to the resting expression
        function react(mood, holdMs) {
            setMoodClass(mood);
            moodHoldUntil = performance.now() + holdMs;
        }

        function setTool(name) {
            tool.dataset.tool = name || "";
            if (!name) tool.classList.remove("is-visible", "is-twisting");
        }

        function setStatus(message) {
            statusText.textContent = message;
            statusText.classList.toggle("is-visible", Boolean(message));
        }

        function lightUp(count) {
            lights.forEach((light, index) => light.classList.toggle("is-lit", index < count));
        }

        function toLocalPoint(event) {
            const rect = root.getBoundingClientRect();
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        }

        function getElementCenter(element) {
            const rect = element.getBoundingClientRect();
            const rootRect = root.getBoundingClientRect();
            return { x: rect.left + (rect.width / 2) - rootRect.left, y: rect.top + (rect.height / 2) - rootRect.top };
        }

        function moveTool(point) {
            const rect = root.getBoundingClientRect();
            // (the page may be shifted to line up with Safari's screen, and the tool moves with it)
            const shift = parseFloat(document.documentElement.style.getPropertyValue("--viewport-shift")) || 0;
            tool.style.transform = `translate(${(rect.left + point.x).toFixed(1)}px, ${(rect.top + point.y - shift).toFixed(1)}px)`;
        }

        function useTool(point, isTouch) {
            moveTool(point);
            tool.classList.add("is-visible");
            tool.classList.remove("is-using");
            void tool.offsetWidth;
            tool.classList.add("is-using");
            clearTimeout(toolHideTimer);
            if (isTouch) {
                toolHideTimer = setTimeout(() => {
                    if (!game || (!game.scrubbing && !game.hold)) tool.classList.remove("is-visible");
                }, 650);
            }
        }

        function spawnFx(className, point, text, lifetime) {
            const element = document.createElement("span");
            element.className = className;
            element.style.left = `${point.x.toFixed(1)}px`;
            element.style.top = `${point.y.toFixed(1)}px`;
            if (text) element.textContent = text;
            fxLayer.appendChild(element);
            setTimeout(() => element.remove(), lifetime);
            return element;
        }

        function popText(point, text, variant) {
            spawnFx(`jb-pop ${variant || ""}`, point, text, 800);
        }

        function sparkle(point) {
            spawnFx("jb-sparkle", point, "", 900);
        }

        function showCombo(combo) {
            comboBadge.textContent = `x${combo} combo`;
            comboBadge.classList.remove("is-visible");
            void comboBadge.offsetWidth;
            comboBadge.classList.add("is-visible");
            clearTimeout(comboTimer);
            comboTimer = setTimeout(() => comboBadge.classList.remove("is-visible"), 900);
        }

        // Where Jukebot's face is: the chip when the panel is off, the sticker when it's on
        function getFaceAnchor() {
            if (root.classList.contains("cover-off")) {
                return { x: coreLayout.x, y: coreLayout.y - coreLayout.halfHeight - (24 * coreLayout.scale) };
            }
            const rect = stickerFace.getBoundingClientRect();
            const rootRect = root.getBoundingClientRect();
            return { x: rect.left + (rect.width / 2) - rootRect.left, y: rect.top - rootRect.top - 2 };
        }

        // A speech bubble over Jukebot's face that goes away by itself
        function say(text, holdMs, force) {
            const now = performance.now();
            if (!force && now < speechQuietUntil) return;
            speechQuietUntil = now + 900;

            const anchor = getFaceAnchor();
            speech.textContent = text;
            speech.classList.remove("is-visible");
            const halfWidth = speech.offsetWidth / 2;
            const left = Math.max(halfWidth + 6, Math.min(size.width - halfWidth - 6, anchor.x));
            speech.style.left = `${left.toFixed(1)}px`;
            speech.style.top = `${Math.max(38, Math.min(size.height - 8, anchor.y)).toFixed(1)}px`;
            speech.style.setProperty("--tail-x", `${(anchor.x - left + halfWidth).toFixed(1)}px`);
            void speech.offsetWidth;
            speech.classList.add("is-visible");
            clearTimeout(speechTimer);
            speechTimer = setTimeout(() => speech.classList.remove("is-visible"), holdMs || 1500);
        }

        function hideSpeech() {
            clearTimeout(speechTimer);
            speech.classList.remove("is-visible");
        }

        function getElapsedSeconds() {
            if (!game) return 0;
            const end = game.endTime || performance.now();
            return ((end - game.startTime) + game.penaltyMs) / 1000;
        }

        function getHostileRemaining() {
            if (!game) return 0;
            const alive = game.bugs.filter((bug) => !bug.spec.friendly && bug.state === "alive").length;
            return game.queue.length + alive;
        }

        // What's left to do in this step, for the HUD
        function getStepCounter() {
            if (!game) return "";
            if (game.blitz) return `Score ${game.blitz.score}`;
            switch (game.stage) {
                case "unscrew":
                    return `Screws ${screws.filter((screw) => !screw.classList.contains("is-out")).length}`;
                case "wiring":
                    return `Wires ${game.breaks.filter((brk) => !brk.fixed).length}`;
                case "memory":
                    return `Round ${Math.max(1, game.memory.round)}/${MEMORY_ROUNDS.length}`;
                case "clean":
                    return `Goo ${boardSplats.filter((splat) => splat.dirt > 0).length}`;
                case "screwin":
                    return `Screws ${screws.filter((screw) => !screw.classList.contains("is-in")).length}`;
                default:
                    return `Bugs ${getHostileRemaining()}`;
            }
        }

        // It runs every frame, so it only touches what's changed (rewriting the same words every
        // frame laid the page out again every frame)
        function setHud(key, element, text) {
            if (shownHud[key] === text) return;
            shownHud[key] = text;
            element.textContent = text;
        }

        function updateHud() {
            const power = game ? game.power : 100;
            if (game && game.blitz) {
                setHud("level", hudLevel, `Wave ${game.blitz.wave}`);
            } else {
                const index = game ? game.stepIndex : progress.step;
                setHud("level", hudLevel, `Step ${Math.min(index, JOB_STEPS.length - 1) + 1}/${JOB_STEPS.length}`);
            }
            setHud("bugs", hudBugs, getStepCounter());
            setHud("time", hudTime, `${getElapsedSeconds().toFixed(1)}s`);
            setHud("power", hudPowerText, `${Math.round(power)}%`);
            // The bar's fill shrinks by transform (its width would lay the page out again)
            const fill = (power / 100).toFixed(2);
            if (shownHud.fill !== fill) {
                shownHud.fill = fill;
                hudPowerFill.style.transform = `scaleX(${fill})`;
            }
            hudPower.classList.toggle("is-low", power < 30);
        }

        // The PWR LED on the board dims with Jukebot's power. It's set on the LED itself: set on the
        // whole back panel, every frame of a draining battery restyled everything on the board.
        function showPowerLevel(level) {
            const shown = Math.max(0, Math.min(1, level)).toFixed(2);
            if (shown === shownPowerLevel) return;
            shownPowerLevel = shown;
            boardLayer.querySelectorAll(".jb-led--pwr").forEach((led) => led.style.setProperty("--power-level", shown));
        }

        function setPower(value) {
            game.power = Math.max(0, Math.min(100, value));
            showPowerLevel(game.power / 100);
            root.classList.toggle("power-low", game.power < 30);
            if (game.power < 30 && !game.lowPowerWarned) {
                game.lowPowerWarned = true;
                say("Power low! Help!", 1600, true);
            }
            if (game.power > 45) game.lowPowerWarned = false;
        }

        function formatClock(seconds) {
            const whole = Math.max(0, Math.round(seconds));
            return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
        }

        // A row of the job's steps: done ones ticked off, the next one lit up
        function renderSteps(list, current) {
            list.textContent = "";
            JOB_STEPS.forEach((step, index) => {
                const item = document.createElement("li");
                item.className = `jb-step${index < current ? " is-done" : ""}${index === current ? " is-current" : ""}`;
                item.title = step.title;
                item.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${STEP_ICONS[step.id]}</svg>`;
                list.appendChild(item);
            });
            list.setAttribute("aria-label", current >= JOB_STEPS.length
                ? "Repair job: all done"
                : `Repair job: step ${current + 1} of ${JOB_STEPS.length}, ${JOB_STEPS[current].title}`);
        }

        function addStickerButton(label, action, isMain) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = `jb-sticker-button${isMain ? " is-main" : ""}`;
            button.textContent = label;
            button.addEventListener("click", action);
            stickerActions.appendChild(button);
        }

        // The sticker on the panel says how the job's going and what's next
        function updateSticker() {
            const index = progress.step;
            renderSteps(stickerSteps, index);
            stickerActions.textContent = "";
            if (index >= JOB_STEPS.length) {
                stickerTitle.textContent = "Good as new!";
                stickerText.textContent = "Thanks for fixing me! (Psst... I'm ticklish.)";
                stickerNote.textContent = progress.blitzBest ? `Blitz best: ${progress.blitzBest}` : "All fixed";
                addStickerButton("Bug blitz", startBlitz, true);
                addStickerButton("Fix me again", restartJob);
            } else if (index > 0) {
                stickerTitle.textContent = "Repair in progress";
                stickerText.textContent = `Next up: ${JOB_STEPS[index].title}. My panel's just leaned on.`;
                stickerNote.textContent = `Step ${index + 1} of ${JOB_STEPS.length}`;
                addStickerButton("Keep fixing", continueJob, true);
            } else {
                stickerTitle.textContent = "Help! I'm glitching!";
                stickerText.textContent = "Bugs got into my wiring. Hold my 4 corner screws to open me up and fix me.";
                stickerNote.textContent = `${JOB_STEPS.length} steps to fix`;
            }
            stickerActions.hidden = !stickerActions.childElementCount;
        }

        // ───── The core chip: Jukebot's brain, with its screen face on top ─────
        function getCoreLayout() {
            // Smaller boards (phones, sideways phones) get a smaller chip so the bugs have room
            const scale = Math.max(0.66, Math.min(1, size.width / 420, size.height / 380));
            return {
                x: Math.round(size.width / 2),
                y: Math.round(Math.max(80, size.height * 0.44)),
                halfWidth: 66 * scale,
                halfHeight: 46 * scale,
                scale
            };
        }

        // Jukebot's four memory chips, two each side of its core chip. They're on the board from the
        // start (just more chips, unless you look closely); in the memory step their lights come on.
        function getMemorySpots() {
            const scale = coreLayout.scale;
            const side = Math.round(52 * Math.max(0.78, scale));
            const offsetX = coreLayout.halfWidth + (side / 2) + (24 * scale);
            const offsetY = (side / 2) + (5 * scale);
            return [[-offsetX, -offsetY], [offsetX, -offsetY], [-offsetX, offsetY], [offsetX, offsetY]]
                .map(([dx, dy], index) => ({ index, x: coreLayout.x + dx, y: coreLayout.y + dy, side }));
        }

        function isOnMemoryChip(point, pad) {
            return getMemorySpots().some((spot) => Math.abs(point.x - spot.x) <= (spot.side / 2) + pad
                && Math.abs(point.y - spot.y) <= (spot.side / 2) + pad);
        }

        // Their LEDs stay lit once the memory step's done (and when Jukebot's fixed)
        function syncMemoryChips() {
            root.classList.toggle("memory-restored", progress.step > MEMORY_STEP);
        }

        function drawCore() {
            core.textContent = "";
            core.setAttribute("transform", `translate(${coreLayout.x} ${coreLayout.y})`);
            const jolt = svgEl("g", { class: "jb-core-jolt" }, core);
            svgEl("rect", { class: "jb-core-aura", x: -80 * coreLayout.scale, y: -60 * coreLayout.scale, width: 160 * coreLayout.scale, height: 120 * coreLayout.scale, rx: 22 * coreLayout.scale }, jolt);
            const chip = svgEl("g", { transform: `scale(${coreLayout.scale})` }, jolt);

            // Gull-wing pins on all four sides (the antenna sits where the top middle pin would be)
            const pins = svgEl("g", { class: "jb-core-pins" }, chip);
            for (let index = -5; index <= 5; index += 1) {
                if (index !== 0) svgEl("rect", { x: (index * 10) - 2.5, y: -55, width: 5, height: 10, rx: 1 }, pins);
                svgEl("rect", { x: (index * 10) - 2.5, y: 45, width: 5, height: 10, rx: 1 }, pins);
            }
            for (let index = -3; index <= 3; index += 1) {
                svgEl("rect", { x: -76, y: (index * 11) - 2.5, width: 10, height: 5, rx: 1 }, pins);
                svgEl("rect", { x: 66, y: (index * 11) - 2.5, width: 10, height: 5, rx: 1 }, pins);
            }

            svgEl("rect", { class: "jb-core-body", x: -66, y: -46, width: 132, height: 92, rx: 13 }, chip);
            svgEl("rect", { class: "jb-core-bevel", x: -62, y: -42, width: 124, height: 84, rx: 10 }, chip);
            const label = svgEl("text", { class: "jb-core-label", x: -56, y: -35.5 }, chip);
            label.textContent = "MUSE·JKB-01";

            const antenna = svgEl("g", { class: "jb-antenna", transform: "translate(0 -46)" }, chip);
            svgEl("path", { class: "jb-antenna-stalk", d: "M0 0V-15" }, antenna);
            svgEl("circle", { class: "jb-antenna-led", cy: -19, r: 4.5 }, antenna);

            coreFace = svgEl("g", { class: "jb-face jb-face--inner" }, chip);
            coreFace.innerHTML = getFaceMarkup(1);
            lastLook = { x: 0, y: 0 };

            const charge = svgEl("g", { class: "jb-charge" }, chip);
            chargeLeds = [];
            for (let index = 0; index < ZAP_CHARGE_NEEDED; index += 1) {
                chargeLeds.push(svgEl("rect", { class: "jb-charge-led", x: -27.5 + (index * 9.5), y: 35.5, width: 7, height: 4.5, rx: 1.5 }, charge));
            }
            updateChargeLeds();
        }

        function updateChargeLeds() {
            const charge = game ? game.charge : 0;
            chargeLeds.forEach((led, index) => led.classList.toggle("is-lit", index < charge));
        }

        // ───── The circuit board fills whatever space the back of the jukebox has ─────
        function drawBoard() {
            const { width, height } = size;
            const random = seededRandom(7);
            const scale = coreLayout.scale;
            boardLayer.textContent = "";
            svgEl("rect", { class: "jb-board", x: 0, y: 0, width, height }, boardLayer);
            svgEl("rect", { class: "jb-board-grid", x: 0, y: 0, width, height }, boardLayer);

            const copper = svgEl("g", { class: "jb-copper" }, boardLayer);
            const signals = svgEl("g", { class: "jb-signals" }, boardLayer);
            const parts = svgEl("g", { class: "jb-parts" }, boardLayer);
            const silk = svgEl("g", { class: "jb-silk" }, boardLayer);
            const inside = (x, y) => x >= 12 && x <= width - 12 && y >= 12 && y <= height - 12;
            const pathFrom = (points) => points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join("");
            const addText = (x, y, text, anchor) => {
                const element = svgEl("text", { class: "jb-silk-text", x: x.toFixed(1), y: y.toFixed(1), "text-anchor": anchor || "middle" }, silk);
                element.textContent = text;
            };
            const via = (point) => svgEl("circle", { class: "jb-via", cx: point.x.toFixed(1), cy: point.y.toFixed(1), r: 3.4 }, parts);

            // Parts go wherever there's room: not on the core, under the HUD or the hint toast, or on a pad
            const taken = [
                { x0: coreLayout.x - coreLayout.halfWidth - 34, y0: coreLayout.y - coreLayout.halfHeight - 40, x1: coreLayout.x + coreLayout.halfWidth + 34, y1: coreLayout.y + coreLayout.halfHeight + 30 },
                { x0: (width / 2) - 140, y0: 0, x1: (width / 2) + 140, y1: 46 },
                { x0: (width / 2) - 150, y0: height - 62, x1: (width / 2) + 150, y1: height }
            ];
            const reserveAround = (point, pad) => taken.push({ x0: point.x - pad, y0: point.y - pad, x1: point.x + pad, y1: point.y + pad });

            // Bus traces fan out of each side of the core: a short stub, a 45° spread, a long run,
            // and sometimes a 45° turn at the end
            const sides = [
                { out: [1, 0], across: [0, 1], reach: coreLayout.halfWidth + (10 * scale), offsets: [-22, -11, 0, 11, 22], pitch: 17 },
                { out: [-1, 0], across: [0, 1], reach: coreLayout.halfWidth + (10 * scale), offsets: [-22, -11, 0, 11, 22], pitch: 17 },
                { out: [0, 1], across: [1, 0], reach: coreLayout.halfHeight + (9 * scale), offsets: [-40, -20, 0, 20, 40], pitch: 24 },
                { out: [0, -1], across: [1, 0], reach: coreLayout.halfHeight + (9 * scale), offsets: [-40, -30, 30, 40], pitch: 15 }
            ];
            let signalIndex = 0;
            sides.forEach((side) => {
                const [ox, oy] = side.out;
                const [ax, ay] = side.across;
                side.offsets.forEach((offset) => {
                    const k = offset / Math.abs(side.offsets[0] || 1);
                    const start = { x: coreLayout.x + (ox * side.reach) + (ax * offset * scale), y: coreLayout.y + (oy * side.reach) + (ay * offset * scale) };
                    const points = [start];
                    const stub = { x: start.x + (ox * 10), y: start.y + (oy * 10) };
                    points.push(stub);
                    const spread = k * side.pitch;
                    const fanned = { x: stub.x + (ox * Math.abs(spread)) + (ax * spread), y: stub.y + (oy * Math.abs(spread)) + (ay * spread) };
                    if (!inside(fanned.x, fanned.y)) return;
                    points.push(fanned);
                    const room = ox > 0 ? width - 16 - fanned.x : ox < 0 ? fanned.x - 16 : oy > 0 ? height - 16 - fanned.y : fanned.y - 16;
                    const run = Math.max(14, room * (0.35 + (random() * 0.55)));
                    const runEnd = { x: fanned.x + (ox * run), y: fanned.y + (oy * run) };
                    points.push(runEnd);
                    if (random() < 0.6) {
                        const turn = Math.sign(offset || (random() - 0.5)) || 1;
                        const chamfer = { x: runEnd.x + (ox * 9) + (ax * turn * 9), y: runEnd.y + (oy * 9) + (ay * turn * 9) };
                        const tail = 18 + (random() * 70);
                        const end = { x: chamfer.x + (ax * turn * tail), y: chamfer.y + (ay * turn * tail) };
                        if (inside(chamfer.x, chamfer.y)) {
                            points.push(chamfer);
                            if (inside(end.x, end.y)) points.push(end);
                        }
                    }
                    const d = pathFrom(points);
                    svgEl("path", { class: "jb-trace", d }, copper);
                    via(points[points.length - 1]);
                    reserveAround(points[points.length - 1], 9);
                    // Data pulses run along every other trace, in towards the core
                    if (signalIndex % 2 === 0) {
                        const pulse = svgEl("path", { class: "jb-signal", d, pathLength: 100 }, signals);
                        pulse.style.setProperty("--signal-speed", `${(1.4 + (random() * 1.6)).toFixed(2)}s`);
                        pulse.style.setProperty("--signal-delay", `${(-random() * 3).toFixed(2)}s`);
                    }
                    signalIndex += 1;
                });
            });

            const place = (w, h, tries, preferY) => {
                for (let attempt = 0; attempt < tries; attempt += 1) {
                    const x = 16 + (random() * (width - w - 32));
                    const y = preferY !== undefined ? preferY : 16 + (random() * (height - h - 32));
                    const box = { x0: x - 8, y0: y - 12, x1: x + w + 8, y1: y + h + 8 };
                    if (taken.some((other) => box.x0 < other.x1 && box.x1 > other.x0 && box.y0 < other.y1 && box.y1 > other.y0)) continue;
                    taken.push(box);
                    return { x, y };
                }
                return null;
            };
            const area = width * height;

            // The memory chips, on the bus each side of the core (a little dim, a faint note on top)
            getMemorySpots().forEach((spot) => {
                const half = spot.side / 2;
                const chip = svgEl("g", { class: "jb-mem", transform: `translate(${spot.x.toFixed(1)} ${spot.y.toFixed(1)})` }, parts);
                chip.style.setProperty("--pad-color", MEMORY_COLORS[spot.index]);
                const pitch = spot.side / 5;
                for (let pin = 1; pin <= 4; pin += 1) {
                    const y = -half + (pin * pitch) - 1.5;
                    svgEl("rect", { class: "jb-mem-pin", x: -half - 4, y, width: 5, height: 3, rx: 0.8 }, chip);
                    svgEl("rect", { class: "jb-mem-pin", x: half - 1, y, width: 5, height: 3, rx: 0.8 }, chip);
                }
                svgEl("rect", { class: "jb-mem-body", x: -half, y: -half, width: spot.side, height: spot.side, rx: Math.round(spot.side * 0.26) }, chip);
                const note = svgEl("text", { class: "jb-mem-note", y: Math.round(spot.side * 0.16), "text-anchor": "middle" }, chip);
                note.textContent = MEMORY_NOTES[spot.index];
                note.style.fontSize = `${Math.round(spot.side * 0.5)}px`;
                svgEl("circle", { class: "jb-mem-led", cx: half - 7, cy: -half + 7, r: 2.4 }, chip);
                addText(spot.x, spot.index < 2 ? spot.y - half - 6 : spot.y + half + 12, `M${spot.index + 1}`);
                taken.push({ x0: spot.x - half - 12, y0: spot.y - half - 16, x1: spot.x + half + 12, y1: spot.y + half + 16 });
            });

            // Mounting holes in the corners (where the panel's screws go)
            [[18, 18], [width - 18, 18], [18, height - 18], [width - 18, height - 18]].forEach(([x, y]) => {
                svgEl("circle", { class: "jb-mount", cx: x, cy: y, r: 7.5 }, parts);
                taken.push({ x0: x - 14, y0: y - 14, x1: x + 14, y1: y + 14 });
            });

            // ICs with their leads, and a few traces off to the sides
            const icCount = Math.max(2, Math.min(5, Math.round(area / 90000)));
            for (let index = 0; index < icCount; index += 1) {
                const pinsPerSide = 4 + Math.floor(random() * 3);
                const w = (pinsPerSide * 8) + 6;
                const h = 22;
                const spot = place(w, h, 40);
                if (!spot) continue;
                const ic = svgEl("g", { class: "jb-ic", transform: `translate(${spot.x.toFixed(1)} ${spot.y.toFixed(1)})` }, parts);
                for (let pin = 0; pin < pinsPerSide; pin += 1) {
                    const px = 5 + (pin * 8);
                    svgEl("rect", { class: "jb-ic-pin", x: px, y: -4, width: 4, height: 5, rx: 0.8 }, ic);
                    svgEl("rect", { class: "jb-ic-pin", x: px, y: h - 1, width: 4, height: 5, rx: 0.8 }, ic);
                }
                svgEl("rect", { class: "jb-ic-body", x: 0, y: 0, width: w, height: h, rx: 2.5 }, ic);
                svgEl("circle", { class: "jb-ic-dot", cx: 4.5, cy: 4.5, r: 1.6 }, ic);
                addText(spot.x + (w / 2), spot.y - 7, `U${index + 2}`);
                // Two leads wander off towards the middle of the board
                [0, pinsPerSide - 1].forEach((pin) => {
                    const startX = spot.x + 7 + (pin * 8);
                    const goingDown = spot.y < coreLayout.y;
                    const startY = goingDown ? spot.y + h + 4 : spot.y - 4;
                    const dy = goingDown ? 1 : -1;
                    const dx = startX < coreLayout.x ? 1 : -1;
                    const leg = 8 + (random() * 14);
                    const diagonal = 10 + (random() * 18);
                    const run = 16 + (random() * 46);
                    const points = [
                        { x: startX, y: startY },
                        { x: startX, y: startY + (dy * leg) },
                        { x: startX + (dx * diagonal), y: startY + (dy * (leg + diagonal)) },
                        { x: startX + (dx * (diagonal + run)), y: startY + (dy * (leg + diagonal)) }
                    ].filter((point) => inside(point.x, point.y));
                    if (points.length < 2) return;
                    svgEl("path", { class: "jb-trace jb-trace--thin", d: pathFrom(points) }, copper);
                    via(points[points.length - 1]);
                    reserveAround(points[points.length - 1], 9);
                });
            }

            // Electrolytic capacitors
            const capCount = width > 420 ? 3 : 2;
            for (let index = 0; index < capCount; index += 1) {
                const spot = place(24, 24, 30);
                if (!spot) continue;
                const cx = spot.x + 12;
                const cy = spot.y + 12;
                svgEl("circle", { class: "jb-ecap-ring", cx, cy, r: 12.5 }, silk);
                svgEl("path", { class: "jb-ecap-stripe", d: `M${cx - 12.5} ${cy}A12.5 12.5 0 0 1 ${cx} ${cy - 12.5}V${cy - 9}A9 9 0 0 0 ${cx - 9} ${cy}Z` }, silk);
                svgEl("circle", { class: "jb-ecap-top", cx, cy, r: 9 }, parts);
                svgEl("path", { class: "jb-ecap-vent", d: `M${cx - 5} ${cy}h10M${cx} ${cy - 5}v10` }, parts);
                addText(cx, spot.y - 6, `C${index + 3}`);
            }

            // Crystal
            const crystal = place(26, 10, 30);
            if (crystal) {
                svgEl("rect", { class: "jb-xtal", x: crystal.x, y: crystal.y, width: 26, height: 10, rx: 5 }, parts);
                addText(crystal.x + 13, crystal.y - 5, "Y1");
            }

            // Status LEDs: power (follows Jukebot's charge) and error (blinks when it's in trouble)
            [["jb-led--pwr", "PWR"], ["jb-led--err", "ERR"]].forEach(([variant, name]) => {
                const spot = place(12, 7, 30);
                if (!spot) return;
                const led = svgEl("rect", { class: `jb-led ${variant}`, x: spot.x, y: spot.y, width: 12, height: 7, rx: 2 }, parts);
                if (variant === "jb-led--pwr") led.style.setProperty("--power-level", shownPowerLevel);
                addText(spot.x + 6, spot.y + 16, name);
            });

            // Little surface-mount resistors and capacitors
            const passiveCount = Math.round(Math.min(16, Math.max(6, area / 22000)));
            for (let index = 0; index < passiveCount; index += 1) {
                const vertical = random() < 0.5;
                const w = vertical ? 6 : 12;
                const h = vertical ? 12 : 6;
                const spot = place(w, h, 20);
                if (!spot) continue;
                const kind = random() < 0.55 ? "jb-smd--r" : "jb-smd--c";
                svgEl("rect", { class: `jb-smd ${kind}`, x: spot.x, y: spot.y, width: w, height: h, rx: 1 }, parts);
                if (vertical) {
                    svgEl("rect", { class: "jb-smd-end", x: spot.x, y: spot.y, width: w, height: 3 }, parts);
                    svgEl("rect", { class: "jb-smd-end", x: spot.x, y: spot.y + h - 3, width: w, height: 3 }, parts);
                } else {
                    svgEl("rect", { class: "jb-smd-end", x: spot.x, y: spot.y, width: 3, height: h }, parts);
                    svgEl("rect", { class: "jb-smd-end", x: spot.x + w - 3, y: spot.y, width: 3, height: h }, parts);
                }
            }

            // Cooling fan
            const fanSpot = place(40, 40, 40);
            if (fanSpot) {
                const fan = svgEl("g", { class: "jb-fan", transform: `translate(${(fanSpot.x + 20).toFixed(1)} ${(fanSpot.y + 20).toFixed(1)})` }, parts);
                svgEl("rect", { class: "jb-fan-frame", x: -20, y: -20, width: 40, height: 40, rx: 6 }, fan);
                svgEl("circle", { class: "jb-fan-ring", r: 17 }, fan);
                svgEl("path", { class: "jb-fan-blades", d: "M0 0C5-13 13-10 10 0M0 0C13 5 10 13 0 10M0 0C-5 13-13 10-10 0M0 0C-13-5-10-13 0-10" }, fan);
                svgEl("circle", { class: "jb-fan-hub", r: 4 }, fan);
            }

            // Audio connector along the bottom
            const pinCount = width > 420 ? 8 : 6;
            const header = place((pinCount * 9) + 4, 12, 30, height - 46);
            if (header) {
                svgEl("rect", { class: "jb-header-outline", x: header.x, y: header.y, width: (pinCount * 9) + 4, height: 12, rx: 2 }, silk);
                for (let pin = 0; pin < pinCount; pin += 1) {
                    svgEl("rect", { class: pin === 0 ? "jb-pad jb-pad--square" : "jb-pad", x: header.x + 3 + (pin * 9), y: header.y + 2.5, width: 7, height: 7, rx: pin === 0 ? 1 : 3.5 }, parts);
                }
                addText(header.x + (((pinCount * 9) + 4) / 2), header.y - 5, "AUDIO OUT");
            }

            addText(width - 34, height - 15, "JKB-01 REV.B ♪", "end");
            drawCore();
            placeRepairs();
        }

        function drawBoardIfDirty() {
            clearTimeout(boardDrawTimer);
            boardDrawTimer = null;
            if (!boardDirty) return;
            boardDirty = false;
            drawBoard();
        }

        function handleResize() {
            const width = Math.round(root.clientWidth);
            const height = Math.round(root.clientHeight);
            if (!width || !height || (width === size.width && height === size.height)) return;
            size = { width, height };
            coreLayout = getCoreLayout();
            internals.setAttribute("viewBox", `0 0 ${width} ${height}`);
            internals.setAttribute("width", width);
            internals.setAttribute("height", height);
            // While the back is out of sight the board waits for a quiet moment, so it's ready
            // before the jukebox turns around instead of being drawn in the middle of the turn
            boardDirty = true;
            if (window.getComputedStyle(root).visibility !== "hidden") {
                drawBoardIfDirty();
            } else if (boardDrawTimer === null) {
                boardDrawTimer = setTimeout(drawBoardIfDirty, 700);
            }

            if (game) {
                const bounds = getBounds();
                game.bugs.forEach((bug) => {
                    bug.x = Math.max(bounds.x0, Math.min(bounds.x1, bug.x));
                    bug.y = Math.max(bounds.y0, Math.min(bounds.y1, bug.y));
                    renderBug(bug);
                });
            }
            bringSplatsIntoView();
        }

        // ───── Between repairs ─────
        function resetScrews() {
            screws.forEach((screw) => {
                screw.classList.remove("is-out", "is-in", "is-screwing-in");
                screw.disabled = false;
                screw.style.setProperty("--turn", "0deg");
                screw.style.setProperty("--lift", "0");
            });
        }

        function stopGame() {
            if (game) {
                cancelAnimationFrame(game.frame);
                game.timers.forEach((id) => clearTimeout(id));
            }
            game = null;
            root.classList.remove("is-quaking");
            setQueenFight(false);
        }

        // While the Queen Moth's out the swatter's held in a big white cartoon glove (the tool lives
        // on the page, outside the panel, so it's told directly)
        function setQueenFight(on) {
            root.classList.toggle("queen-fight", on);
            tool.classList.toggle("has-glove", on);
        }

        function clearBoard() {
            bugLayer.textContent = "";
            splatLayer.textContent = "";
            repairLayer.textContent = "";
            zapLayer.textContent = "";
            fxLayer.textContent = "";
            boardSplats = [];
        }

        // No step running: the panel's on (only leaned on, mid-job), and the sticker says what's next
        function rest() {
            const wasOpen = root.classList.contains("cover-off");
            stopGame();
            clearBoard();
            resetScrews();
            const fixed = progress.step >= JOB_STEPS.length;
            const midJob = progress.step > 0 && !fixed;
            root.classList.remove("cover-off", "is-playing", "is-running", "is-blitz", "is-screwing", "no-tool", "zap-ready", "power-low", "is-shorting", "is-zapping", "is-fixed", "is-broken", "is-loose");
            root.classList.add(fixed ? "is-fixed" : "is-broken");
            root.classList.toggle("is-loose", midJob);
            syncMemoryChips();
            screws.forEach((screw) => {
                if (midJob) screw.classList.add("is-out");
                // Coming back from Bug blitz the screws go back in with a twist
                if (fixed && wasOpen) screw.classList.add("is-screwing-in");
                screw.disabled = midJob || fixed;
            });
            showPowerLevel(1);
            lightUp(fixed ? 3 : 0);
            moodHoldUntil = 0;
            setMoodClass(fixed ? "happy" : "broken");
            setTool(null);
            hideSpeech();
            comboBadge.classList.remove("is-visible");
            mission.hidden = true;
            resultsOverlay.hidden = true;
            setStatus("");
            updateSticker();
            updateChargeLeds();
            updateHud();
        }

        function newGame(stepIndex) {
            return {
                stepIndex,
                stage: "between",
                startTime: performance.now(),
                endTime: null,
                penaltyMs: 0,
                frame: null,
                lastFrame: null,
                screwProgress: [0, 0, 0, 0],
                hold: null,
                config: getBugConfig({}),
                queue: [],
                glowLeft: 0,
                bugs: [],
                nextSpawnAt: 0,
                nextGlowAt: 0,
                queenSpawns: 0,
                hits: 0,
                misses: 0,
                combo: 0,
                bestCombo: 0,
                glowHits: 0,
                squashed: 0,
                power: 100,
                lowPowerWarned: false,
                shorts: 0,
                charge: 0,
                zapReady: false,
                zaps: 0,
                zapKills: 0,
                lastChewLine: -Infinity,
                scrubbing: false,
                lastScrub: null,
                breaks: [],
                solder: null,
                memory: null,
                blitz: null,
                timers: []
            };
        }

        function buildQueue(config) {
            const hostile = shuffle([
                ...Array(config.flies).fill("fly"),
                ...Array(config.beetles).fill("beetle"),
                ...Array(config.hoppers).fill("hopper")
            ]);
            if (config.queen) {
                hostile.splice(Math.floor(hostile.length * 0.4), 0, "queen");
            }
            return hostile;
        }

        // Start a step of the job (the board keeps whatever the earlier steps left on it)
        function startStep(index) {
            const step = JOB_STEPS[index];
            stopGame();
            game = newGame(index);
            mission.hidden = true;
            resultsOverlay.hidden = true;
            root.classList.add("is-running");
            root.classList.remove("no-tool");
            showPowerLevel(1);
            root.classList.remove("power-low");
            hideSpeech();

            if (step.id === "open") {
                game.stage = "unscrew";
                setTool("screwdriver");
                stickerTitle.textContent = "That's it, keep going!";
                stickerText.textContent = "Hold each corner screw to twist it out (or tap it twice).";
            } else if (step.id === "sweep" || step.id === "queen") {
                startSwat(getBugConfig(step), step.id === "queen" ? "It's the Queen Moth! Bonk her!" : "Bugs! Get them off me!");
            } else if (step.id === "wiring") {
                startWiring(step);
            } else if (step.id === "memory") {
                startMemory();
            } else {
                startClosing();
            }
            updateHud();
            game.frame = requestAnimationFrame(tick);
        }

        // A step's done: tick it off, and on to the next one
        function completeStep() {
            if (!game || game.stage === "between") return;
            const index = game.stepIndex;
            game.endTime = performance.now();
            game.stage = "between";
            game.solder = null;
            game.zapReady = false;
            progress.step = Math.max(progress.step, index + 1);
            syncMemoryChips();
            progress.jobSeconds += getElapsedSeconds();
            progress.squashed += game.squashed;
            saveProgress(progress);

            root.classList.remove("zap-ready", "power-low", "no-tool", "is-running");
            game.bugs.forEach((bug) => {
                if (bug.state === "alive") flee(bug);
            });
            setTool(null);
            setStatus("");
            lightUp(Math.min(3, Math.ceil((progress.step / JOB_STEPS.length) * 3)));
            react("excited", 1300);
            say(JOB_STEPS[index].done || pick(HAPPY_LINES), 1700, true);
            for (let count = 0; count < 6; count += 1) {
                later(() => sparkle({ x: coreLayout.x + randomBetween(-90, 90), y: coreLayout.y + randomBetween(-60, 60) }), count * 90);
            }
            later(() => showMission(progress.step), 1500);
        }

        // The card for the next step: what to do, and a button to start
        function showMission(index) {
            if (!game || index >= JOB_STEPS.length) return;
            const step = JOB_STEPS[index];
            renderSteps(missionSteps, index);
            missionKicker.textContent = `Step ${index + 1} of ${JOB_STEPS.length}`;
            missionTitle.textContent = step.title;
            missionGoal.textContent = step.goal;
            resultsOverlay.hidden = true;
            mission.hidden = false;
            mission.dataset.step = String(index);
            if (root.contains(document.activeElement) || document.activeElement === document.body) {
                missionStart.focus({ preventScroll: true });
            }
        }

        // "Keep fixing" on the sticker: lift the leaned-on panel off again
        function continueJob() {
            if (progress.step <= 0 || progress.step >= JOB_STEPS.length) return;
            stopGame();
            game = newGame(progress.step);
            root.classList.remove("is-loose");
            root.classList.add("cover-off", "is-playing");
            lightUp(Math.min(3, Math.ceil((progress.step / JOB_STEPS.length) * 3)));
            game.frame = requestAnimationFrame(tick);
            later(() => showMission(progress.step), 520);
        }

        // ───── "Fix me again": Jukebot gets messed up all over again ─────
        // A little show first: it hears something, a few bugs scuttle in over its panel, it jolts and
        // a crack runs across with sparks and a puff of smoke, the bugs dive in through the cracks,
        // and its lights flicker out. Then it's glitching away, ready for the job again.
        let breakingDown = false;

        function restartJob() {
            if (breakingDown) return;
            const resetJob = () => {
                progress.step = 0;
                progress.jobSeconds = 0;
                progress.squashed = 0;
                saveProgress(progress);
                rest();
                say("Uh oh... glitching again!", 1600, true);
            };
            if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                resetJob();
                return;
            }
            breakingDown = true;
            stickerActions.hidden = true;
            react("worried", 1600);
            say("Huh? What's that noise?", 1100, true);
            root.classList.remove("is-breaking-down");
            void root.offsetWidth;
            root.classList.add("is-breaking-down");
            lights.forEach((light) => light.classList.add("is-flickering"));
            sendInIntruders();
            setTimeout(crackPanel, 450);
            setTimeout(() => {
                lights.forEach((light) => light.classList.remove("is-flickering"));
                root.classList.remove("is-breaking-down");
                breakingDown = false;
                resetJob();
            }, 1550);
        }

        // A few bugs scuttle in from the edges, wiggling, and dive into the panel
        function sendInIntruders() {
            const { width, height } = size;
            if (!width || !height) return;
            ["fly", "beetle", "fly", "hopper", "fly"].forEach((type, index) => {
                const to = { x: width * randomBetween(0.25, 0.75), y: height * randomBetween(0.2, 0.62) };
                const side = index % 3;
                const from = side === 0
                    ? { x: -26, y: to.y + randomBetween(-70, 70) }
                    : side === 1 ? { x: width + 26, y: to.y + randomBetween(-70, 70) } : { x: to.x + randomBetween(-90, 90), y: height + 26 };
                const intruder = document.createElementNS(SVG_NS, "svg");
                intruder.setAttribute("class", "jb-intruder");
                intruder.setAttribute("viewBox", "-20 -20 40 40");
                drawBugArt(type, svgEl("g", { class: "jb-bug-art" }, intruder));
                intruder.style.left = `${to.x.toFixed(1)}px`;
                intruder.style.top = `${to.y.toFixed(1)}px`;
                intruder.style.setProperty("--from-x", `${(from.x - to.x).toFixed(1)}px`);
                intruder.style.setProperty("--from-y", `${(from.y - to.y).toFixed(1)}px`);
                intruder.style.setProperty("--turn", `${((Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI + 90).toFixed(1)}deg`);
                intruder.style.setProperty("--wiggle", `${(randomBetween(7, 15) * (Math.random() < 0.5 ? -1 : 1)).toFixed(1)}px`);
                intruder.style.animationDelay = `${index * 110}ms`;
                fxLayer.appendChild(intruder);
                setTimeout(() => intruder.remove(), 1450 + (index * 110));
            });
        }

        // The jolt: a crack across the panel, sparks along it, smoke out of the vents
        function crackPanel() {
            const { width, height } = size;
            if (!width || !height || !breakingDown) return;
            react("ouch", 1000);
            say("Bugs?! Not again!", 1000, true);
            let x = width * randomBetween(0.32, 0.68);
            let y = height * 0.06;
            const points = [[x, y]];
            for (let index = 0; index < 7; index += 1) {
                x = Math.max(16, Math.min(width - 16, x + randomBetween(-34, 34)));
                y += height * randomBetween(0.06, 0.1);
                points.push([x, y]);
            }
            const branchFrom = points[3];
            const branch = [branchFrom, [branchFrom[0] + randomBetween(26, 44) * (Math.random() < 0.5 ? -1 : 1), branchFrom[1] + randomBetween(18, 34)]];
            const toPath = (list) => `M${list.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join("L")}`;
            const crack = document.createElementNS(SVG_NS, "svg");
            crack.setAttribute("class", "jb-crack");
            crack.setAttribute("viewBox", `0 0 ${width} ${height}`);
            [[points, ""], [branch, " jb-crack--branch"]].forEach(([list, extra]) => {
                svgEl("path", { class: `jb-crack-light${extra}`, d: toPath(list), pathLength: 100 }, crack);
                svgEl("path", { class: `jb-crack-line${extra}`, d: toPath(list), pathLength: 100 }, crack);
            });
            fxLayer.appendChild(crack);
            setTimeout(() => crack.remove(), 1150);
            points.slice(1, 6).forEach(([px, py], index) => {
                setTimeout(() => spawnFx("jb-break-spark", { x: px, y: py }, "", 600), index * 60);
            });
            for (let index = 0; index < 3; index += 1) {
                setTimeout(() => {
                    const puff = spawnFx("jb-break-puff", { x: (width / 2) + randomBetween(-16, 16), y: 12 }, "", 1100);
                    puff.style.setProperty("--drift", `${randomBetween(-12, 12).toFixed(1)}px`);
                }, index * 130);
            }
        }

        // ───── Step 1: unscrew the rear panel (hold to keep turning, or tap) ─────
        // At the very end the same screws go back in: then holding turns them the other way
        function turnScrew(index, amount) {
            if (!game) return;
            const screw = screws[index];
            if (game.stage === "unscrew") {
                if (screw.classList.contains("is-out")) return;
                game.screwProgress[index] = Math.min(1, game.screwProgress[index] + Math.max(0, amount));
            } else if (game.stage === "screwin") {
                if (screw.classList.contains("is-in")) return;
                game.screwProgress[index] = Math.max(0, game.screwProgress[index] - Math.max(0, amount));
            } else {
                return;
            }
            const turned = game.screwProgress[index];
            screw.style.setProperty("--turn", `${(turned * -720).toFixed(1)}deg`);
            screw.style.setProperty("--lift", turned.toFixed(3));
            if (game.stage === "unscrew" && turned >= 1) popScrew(index);
            if (game.stage === "screwin" && turned <= 0) seatScrew(index);
        }

        function popScrew(index) {
            const screw = screws[index];
            if (screw.classList.contains("is-out")) return;
            if (game.hold && game.hold.index === index) endHoldEffects();
            screw.classList.add("is-out");
            screw.disabled = true;
            const center = getElementCenter(screw);
            sparkle({ x: center.x, y: center.y - 8 });
            if (typeof navigator.vibrate === "function") navigator.vibrate(10);
            const left = screws.filter((item) => !item.classList.contains("is-out")).length;
            if (left) {
                stickerText.textContent = `${left} screw${left === 1 ? "" : "s"} to go...`;
            }
            later(checkCoverOff, 160);
        }

        function seatScrew(index) {
            const screw = screws[index];
            if (screw.classList.contains("is-in")) return;
            if (game.hold && game.hold.index === index) endHoldEffects();
            screw.classList.add("is-in");
            screw.disabled = true;
            const center = getElementCenter(screw);
            sparkle(center);
            popText({ x: center.x, y: center.y + 22 }, "click!");
            if (typeof navigator.vibrate === "function") navigator.vibrate(14);
            const left = screws.filter((item) => !item.classList.contains("is-in")).length;
            if (left) {
                stickerText.textContent = `${left} more to tighten...`;
            } else {
                later(finishJob, 260);
            }
        }

        function beginScrewHold(screw, event) {
            // The first screw starts the job
            if (!game && progress.step === 0) {
                startStep(0);
            }
            if (!game || !["unscrew", "screwin"].includes(game.stage)) return;
            if (screw.classList.contains(game.stage === "unscrew" ? "is-out" : "is-in")) return;

            const index = Number(screw.dataset.screw);
            game.hold = { index, pointerId: event.pointerId, startedAt: performance.now(), startProgress: game.screwProgress[index] };
            try {
                screw.setPointerCapture(event.pointerId);
            } catch (error) {
                // Pointer already gone
            }
            useTool(getElementCenter(screw), event.pointerType !== "mouse");
            tool.classList.add("is-twisting");
            turnScrew(index, 0.12);
        }

        function endHoldEffects() {
            if (!game) return;
            game.hold = null;
            tool.classList.remove("is-twisting");
        }

        function endScrewHold(event) {
            const hold = game && game.hold;
            if (!hold || event.pointerId !== hold.pointerId) return;
            endHoldEffects();
            // A quick tap still turns the screw halfway
            if (performance.now() - hold.startedAt < 260) {
                const turned = Math.abs(game.screwProgress[hold.index] - hold.startProgress);
                turnScrew(hold.index, Math.max(0, SCREW_TAP_TURN - turned));
            }
            if (event.pointerType !== "mouse") {
                clearTimeout(toolHideTimer);
                toolHideTimer = setTimeout(() => {
                    if (!game || !game.hold) tool.classList.remove("is-visible");
                }, 500);
            }
        }

        function checkCoverOff() {
            if (!game || game.stage !== "unscrew") return;
            if (!screws.every((screw) => screw.classList.contains("is-out"))) return;

            game.stage = "opening";
            root.classList.remove("is-loose");
            root.classList.add("cover-off", "is-playing");
            later(completeStep, 520);
        }

        // ───── Bug sweep, the bug queen (and Bug blitz): swat ─────
        function startSwat(config, line) {
            game.stage = "swat";
            game.config = config;
            game.queue = buildQueue(config);
            game.glowLeft = config.glowbugs;
            setTool("swatter");
            setStatus(config.queen ? "Bonk the Queen Moth and swat her swarm!" : "Swat bugs before they chew my core! Spare the glowbugs.");
            say(line, 1600, true);
            const now = performance.now();
            game.nextSpawnAt = now + 350;
            game.nextGlowAt = now + 2600;
        }

        function spawnBug(type, x, y) {
            const spec = BUG_TYPES[type];
            const bounds = getBounds();
            const group = svgEl("g", { class: `jb-bug jb-bug--${type}` }, bugLayer);
            const art = svgEl("g", { class: "jb-bug-art" }, group);
            drawBugArt(type, art);
            let hpGroup = null;
            let hpPips = null;
            if (type === "queen") {
                // Her health: a row of chunky pips over her head (under her, near the top)
                const pipCount = game.config.queenHp;
                const rowWidth = 42;
                const gap = 1.2;
                const pipWidth = (rowWidth - (gap * (pipCount - 1))) / pipCount;
                hpGroup = svgEl("g", { class: "jb-queen-hp", transform: "translate(0 -40)" }, group);
                svgEl("rect", { class: "jb-queen-hp-back", x: -(rowWidth / 2) - 1.6, y: -1.6, width: rowWidth + 3.2, height: 6.6, rx: 2.2 }, hpGroup);
                hpPips = Array.from({ length: pipCount }, (unused, index) => svgEl("rect", {
                    class: "jb-queen-pip",
                    x: (-(rowWidth / 2) + (index * (pipWidth + gap))).toFixed(2),
                    y: 0,
                    width: pipWidth.toFixed(2),
                    height: 3.4,
                    rx: 0.8
                }, hpGroup));
            }

            let startX = x;
            let startY = y;
            if (type === "queen" && startX === undefined) {
                // She makes an entrance: down from the top, in the middle, and the board shakes
                startX = (bounds.x0 + bounds.x1) / 2;
                startY = bounds.y0 - spec.radius;
                say("Gnat attack!", 1500, true);
                root.classList.remove("is-quaking");
                void root.offsetWidth;
                root.classList.add("is-quaking");
                later(() => root.classList.remove("is-quaking"), 500);
                setQueenFight(true);
            } else if (startX === undefined) {
                // Crawl in from a random edge of the board
                const edge = Math.floor(Math.random() * 4);
                startX = randomBetween(bounds.x0 + 30, bounds.x1 - 30);
                startY = randomBetween(bounds.y0 + 30, bounds.y1 - 30);
                if (edge === 0) startY = bounds.y0 - spec.radius;
                if (edge === 1) startX = bounds.x1 + spec.radius;
                if (edge === 2) startY = bounds.y1 + spec.radius;
                if (edge === 3) startX = bounds.x0 - spec.radius;
            }

            const seconds = performance.now() / 1000;
            const bug = {
                type,
                spec,
                element: group,
                hpGroup,
                hpPips,
                hpLow: false,
                angry: false,
                x: startX,
                y: startY,
                angle: Math.random() * Math.PI * 2,
                turn: 0,
                speed: randomBetween(spec.speed[0], spec.speed[1]) * game.config.speedScale,
                hp: type === "queen" ? game.config.queenHp : spec.hp,
                maxHp: type === "queen" ? game.config.queenHp : spec.hp,
                entered: x !== undefined,
                state: "alive",
                mode: "wander",
                nextThink: seconds + randomBetween(0.6, 1.6),
                dodges: spec.dodges || 0,
                nextDodge: 0,
                hopUntil: 0,
                restUntil: 0,
                boostUntil: 0,
                chewUntil: 0,
                bornAt: performance.now(),
                phase: Math.random() * Math.PI * 2
            };
            game.bugs.push(bug);
            renderBug(bug);
            return bug;
        }

        function spawnIfNeeded(now) {
            const aliveHostile = game.bugs.filter((bug) => !bug.spec.friendly && bug.state === "alive").length;
            if (game.queue.length && aliveHostile < game.config.maxOnBoard && now >= game.nextSpawnAt) {
                spawnBug(game.queue.shift());
                game.nextSpawnAt = now + (randomBetween(420, 950) / game.config.speedScale);
            }

            const aliveGlow = game.bugs.filter((bug) => bug.spec.friendly && bug.state === "alive").length;
            if (game.glowLeft > 0 && aliveGlow < 2 && now >= game.nextGlowAt) {
                spawnBug("glowbug");
                game.glowLeft -= 1;
                game.nextGlowAt = now + randomBetween(3200, 5200);
            }
        }

        function renderBug(bug) {
            // (the queen stays upright, just banking a little into her turns)
            const rotation = bug.type === "queen" ? Math.cos(bug.angle) * 9 : ((bug.angle * 180) / Math.PI) + 90;
            bug.element.setAttribute("transform", `translate(${bug.x.toFixed(1)} ${bug.y.toFixed(1)}) rotate(${rotation.toFixed(1)}) scale(${bug.spec.scale})`);
            if (bug.hpGroup) {
                // (her pips sit ~54px over her middle: near the top they'd be under the HUD)
                const low = bug.y < 100;
                if (low !== bug.hpLow) {
                    bug.hpLow = low;
                    bug.hpGroup.setAttribute("transform", low ? "translate(0 34)" : "translate(0 -40)");
                }
            }
        }

        // The queen's pips, and her temper: down to her last few she gets cross, and quicker
        function showQueenHp(bug) {
            if (!bug.hpPips) return;
            bug.hpPips.forEach((pip, index) => pip.classList.toggle("is-empty", index >= bug.hp));
            if (!bug.angry && bug.hp > 0 && bug.hp <= Math.ceil(bug.maxHp * 0.4)) {
                bug.angry = true;
                bug.speed *= 1.35;
                bug.element.classList.add("is-angry");
                say("Uh oh, she's mad!", 1300, true);
            }
        }

        // A bonk leaves her seeing stars for a moment
        function dazeQueen(bug) {
            bug.element.classList.remove("is-dazed");
            void bug.element.getBoundingClientRect();
            bug.element.classList.add("is-dazed");
            clearTimeout(bug.dazeTimer);
            bug.dazeTimer = setTimeout(() => bug.element.classList.remove("is-dazed"), 900);
        }

        // Closest point on the core chip's edge (pushed out by `pad`)
        function coreEdgePoint(x, y, pad) {
            const halfWidth = coreLayout.halfWidth + pad;
            const halfHeight = coreLayout.halfHeight + pad;
            const dx = x - coreLayout.x;
            const dy = y - coreLayout.y;
            const insideX = Math.abs(dx) < halfWidth;
            const insideY = Math.abs(dy) < halfHeight;
            if (insideX && insideY) {
                // Inside the chip: out through the nearest side
                if (halfWidth - Math.abs(dx) < halfHeight - Math.abs(dy)) {
                    return { x: coreLayout.x + (Math.sign(dx || 1) * halfWidth), y };
                }
                return { x, y: coreLayout.y + (Math.sign(dy || 1) * halfHeight) };
            }
            return {
                x: coreLayout.x + Math.max(-halfWidth, Math.min(halfWidth, dx)),
                y: coreLayout.y + Math.max(-halfHeight, Math.min(halfHeight, dy))
            };
        }

        function distanceToCore(bug) {
            const edge = coreEdgePoint(bug.x, bug.y, 0);
            const insideCore = Math.abs(bug.x - coreLayout.x) < coreLayout.halfWidth && Math.abs(bug.y - coreLayout.y) < coreLayout.halfHeight;
            return insideCore ? 0 : Math.hypot(bug.x - edge.x, bug.y - edge.y);
        }

        function isOnCore(point, pad) {
            return Math.abs(point.x - coreLayout.x) <= coreLayout.halfWidth + pad && Math.abs(point.y - coreLayout.y) <= coreLayout.halfHeight + pad;
        }

        function steerTowards(bug, targetX, targetY, turnRate, deltaSeconds) {
            const desired = Math.atan2(targetY - bug.y, targetX - bug.x);
            const difference = Math.atan2(Math.sin(desired - bug.angle), Math.cos(desired - bug.angle));
            bug.angle += Math.max(-turnRate * deltaSeconds, Math.min(turnRate * deltaSeconds, difference));
        }

        function startChewing(bug, seconds) {
            bug.mode = "chew";
            bug.chewUntil = seconds + randomBetween(1.6, 3.6);
            bug.element.classList.add("is-chewing");
            if (seconds - game.lastChewLine > 6) {
                game.lastChewLine = seconds;
                say(pick(CHEW_LINES), 1500, true);
            }
            react("ouch", 450);
        }

        function leaveCore(bug, seconds) {
            bug.mode = "wander";
            bug.element.classList.remove("is-chewing");
            bug.angle = Math.atan2(bug.y - coreLayout.y, bug.x - coreLayout.x) + randomBetween(-0.6, 0.6);
            bug.nextThink = seconds + randomBetween(2, 3.5);
        }

        function knockBack(bug, seconds) {
            leaveCore(bug, seconds);
            bug.boostUntil = seconds + 0.6;
            bug.hopUntil = 0;
            bug.restUntil = 0;
        }

        // Hoppers can feel the swatter coming and spring out of the way (a couple of times)
        function dodge(bug, point, seconds) {
            if (bug.dodges <= 0 || seconds < bug.nextDodge || bug.mode === "chew") return false;
            bug.dodges -= 1;
            bug.nextDodge = seconds + 0.9;
            bug.angle = Math.atan2(bug.y - point.y, bug.x - point.x) + randomBetween(-0.5, 0.5);
            bug.hopUntil = seconds + 0.24;
            bug.restUntil = bug.hopUntil + randomBetween(0.3, 0.6);
            bug.element.classList.remove("is-hopping");
            void bug.element.getBoundingClientRect();
            bug.element.classList.add("is-hopping");
            popText({ x: bug.x, y: bug.y - 16 }, "boing!", "jb-pop--miss");
            return true;
        }

        function updateBug(bug, deltaSeconds, seconds) {
            const bounds = getBounds();
            const radius = bug.spec.radius;
            const minX = bounds.x0 + radius;
            const maxX = bounds.x1 - radius;
            const minY = bounds.y0 + radius;
            const maxY = bounds.y1 - radius;
            const centerX = size.width / 2;
            const centerY = size.height / 2;
            let speed = bug.speed;

            if (bug.state === "fleeing") {
                bug.x += Math.cos(bug.angle) * bug.speed * 2.6 * deltaSeconds;
                bug.y += Math.sin(bug.angle) * bug.speed * 2.6 * deltaSeconds;
                renderBug(bug);
                if (bug.x < -50 || bug.x > size.width + 50 || bug.y < -50 || bug.y > size.height + 50) {
                    bug.state = "gone";
                    bug.element.remove();
                }
                return;
            }

            if (bug.mode === "chew") {
                // Stuck in, munching on the chip's edge
                const spot = coreEdgePoint(bug.x, bug.y, radius * 0.45);
                bug.x = spot.x;
                bug.y = spot.y;
                bug.angle = Math.atan2(coreLayout.y - bug.y, coreLayout.x - bug.x);
                if (bug.spec.flier && seconds > bug.chewUntil) {
                    leaveCore(bug, seconds);
                }
                renderBug(bug);
                return;
            }

            // Every so often a bug makes up its mind: go for the core, or just wander
            if (bug.spec.bite && bug.entered && seconds > bug.nextThink) {
                bug.mode = Math.random() < bug.spec.seek + game.config.seekBoost ? "seek" : "wander";
                bug.nextThink = seconds + randomBetween(1.6, 3.4);
            }

            if (!bug.entered) {
                bug.angle = Math.atan2(centerY - bug.y, centerX - bug.x) + (Math.sin((seconds * 3) + bug.phase) * 0.3);
                if (bug.x >= minX && bug.x <= maxX && bug.y >= minY && bug.y <= maxY) {
                    bug.entered = true;
                }
            } else if (bug.type === "hopper") {
                // Fleas move in springy hops with little rests in between
                if (seconds >= bug.restUntil) {
                    const target = coreEdgePoint(bug.x, bug.y, radius);
                    bug.angle = bug.mode === "seek"
                        ? Math.atan2(target.y - bug.y, target.x - bug.x) + randomBetween(-0.5, 0.5)
                        : bug.angle + randomBetween(-1.6, 1.6);
                    bug.hopUntil = seconds + 0.22;
                    bug.restUntil = bug.hopUntil + randomBetween(0.35, 0.8);
                    bug.element.classList.remove("is-hopping");
                    void bug.element.getBoundingClientRect();
                    bug.element.classList.add("is-hopping");
                }
                if (seconds >= bug.hopUntil) speed = 0;
            } else if (bug.mode === "seek") {
                const target = coreEdgePoint(bug.x, bug.y, radius * 0.4);
                steerTowards(bug, target.x, target.y, bug.type === "fly" ? 5 : 2.4, deltaSeconds);
            } else if (bug.type === "fly") {
                bug.turn = Math.max(-5, Math.min(5, bug.turn + ((Math.random() - 0.5) * 18 * deltaSeconds)));
                bug.angle += bug.turn * deltaSeconds;
                if (Math.random() < deltaSeconds * 0.9) {
                    bug.angle += randomBetween(-1.4, 1.4);
                }
            } else if (bug.type === "beetle") {
                bug.turn = Math.max(-1.5, Math.min(1.5, bug.turn + ((Math.random() - 0.5) * 5 * deltaSeconds)));
                bug.angle += bug.turn * deltaSeconds;
            } else if (bug.type === "glowbug") {
                // Glowbugs like to hang around the core (that's how they charge it)
                const nearCore = distanceToCore(bug) < GLOW_CHARGE_RANGE;
                if (!nearCore && Math.sin((seconds * 0.9) + bug.phase) > 0.2) {
                    steerTowards(bug, coreLayout.x, coreLayout.y, 1.2, deltaSeconds);
                } else {
                    bug.angle += Math.sin((seconds * 1.6) + bug.phase) * 1.1 * deltaSeconds;
                }
                if (performance.now() - bug.bornAt > 7500) {
                    flee(bug);
                    return;
                }
            } else if (bug.type === "queen") {
                // Loops around the board in a figure eight
                const targetX = centerX + (Math.sin((seconds * 0.7) + bug.phase) * (size.width * 0.34));
                const targetY = centerY + (Math.sin((seconds * 1.4) + bug.phase) * (size.height * 0.3));
                bug.angle = Math.atan2(targetY - bug.y, targetX - bug.x);
            }

            if (seconds < bug.boostUntil) speed *= 3;
            bug.x += Math.cos(bug.angle) * speed * deltaSeconds;
            bug.y += Math.sin(bug.angle) * speed * deltaSeconds;

            if (bug.entered && bug.type !== "queen") {
                if (bug.x < minX || bug.x > maxX) {
                    bug.x = Math.max(minX, Math.min(maxX, bug.x));
                    bug.angle = Math.PI - bug.angle;
                }
                if (bug.y < minY || bug.y > maxY) {
                    bug.y = Math.max(minY, Math.min(maxY, bug.y));
                    bug.angle = -bug.angle;
                }
            }

            // Reached the core: start chewing
            if (bug.spec.bite && bug.entered && seconds > bug.boostUntil && distanceToCore(bug) <= radius * 0.45) {
                startChewing(bug, seconds);
            }

            renderBug(bug);
        }

        function flee(bug) {
            bug.state = "fleeing";
            bug.element.classList.remove("is-chewing", "is-charging");
            bug.angle = Math.atan2(bug.y - (size.height / 2), bug.x - (size.width / 2));
            bug.element.classList.add("is-fleeing");
        }

        function addSplat(x, y, goo, scale) {
            const group = svgEl("g", { class: "jb-splat", transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${scale})` }, splatLayer);
            group.style.setProperty("--goo", goo);
            svgEl("circle", { r: 7.5 }, group);
            for (let index = 0; index < 6; index += 1) {
                const angle = Math.random() * Math.PI * 2;
                const distance = randomBetween(7, 12);
                svgEl("circle", { cx: (Math.cos(angle) * distance).toFixed(1), cy: (Math.sin(angle) * distance).toFixed(1), r: randomBetween(1.4, 3.4).toFixed(1) }, group);
            }
            boardSplats.push({ element: group, x, y, scale, radius: 13 * scale, dirt: 1 });
            // Old goo dries up, so there's never a huge mess to clean at the end
            if (boardSplats.length > MAX_SPLATS) {
                boardSplats.shift().element.remove();
            }
        }

        function moveSplat(splat, x, y) {
            splat.x = x;
            splat.y = y;
            splat.element.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${splat.scale})`);
        }

        // Goo can end up where it can't be seen (or scrubbed): under the HUD at the top or the
        // message along the bottom, or off the board after it's changed size (a phone turned, a
        // window resized). Any like that slides out into the open.
        function bringSplatsIntoView() {
            if (!boardSplats.length || !size.width) return;
            const rootRect = root.getBoundingClientRect();
            const blockers = [root.querySelector(".jb-hud"), statusText].filter(Boolean).map((element) => {
                const rect = element.getBoundingClientRect();
                if (!rect.width || !rect.height) return null;
                return { x0: rect.left - rootRect.left, y0: rect.top - rootRect.top, x1: rect.right - rootRect.left, y1: rect.bottom - rootRect.top };
            }).filter(Boolean);
            const bounds = getBounds();
            boardSplats.forEach((splat) => {
                if (splat.dirt <= 0) return;
                const pad = splat.radius + 4;
                const clampY = (value) => Math.max(bounds.y0 + pad, Math.min(bounds.y1 - pad, value));
                const x = Math.max(bounds.x0 + pad, Math.min(bounds.x1 - pad, splat.x));
                let y = clampY(splat.y);
                blockers.forEach((box) => {
                    if (x + pad <= box.x0 || x - pad >= box.x1 || y + pad <= box.y0 || y - pad >= box.y1) return;
                    // Out of its way, the shorter way that stays on the board
                    const below = box.y1 + pad;
                    const above = box.y0 - pad;
                    const belowFits = below <= bounds.y1 - pad;
                    const aboveFits = above >= bounds.y0 + pad;
                    y = clampY(belowFits && (!aboveFits || below - y < y - above) ? below : above);
                });
                if (Math.abs(x - splat.x) > 0.5 || Math.abs(y - splat.y) > 0.5) moveSplat(splat, x, y);
            });
        }

        // Stuck scrubbing? After a while without any goo coming off, what's left shows itself
        function hintGoo() {
            if (!game || game.stage !== "clean") return;
            const left = boardSplats.filter((splat) => splat.dirt > 0);
            if (!left.length) return;
            bringSplatsIntoView();
            left.forEach((splat) => {
                if (splat.element.querySelector(".jb-splat-ring")) return;
                svgEl("circle", { class: "jb-splat-ring", r: 15 }, splat.element);
            });
            say(left.length === 1 ? "Psst... one more blob, there!" : "Psst... the goo's over here!", 1600, true);
        }

        function scheduleGooHint() {
            if (!game) return;
            clearTimeout(game.gooHintTimer);
            game.gooHintTimer = later(hintGoo, 6000);
        }

        function squash(bug, quietly) {
            bug.state = "squashed";
            bug.element.classList.remove("is-chewing");
            if (bug.type === "queen") {
                // Knocked out: she flips over and spins away, and her crown pops off
                clearTimeout(bug.dazeTimer);
                bug.element.classList.remove("is-dazed", "is-hit");
                bug.element.classList.add("is-defeated");
                setTimeout(() => bug.element.remove(), 1100);
                spawnFx("jb-queen-crown-fx", { x: bug.x, y: bug.y - 30 }, "", 1100);
                popText({ x: bug.x, y: bug.y - 44 }, "K.O.!", "jb-pop--ko");
                setQueenFight(false);
                addSplat(bug.x, bug.y, bug.spec.goo, 1.6);
                if (!bug.spec.friendly) {
                    game.squashed += 1;
                    if (game.blitz) game.blitz.score += 5;
                }
                if (typeof navigator.vibrate === "function") navigator.vibrate([16, 40, 30]);
                return;
            }
            bug.element.classList.add("is-squashed");
            setTimeout(() => bug.element.remove(), 380);
            addSplat(bug.x, bug.y, bug.spec.goo, bug.type === "queen" ? 2.2 : 1.3);
            if (!bug.spec.friendly) {
                game.squashed += 1;
                if (game.blitz) game.blitz.score += bug.type === "queen" ? 5 : 1;
            }
            if (!quietly) popText({ x: bug.x, y: bug.y - 18 }, pick(game.stage === "wiring" ? SIZZLE_LINES : SQUASH_LINES));
            if (typeof navigator.vibrate === "function") navigator.vibrate(12);
        }

        // ───── Zap: every squash charges it, tap Jukebot's face to fire ─────
        function addCharge(amount) {
            if (!game || game.zapReady) return;
            game.charge = Math.min(ZAP_CHARGE_NEEDED, game.charge + amount);
            updateChargeLeds();
            if (game.charge >= ZAP_CHARGE_NEEDED && getHostileRemaining() > 0) {
                game.zapReady = true;
                root.classList.add("zap-ready");
                say("ZAP charged! Tap my face!", 2200, true);
            }
        }

        function drawBolt(from, to) {
            const points = [`${from.x.toFixed(1)},${from.y.toFixed(1)}`];
            const steps = 6;
            for (let index = 1; index < steps; index += 1) {
                const t = index / steps;
                const x = from.x + ((to.x - from.x) * t) + randomBetween(-9, 9);
                const y = from.y + ((to.y - from.y) * t) + randomBetween(-9, 9);
                points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
            }
            points.push(`${to.x.toFixed(1)},${to.y.toFixed(1)}`);
            const bolt = svgEl("polyline", { class: "jb-bolt", points: points.join(" ") }, zapLayer);
            setTimeout(() => bolt.remove(), 420);
        }

        function fireZap() {
            game.zapReady = false;
            game.charge = 0;
            game.zaps += 1;
            root.classList.remove("zap-ready");
            updateChargeLeds();
            react("excited", 1300);
            say("ZAAAP!", 1100, true);
            root.classList.remove("is-zapping");
            void root.offsetWidth;
            root.classList.add("is-zapping");
            later(() => root.classList.remove("is-zapping"), 500);
            spawnFx("jb-zap-ring", { x: coreLayout.x, y: coreLayout.y }, "", 700);
            if (typeof navigator.vibrate === "function") navigator.vibrate([12, 40, 24]);

            const victims = game.bugs.filter((bug) => bug.state === "alive" && !bug.spec.friendly
                && Math.hypot(bug.x - coreLayout.x, bug.y - coreLayout.y) < ZAP_RADIUS + bug.spec.radius);
            victims.forEach((bug) => {
                drawBolt(coreLayout, bug);
                if (bug.type === "queen") {
                    bug.hp = Math.max(0, bug.hp - 2);
                    showQueenHp(bug);
                    if (bug.hp > 0) {
                        dazeQueen(bug);
                        popText({ x: bug.x, y: bug.y - 40 }, "zzzt!");
                        return;
                    }
                }
                squash(bug, true);
                game.zapKills += 1;
            });
            popText({ x: coreLayout.x, y: coreLayout.y - coreLayout.halfHeight - 30 }, victims.length ? `zapped ${victims.length}!` : "zap!");
            announceRemaining();
        }

        function announceRemaining() {
            const remaining = getHostileRemaining();
            if (remaining > 0) {
                setStatus(`${remaining} bug${remaining === 1 ? "" : "s"} to go!`);
            }
        }

        function handleSwat(point, isTouch) {
            const seconds = performance.now() / 1000;
            useTool(point, isTouch);
            lookOverride = { x: point.x, y: point.y, until: performance.now() + 450 };

            // Fully charged: tapping Jukebot's face fires the zap
            if (game.zapReady && isOnCore(point, 8)) {
                fireZap();
                return;
            }

            const reachBonus = isTouch ? 10 : 4;
            let target = null;
            let closest = Infinity;
            game.bugs.forEach((bug) => {
                if (bug.state !== "alive") return;
                const distance = Math.hypot(point.x - bug.x, point.y - bug.y);
                if (distance < bug.spec.radius + reachBonus && distance < closest) {
                    target = bug;
                    closest = distance;
                }
            });

            // A hopper that feels the swat coming jumps clear
            if (target && target.type === "hopper" && dodge(target, point, seconds)) {
                target = null;
            }

            if (!target) {
                // Nearby hoppers spring away from the near miss
                game.bugs.forEach((bug) => {
                    if (bug.state === "alive" && bug.type === "hopper" && Math.hypot(point.x - bug.x, point.y - bug.y) < bug.spec.radius + 34) {
                        dodge(bug, point, seconds);
                    }
                });
                if (isOnCore(point, 0)) {
                    // Booped Jukebot on the nose
                    react("happy", 600);
                    say(pick(BOOP_LINES), 900);
                    popText({ x: point.x, y: point.y - 12 }, "boop", "jb-pop--miss");
                    return;
                }
                game.misses += 1;
                game.combo = 0;
                popText({ x: point.x, y: point.y - 12 }, "whiff", "jb-pop--miss");
                return;
            }

            if (target.spec.friendly) {
                // Swatting a helper costs time, power and the combo
                game.glowHits += 1;
                game.combo = 0;
                game.penaltyMs += 3000;
                setPower(game.power - 10);
                flee(target);
                react("ouch", 900);
                say("Not the glowbugs!", 1300, true);
                popText({ x: target.x, y: target.y - 18 }, "+3s", "jb-pop--penalty");
                setStatus("Hey! Glowbugs recharge me. Leave them be!");
                return;
            }

            game.hits += 1;
            game.combo += 1;
            game.bestCombo = Math.max(game.bestCombo, game.combo);
            if (game.combo >= 3) showCombo(game.combo);
            target.hp -= 1;

            if (target.hp > 0) {
                addCharge(1);
                target.element.classList.remove("is-hit");
                void target.element.getBoundingClientRect();
                target.element.classList.add("is-hit");
                if (target.type === "beetle") {
                    target.element.classList.add("is-cracked");
                    target.speed *= 1.6;
                    popText({ x: target.x, y: target.y - 18 }, "crack!");
                    if (target.mode === "chew") knockBack(target, seconds);
                }
                if (target.type === "queen") {
                    showQueenHp(target);
                    dazeQueen(target);
                    popText({ x: target.x, y: target.y - 40 }, "bonk!");
                    if (game.queenSpawns < 4) {
                        game.queenSpawns += 1;
                        spawnBug("fly", target.x, target.y);
                    }
                }
                return;
            }

            squash(target);
            addCharge(1);
            react(game.combo >= 4 ? "excited" : "happy", game.combo >= 4 ? 700 : 450);
            announceRemaining();
        }

        function checkBugsCleared() {
            if (game.stage !== "swat" || getHostileRemaining() > 0) return;
            if (game.blitz) {
                waveCleared();
            } else {
                completeStep();
            }
        }

        // Chewing drains Jukebot's power (and so do broken wires); glowbugs hanging around the core
        // top it back up
        function updatePower(deltaSeconds, seconds) {
            let drain = game.stage === "wiring" ? game.breaks.filter((brk) => !brk.fixed).length * BREAK_DRAIN : 0;
            let recharge = 0;
            game.bugs.forEach((bug) => {
                if (bug.state !== "alive") return;
                if (bug.mode === "chew") {
                    drain += bug.spec.bite;
                    if (Math.random() < deltaSeconds * 5) {
                        spawnFx("jb-spark", { x: bug.x + randomBetween(-6, 6), y: bug.y + randomBetween(-6, 6) }, "", 420);
                    }
                }
                if (bug.spec.friendly) {
                    const charging = distanceToCore(bug) < GLOW_CHARGE_RANGE;
                    bug.element.classList.toggle("is-charging", charging);
                    if (charging) recharge += 7;
                }
            });
            if (!drain && !recharge) return;
            setPower(game.power - (drain * game.config.drainScale * deltaSeconds) + (recharge * deltaSeconds));
            if (game.power <= 0) shortCircuit(seconds);
        }

        // Out of power: Jukebot reboots (costs time) and shakes the bugs off. In Bug blitz it's game over.
        function shortCircuit(seconds) {
            if (game.blitz) {
                endBlitz();
                return;
            }
            game.shorts += 1;
            game.penaltyMs += 4000;
            setPower(35);
            root.classList.add("is-shorting");
            later(() => root.classList.remove("is-shorting"), 1200);
            react("ouch", 1400);
            say("Bzzt! Rebooting...", 1600, true);
            popText({ x: coreLayout.x, y: coreLayout.y + coreLayout.halfHeight + 22 }, "+4s", "jb-pop--penalty");
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" && !bug.spec.friendly && distanceToCore(bug) < 150) knockBack(bug, seconds);
            });
        }

        // ───── Fix my wiring: hold the soldering iron on the sparking breaks ─────
        function startWiring(step) {
            game.stage = "wiring";
            game.config = getBugConfig(step);
            game.queue = buildQueue(game.config);
            game.glowLeft = game.config.glowbugs;
            const count = size.width < 360 ? 3 : 4;
            game.breaks = Array.from({ length: count }, () => ({ fixed: false, progress: 0, element: null, spot: null }));
            placeRepairs();
            setTool("iron");
            setStatus("Hold the iron on each sparking wire. Tap fleas to zap them!");
            say("Ouch, my wires are fried...", 1600, true);
            const now = performance.now();
            game.nextSpawnAt = now + 2200;
            game.nextGlowAt = now + 5000;
        }

        // Spots on the board's main traces that are clear of the chip, the HUD and the hint
        function findBreakSpots() {
            const spots = [];
            boardLayer.querySelectorAll(".jb-trace:not(.jb-trace--thin)").forEach((trace, traceIndex) => {
                const length = trace.getTotalLength();
                if (length < 50) return;
                [0.5, 0.65, 0.8].forEach((fraction) => {
                    const at = length * fraction;
                    const point = trace.getPointAtLength(at);
                    const before = trace.getPointAtLength(Math.max(0, at - 3));
                    const after = trace.getPointAtLength(Math.min(length, at + 3));
                    const clear = point.x > 26 && point.x < size.width - 26 && point.y > 56 && point.y < size.height - 72
                        && !isOnCore(point, 30) && !isOnMemoryChip(point, 14);
                    if (clear) {
                        spots.push({ traceIndex, x: point.x, y: point.y, angle: (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI });
                    }
                });
            });
            return spots;
        }

        // Breaks (and the memory lights) sit on the board, so they move when it's redrawn
        function placeRepairs() {
            if (!game) return;
            // Mended wires from the wiring step belong to where the board's traces used to be
            repairLayer.querySelectorAll(".jb-break").forEach((element) => {
                if (!game.breaks.some((brk) => brk.element === element)) element.remove();
            });
            if (game.breaks.length) {
                const spots = shuffle(findBreakSpots());
                const used = [];
                game.breaks.forEach((brk) => {
                    const spot = spots.find((candidate) => used.every((other) => Math.hypot(other.x - candidate.x, other.y - candidate.y) > 64))
                        || spots.find((candidate) => !used.includes(candidate));
                    if (!spot) return;
                    used.push(spot);
                    brk.spot = spot;
                    drawBreak(brk);
                });
                // A tiny board might not have room for them all
                game.breaks = game.breaks.filter((brk) => brk.spot);
            }
            if (game.memory) placeMemoryPads();
        }

        function drawBreak(brk) {
            if (brk.element) brk.element.remove();
            const { spot } = brk;
            const group = svgEl("g", { class: `jb-break${brk.fixed ? " is-fixed" : ""}`, transform: `translate(${spot.x.toFixed(1)} ${spot.y.toFixed(1)}) rotate(${spot.angle.toFixed(1)})` }, repairLayer);
            svgEl("circle", { class: "jb-break-glow", r: 18 }, group);
            svgEl("rect", { class: "jb-break-gap", x: -5, y: -5, width: 10, height: 10, rx: 2 }, group);
            svgEl("path", { class: "jb-break-ends", d: "M-7.5 0h2.5M5 0h2.5" }, group);
            svgEl("path", { class: "jb-break-sparks", d: "M0-2-3-10M1-1l7-6M1 2l3 8.5M-1 1l-8 3.5" }, group);
            svgEl("path", { class: "jb-break-sparks jb-break-sparks--late", d: "M0 0-7-6M0 0l8 1M0 0l-2 9" }, group);
            svgEl("circle", { class: "jb-break-core", r: 3.4 }, group);
            brk.ring = svgEl("circle", { class: "jb-break-ring", r: 18, pathLength: 100 }, group);
            brk.ring.style.strokeDashoffset = String(100 - (brk.progress * 100));
            svgEl("path", { class: "jb-break-flow", d: "M3 0h44", pathLength: 100 }, group);
            svgEl("path", { class: "jb-break-flow", d: "M-3 0h-44", pathLength: 100 }, group);
            svgEl("ellipse", { class: "jb-solder", rx: 6.5, ry: 4.6 }, group);
            svgEl("ellipse", { class: "jb-solder-shine", cx: -1.8, cy: -1.4, rx: 2.2, ry: 1.2 }, group);
            svgEl("circle", { class: "jb-break-ok", cx: 0, cy: -10, r: 2.6 }, group);
            brk.element = group;
        }

        function findBreak(point, isTouch) {
            const reach = isTouch ? 30 : 22;
            let found = null;
            let closest = Infinity;
            game.breaks.forEach((brk) => {
                if (brk.fixed || !brk.spot) return;
                const distance = Math.hypot(point.x - brk.spot.x, point.y - brk.spot.y);
                if (distance < reach && distance < closest) {
                    found = brk;
                    closest = distance;
                }
            });
            return found;
        }

        function beginSolder(brk, event, point) {
            game.solder = { brk, pointerId: event.pointerId, point };
            try {
                root.setPointerCapture(event.pointerId);
            } catch (error) {
                // Pointer already gone
            }
            brk.element.classList.add("is-soldering");
            useTool({ x: brk.spot.x, y: brk.spot.y }, false);
            tool.classList.add("is-soldering");
            lookOverride = { x: brk.spot.x, y: brk.spot.y, until: performance.now() + 1200 };
            showSolderGauge(brk);
        }

        // How hot the joint's got, up above it where a finger on the joint doesn't hide it (below it
        // near the top of the board)
        function showSolderGauge(brk) {
            if (!brk.gauge || !brk.gauge.isConnected) {
                brk.gauge = document.createElement("span");
                brk.gauge.className = "jb-solder-gauge";
                brk.gaugeFill = document.createElement("span");
                brk.gaugeFill.className = "jb-solder-gauge-fill";
                brk.gauge.appendChild(brk.gaugeFill);
                fxLayer.appendChild(brk.gauge);
            }
            // (kept clear of the board's sides, so its "Fixed!" badge fits)
            brk.gauge.style.left = `${Math.max(42, Math.min(size.width - 42, brk.spot.x)).toFixed(1)}px`;
            brk.gauge.style.top = `${(brk.spot.y + (brk.spot.y < 84 ? 58 : -58)).toFixed(1)}px`;
            brk.gaugeFill.style.transform = `scaleX(${brk.progress.toFixed(3)})`;
            brk.gauge.classList.add("is-visible");
        }

        function endSolder(event) {
            const solder = game && game.solder;
            if (!solder || (event && event.pointerId !== solder.pointerId)) return;
            game.solder = null;
            if (solder.brk.element) solder.brk.element.classList.remove("is-soldering");
            if (solder.brk.gauge && !solder.brk.fixed) solder.brk.gauge.classList.remove("is-visible");
            tool.classList.remove("is-soldering");
            if (event && event.pointerType !== "mouse") {
                clearTimeout(toolHideTimer);
                toolHideTimer = setTimeout(() => {
                    if (!game || !game.solder) tool.classList.remove("is-visible");
                }, 400);
            }
        }

        // The iron heats the joint while it's held there (and only while it's still on it)
        function updateSolder(deltaSeconds) {
            const solder = game.solder;
            if (!solder) return;
            const { brk } = solder;
            if (Math.hypot(solder.point.x - brk.spot.x, solder.point.y - brk.spot.y) > 40) return;
            brk.progress = Math.min(1, brk.progress + (deltaSeconds / SOLDER_SECONDS));
            brk.ring.style.strokeDashoffset = String(100 - (brk.progress * 100));
            if (brk.gaugeFill) brk.gaugeFill.style.transform = `scaleX(${brk.progress.toFixed(3)})`;
            if (Math.random() < deltaSeconds * 7) {
                spawnFx("jb-solder-smoke", { x: brk.spot.x + randomBetween(-5, 5), y: brk.spot.y - 6 }, "", 900);
            }
            if (brk.progress >= 1) fixBreak(brk);
        }

        function fixBreak(brk) {
            brk.fixed = true;
            endSolder();
            brk.element.classList.add("is-fixed", "just-fixed");
            later(() => brk.element && brk.element.classList.remove("just-fixed"), 1100);
            sparkle({ x: brk.spot.x, y: brk.spot.y });
            // So it's plain even with a finger on the joint: a green ring bursts out past it, the
            // current runs off along the mended wire, and the heat gauge turns into a "Fixed!" badge
            spawnFx("jb-fix-wave", { x: brk.spot.x, y: brk.spot.y }, "", 800);
            if (brk.gauge) {
                const badge = brk.gauge;
                brk.gauge = null;
                badge.classList.add("is-visible", "is-done");
                setTimeout(() => badge.remove(), 1000);
            } else {
                popText({ x: brk.spot.x, y: brk.spot.y - 58 }, "Fixed!", "jb-pop--fixed");
            }
            setPower(game.power + 8);
            react("happy", 600);
            if (typeof navigator.vibrate === "function") navigator.vibrate(12);
            const left = game.breaks.filter((item) => !item.fixed).length;
            if (left) {
                setStatus(`${left} more wire${left === 1 ? "" : "s"} to fix!`);
                say(left === 1 ? "Just one more!" : "Ahh, much better!", 1100);
            }
            checkWiringDone();
        }

        function checkWiringDone() {
            if (game.stage !== "wiring") return;
            const wiresLeft = game.breaks.some((brk) => !brk.fixed);
            if (!wiresLeft && getHostileRemaining() === 0) {
                completeStep();
            } else if (!wiresLeft && !game.wiresDone) {
                game.wiresDone = true;
                setStatus("Wires fixed! Now zap those fleas.");
            }
        }

        // ───── Reboot my memory: watch the lights, then play them back ─────
        function startMemory() {
            game.stage = "memory";
            game.memory = { pads: [], sequence: [], round: 0, input: 0, showing: true, mistakes: 0 };
            root.classList.add("no-tool");
            setTool(null);
            placeMemoryPads();
            setStatus("Watch my memory lights...");
            say("My memory's all fuzzy...", 1500, true);
            later(nextMemoryRound, 1100);
        }

        // The four memory lights: right over the memory chips, which they wake up
        function placeMemoryPads() {
            const { memory } = game;
            getMemorySpots().forEach((spot) => {
                const { index } = spot;
                const padSize = spot.side;
                let pad = memory.pads[index];
                if (!pad) {
                    const group = svgEl("g", { class: "jb-memory-pad" }, repairLayer);
                    group.style.setProperty("--pad-color", MEMORY_COLORS[index]);
                    const key = svgEl("rect", { class: "jb-memory-key" }, group);
                    const note = svgEl("text", { class: "jb-memory-note", "text-anchor": "middle" }, group);
                    note.textContent = MEMORY_NOTES[index];
                    pad = { element: group, key, note };
                    memory.pads[index] = pad;
                }
                pad.x = spot.x;
                pad.y = spot.y;
                pad.half = padSize / 2;
                pad.element.setAttribute("transform", `translate(${pad.x.toFixed(1)} ${pad.y.toFixed(1)})`);
                pad.key.setAttribute("x", String(-padSize / 2));
                pad.key.setAttribute("y", String(-padSize / 2));
                pad.key.setAttribute("width", String(padSize));
                pad.key.setAttribute("height", String(padSize));
                pad.key.setAttribute("rx", String(Math.round(padSize * 0.26)));
                pad.note.setAttribute("y", String(Math.round(padSize * 0.16)));
                pad.note.style.fontSize = `${Math.round(padSize * 0.5)}px`;
            });
        }

        function flashPad(index, holdMs, variant) {
            const pad = game.memory.pads[index];
            if (!pad) return;
            const className = variant || "is-lit";
            pad.element.classList.remove(className);
            void pad.element.getBoundingClientRect();
            pad.element.classList.add(className);
            lookOverride = { x: pad.x, y: pad.y, until: performance.now() + holdMs };
            later(() => pad.element.classList.remove(className), holdMs);
        }

        function nextMemoryRound() {
            const { memory } = game;
            memory.round += 1;
            const length = MEMORY_ROUNDS[memory.round - 1];
            while (memory.sequence.length < length) {
                const last = memory.sequence[memory.sequence.length - 1];
                let next = Math.floor(Math.random() * 4);
                // No light three times in a row
                if (next === last && memory.sequence[memory.sequence.length - 2] === last) next = (next + 1 + Math.floor(Math.random() * 3)) % 4;
                memory.sequence.push(next);
            }
            playMemorySequence();
        }

        function playMemorySequence() {
            const { memory } = game;
            memory.showing = true;
            memory.input = 0;
            const gap = Math.max(430, 640 - (memory.round * 45));
            setStatus(`Round ${memory.round} of ${MEMORY_ROUNDS.length}: watch...`);
            memory.sequence.forEach((index, order) => later(() => flashPad(index, gap * 0.62), 350 + (order * gap)));
            later(() => {
                memory.showing = false;
                setStatus("Your turn! Tap them in the same order.");
            }, 350 + (memory.sequence.length * gap));
        }

        function handleMemoryTap(point) {
            const { memory } = game;
            const index = memory.pads.findIndex((pad) => Math.abs(point.x - pad.x) <= pad.half + 8 && Math.abs(point.y - pad.y) <= pad.half + 8);
            if (index < 0) {
                if (isOnCore(point, 0)) {
                    react("happy", 500);
                    say(pick(BOOP_LINES), 800);
                }
                return;
            }
            if (memory.showing) {
                flashPad(index, 160, "is-pressed");
                return;
            }
            flashPad(index, 240);
            if (index === memory.sequence[memory.input]) {
                memory.input += 1;
                if (memory.input < memory.sequence.length) return;
                // That's the whole round
                memory.showing = true;
                react("excited", 700);
                if (memory.round >= MEMORY_ROUNDS.length) {
                    memory.pads.forEach((pad, padIndex) => later(() => flashPad(padIndex, 500), padIndex * 90));
                    later(() => {
                        memory.pads.forEach((pad) => pad.element.classList.add("is-done"));
                        later(() => memory.pads.forEach((pad) => pad.element.remove()), 450);
                        completeStep();
                    }, 650);
                } else {
                    say(pick(MEMORY_LINES), 1100, true);
                    later(nextMemoryRound, 950);
                }
            } else {
                memory.mistakes += 1;
                memory.showing = true;
                game.penaltyMs += 2000;
                memory.pads.forEach((pad, padIndex) => flashPad(padIndex, 420, "is-wrong"));
                react("ouch", 800);
                say("Oops! Watch again...", 1300, true);
                popText({ x: memory.pads[index].x, y: memory.pads[index].y - memory.pads[index].half - 8 }, "+2s", "jb-pop--penalty");
                later(playMemorySequence, 1200);
            }
        }

        // ───── Close me up: scrub off the goo, then screw the panel back on ─────
        function startClosing() {
            const dirty = boardSplats.filter((splat) => splat.dirt > 0).length;
            if (!dirty) {
                beginScrewIn();
                return;
            }
            game.stage = "clean";
            setTool("sponge");
            setStatus(`Scrub off all the goo! ${dirty} splat${dirty === 1 ? "" : "s"} to go.`);
            say("Eww, so much goo...", 1400, true);
            // (and again once the message along the bottom has slid up into place)
            bringSplatsIntoView();
            later(bringSplatsIntoView, 450);
            scheduleGooHint();
        }

        function scrubAt(point, amount) {
            let cleanedAny = false;
            boardSplats.forEach((splat) => {
                if (splat.dirt <= 0) return;
                if (Math.hypot(point.x - splat.x, point.y - splat.y) > splat.radius + 16) return;
                // (the last faint smear counts as clean: scrubbed nearly away, it was too faint to see
                // but still counted as goo left)
                splat.dirt = splat.dirt - amount <= 0.15 ? 0 : splat.dirt - amount;
                // Goo that's still there stays plain to see as it fades
                splat.element.style.opacity = String(0.4 + (0.6 * splat.dirt));
                cleanedAny = true;
                if (splat.dirt <= 0) {
                    splat.element.remove();
                    sparkle({ x: splat.x, y: splat.y });
                }
            });
            if (cleanedAny) scheduleGooHint();

            if (cleanedAny && Math.random() < 0.35) {
                spawnFx("jb-bubble", { x: point.x + randomBetween(-12, 12), y: point.y + randomBetween(-10, 10) }, "", 700);
            }

            const dirtyLeft = boardSplats.filter((splat) => splat.dirt > 0).length;
            if (dirtyLeft === 0) {
                game.scrubbing = false;
                say("Sparkling! Now my panel...", 1400, true);
                later(beginScrewIn, 600);
                game.stage = "between";
            } else if (cleanedAny) {
                setStatus(`${dirtyLeft} goo splat${dirtyLeft === 1 ? "" : "s"} left`);
            }
        }

        // The panel goes back on with its screws sticking out; hold each one to tighten it
        function beginScrewIn() {
            if (!game) return;
            game.stage = "screwin";
            game.screwProgress = [1, 1, 1, 1];
            setTool("screwdriver");
            setStatus("");
            root.classList.remove("cover-off", "is-playing");
            root.classList.add("is-screwing");
            screws.forEach((screw) => {
                screw.classList.remove("is-out", "is-in", "is-screwing-in");
                screw.disabled = false;
                screw.style.setProperty("--turn", "-720deg");
                screw.style.setProperty("--lift", "1");
            });
            stickerTitle.textContent = "Last bit!";
            stickerText.textContent = "Hold each screw to tighten my panel back on.";
            renderSteps(stickerSteps, JOB_STEPS.length - 1);
            stickerNote.textContent = `Step ${JOB_STEPS.length} of ${JOB_STEPS.length}`;
            stickerActions.hidden = true;
        }

        // ───── All fixed! ─────
        function finishJob() {
            if (!game || game.stage !== "screwin") return;
            game.endTime = performance.now();
            game.stage = "done";
            progress.jobSeconds += getElapsedSeconds();
            progress.squashed += game.squashed;
            const firstFix = !progress.bestJob;
            const jobSeconds = progress.jobSeconds;
            const isBest = firstFix || jobSeconds < progress.bestJob;
            if (isBest) progress.bestJob = jobSeconds;
            progress.step = JOB_STEPS.length;
            saveProgress(progress);

            setTool(null);
            root.classList.remove("is-running", "is-screwing", "is-broken");
            root.classList.add("is-fixed");
            lightUp(3);
            setMoodClass("happy");
            updateSticker();
            say("I'm fixed! Thank you!", 2400, true);
            for (let index = 0; index < 14; index += 1) {
                later(() => sparkle({ x: randomBetween(20, size.width - 20), y: randomBetween(20, size.height - 20) }), index * 70);
            }
            document.dispatchEvent(new CustomEvent("jukebot:fixed"));

            later(() => {
                const notes = [];
                if (firstFix) notes.push("Bug blitz unlocked!");
                else if (isBest) notes.push("New best time!");
                notes.push("P.S. Jukebot is ticklish...");
                showResults({
                    badge: "\u2605 SERVICED \u2605",
                    title: "Jukebot is fixed!",
                    stats: `Job time ${formatClock(jobSeconds)} \u00b7 ${progress.squashed} bug${progress.squashed === 1 ? "" : "s"} squashed`,
                    note: notes.join(" "),
                    primary: ["Bug blitz", startBlitz],
                    secondary: ["Done", closeResults]
                });
            }, 1500);
        }

        function showResults({ badge, title, stats, note, primary, secondary }) {
            resultsBadge.textContent = badge || "";
            resultsBadge.hidden = !badge;
            resultsTitle.textContent = title;
            resultsStats.textContent = stats;
            resultsNote.textContent = note;
            resultsPrimary.textContent = primary[0];
            resultsSecondary.textContent = secondary[0];
            resultsActions = { primary: primary[1], secondary: secondary[1] };
            mission.hidden = true;
            resultsOverlay.hidden = false;
            resultsPrimary.focus({ preventScroll: true });
        }

        function closeResults() {
            resultsOverlay.hidden = true;
            rest();
        }

        // ───── Bug blitz (once Jukebot's fixed): wave after wave until the power runs out ─────
        function startBlitz() {
            stopGame();
            clearBoard();
            mission.hidden = true;
            resultsOverlay.hidden = true;
            game = newGame(JOB_STEPS.length);
            game.blitz = { wave: 0, score: 0 };
            root.classList.remove("is-loose", "no-tool");
            root.classList.add("is-running", "is-blitz");
            showPowerLevel(1);
            hideSpeech();
            // The panel pops off by itself for this one
            screws.forEach((screw, index) => later(() => {
                screw.classList.add("is-out");
                sparkle(getElementCenter(screw));
            }, index * 90));
            later(() => root.classList.add("cover-off", "is-playing"), 420);
            later(nextBlitzWave, 950);
            updateHud();
            game.frame = requestAnimationFrame(tick);
        }

        function nextBlitzWave() {
            const { blitz } = game;
            blitz.wave += 1;
            startSwat(getBlitzConfig(blitz.wave), blitz.wave === 1 ? "Bug blitz! How long can you last?" : `Wave ${blitz.wave}!`);
            setStatus(`Wave ${blitz.wave}: swat them all!`);
            if (blitz.wave > 1) setPower(game.power + 15);
        }

        function waveCleared() {
            game.stage = "between";
            game.zapReady = false;
            root.classList.remove("zap-ready");
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" && bug.spec.friendly) flee(bug);
            });
            react("excited", 900);
            say(`Wave ${game.blitz.wave} cleared!`, 1300, true);
            setStatus("Next wave incoming...");
            later(nextBlitzWave, 1600);
        }

        function endBlitz() {
            const { wave, score } = game.blitz;
            game.endTime = performance.now();
            game.stage = "done";
            game.zapReady = false;
            root.classList.remove("zap-ready", "power-low", "is-running");
            game.bugs.forEach((bug) => {
                if (bug.state === "alive") flee(bug);
            });
            const isBest = score > progress.blitzBest;
            if (isBest) {
                progress.blitzBest = score;
                saveProgress(progress);
            }
            setTool(null);
            setStatus("");
            root.classList.add("is-shorting");
            later(() => root.classList.remove("is-shorting"), 1200);
            react("ouch", 1400);
            say("Bzzt... out of power!", 1600, true);
            later(() => showResults({
                badge: isBest && score ? "\u2605 NEW BEST \u2605" : "",
                title: "Blitz over!",
                stats: `Wave ${wave} \u00b7 ${score} bug${score === 1 ? "" : "s"} squashed`,
                note: isBest ? "That's your best yet!" : `Your best: ${progress.blitzBest}`,
                primary: ["Again", startBlitz],
                secondary: ["Done", closeResults]
            }), 1300);
        }

        // ───── The secret: boop the fixed Jukebot's sticker enough times in a row ─────
        function applyGold() {
            document.documentElement.classList.toggle("gold-record", progress.gold);
        }

        function boopSticker() {
            const now = performance.now();
            boops = boops.filter((time) => now - time < 2600);
            boops.push(now);
            stickerBoop.classList.remove("is-booped");
            void stickerBoop.offsetWidth;
            stickerBoop.classList.add("is-booped");
            react("happy", 700);
            if (game || progress.step < JOB_STEPS.length || boops.length < SECRET_BOOPS) {
                say(pick(BOOP_LINES), 900, true);
                return;
            }
            boops = [];
            progress.gold = !progress.gold;
            const first = !progress.secretFound;
            progress.secretFound = true;
            saveProgress(progress);
            applyGold();
            if (progress.gold) {
                react("excited", 2400);
                say(first ? "Hehe! You found my secret: a gold record!" : "Gold record, back on!", 2600, true);
                const center = getElementCenter(stickerBoop);
                for (let index = 0; index < 10; index += 1) {
                    later(() => sparkle({ x: center.x + randomBetween(-60, 60), y: center.y + randomBetween(-40, 40) }), index * 60);
                }
            } else {
                say("Back to black.", 1400, true);
            }
            document.dispatchEvent(new CustomEvent("jukebot:secret", { detail: { gold: progress.gold, first } }));
        }

        // ───── Jukebot's eyes follow the action ─────
        function updateLook(seconds) {
            if (!coreFace) return;
            const now = performance.now();
            let target = null;
            if (lookOverride && now < lookOverride.until) {
                target = lookOverride;
            } else if (pointerPoint && now - pointerPoint.at < 1500) {
                target = pointerPoint;
            } else if (game && (game.stage === "swat" || game.stage === "wiring")) {
                // The bug closest to the core is the scariest
                let closest = Infinity;
                game.bugs.forEach((bug) => {
                    if (bug.state !== "alive" || bug.spec.friendly) return;
                    const distance = distanceToCore(bug);
                    if (distance < closest && distance < 220) {
                        closest = distance;
                        target = bug;
                    }
                });
            }

            let lookX = Math.sin(seconds * 0.7) * 2.5;
            let lookY = Math.sin(seconds * 0.43) * 1.2;
            if (target) {
                const dx = target.x - coreLayout.x;
                const dy = target.y - coreLayout.y;
                const distance = Math.hypot(dx, dy) || 1;
                const reach = Math.min(1, distance / 110);
                lookX = (dx / distance) * 7 * reach;
                lookY = (dy / distance) * 5 * reach;
            }
            if (Math.abs(lookX - lastLook.x) > 0.25 || Math.abs(lookY - lastLook.y) > 0.25) {
                lastLook = { x: lookX, y: lookY };
                coreFace.style.setProperty("--look-x", `${lookX.toFixed(1)}px`);
                coreFace.style.setProperty("--look-y", `${lookY.toFixed(1)}px`);
            }
        }

        // ───── Main loop ─────
        function tick(timestamp) {
            if (!game) return;
            const deltaSeconds = game.lastFrame === null ? 0 : Math.min(0.05, (timestamp - game.lastFrame) / 1000);
            const seconds = performance.now() / 1000;
            game.lastFrame = timestamp;
            const bugsOut = game.stage === "swat" || game.stage === "wiring";

            if ((game.stage === "unscrew" || game.stage === "screwin") && game.hold) {
                turnScrew(game.hold.index, deltaSeconds / SCREW_HOLD_SECONDS);
            }
            if (bugsOut) {
                spawnIfNeeded(timestamp);
            }
            if (game.stage === "wiring") {
                updateSolder(deltaSeconds);
            }
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" || bug.state === "fleeing") updateBug(bug, deltaSeconds, seconds);
            });
            game.bugs = game.bugs.filter((bug) => bug.state === "alive" || bug.state === "fleeing");
            if (bugsOut && game.stage !== "done") {
                updatePower(deltaSeconds, seconds);
            }
            if (game && game.stage === "swat") {
                checkBugsCleared();
            } else if (game && game.stage === "wiring") {
                checkWiringDone();
            }
            if (!game) return;
            if (performance.now() > moodHoldUntil) {
                setMoodClass(getBaseMood());
            }
            updateLook(seconds);
            updateHud();

            if (game.stage !== "done" || game.bugs.length) {
                game.frame = requestAnimationFrame(tick);
            }
        }

        // Blink now and then (both faces)
        function scheduleBlink() {
            setTimeout(() => {
                if (!document.hidden) {
                    root.classList.add("is-blinking");
                    setTimeout(() => root.classList.remove("is-blinking"), 140);
                }
                scheduleBlink();
            }, randomBetween(2200, 5200));
        }

        // ───── Input ─────
        screws.forEach((screw) => {
            screw.addEventListener("pointerdown", (event) => {
                event.preventDefault();
                beginScrewHold(screw, event);
            });
            screw.addEventListener("pointerup", endScrewHold);
            screw.addEventListener("pointercancel", endScrewHold);
            screw.addEventListener("lostpointercapture", endScrewHold);
            // Keyboard users: each press turns it halfway
            screw.addEventListener("click", (event) => {
                if (event.detail !== 0) return;
                if (!game && progress.step === 0) startStep(0);
                turnScrew(Number(screw.dataset.screw), SCREW_TAP_TURN);
            });
        });

        const isPlayStage = () => game && ["swat", "clean", "wiring", "memory"].includes(game.stage);

        root.addEventListener("pointerdown", (event) => {
            if (!isPlayStage() || event.target.closest("button")) return;
            event.preventDefault();
            const point = toLocalPoint(event);
            const isTouch = event.pointerType !== "mouse";

            if (game.stage === "swat") {
                handleSwat(point, isTouch);
            } else if (game.stage === "wiring") {
                const brk = findBreak(point, isTouch);
                if (brk) {
                    beginSolder(brk, event, point);
                } else {
                    handleSwat(point, isTouch);
                }
            } else if (game.stage === "memory") {
                handleMemoryTap(point);
            } else {
                game.scrubbing = true;
                game.lastScrub = point;
                try {
                    root.setPointerCapture(event.pointerId);
                } catch (error) {
                    // Pointer already gone
                }
                useTool(point, false);
                scrubAt(point, 0.4);
            }
        });

        root.addEventListener("pointermove", (event) => {
            if (!game || !["unscrew", "screwin", "swat", "clean", "wiring"].includes(game.stage)) return;
            const point = toLocalPoint(event);
            if (game.solder && event.pointerId === game.solder.pointerId) {
                game.solder.point = point;
            }
            if (event.pointerType === "mouse") {
                // The iron stays on the joint it's soldering
                if (!game.solder) moveTool(point);
                tool.classList.add("is-visible");
                pointerPoint = { x: point.x, y: point.y, at: performance.now() };
                // Hoppers feel the swatter hovering over them
                if (game.stage === "swat" || game.stage === "wiring") {
                    const seconds = performance.now() / 1000;
                    game.bugs.forEach((bug) => {
                        if (bug.state === "alive" && bug.type === "hopper" && Math.hypot(point.x - bug.x, point.y - bug.y) < 30) {
                            dodge(bug, point, seconds);
                        }
                    });
                }
            }
            if (game.stage === "clean" && game.scrubbing) {
                moveTool(point);
                const distance = Math.hypot(point.x - game.lastScrub.x, point.y - game.lastScrub.y);
                game.lastScrub = point;
                scrubAt(point, distance / 30);
            }
        });

        const stopScrubbing = (event) => {
            if (!game) return;
            game.scrubbing = false;
            endSolder(event);
            if (event.pointerType !== "mouse") {
                clearTimeout(toolHideTimer);
                toolHideTimer = setTimeout(() => {
                    if (!game || (!game.hold && !game.solder)) tool.classList.remove("is-visible");
                }, 300);
            }
        };
        root.addEventListener("pointerup", stopScrubbing);
        root.addEventListener("pointercancel", stopScrubbing);
        root.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse" && !(game && (game.hold || game.solder))) tool.classList.remove("is-visible");
            pointerPoint = null;
        });

        missionStart.addEventListener("click", () => {
            const index = Number(mission.dataset.step);
            if (Number.isInteger(index) && index < JOB_STEPS.length) startStep(index);
        });
        resultsPrimary.addEventListener("click", () => resultsActions.primary && resultsActions.primary());
        resultsSecondary.addEventListener("click", () => resultsActions.secondary && resultsActions.secondary());
        stickerBoop.addEventListener("click", boopSticker);

        if ("ResizeObserver" in window) {
            new ResizeObserver(handleResize).observe(root);
        } else {
            window.addEventListener("resize", handleResize);
        }

        applyGold();
        rest();
        handleResize();
        scheduleBlink();
        // Turning back to the songs puts the panel back (a step in progress starts over next time)
        window.jukebot = { reset: rest, prepare: drawBoardIfDirty };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
