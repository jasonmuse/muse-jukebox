// Fix Jukebot: a little repair mini game on the back of the jukebox.
// Unscrew the panel, swat the bugs inside (but not the glowbugs), wipe up the goo.
(() => {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const BOARD = { x0: 26, y0: 68, x1: 274, y1: 220 };
    const SCREW_TURNS_NEEDED = 2;
    const STORAGE_KEY = "museJukeboxJukebot";
    const HAPPY_LINES = ["Super duper!", "Good as new!", "Beep boop, thank you!", "Back in the groove!"];
    const SQUASH_LINES = ["Splat!", "Got one!", "Squashed!", "Nice swing!", "Bzzt... gone."];
    const BUG_TYPES = {
        fly: { radius: 11, hp: 1, speed: [80, 120], goo: "#c8e64a" },
        beetle: { radius: 12, hp: 2, speed: [30, 44], goo: "#6fd36f" },
        glowbug: { radius: 11, hp: 1, speed: [24, 34], goo: "#f4ff9a", friendly: true },
        queen: { radius: 24, hp: 6, speed: [34, 42], goo: "#c56cf0" }
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

        const scene = document.getElementById("jb-scene");
        const cover = document.getElementById("jb-cover");
        const bugLayer = document.getElementById("jb-bugs");
        const splatLayer = document.getElementById("jb-splats");
        const fxLayer = document.getElementById("jb-fx");
        const tool = document.getElementById("jb-tool");
        const screws = Array.from(scene.querySelectorAll(".jb-screw"));
        const bulbs = Array.from(scene.querySelectorAll(".jb-bulb"));
        const lcdText = document.getElementById("jb-lcd-text");
        const statusText = document.getElementById("jb-status");
        const hudLevel = document.getElementById("jb-level");
        const hudBugs = document.getElementById("jb-bug-count");
        const hudTime = document.getElementById("jb-time");
        const comboBadge = document.getElementById("jb-combo");
        const speech = document.getElementById("jb-speech");
        const startOverlay = document.getElementById("jb-start");
        const levelLabel = document.getElementById("jb-level-label");
        const levelBest = document.getElementById("jb-level-best");
        const levelPrev = document.getElementById("jb-level-prev");
        const levelNext = document.getElementById("jb-level-next");
        const startButton = document.getElementById("jb-start-button");
        const resultsOverlay = document.getElementById("jb-results");
        const resultsTitle = document.getElementById("jb-results-title");
        const resultsStars = Array.from(document.querySelectorAll("#jb-stars .jb-star"));
        const resultsStats = document.getElementById("jb-results-stats");
        const resultsNote = document.getElementById("jb-results-note");
        const replayButton = document.getElementById("jb-replay");
        const nextButton = document.getElementById("jb-next");

        let progress = readProgress();
        let selectedLevel = progress.unlocked;
        let game = null;
        let moodTimer = null;
        let comboTimer = null;
        let toolHideTimer = null;

        // ───── Small helpers ─────
        function later(callback, delay) {
            const id = setTimeout(callback, delay);
            if (game) game.timers.push(id);
            return id;
        }

        function setMood(mood, holdMs) {
            ["broken", "worried", "ouch", "happy"].forEach((name) => scene.classList.toggle(`mood-${name}`, name === mood));
            clearTimeout(moodTimer);
            if (holdMs && game) {
                const restoreMood = ["clean", "closing", "done"].includes(game.stage) ? "happy" : "worried";
                moodTimer = setTimeout(() => setMood(restoreMood), holdMs);
            }
        }

        function setTool(name) {
            ["screwdriver", "swatter", "sponge"].forEach((toolName) => scene.classList.toggle(`tool-${toolName}`, toolName === name));
            if (!name) tool.classList.remove("is-visible");
        }

        function setStatus(message) {
            statusText.textContent = message;
        }

        function toScenePoint(event) {
            const matrix = scene.getScreenCTM();
            if (!matrix) return { x: 0, y: 0 };
            const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
            return { x: point.x, y: point.y };
        }

        function moveTool(point) {
            tool.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
        }

        function useTool(point, isTouch) {
            moveTool(point);
            tool.classList.add("is-visible");
            tool.classList.remove("is-using");
            void tool.getBoundingClientRect();
            tool.classList.add("is-using");
            clearTimeout(toolHideTimer);
            if (isTouch) {
                toolHideTimer = setTimeout(() => {
                    if (!game || !game.scrubbing) tool.classList.remove("is-visible");
                }, 650);
            }
        }

        function popText(x, y, text, className) {
            const label = svgEl("text", { class: `jb-pop ${className || ""}`, x: x.toFixed(1), y: y.toFixed(1) }, fxLayer);
            label.textContent = text;
            setTimeout(() => label.remove(), 800);
        }

        function sparkle(x, y, size) {
            const star = svgEl("g", { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${size || 1})` }, fxLayer);
            svgEl("path", { class: "jb-sparkle", d: "M0-6 1.4-1.4 6 0 1.4 1.4 0 6-1.4 1.4-6 0-1.4-1.4z" }, star);
            setTimeout(() => star.remove(), 900);
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
            const queued = game.queue.length;
            const alive = game.bugs.filter((bug) => !bug.spec.friendly && bug.state === "alive").length;
            return queued + alive;
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
            hudLevel.textContent = `Lv ${selectedLevel}`;
        }

        // ───── Reset / start ─────
        function clearBoard() {
            bugLayer.textContent = "";
            splatLayer.textContent = "";
            fxLayer.textContent = "";
        }

        function resetScrews() {
            screws.forEach((screw) => {
                screw.classList.remove("is-out", "is-turning");
                screw.style.setProperty("--turn", "0deg");
            });
        }

        function reset() {
            if (game) {
                cancelAnimationFrame(game.frame);
                game.timers.forEach((id) => clearTimeout(id));
            }
            game = null;
            clearBoard();
            resetScrews();
            scene.classList.remove("is-fixed", "cover-off", "is-playing", "cover-closing");
            scene.classList.add("is-broken");
            bulbs.forEach((bulb) => bulb.classList.remove("is-lit"));
            setMood("broken");
            setTool(null);
            lcdText.textContent = "ERR: NO GROOVE";
            speech.classList.remove("is-visible");
            comboBadge.classList.remove("is-visible");
            resultsOverlay.hidden = true;
            startOverlay.hidden = false;
            setStatus("Jukebot is glitching! Can you fix it?");
            updateLevelPicker();
            hudBugs.textContent = "Bugs 0";
            hudTime.textContent = "0.0s";
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

            startOverlay.hidden = true;
            scene.classList.add("is-playing");
            setTool("screwdriver");
            setMood("broken");
            lcdText.textContent = "OPEN ME UP...";
            setStatus("Tap each screw to unscrew the panel.");
            updateHud();
            game.frame = requestAnimationFrame(step);
        }

        // ───── Stage 1: unscrew ─────
        function handleScrewTap(point, isTouch) {
            const reach = isTouch ? 18 : 12;
            screws.forEach((screw, index) => {
                if (screw.classList.contains("is-out")) return;
                const [x, y] = [index % 2 === 0 ? 40 : 260, index < 2 ? 82 : 206];
                if (Math.hypot(point.x - x, point.y - y) > reach) return;

                game.screwTurns[index] += 1;
                screw.style.setProperty("--turn", `${game.screwTurns[index] * -200}deg`);
                screw.classList.remove("is-turning");
                void screw.getBoundingClientRect();
                screw.classList.add("is-turning");
                useTool({ x, y }, isTouch);

                if (game.screwTurns[index] >= SCREW_TURNS_NEEDED) {
                    later(() => {
                        screw.classList.add("is-out");
                        sparkle(x, y - 6, 0.8);
                        checkCoverOff();
                    }, 160);
                }
            });
        }

        function checkCoverOff() {
            if (!game || game.stage !== "unscrew") return;
            if (!screws.every((screw) => screw.classList.contains("is-out"))) return;

            game.stage = "opening";
            scene.classList.add("cover-off");
            bulbs[0].classList.add("is-lit");
            later(() => {
                game.stage = "swat";
                setTool("swatter");
                setMood("worried");
                lcdText.textContent = "BUGS DETECTED";
                setStatus("Bugs in the wiring! Swat them all. Don't hit the glowbugs.");
                const now = performance.now();
                game.nextSpawnAt = now + 250;
                game.nextGlowAt = now + 2200;
            }, 520);
        }

        // ───── Stage 2: swat ─────
        function spawnBug(type, x, y) {
            const spec = BUG_TYPES[type];
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
                startX = randomBetween(BOARD.x0 + 20, BOARD.x1 - 20);
                startY = randomBetween(BOARD.y0 + 20, BOARD.y1 - 20);
                if (edge === 0) startY = BOARD.y0 - spec.radius;
                if (edge === 1) startX = BOARD.x1 + spec.radius;
                if (edge === 2) startY = BOARD.y1 + spec.radius;
                if (edge === 3) startX = BOARD.x0 - spec.radius;
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
                game.nextSpawnAt = now + randomBetween(420, 950) / game.config.speedScale;
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
            bug.element.setAttribute("transform", `translate(${bug.x.toFixed(1)} ${bug.y.toFixed(1)}) rotate(${rotation.toFixed(1)})`);
        }

        function updateBug(bug, deltaSeconds, seconds) {
            const radius = bug.spec.radius;
            const minX = BOARD.x0 + radius;
            const maxX = BOARD.x1 - radius;
            const minY = BOARD.y0 + radius;
            const maxY = BOARD.y1 - radius;

            if (bug.state === "fleeing") {
                bug.x += Math.cos(bug.angle) * bug.speed * 2.6 * deltaSeconds;
                bug.y += Math.sin(bug.angle) * bug.speed * 2.6 * deltaSeconds;
                renderBug(bug);
                if (bug.x < BOARD.x0 - 40 || bug.x > BOARD.x1 + 40 || bug.y < BOARD.y0 - 40 || bug.y > BOARD.y1 + 40) {
                    bug.state = "gone";
                    bug.element.remove();
                }
                return;
            }

            if (!bug.entered) {
                const centerX = (BOARD.x0 + BOARD.x1) / 2;
                const centerY = (BOARD.y0 + BOARD.y1) / 2;
                bug.angle = Math.atan2(centerY - bug.y, centerX - bug.x) + (Math.sin(seconds * 3 + bug.phase) * 0.3);
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
                const centerX = (BOARD.x0 + BOARD.x1) / 2;
                const centerY = (BOARD.y0 + BOARD.y1) / 2;
                const targetX = centerX + (Math.sin((seconds * 0.7) + bug.phase) * 88);
                const targetY = centerY + (Math.sin((seconds * 1.4) + bug.phase) * 40);
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
            const centerX = (BOARD.x0 + BOARD.x1) / 2;
            const centerY = (BOARD.y0 + BOARD.y1) / 2;
            bug.angle = Math.atan2(bug.y - centerY, bug.x - centerX);
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
            addSplat(bug.x, bug.y, bug.spec.goo, bug.type === "queen" ? 1.9 : 1);
            popText(bug.x, bug.y - 14, pick(SQUASH_LINES));
            if (typeof navigator.vibrate === "function") navigator.vibrate(12);
        }

        function handleSwat(point, isTouch) {
            useTool(point, isTouch);
            const reachBonus = isTouch ? 8 : 3;
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
                popText(point.x, point.y - 10, "whiff", "jb-pop--miss");
                return;
            }

            if (target.spec.friendly) {
                // Swatting a helper costs time and the combo
                game.glowHits += 1;
                game.combo = 0;
                game.penaltyMs += 3000;
                flee(target);
                setMood("ouch", 900);
                popText(target.x, target.y - 14, "+3s", "jb-pop--penalty");
                setStatus("Hey! Glowbugs help power Jukebot. Leave them be!");
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
                    popText(target.x, target.y - 14, "crack!");
                }
                if (target.type === "queen") {
                    target.hpBar.setAttribute("width", String(36 * (target.hp / target.spec.hp)));
                    popText(target.x, target.y - 30, "bonk!");
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
            bulbs[1].classList.add("is-lit");
            setTool("sponge");
            setMood("happy", 700);
            lcdText.textContent = "GOO LEVELS: HIGH";
            setStatus("Bugs gone! Now scrub off all the goo.");
        }

        // ───── Stage 3: clean ─────
        function scrubAt(point, amount) {
            let cleanedAny = false;
            game.splats.forEach((splat) => {
                if (splat.dirt <= 0) return;
                if (Math.hypot(point.x - splat.x, point.y - splat.y) > splat.radius + 10) return;
                splat.dirt = Math.max(0, splat.dirt - amount);
                splat.element.style.opacity = String(splat.dirt);
                cleanedAny = true;
                if (splat.dirt <= 0) {
                    splat.element.remove();
                    sparkle(splat.x, splat.y, 1);
                }
            });

            if (cleanedAny && Math.random() < 0.35) {
                const bubble = svgEl("circle", {
                    class: "jb-bubble",
                    cx: (point.x + randomBetween(-10, 10)).toFixed(1),
                    cy: (point.y + randomBetween(-8, 8)).toFixed(1),
                    r: randomBetween(1.5, 3.5).toFixed(1)
                }, fxLayer);
                setTimeout(() => bubble.remove(), 700);
            }

            const dirtyLeft = game.splats.filter((splat) => splat.dirt > 0).length;
            if (dirtyLeft === 0) {
                closeUp();
            } else if (cleanedAny) {
                lcdText.textContent = `GOO LEFT: ${dirtyLeft}`;
            }
        }

        // ───── Stage 4: close up ─────
        function closeUp() {
            if (game.stage !== "clean") return;
            game.stage = "closing";
            game.endTime = performance.now();
            game.scrubbing = false;
            setTool(null);
            bulbs[2].classList.add("is-lit");
            scene.classList.remove("cover-off");
            scene.classList.add("cover-closing");
            setStatus("Closing him back up...");

            later(() => {
                resetScrews();
                screws.forEach((screw) => screw.classList.add("is-turning"));
                scene.classList.remove("is-broken", "cover-closing");
                scene.classList.add("is-fixed");
                setMood("happy");
                lcdText.textContent = "♪ GOOD AS NEW ♪";
                speech.textContent = pick(HAPPY_LINES);
                speech.classList.add("is-visible");
                for (let index = 0; index < 10; index += 1) {
                    later(() => sparkle(randomBetween(30, 270), randomBetween(20, 220), randomBetween(0.8, 1.6)), index * 70);
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
            selectedLevel = Math.min(game.level + 1, progress.unlocked);

            game.stage = "done";
            scene.classList.remove("is-playing");
            resultsTitle.textContent = `Level ${game.level} fixed!`;
            resultsStars.forEach((star, index) => star.classList.toggle("is-earned", index < stars));
            resultsStats.textContent = `${time.toFixed(1)}s · ${Math.round(accuracy * 100)}% aim · best combo x${game.bestCombo}`;

            const notes = [];
            if (isNewBest) notes.push("New best!");
            if (game.glowHits) notes.push(`${game.glowHits} glowbug${game.glowHits === 1 ? "" : "s"} bonked`);
            if (stars < 3) notes.push(`3 stars: under ${Math.round(game.config.par)}s, 75% aim, no glowbugs`);
            resultsNote.textContent = notes.join(" · ");
            nextButton.textContent = `Level ${game.level + 1}`;
            resultsOverlay.hidden = false;
            setStatus(stars === 3 ? "Perfect repair!" : "Jukebot's grooving again. Can you do it faster?");
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
        scene.addEventListener("pointerdown", (event) => {
            if (!game || !["unscrew", "swat", "clean"].includes(game.stage)) return;
            event.preventDefault();
            const point = toScenePoint(event);
            const isTouch = event.pointerType !== "mouse";

            if (game.stage === "unscrew") {
                handleScrewTap(point, isTouch);
                if (!isTouch) moveTool(point);
            } else if (game.stage === "swat") {
                handleSwat(point, isTouch);
            } else {
                game.scrubbing = true;
                game.lastScrub = point;
                scene.setPointerCapture(event.pointerId);
                useTool(point, false);
                scrubAt(point, 0.3);
            }
        });

        scene.addEventListener("pointermove", (event) => {
            if (!game || !["unscrew", "swat", "clean"].includes(game.stage)) return;
            const point = toScenePoint(event);
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
        scene.addEventListener("pointerup", stopScrubbing);
        scene.addEventListener("pointercancel", stopScrubbing);
        scene.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse") tool.classList.remove("is-visible");
        });

        startButton.addEventListener("click", () => start(selectedLevel));
        replayButton.addEventListener("click", () => start(game ? game.level : selectedLevel));
        nextButton.addEventListener("click", () => start(game ? game.level + 1 : selectedLevel));
        levelPrev.addEventListener("click", () => {
            selectedLevel = Math.max(1, selectedLevel - 1);
            updateLevelPicker();
        });
        levelNext.addEventListener("click", () => {
            selectedLevel = Math.min(progress.unlocked, selectedLevel + 1);
            updateLevelPicker();
        });

        reset();
        window.jukebot = { reset };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
