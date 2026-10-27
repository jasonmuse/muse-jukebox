// Fix Jukebot: the jukebox is Jukebot. Unscrew its rear panel, swat the bugs before they chew
// through its core (leave the glowbugs alone, they recharge it), zap the swarm once it's charged,
// wipe up the goo, and close it back up.
(() => {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const EDGE = 4;
    const SCREW_HOLD_SECONDS = 0.7; // holding a screw turns it all the way out in this long
    const SCREW_TAP_TURN = 0.5; // a quick tap turns it halfway
    const ZAP_CHARGE_NEEDED = 6;
    const ZAP_RADIUS = 140;
    const GLOW_CHARGE_RANGE = 80;
    const STORAGE_KEY = "museJukeboxJukebot";
    const HAPPY_LINES = ["Super duper!", "Good as new!", "Beep boop, thank you!", "Back in the groove!"];
    const SQUASH_LINES = ["Splat!", "Got one!", "Squashed!", "Nice swing!", "Bzzt... gone."];
    const CHEW_LINES = ["Ow! It's chewing me!", "Hey! That's my core!", "Get it off me!"];
    const BOOP_LINES = ["Boop!", "Hehe, that tickles!", "Beep?"];
    const MOODS = ["broken", "worried", "scared", "ouch", "happy", "excited"];
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

    function getLevelConfig(level) {
        const flies = 3 + level;
        const beetles = 1 + Math.floor(level / 2);
        const hoppers = level >= 2 ? Math.floor(level / 2) : 0;
        const queen = level % 3 === 0;
        const hostileCount = flies + beetles + hoppers + (queen ? 1 : 0);
        return {
            level,
            flies,
            beetles,
            hoppers,
            queen,
            glowbugs: Math.min(4, level),
            speedScale: 1 + Math.min(0.9, (level - 1) * 0.1),
            seekBoost: Math.min(0.3, (level - 1) * 0.05),
            drainScale: 1 + Math.min(1, (level - 1) * 0.12),
            maxOnBoard: Math.min(7, 3 + Math.floor(level / 2)),
            par: 10 + (hostileCount * 2.4) + (queen ? 6 : 0)
        };
    }

    function readProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            return {
                unlocked: Math.max(1, Number(saved.unlocked) || 1),
                best: saved.best && typeof saved.best === "object" ? saved.best : {}
            };
        } catch (error) {
            return { unlocked: 1, best: {} };
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

        // Queen Moth (boss)
        svgEl("path", { class: "jb-wing jb-queen-wing jb-wing--left", d: "M-3-4C-22-24-31-2-22 10-16 18-6 10-3 4Z" }, art);
        svgEl("path", { class: "jb-wing jb-queen-wing jb-wing--right", d: "M3-4C22-24 31-2 22 10 16 18 6 10 3 4Z" }, art);
        svgEl("circle", { class: "jb-queen-eyespot", cx: -15, cy: -1, r: 3.6 }, art);
        svgEl("circle", { class: "jb-queen-eyespot", cx: 15, cy: -1, r: 3.6 }, art);
        svgEl("ellipse", { class: "jb-queen-body", cx: 0, cy: 3, rx: 5.5, ry: 13 }, art);
        svgEl("path", { class: "jb-queen-stripes", d: "M-5 2h10M-4.6 7h9.2M-3.6 12h7.2" }, art);
        svgEl("circle", { class: "jb-queen-head", cx: 0, cy: -11.5, r: 5 }, art);
        svgEl("circle", { class: "jb-fly-eye", cx: -2.4, cy: -12.4, r: 1.8 }, art);
        svgEl("circle", { class: "jb-fly-eye", cx: 2.4, cy: -12.4, r: 1.8 }, art);
        svgEl("path", { class: "jb-queen-crown", d: "M-5.5-16.5l1.5-5.5 3 3.4 1-4.4 1 4.4 3-3.4 1.5 5.5z" }, art);
    }

    function init() {
        const root = document.getElementById("jukebot");
        if (!root) return;

        const internals = document.getElementById("jb-internals");
        const boardLayer = document.getElementById("jb-board");
        const core = document.getElementById("jb-core");
        const bugLayer = document.getElementById("jb-bugs");
        const splatLayer = document.getElementById("jb-splats");
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
        const stickerTitle = document.getElementById("jb-sticker-title");
        const stickerText = document.getElementById("jb-sticker-text");
        const levelLabel = document.getElementById("jb-level-label");
        const levelBest = document.getElementById("jb-level-best");
        const levelPrev = document.getElementById("jb-level-prev");
        const levelNext = document.getElementById("jb-level-next");
        const resultsOverlay = document.getElementById("jb-results");
        const resultsTitle = document.getElementById("jb-results-title");
        const resultsStars = Array.from(document.querySelectorAll("#jb-stars .jb-star"));
        const resultsStats = document.getElementById("jb-results-stats");
        const resultsNote = document.getElementById("jb-results-note");
        const replayButton = document.getElementById("jb-replay");
        const nextButton = document.getElementById("jb-next");
        const closeResultsButton = document.getElementById("jb-results-close");

        let progress = readProgress();
        let selectedLevel = progress.unlocked;
        let game = null;
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
            if (["clean", "closing", "done"].includes(game.stage)) return "happy";
            if (game.stage === "swat") {
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
            tool.style.transform = `translate(${(rect.left + point.x).toFixed(1)}px, ${(rect.top + point.y).toFixed(1)}px)`;
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

        function updateHud() {
            const power = game ? game.power : 100;
            hudLevel.textContent = `Lv ${game ? game.level : selectedLevel}`;
            hudBugs.textContent = `Bugs ${game ? getHostileRemaining() : 0}`;
            hudTime.textContent = `${getElapsedSeconds().toFixed(1)}s`;
            hudPowerText.textContent = `${Math.round(power)}%`;
            hudPowerFill.style.width = `calc((100% - 6px) * ${(power / 100).toFixed(3)})`;
            hudPower.classList.toggle("is-low", power < 30);
        }

        function setPower(value) {
            game.power = Math.max(0, Math.min(100, value));
            root.style.setProperty("--power-level", (game.power / 100).toFixed(3));
            root.classList.toggle("power-low", game.power < 30);
            if (game.power < 30 && !game.lowPowerWarned) {
                game.lowPowerWarned = true;
                say("Power low! Help!", 1600, true);
            }
            if (game.power > 45) game.lowPowerWarned = false;
        }

        function formatBest(level) {
            const best = progress.best[level];
            if (!best) return "Not fixed yet";
            return `Best: ${"★".repeat(best.stars)}${"☆".repeat(3 - best.stars)} · ${best.time.toFixed(1)}s`;
        }

        function updateLevelPicker() {
            levelLabel.textContent = `Level ${selectedLevel}`;
            levelBest.textContent = formatBest(selectedLevel);
            levelPrev.disabled = selectedLevel <= 1;
            levelNext.disabled = selectedLevel >= progress.unlocked;
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
                svgEl("rect", { class: `jb-led ${variant}`, x: spot.x, y: spot.y, width: 12, height: 7, rx: 2 }, parts);
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
        }

        // ───── Reset / start ─────
        function resetScrews() {
            screws.forEach((screw) => {
                screw.classList.remove("is-out", "is-screwing-in");
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
        }

        function reset() {
            stopGame();
            bugLayer.textContent = "";
            splatLayer.textContent = "";
            zapLayer.textContent = "";
            fxLayer.textContent = "";
            resetScrews();
            root.classList.remove("is-fixed", "cover-off", "is-playing", "is-running", "zap-ready", "power-low", "is-shorting", "is-zapping");
            root.classList.add("is-broken");
            root.style.setProperty("--power-level", "1");
            lightUp(0);
            moodHoldUntil = 0;
            setMoodClass("broken");
            setTool(null);
            hideSpeech();
            comboBadge.classList.remove("is-visible");
            resultsOverlay.hidden = true;
            stickerTitle.textContent = "Help! I'm glitching!";
            stickerText.textContent = "Bugs got into my wiring. Hold my 4 corner screws to open me up and fix me.";
            setStatus("");
            updateChargeLeds();
            updateLevelPicker();
            updateHud();
        }

        function start(level) {
            reset();
            const config = getLevelConfig(level);
            const hostile = shuffle([
                ...Array(config.flies).fill("fly"),
                ...Array(config.beetles).fill("beetle"),
                ...Array(config.hoppers).fill("hopper")
            ]);
            if (config.queen) {
                hostile.splice(Math.floor(hostile.length * 0.55), 0, "queen");
            }

            game = {
                level,
                config,
                stage: "unscrew",
                startTime: performance.now(),
                endTime: null,
                penaltyMs: 0,
                frame: null,
                lastFrame: null,
                screwProgress: [0, 0, 0, 0],
                hold: null,
                queue: hostile,
                glowLeft: config.glowbugs,
                bugs: [],
                splats: [],
                nextSpawnAt: 0,
                nextGlowAt: 0,
                queenSpawns: 0,
                hits: 0,
                misses: 0,
                combo: 0,
                bestCombo: 0,
                glowHits: 0,
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
                timers: []
            };

            root.classList.add("is-running");
            setTool("screwdriver");
            stickerTitle.textContent = "That's it, keep going!";
            stickerText.textContent = "Hold each corner screw to twist it out (or tap it twice).";
            updateHud();
            game.frame = requestAnimationFrame(step);
        }

        // ───── Stage 1: unscrew the rear panel (hold to keep turning, or tap) ─────
        function turnScrew(index, amount) {
            if (!game || game.stage !== "unscrew") return;
            const screw = screws[index];
            if (screw.classList.contains("is-out")) return;
            game.screwProgress[index] = Math.min(1, game.screwProgress[index] + Math.max(0, amount));
            const turned = game.screwProgress[index];
            screw.style.setProperty("--turn", `${(turned * -720).toFixed(1)}deg`);
            screw.style.setProperty("--lift", turned.toFixed(3));
            if (turned >= 1) popScrew(index);
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

        function beginScrewHold(screw, event) {
            if (!game || game.stage === "done") {
                start(selectedLevel);
            }
            if (game.stage !== "unscrew" || screw.classList.contains("is-out")) return;

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
                const target = Math.min(1, hold.startProgress + SCREW_TAP_TURN);
                turnScrew(hold.index, target - game.screwProgress[hold.index]);
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
            root.classList.add("cover-off", "is-playing");
            lightUp(1);
            later(() => {
                game.stage = "swat";
                setTool("swatter");
                setStatus("Swat bugs before they chew my core! Spare the glowbugs.");
                say("Bugs! Get them off me!", 1600, true);
                const now = performance.now();
                game.nextSpawnAt = now + 250;
                game.nextGlowAt = now + 2600;
            }, 520);
        }

        // ───── Stage 2: swat ─────
        function spawnBug(type, x, y) {
            const spec = BUG_TYPES[type];
            const bounds = getBounds();
            const group = svgEl("g", { class: `jb-bug jb-bug--${type}` }, bugLayer);
            const art = svgEl("g", { class: "jb-bug-art" }, group);
            drawBugArt(type, art);
            let hpBar = null;
            if (type === "queen") {
                svgEl("rect", { class: "jb-hp-track", x: -18, y: -32, width: 36, height: 4, rx: 2 }, group);
                hpBar = svgEl("rect", { class: "jb-hp", x: -18, y: -32, width: 36, height: 4, rx: 2 }, group);
            }

            let startX = x;
            let startY = y;
            if (startX === undefined) {
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
                hpBar,
                x: startX,
                y: startY,
                angle: Math.random() * Math.PI * 2,
                turn: 0,
                speed: randomBetween(spec.speed[0], spec.speed[1]) * game.config.speedScale,
                hp: spec.hp,
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
            const rotation = bug.type === "queen" ? 0 : ((bug.angle * 180) / Math.PI) + 90;
            bug.element.setAttribute("transform", `translate(${bug.x.toFixed(1)} ${bug.y.toFixed(1)}) rotate(${rotation.toFixed(1)}) scale(${bug.spec.scale})`);
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
            game.splats.push({ element: group, x, y, radius: 13 * scale, dirt: 1 });
        }

        function squash(bug, quietly) {
            bug.state = "squashed";
            bug.element.classList.remove("is-chewing");
            bug.element.classList.add("is-squashed");
            setTimeout(() => bug.element.remove(), 380);
            addSplat(bug.x, bug.y, bug.spec.goo, bug.type === "queen" ? 2.2 : 1.3);
            if (!quietly) popText({ x: bug.x, y: bug.y - 18 }, pick(SQUASH_LINES));
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
                    bug.hpBar.setAttribute("width", String(36 * (bug.hp / bug.spec.hp)));
                    if (bug.hp > 0) {
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
                    target.hpBar.setAttribute("width", String(36 * (target.hp / target.spec.hp)));
                    popText({ x: target.x, y: target.y - 40 }, "bonk!");
                    if (game.queenSpawns < 3) {
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

            game.stage = "clean";
            game.endPower = game.power;
            game.zapReady = false;
            root.classList.remove("zap-ready", "power-low");
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" && bug.spec.friendly) flee(bug);
            });
            lightUp(2);
            setTool("sponge");
            react("excited", 900);
            say("Phew! Now the goo...", 1500, true);
            setStatus("Bugs gone! Now scrub off all the goo.");
        }

        // Chewing drains Jukebot's power; glowbugs hanging around the core top it back up
        function updatePower(deltaSeconds, seconds) {
            let drain = 0;
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

        // Out of power: Jukebot reboots (costs time) and shakes the bugs off
        function shortCircuit(seconds) {
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

        // ───── Stage 3: clean ─────
        function scrubAt(point, amount) {
            let cleanedAny = false;
            game.splats.forEach((splat) => {
                if (splat.dirt <= 0) return;
                if (Math.hypot(point.x - splat.x, point.y - splat.y) > splat.radius + 12) return;
                splat.dirt = Math.max(0, splat.dirt - amount);
                splat.element.style.opacity = String(splat.dirt);
                cleanedAny = true;
                if (splat.dirt <= 0) {
                    splat.element.remove();
                    sparkle({ x: splat.x, y: splat.y });
                }
            });

            if (cleanedAny && Math.random() < 0.35) {
                spawnFx("jb-bubble", { x: point.x + randomBetween(-12, 12), y: point.y + randomBetween(-10, 10) }, "", 700);
            }

            const dirtyLeft = game.splats.filter((splat) => splat.dirt > 0).length;
            if (dirtyLeft === 0) {
                closeUp();
            } else if (cleanedAny) {
                setStatus(`${dirtyLeft} goo splat${dirtyLeft === 1 ? "" : "s"} left`);
            }
        }

        // ───── Stage 4: close up ─────
        function closeUp() {
            if (game.stage !== "clean") return;
            game.stage = "closing";
            game.endTime = performance.now();
            game.scrubbing = false;
            setTool(null);
            lightUp(3);
            setStatus("");
            hideSpeech();
            root.classList.remove("cover-off", "is-playing", "is-running");

            later(() => {
                resetScrews();
                screws.forEach((screw) => screw.classList.add("is-screwing-in"));
                root.classList.remove("is-broken");
                root.classList.add("is-fixed");
                setMoodClass("happy");
                const line = pick(HAPPY_LINES);
                stickerTitle.textContent = line;
                stickerText.textContent = "All fixed up. Thanks for the repair!";
                say(line, 2400, true);
                for (let index = 0; index < 12; index += 1) {
                    later(() => sparkle({ x: randomBetween(20, size.width - 20), y: randomBetween(20, size.height - 20) }), index * 70);
                }
                document.dispatchEvent(new CustomEvent("jukebot:fixed", { detail: { level: game.level } }));
            }, 560);

            later(showResults, 1700);
        }

        function showResults() {
            const time = getElapsedSeconds();
            const attempts = game.hits + game.misses;
            const accuracy = attempts ? game.hits / attempts : 1;
            const power = Math.round(game.endPower === undefined ? game.power : game.endPower);
            let stars = 1;
            if (time <= game.config.par * 1.5 && game.glowHits <= 1 && power >= 30) stars = 2;
            if (time <= game.config.par && game.glowHits === 0 && accuracy >= 0.7 && power >= 60) stars = 3;

            const previous = progress.best[game.level];
            const isNewBest = !previous || time < previous.time || stars > previous.stars;
            progress.best[game.level] = {
                stars: Math.max(stars, previous ? previous.stars : 0),
                time: Math.min(time, previous ? previous.time : Infinity)
            };
            progress.unlocked = Math.max(progress.unlocked, game.level + 1);
            saveProgress(progress);

            game.stage = "done";
            resultsTitle.textContent = `Level ${game.level} fixed!`;
            resultsStars.forEach((star, index) => star.classList.toggle("is-earned", index < stars));
            const stats = [`${time.toFixed(1)}s`, `${Math.round(accuracy * 100)}% aim`, `${power}% power`];
            if (game.bestCombo >= 3) stats.push(`combo x${game.bestCombo}`);
            if (game.zapKills) stats.push(`${game.zapKills} zapped`);
            resultsStats.textContent = stats.join(" · ");

            const notes = [];
            if (isNewBest) notes.push("New best!");
            if (game.glowHits) notes.push(`${game.glowHits} glowbug${game.glowHits === 1 ? "" : "s"} bonked`);
            if (game.shorts) notes.push(`shorted out ${game.shorts}x`);
            if (stars < 3) notes.push(`3 stars: under ${Math.round(game.config.par)}s, 60% power, 70% aim, no glowbugs`);
            resultsNote.textContent = notes.join(" · ");
            nextButton.textContent = `Level ${game.level + 1}`;
            selectedLevel = game.level;
            updateLevelPicker();
            resultsOverlay.hidden = false;
        }

        // Pick a level and wait for the first screw (the clock starts then)
        function prepareLevel(level) {
            selectedLevel = Math.max(1, Math.min(progress.unlocked, level));
            reset();
            stickerTitle.textContent = `Level ${selectedLevel}: I'm glitching again!`;
            stickerText.textContent = "Hold my 4 corner screws to open me up.";
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
            } else if (game && game.stage === "swat") {
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
        function step(timestamp) {
            if (!game) return;
            const deltaSeconds = game.lastFrame === null ? 0 : Math.min(0.05, (timestamp - game.lastFrame) / 1000);
            const seconds = performance.now() / 1000;
            game.lastFrame = timestamp;

            if (game.stage === "unscrew" && game.hold) {
                turnScrew(game.hold.index, deltaSeconds / SCREW_HOLD_SECONDS);
            }
            if (game.stage === "swat") {
                spawnIfNeeded(timestamp);
            }
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" || bug.state === "fleeing") updateBug(bug, deltaSeconds, seconds);
            });
            game.bugs = game.bugs.filter((bug) => bug.state === "alive" || bug.state === "fleeing");
            if (game.stage === "swat") {
                updatePower(deltaSeconds, seconds);
                checkBugsCleared();
            }
            if (performance.now() > moodHoldUntil) {
                setMoodClass(getBaseMood());
            }
            updateLook(seconds);
            updateHud();

            if (game.stage !== "done") {
                game.frame = requestAnimationFrame(step);
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
                if (!game || game.stage === "done") start(selectedLevel);
                turnScrew(Number(screw.dataset.screw), SCREW_TAP_TURN);
            });
        });

        const isPlayStage = () => game && (game.stage === "swat" || game.stage === "clean");

        root.addEventListener("pointerdown", (event) => {
            if (!isPlayStage() || event.target.closest("button")) return;
            event.preventDefault();
            const point = toLocalPoint(event);
            const isTouch = event.pointerType !== "mouse";

            if (game.stage === "swat") {
                handleSwat(point, isTouch);
            } else {
                game.scrubbing = true;
                game.lastScrub = point;
                try {
                    root.setPointerCapture(event.pointerId);
                } catch (error) {
                    // Pointer already gone
                }
                useTool(point, false);
                scrubAt(point, 0.3);
            }
        });

        root.addEventListener("pointermove", (event) => {
            if (!game || !["unscrew", "swat", "clean"].includes(game.stage)) return;
            const point = toLocalPoint(event);
            if (event.pointerType === "mouse") {
                moveTool(point);
                tool.classList.add("is-visible");
                pointerPoint = { x: point.x, y: point.y, at: performance.now() };
                // Hoppers feel the swatter hovering over them
                if (game.stage === "swat") {
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
                scrubAt(point, distance / 45);
            }
        });

        const stopScrubbing = (event) => {
            if (!game) return;
            game.scrubbing = false;
            if (event.pointerType !== "mouse") {
                clearTimeout(toolHideTimer);
                toolHideTimer = setTimeout(() => {
                    if (!game || !game.hold) tool.classList.remove("is-visible");
                }, 300);
            }
        };
        root.addEventListener("pointerup", stopScrubbing);
        root.addEventListener("pointercancel", stopScrubbing);
        root.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse" && !(game && game.hold)) tool.classList.remove("is-visible");
            pointerPoint = null;
        });

        replayButton.addEventListener("click", () => prepareLevel(game ? game.level : selectedLevel));
        nextButton.addEventListener("click", () => prepareLevel(game ? game.level + 1 : selectedLevel + 1));
        closeResultsButton.addEventListener("click", () => {
            resultsOverlay.hidden = true;
        });
        levelPrev.addEventListener("click", () => prepareLevel(selectedLevel - 1));
        levelNext.addEventListener("click", () => prepareLevel(selectedLevel + 1));

        if ("ResizeObserver" in window) {
            new ResizeObserver(handleResize).observe(root);
        } else {
            window.addEventListener("resize", handleResize);
        }

        reset();
        handleResize();
        scheduleBlink();
        window.jukebot = { reset, prepare: drawBoardIfDirty };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
