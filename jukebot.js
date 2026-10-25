// Fix Jukebot: the jukebox is Jukebot. Unscrew its rear panel, swat the bugs in its
// wiring (but not the glowbugs), wipe up the goo, and close it back up.
(() => {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const EDGE = 4;
    const SCREW_TURNS_NEEDED = 2;
    const STORAGE_KEY = "museJukeboxJukebot";
    const HAPPY_LINES = ["Super duper!", "Good as new!", "Beep boop, thank you!", "Back in the groove!"];
    const SQUASH_LINES = ["Splat!", "Got one!", "Squashed!", "Nice swing!", "Bzzt... gone."];
    const BUG_TYPES = {
        fly: { radius: 13, hp: 1, speed: [95, 140], goo: "#c8e64a", scale: 1.2 },
        beetle: { radius: 14, hp: 2, speed: [36, 52], goo: "#6fd36f", scale: 1.2 },
        glowbug: { radius: 13, hp: 1, speed: [28, 40], goo: "#f4ff9a", scale: 1.2, friendly: true },
        queen: { radius: 30, hp: 6, speed: [44, 54], goo: "#c56cf0", scale: 1.3 }
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
        const queen = level % 3 === 0;
        const hostileCount = flies + beetles + (queen ? 1 : 0);
        return {
            level,
            flies,
            beetles,
            queen,
            glowbugs: level >= 2 ? Math.min(4, level - 1) : 0,
            speedScale: 1 + Math.min(0.9, (level - 1) * 0.1),
            maxOnBoard: Math.min(6, 3 + Math.floor(level / 2)),
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

    // Jukebot's face: every expression is drawn, CSS shows the one for the current mood
    function getFaceMarkup(scale) {
        const eyeX = 20 * scale;
        const eyeY = -5 * scale;
        const eyeRadius = 5.5 * scale;
        const mouthY = 13 * scale;
        const mouthWidth = 14 * scale;
        const cross = 4 * scale;
        const zig = mouthWidth / 3.5;
        const zigY = 3 * scale;
        const f = (value) => value.toFixed(1);
        return `
            <g class="jb-eyes jb-eyes--round"><circle cx="${f(-eyeX)}" cy="${f(eyeY)}" r="${f(eyeRadius)}"/><circle cx="${f(eyeX)}" cy="${f(eyeY)}" r="${f(eyeRadius)}"/><circle class="jb-pupil" cx="${f(-eyeX + (1.5 * scale))}" cy="${f(eyeY - (1.5 * scale))}" r="${f(1.8 * scale)}"/><circle class="jb-pupil" cx="${f(eyeX + (1.5 * scale))}" cy="${f(eyeY - (1.5 * scale))}" r="${f(1.8 * scale)}"/></g>
            <path class="jb-eyes jb-eyes--x" d="M${f(-eyeX - cross)} ${f(eyeY - cross)}l${f(2 * cross)} ${f(2 * cross)}m0 ${f(-2 * cross)}l${f(-2 * cross)} ${f(2 * cross)}M${f(eyeX - cross)} ${f(eyeY - cross)}l${f(2 * cross)} ${f(2 * cross)}m0 ${f(-2 * cross)}l${f(-2 * cross)} ${f(2 * cross)}"/>
            <path class="jb-eyes jb-eyes--happy" d="M${f(-eyeX - eyeRadius)} ${f(eyeY + (2 * scale))}q${f(eyeRadius)} ${f(-9 * scale)} ${f(2 * eyeRadius)} 0M${f(eyeX - eyeRadius)} ${f(eyeY + (2 * scale))}q${f(eyeRadius)} ${f(-9 * scale)} ${f(2 * eyeRadius)} 0"/>
            <path class="jb-mouth jb-mouth--zigzag" d="M${f(-mouthWidth)} ${f(mouthY)}l${f(zig)} ${f(-zigY)} ${f(zig)} ${f(zigY)} ${f(zig)} ${f(-zigY)} ${f(zig)} ${f(zigY)} ${f(zig)} ${f(-zigY)} ${f(zig)} ${f(zigY)} ${f(zig)} ${f(-zigY)}"/>
            <path class="jb-mouth jb-mouth--wobble" d="M${f(-mouthWidth * 0.7)} ${f(mouthY)}q${f(mouthWidth * 0.35)} ${f(-4 * scale)} ${f(mouthWidth * 0.7)} 0t${f(mouthWidth * 0.7)} 0"/>
            <circle class="jb-mouth jb-mouth--o" cx="0" cy="${f(mouthY)}" r="${f(4 * scale)}"/>
            <path class="jb-mouth jb-mouth--smile" d="M${f(-mouthWidth * 0.8)} ${f(mouthY - (3 * scale))}q${f(mouthWidth * 0.8)} ${f(12 * scale)} ${f(mouthWidth * 1.6)} 0"/>`;
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
        const fxLayer = document.getElementById("jb-fx");
        const tool = document.getElementById("jb-tool");
        const screws = Array.from(root.querySelectorAll(".jb-screw"));
        const lights = Array.from(document.querySelectorAll(".jb-light"));
        const statusText = document.getElementById("jb-status");
        const hudLevel = document.getElementById("jb-level");
        const hudBugs = document.getElementById("jb-bug-count");
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
        let moodTimer = null;
        let comboTimer = null;
        let toolHideTimer = null;

        // Jukebot's face lives on the main chip inside, and on the service sticker outside
        svgEl("rect", { class: "jb-core-plate", x: -58, y: -36, width: 116, height: 72, rx: 12 }, core);
        const coreFace = svgEl("g", { class: "jb-face jb-face--inner" }, core);
        coreFace.innerHTML = getFaceMarkup(1);
        const stickerFaceGroup = svgEl("g", { class: "jb-face jb-face--sticker" }, stickerFace);
        stickerFaceGroup.innerHTML = getFaceMarkup(0.75);

        // ───── Small helpers ─────
        function later(callback, delay) {
            const id = setTimeout(callback, delay);
            if (game) game.timers.push(id);
            return id;
        }

        function getBounds() {
            return { x0: EDGE, y0: EDGE, x1: size.width - EDGE, y1: size.height - EDGE };
        }

        function setMood(mood, holdMs) {
            ["broken", "worried", "ouch", "happy"].forEach((name) => root.classList.toggle(`mood-${name}`, name === mood));
            clearTimeout(moodTimer);
            if (holdMs && game) {
                moodTimer = setTimeout(() => {
                    setMood(game && ["clean", "closing", "done"].includes(game.stage) ? "happy" : "worried");
                }, holdMs);
            }
        }

        function setTool(name) {
            ["screwdriver", "swatter", "sponge"].forEach((toolName) => root.classList.toggle(`tool-${toolName}`, toolName === name));
            if (!name) tool.classList.remove("is-visible");
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
            tool.style.transform = `translate(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px)`;
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
                    if (!game || !game.scrubbing) tool.classList.remove("is-visible");
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
            hudLevel.textContent = `Lv ${game ? game.level : selectedLevel}`;
            hudBugs.textContent = `Bugs ${game ? getHostileRemaining() : 0}`;
            hudTime.textContent = `${getElapsedSeconds().toFixed(1)}s`;
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

        // ───── The circuit board fills whatever space the back of the jukebox has ─────
        function drawBoard() {
            const { width, height } = size;
            boardLayer.textContent = "";
            svgEl("rect", { class: "jb-board", x: 0, y: 0, width, height }, boardLayer);

            const random = seededRandom(7);
            const coreX = width / 2;
            const coreY = Math.max(70, height * 0.34);
            const traces = [];
            for (let index = 0; index < 9; index += 1) {
                let x = Math.round(random() * width);
                let y = Math.round(random() * height);
                let d = `M${x} ${y}`;
                for (let step = 0; step < 3; step += 1) {
                    if (step % 2 === 0) {
                        x = Math.round(Math.min(width - 12, Math.max(12, x + ((random() - 0.5) * width * 0.6))));
                        d += `H${x}`;
                    } else {
                        y = Math.round(Math.min(height - 12, Math.max(12, y + ((random() - 0.5) * height * 0.5))));
                        d += `V${y}`;
                    }
                }
                traces.push(d);
                svgEl("circle", { class: "jb-via", cx: x, cy: y, r: 3 }, boardLayer);
            }
            svgEl("path", { class: "jb-traces", d: traces.join("") }, boardLayer);

            const awayFromCore = (x, y, margin) => Math.abs(x - coreX) > 58 + margin || Math.abs(y - coreY) > 36 + margin;
            for (let index = 0, placed = 0; index < 40 && placed < 6; index += 1) {
                const chipWidth = 26 + (random() * 26);
                const chipHeight = 16 + (random() * 14);
                const x = 10 + (random() * (width - chipWidth - 20));
                const y = 10 + (random() * (height - chipHeight - 20));
                if (!awayFromCore(x + (chipWidth / 2), y + (chipHeight / 2), 30)) continue;
                svgEl("rect", { class: "jb-chip", x: x.toFixed(1), y: y.toFixed(1), width: chipWidth.toFixed(1), height: chipHeight.toFixed(1), rx: 3 }, boardLayer);
                placed += 1;
            }
            for (let index = 0; index < 5; index += 1) {
                const x = 14 + (random() * (width - 28));
                const y = 14 + (random() * (height - 28));
                if (!awayFromCore(x, y, 16)) continue;
                svgEl("circle", { class: "jb-cap", cx: x.toFixed(1), cy: y.toFixed(1), r: (5 + (random() * 3)).toFixed(1) }, boardLayer);
            }
            const fan = svgEl("g", { class: "jb-fan", transform: `translate(${(width * 0.24).toFixed(1)} ${(Math.min(height - 40, coreY + 110)).toFixed(1)})` }, boardLayer);
            svgEl("circle", { class: "jb-fan-ring", r: 18 }, fan);
            svgEl("path", { class: "jb-fan-blades", d: "M0 0C5-13 13-10 10 0M0 0C13 5 10 13 0 10M0 0C-5 13-13 10-10 0M0 0C-13-5-10-13 0-10" }, fan);
            const label = svgEl("text", { class: "jb-silkscreen", x: width - 12, y: height - 12 }, boardLayer);
            label.textContent = "JKB-01 · MUSE";

            core.setAttribute("transform", `translate(${coreX.toFixed(1)} ${coreY.toFixed(1)})`);
        }

        function handleResize() {
            const width = Math.round(root.clientWidth);
            const height = Math.round(root.clientHeight);
            if (!width || !height || (width === size.width && height === size.height)) return;
            size = { width, height };
            internals.setAttribute("viewBox", `0 0 ${width} ${height}`);
            internals.setAttribute("width", width);
            internals.setAttribute("height", height);
            drawBoard();

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
                screw.classList.remove("is-out", "is-turning", "is-screwing-in");
                screw.disabled = false;
                screw.style.setProperty("--turn", "0deg");
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
            fxLayer.textContent = "";
            resetScrews();
            root.classList.remove("is-fixed", "cover-off", "is-playing", "is-running");
            root.classList.add("is-broken");
            lightUp(0);
            setMood("broken");
            setTool(null);
            speech.classList.remove("is-visible");
            comboBadge.classList.remove("is-visible");
            resultsOverlay.hidden = true;
            stickerTitle.textContent = "Help! I'm glitching!";
            stickerText.textContent = "Bugs got into my wiring. Unscrew my 4 corner screws to open me up and fix me.";
            setStatus("");
            updateLevelPicker();
            updateHud();
        }

        function start(level) {
            reset();
            const config = getLevelConfig(level);
            const hostile = shuffle([
                ...Array(config.flies).fill("fly"),
                ...Array(config.beetles).fill("beetle")
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
                screwTurns: [0, 0, 0, 0],
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
                scrubbing: false,
                lastScrub: null,
                timers: []
            };

            root.classList.add("is-running");
            setTool("screwdriver");
            stickerTitle.textContent = "That's it, keep going!";
            stickerText.textContent = "Twist every corner screw out (two turns each).";
            updateHud();
            game.frame = requestAnimationFrame(step);
        }

        // ───── Stage 1: unscrew the rear panel ─────
        function handleScrewTap(screw, isTouch) {
            if (!game || game.stage === "done") {
                start(selectedLevel);
            }
            if (game.stage !== "unscrew" || screw.classList.contains("is-out")) return;

            const index = Number(screw.dataset.screw);
            const center = getElementCenter(screw);
            game.screwTurns[index] += 1;
            screw.style.setProperty("--turn", `${game.screwTurns[index] * -200}deg`);
            screw.classList.remove("is-turning");
            void screw.offsetWidth;
            screw.classList.add("is-turning");
            useTool(center, isTouch);

            if (game.screwTurns[index] >= SCREW_TURNS_NEEDED) {
                screw.disabled = true;
                later(() => {
                    screw.classList.add("is-out");
                    sparkle({ x: center.x, y: center.y - 8 });
                    const left = screws.filter((item) => !item.classList.contains("is-out")).length;
                    if (left) {
                        stickerText.textContent = `${left} screw${left === 1 ? "" : "s"} to go...`;
                    }
                    checkCoverOff();
                }, 160);
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
                setMood("worried");
                setStatus("Bugs in my wiring! Swat them all. Not the glowbugs!");
                const now = performance.now();
                game.nextSpawnAt = now + 250;
                game.nextGlowAt = now + 2200;
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
                game.nextGlowAt = now + randomBetween(2600, 4600);
            }
        }

        function renderBug(bug) {
            const rotation = bug.type === "queen" ? 0 : ((bug.angle * 180) / Math.PI) + 90;
            bug.element.setAttribute("transform", `translate(${bug.x.toFixed(1)} ${bug.y.toFixed(1)}) rotate(${rotation.toFixed(1)}) scale(${bug.spec.scale})`);
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

            if (!bug.entered) {
                bug.angle = Math.atan2(centerY - bug.y, centerX - bug.x) + (Math.sin((seconds * 3) + bug.phase) * 0.3);
                if (bug.x >= minX && bug.x <= maxX && bug.y >= minY && bug.y <= maxY) {
                    bug.entered = true;
                }
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
                bug.angle += Math.sin((seconds * 1.6) + bug.phase) * 1.1 * deltaSeconds;
                if (performance.now() - bug.bornAt > 6500) {
                    flee(bug);
                    return;
                }
            } else if (bug.type === "queen") {
                // Loops around the board in a figure eight
                const targetX = centerX + (Math.sin((seconds * 0.7) + bug.phase) * (size.width * 0.34));
                const targetY = centerY + (Math.sin((seconds * 1.4) + bug.phase) * (size.height * 0.3));
                bug.angle = Math.atan2(targetY - bug.y, targetX - bug.x);
            }

            bug.x += Math.cos(bug.angle) * bug.speed * deltaSeconds;
            bug.y += Math.sin(bug.angle) * bug.speed * deltaSeconds;

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

            renderBug(bug);
        }

        function flee(bug) {
            bug.state = "fleeing";
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

        function squash(bug) {
            bug.state = "squashed";
            bug.element.classList.add("is-squashed");
            setTimeout(() => bug.element.remove(), 380);
            addSplat(bug.x, bug.y, bug.spec.goo, bug.type === "queen" ? 2.2 : 1.3);
            popText({ x: bug.x, y: bug.y - 18 }, pick(SQUASH_LINES));
            if (typeof navigator.vibrate === "function") navigator.vibrate(12);
        }

        function handleSwat(point, isTouch) {
            useTool(point, isTouch);
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

            if (!target) {
                game.misses += 1;
                game.combo = 0;
                popText({ x: point.x, y: point.y - 12 }, "whiff", "jb-pop--miss");
                return;
            }

            if (target.spec.friendly) {
                // Swatting a helper costs time and the combo
                game.glowHits += 1;
                game.combo = 0;
                game.penaltyMs += 3000;
                flee(target);
                setMood("ouch", 900);
                popText({ x: target.x, y: target.y - 18 }, "+3s", "jb-pop--penalty");
                setStatus("Hey! Glowbugs help power me. Leave them be!");
                return;
            }

            game.hits += 1;
            game.combo += 1;
            game.bestCombo = Math.max(game.bestCombo, game.combo);
            if (game.combo >= 3) showCombo(game.combo);
            target.hp -= 1;

            if (target.hp > 0) {
                target.element.classList.remove("is-hit");
                void target.element.getBoundingClientRect();
                target.element.classList.add("is-hit");
                if (target.type === "beetle") {
                    target.element.classList.add("is-cracked");
                    target.speed *= 1.6;
                    popText({ x: target.x, y: target.y - 18 }, "crack!");
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
            const remaining = getHostileRemaining();
            if (remaining > 0) {
                setStatus(`${remaining} bug${remaining === 1 ? "" : "s"} to go!`);
            }
        }

        function checkBugsCleared() {
            if (game.stage !== "swat" || getHostileRemaining() > 0) return;

            game.stage = "clean";
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" && bug.spec.friendly) flee(bug);
            });
            lightUp(2);
            setTool("sponge");
            setMood("happy", 700);
            setStatus("Bugs gone! Now scrub off all the goo.");
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
            root.classList.remove("cover-off", "is-playing", "is-running");

            later(() => {
                resetScrews();
                screws.forEach((screw) => screw.classList.add("is-screwing-in"));
                root.classList.remove("is-broken");
                root.classList.add("is-fixed");
                setMood("happy");
                stickerTitle.textContent = pick(HAPPY_LINES);
                stickerText.textContent = "All fixed up. Thanks for the repair!";
                speech.textContent = pick(HAPPY_LINES);
                speech.classList.add("is-visible");
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
            let stars = 1;
            if (time <= game.config.par * 1.5 && game.glowHits <= 1) stars = 2;
            if (time <= game.config.par && game.glowHits === 0 && accuracy >= 0.75) stars = 3;

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
            resultsStats.textContent = `${time.toFixed(1)}s · ${Math.round(accuracy * 100)}% aim · best combo x${game.bestCombo}`;

            const notes = [];
            if (isNewBest) notes.push("New best!");
            if (game.glowHits) notes.push(`${game.glowHits} glowbug${game.glowHits === 1 ? "" : "s"} bonked`);
            if (stars < 3) notes.push(`3 stars: under ${Math.round(game.config.par)}s, 75% aim, no glowbugs`);
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
            stickerText.textContent = "Unscrew my 4 corner screws to start.";
        }

        // ───── Main loop ─────
        function step(timestamp) {
            if (!game) return;
            const deltaSeconds = game.lastFrame === null ? 0 : Math.min(0.05, (timestamp - game.lastFrame) / 1000);
            game.lastFrame = timestamp;

            if (game.stage === "swat") {
                spawnIfNeeded(timestamp);
            }
            game.bugs.forEach((bug) => {
                if (bug.state === "alive" || bug.state === "fleeing") updateBug(bug, deltaSeconds, timestamp / 1000);
            });
            game.bugs = game.bugs.filter((bug) => bug.state === "alive" || bug.state === "fleeing");
            if (game.stage === "swat") {
                checkBugsCleared();
            }
            updateHud();

            if (game.stage !== "done") {
                game.frame = requestAnimationFrame(step);
            }
        }

        // ───── Input ─────
        screws.forEach((screw) => {
            screw.addEventListener("pointerdown", (event) => {
                event.preventDefault();
                handleScrewTap(screw, event.pointerType !== "mouse");
            });
            // Keyboard users
            screw.addEventListener("click", (event) => {
                if (event.detail === 0) handleScrewTap(screw, false);
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
                root.setPointerCapture(event.pointerId);
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
                toolHideTimer = setTimeout(() => tool.classList.remove("is-visible"), 300);
            }
        };
        root.addEventListener("pointerup", stopScrubbing);
        root.addEventListener("pointercancel", stopScrubbing);
        root.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse") tool.classList.remove("is-visible");
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
        window.jukebot = { reset };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
