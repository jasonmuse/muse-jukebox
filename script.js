// Song data embedded directly into the script
const tracks = [

    {
        "title": "Countdown Island",
        "file": "audio/countdownisland.mp3",
        "cover": "images/countdownisland.png",
        "thumbnail": "images/countdownisland-thumb.webp",
        "tags": ["Featured", "Game OST"],
        "date": "2026",
        "featured": true,
        "sideB": "audio/countdownisland_pitch_0.7.mp3",
        "game": {
            "name": "Countdown Island",
            "url": "https://amused.itch.io/countdown-island",
            "icon": "&#128163;",
            "iconClass": "game-link-icon--bomb"
        }
    },
    {
        "title": "Countdown Paused",
        "file": "audio/countdownisland_pitch_0.7.mp3",
        "cover": "images/countdownisland.png",
        "thumbnail": "images/countdownisland-thumb.webp",
        "tags": ["Featured", "Game OST", "Slowed"],
        "date": "2026",
        "featured": true,
        "grayscaleCover": true,
        "sideA": "audio/countdownisland.mp3",
        "spinScale": 0.7,
        "game": {
            "name": "Countdown Island",
            "url": "https://amused.itch.io/countdown-island",
            "icon": "&#128163;",
            "iconClass": "game-link-icon--bomb"
        }
    },
    {
        "title": "Exhale",
        "file": "audio/exhale.mp3",
        "cover": "images/crows_nest.png",
        "tags": ["Chill", "Atmospheric", "Fast"],
        "date": "2026"
    },
    {
        "title": "Runaway",
        "file": "audio/runawaynovocals.mp3",
        "cover": "images/runaway.gif",
        "tags": ["Chill", "Ambient", "Lo-fi"],
        "date": "2026"
    },
    {
        "title": "Leafed",
        "file": "audio/leafed.mp3",
        "cover": "images/leafed.gif",
        "tags": ["Chill", "Ambient", "Mysterious"],
        "date": "2026"
    },
    {
        "title": "Gallery - Muse Remix",
        "file": "audio/gallerymuseremix.mp3",
        "cover": "images/gallerymuseremix.png",
        "tags": ["Trap", "Bass", "Remix", "Game OST"],
        "date": "2025"
    },
    {
        "title": "Dropoff",
        "file": "audio/dropoff.mp3",
        "cover": "images/dropoff.png",
        "tags": ["Ambient", "Bass", "Chill"],
        "date": "2025"
    }, 
    {
        "title": "Drift",
        "file": "audio/drift.mp3",
        "cover": "images/drift.gif",
        "tags": ["Ambient", "Bass", "Chill"],
        "date": "2025"
    },    
    {
        "title": "Callout",
        "file": "audio/callout.mp3",
        "cover": "images/penguin.png",
        "tags": ["Happy", "Ambient", "Lo-fi"],
        "date": "2024"
    },
    {
        "title": "BOX 11",
        "file": "audio/box11.mp3",
        "cover": "images/box11.png",
        "tags": ["Chill", "Ambient", "Lo-fi", "Mysterious"],
        "date": "2024"
    },
    {
        "title": "Sundrown",
        "file": "audio/sundrown.mp3",
        "cover": "images/water.gif",
        "tags": ["Happy", "Ambient", "Lo-fi"],
        "date": "2024"
    },
    {
        "title": "Mino",
        "file": "audio/mino.mp3",
        "cover": "images/bonedeer.png",
        "tags": ["Chill", "Piano", "Trap"],
        "date": "2024"
    },
    {
        "title": "Portal",
        "file": "audio/portal.mp3",
        "cover": "images/howhollows-min.png",
        "tags": ["Chill", "Lo-fi", "Mysterious"],
        "date": "2024"
    },
    {
        "title": "Hollows",
        "file": "audio/hollows.mp3",
        "cover": "images/hollows.jpg",
        "tags": ["Hype", "Trap", "Bass"],
        "date": "2023"
    },
    {
        "title": "Rubber Bandit",
        "file": "audio/rubberbandit.mp3",
        "cover": "images/rubberbandit.png",
        "tags": ["Hype", "Trap", "Bass"],
        "date": "2023"
    },
    {
        "title": "Farewell Froggy",
        "file": "audio/goodbyefroggy.mp3",
        "cover": "images/goodbyefroggy.png",
        "tags": ["Emotional", "Ambient", "Melancholic", "Game OST"],
        "date": "2024",
        "game": {
            "name": "Frog Quest",
            "url": "https://amused.itch.io/frog-quest",
            "icon": "&#128056;"
        }
    },
    {
        "title": "Frog God",
        "file": "audio/FROGGOD.mp3",
        "cover": "images/Baby_Bowser.png",
        "tags": ["Hype", "Dark", "Mysterious", "Game OST"],
        "date": "2024",
        "game": {
            "name": "Frog Quest",
            "url": "https://amused.itch.io/frog-quest",
            "icon": "&#128056;"
        }
    },
    {
        "title": "Bell Drop",
        "file": "audio/belldrop.mp3",
        "cover": "images/belldrop.png",
        "tags": ["Chill", "Hype", "Lo-fi", "Mysterious"],
        "date": "2024"
    },
    {
        "title": "Zoom",
        "file": "audio/zoom.mp3",
        "cover": "images/zoom.png",
        "tags": ["Hype", "Trap", "Mysterious"],
        "date": "2023"
    },
    {
        "title": "Polar Coaster",
        "file": "audio/polarcoaster.mp3",
        "cover": "images/polarcoaster.png",
        "tags": ["Chill", "Ambient", "Lo-fi"],
        "date": "2024"
    },
    {
        "title": "Orbit",
        "file": "audio/ORBIT.mp3",
        "cover": "images/orbit.png",
        "tags": ["Chill", "Lo-fi", "Meow"],
        "date": "2024"
    },
    {
        "title": "Clocked Out",
        "file": "audio/clockedout.mp3",
        "cover": "images/clockedout.png",
        "tags": ["Chill", "Ambient", "Lo-fi"],
        "date": "2023"
    },
    {
        "title": "Closed Eyes",
        "file": "audio/closedeyes.mp3",
        "cover": "images/closedeyes.png",
        "tags": ["Chill", "Lo-fi", "Ambient"],
        "date": "2023"
    },
    {
        "title": "Spit Up",
        "file": "audio/spitup.mp3",
        "cover": "images/spitup.png",
        "tags": ["Chill", "Dark", "Trap"],
        "date": "2024"
    },
    {
        "title": "Flyby",
        "file": "audio/flyby.mp3",
        "cover": "images/flyby.png",
        "tags": ["Chill", "Ambient", "Lo-fi"],
        "date": "2023"
    },
    {
        "title": "Kicked Up",
        "file": "audio/kickedup.mp3",
        "cover": "images/kickedup.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Upstep",
        "file": "audio/upstep.mp3",
        "cover": "images/upstep.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Kickout",
        "file": "audio/kickout.mp3",
        "cover": "images/kickout.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Blackened",
        "file": "audio/blackened.mp3",
        "cover": "images/blackened.png",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Beesting",
        "file": "audio/beesting.mp3",
        "cover": "images/beesting.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Oddball",
        "file": "audio/oddball.mp3",
        "cover": "images/oddball.png",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Benched",
        "file": "audio/benched.mp3",
        "cover": "images/benched.png",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2023"
    },
    {
        "title": "Elevate",
        "file": "audio/elevate.mp3",
        "cover": "images/elevate.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Floatoff",
        "file": "audio/floatoff.mp3",
        "cover": "images/floatoff.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Moonie",
        "file": "audio/moonie.mp3",
        "cover": "images/good-night.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Fliptrix",
        "file": "audio/fliptrix.mp3",
        "cover": "images/fliptrix.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Slaw",
        "file": "audio/slaw.mp3",
        "cover": "images/slaw.gif",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2025"
    },
    {
        "title": "Bones",
        "file": "audio/bones.mp3",
        "cover": "images/askbot.png",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Skywatch",
        "file": "audio/SKYWATCH.mp3",
        "cover": "images/skywatch.png",
        "tags": ["Chill", "Trap", "Hype"],
        "date": "2024"
    },
    {
        "title": "Boom Slide",
        "file": "audio/bottletop.mp3",
        "cover": "images/boomslide.png",
        "tags": ["Chill", "Ambient", "Lo-fi", "Game OST"],
        "date": "2024",
        "game": {
            "name": "Boombox Swarm",
            "url": "https://amused.itch.io/boombox-swarm",
            "icon": "&#128251;"
        }
    },
    {
        "title": "Brain Check",
        "file": "audio/braincheck.mp3",
        "cover": "images/pineapplecakelogo.png",
        "tags": ["Chill", "Ambient", "Game OST"],
        "date": "2023"
    },
    {
        "title": "Loot Mode",
        "file": "audio/lootmode.mp3",
        "cover": "images/itchyscratchy.gif",
        "tags": ["Hype", "Dark", "Mysterious", "Trap"],
        "date": "2024"
    },

    {
        "title": "??????",
        "file": "audio/gotcha.mp3",
        "cover": "images/question.jpg",
        "tags": ["?????", "?????", "?????", "?????"],
        "date": "?????"
    }

];

// Wait for the DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", async () => {
    const trackList = document.getElementById("track-list");
    const tagFilter = document.getElementById("tag-filter");
    const sortFilter = document.getElementById("sort-filter");
    const randomTrackButton = document.getElementById("random-track-button");
    const record = document.querySelector(".record");
    const recordSeekControls = document.getElementById("record-seek-controls");
    const recordRewindButton = document.getElementById("record-rewind");
    const recordForwardButton = document.getElementById("record-forward");
    const recordPrevButton = document.getElementById("record-prev");
    const recordNextButton = document.getElementById("record-next");
    const sideRail = document.getElementById("side-rail");
    const railPrev = document.getElementById("rail-prev");
    const railPlay = document.getElementById("rail-play");
    const railNext = document.getElementById("rail-next");
    const railCover = document.getElementById("rail-cover");
    const railRingProgress = document.getElementById("rail-ring-progress");
    const safeAreaProbe = document.getElementById("safe-area-probe");
    const whereBackground = document.getElementById("where-background");
    const nowPlaying = document.getElementById("now-playing");
    const npRecord = document.getElementById("np-record");
    const recordDisc = record ? record.querySelector(".record-disc") : null;
    const npRecordDisc = npRecord ? npRecord.querySelector(".np-record-disc") : null;
    // Only the cabinet's record turns over with the jukebox: the deck's sits on its own turntable
    const recordTurns = record ? Array.from(record.querySelectorAll(".record-turn")) : [];
    const jukeboxContainer = document.getElementById("jukebox-container");
    const jukeboxGlow = document.getElementById("jukebox-glow");
    const musicNotes = document.getElementById("music-notes");
    const speakerCones = Array.from(document.querySelectorAll(".speaker-cone"));
    const eqBars = Array.from(document.querySelectorAll(".speaker-eq span"));
    const cabinetLightShades = Array.from(document.querySelectorAll(".cabinet-lights-shade"));
    const titlePenguins = Array.from(document.querySelectorAll(".title-penguin"));
    const titleWaves = Array.from(document.querySelectorAll(".title-waves"), (side) => Array.from(side.querySelectorAll("svg")));
    const npCover = document.getElementById("np-cover");
    const npBackdrop = document.getElementById("np-backdrop");
    const npEyebrow = document.getElementById("np-eyebrow");
    const npTitle = document.getElementById("np-title");
    const npSub = document.getElementById("np-sub");
    const npWave = document.getElementById("np-wave");
    const npElapsed = document.getElementById("np-elapsed");
    const npDuration = document.getElementById("np-duration");
    const npPlay = document.getElementById("np-play");
    const npPrev = document.getElementById("np-prev");
    const npNext = document.getElementById("np-next");
    const npContinuous = document.getElementById("np-continuous");
    const npShuffle = document.getElementById("np-shuffle");
    const npClear = document.getElementById("np-clear");
    const jukeboxPanel = document.getElementById("jukebox");
    const switchSound = new Audio("audio/jukeboxswitch.mp3");
    
    // Cover modal elements
    const coverModal = document.getElementById("cover-modal");
    const coverModalContent = document.querySelector(".cover-modal-content");
    const coverModalImage = document.getElementById("cover-modal-image");
    const coverModalClose = document.querySelector(".cover-modal-close");
    const coverModalOverlay = document.querySelector(".cover-modal-overlay");
    let activeModalCover = "";
    const FALLBACK_COVER = "images/cover.jpg";
    const COVER_PLACEHOLDER = "images/static.gif";
    const COVER_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
    const coverSourceCheckCache = new Map();
    const coverPreloadCache = new Set();
    const coverWarmCache = new Set();
    const WHERE_FADE_IN_SECONDS = 30;
    const WHERE_FADE_OUT_SECONDS = 7;
    // Browsers paint their toolbars and side strips (like Safari's on the Duo) in the page's theme
    // colour, so it follows the backdrop: purple with the gradient, the space gif's night sky with it
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const edgeBlend = document.querySelector(".edge-blend");
    const IDLE_BACKDROP_RGB = [30, 26, 77]; // #1e1a4d
    const SPACE_BACKDROP_RGB = [1, 5, 15]; // the sky in images/where.gif
    let backdropHex = "";
    const LOOP_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 11.5V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12.5V14a4 4 0 0 1-4 4h-13"/><path class="loop-one" d="M10.7 10.2 12.6 8.7v6.7"/></svg>`;
    const CLEAR_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>`;
    const PREV_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5.5v13a1 1 0 0 1-1.55.83L7.5 13.2V18a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v4.8l8.95-6.13A1 1 0 0 1 18 5.5Z"/></svg>`;
    const SIDE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 12a8.5 8.5 0 0 1 14.5-6"/><path d="M18.5 2.5V6.5H14.5"/><path d="M20.5 12a8.5 8.5 0 0 1-14.5 6"/><path d="M5.5 21.5V17.5H9.5"/></svg>`;
    const NEXT_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.5v13a1 1 0 0 0 1.55.83l8.95-6.13V18a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0v4.8L7.55 4.67A1 1 0 0 0 6 5.5Z"/></svg>`;
    const SHUFFLE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 3 21 6.5 17.5 10"/><path d="M17.5 14 21 17.5 17.5 21"/><path d="M3 17.5h2.6a4 4 0 0 0 3.3-1.8l5.2-7.4a4 4 0 0 1 3.3-1.8H21"/><path d="M3 6.5h2.6a4 4 0 0 1 3.3 1.8l.6.8"/><path d="M21 17.5h-3.6a4 4 0 0 1-3.3-1.8l-.6-.8"/></svg>`;

    if (recordSeekControls) {
        recordSeekControls.classList.remove("visible");
        recordSeekControls.setAttribute("aria-hidden", "true");
    }

    function toValidCoverSource(source) {
        if (typeof source !== "string") return FALLBACK_COVER;
        const trimmedSource = source.trim();
        return trimmedSource ? trimmedSource : FALLBACK_COVER;
    }

    function getTrackCoverPreview(track) {
        return toValidCoverSource(track.resolvedThumbnail || track.thumbnail || track.cover);
    }

    function getTrackCoverFull(track) {
        return toValidCoverSource(track.resolvedCover || track.cover);
    }

    function extractFileStem(pathValue) {
        if (typeof pathValue !== "string") return "";
        const filename = pathValue.split("/").pop() || "";
        const dotIndex = filename.lastIndexOf(".");
        return dotIndex > 0 ? filename.slice(0, dotIndex) : filename;
    }

    function slugifyTitle(value) {
        if (typeof value !== "string") return "";
        return value.toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function getTrackYearSortValue(track) {
        const year = Number.parseInt(track.date, 10);
        return Number.isFinite(year) ? year : Number.NEGATIVE_INFINITY;
    }

    function sortTracks(trackItems, selectedSort = "newest") {
        const items = [...trackItems];

        if (selectedSort === "oldest") {
            return items.sort((a, b) => {
                const yearDifference = getTrackYearSortValue(a) - getTrackYearSortValue(b);
                if (yearDifference !== 0) return yearDifference;
                return a.title.localeCompare(b.title);
            });
        }

        if (selectedSort === "title-asc") {
            return items.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (selectedSort === "title-desc") {
            return items.sort((a, b) => b.title.localeCompare(a.title));
        }

        return items.sort((a, b) => {
            const featuredDifference = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
            if (featuredDifference !== 0) return featuredDifference;
            const yearDifference = getTrackYearSortValue(b) - getTrackYearSortValue(a);
            if (yearDifference !== 0) return yearDifference;
            return a.title.localeCompare(b.title);
        });
    }

    function resolveCoverSourceForPath(path) {
        const safePath = toValidCoverSource(path);
        if (safePath === FALLBACK_COVER) return Promise.resolve(FALLBACK_COVER);

        if (coverSourceCheckCache.has(safePath)) {
            return coverSourceCheckCache.get(safePath);
        }

        const checkPromise = new Promise((resolve) => {
            const probeImage = new Image();
            probeImage.onload = () => resolve(safePath);
            probeImage.onerror = () => resolve(FALLBACK_COVER);
            probeImage.src = safePath;
        });

        coverSourceCheckCache.set(safePath, checkPromise);
        return checkPromise;
    }

    function getCoverCandidatesForTrack(track) {
        const candidates = [];
        const explicitCover = toValidCoverSource(track.cover);

        if (explicitCover !== FALLBACK_COVER) {
            candidates.push(explicitCover);
        }

        const stems = new Set([
            extractFileStem(track.file),
            slugifyTitle(track.title)
        ]);

        stems.forEach((stem) => {
            if (!stem) return;
            COVER_EXTENSIONS.forEach((extension) => {
                candidates.push(`images/${stem}${extension}`);
            });
        });

        return [...new Set(candidates)];
    }

    async function resolveBestCoverForTrack(track) {
        const candidates = getCoverCandidatesForTrack(track);
        for (const candidate of candidates) {
            const resolvedCandidate = await resolveCoverSourceForPath(candidate);
            if (resolvedCandidate !== FALLBACK_COVER) {
                return resolvedCandidate;
            }
        }
        return FALLBACK_COVER;
    }

    async function resolveTrackCoverSources(trackItems) {
        await Promise.all(
            trackItems.map(async (track) => {
                const resolvedCover = await resolveBestCoverForTrack(track);
                const hasExplicitThumbnail = typeof track.thumbnail === "string" && track.thumbnail.trim() !== "";
                const intendedThumbnail = toValidCoverSource(hasExplicitThumbnail ? track.thumbnail : track.cover);
                let resolvedThumbnail = await resolveCoverSourceForPath(intendedThumbnail);

                if (!hasExplicitThumbnail && resolvedThumbnail === FALLBACK_COVER && resolvedCover !== FALLBACK_COVER) {
                    resolvedThumbnail = resolvedCover;
                }

                track.resolvedCover = resolvedCover;
                track.resolvedThumbnail = resolvedThumbnail;
            })
        );
    }

    function attachImageFallback(imageElement) {
        if (!imageElement || imageElement.dataset.hasFallbackHandler === "true") {
            return;
        }

        imageElement.addEventListener("error", () => {
            if (imageElement.dataset.fallbackApplied === "true") {
                return;
            }
            imageElement.dataset.fallbackApplied = "true";
            imageElement.src = FALLBACK_COVER;
        });
        imageElement.dataset.hasFallbackHandler = "true";
    }

    function setSafeImageSource(imageElement, source) {
        if (!imageElement) return;
        attachImageFallback(imageElement);
        imageElement.dataset.fallbackApplied = "false";
        imageElement.src = toValidCoverSource(source);
    }

    const lazyCoverObserver = "IntersectionObserver" in window
        ? new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const image = entry.target;
                const targetSrc = image.dataset.src;
                if (targetSrc && image.getAttribute("src") !== targetSrc) {
                    setSafeImageSource(image, targetSrc);
                }
                observer.unobserve(image);
            });
        }, {
            root: trackList,
            rootMargin: "220px",
            threshold: 0.01
        })
        : null;

    function preloadTopTrackCovers(trackItems, count = 6) {
        trackItems.slice(0, count).forEach((track, index) => {
            const previewCover = toValidCoverSource(getTrackCoverPreview(track));
            if (previewCover === FALLBACK_COVER || coverPreloadCache.has(previewCover)) {
                return;
            }

            const preload = document.createElement("link");
            preload.rel = "preload";
            preload.as = "image";
            preload.href = previewCover;
            preload.fetchPriority = index < 2 ? "high" : "auto";
            preload.onerror = () => {
                const fullCover = toValidCoverSource(getTrackCoverFull(track));
                if (fullCover !== previewCover && fullCover !== FALLBACK_COVER && !coverPreloadCache.has(fullCover)) {
                    coverPreloadCache.add(fullCover);
                    preload.href = fullCover;
                }
            };
            coverPreloadCache.add(previewCover);
            document.head.appendChild(preload);
        });
    }

    function warmUpcomingTrackCovers(trackItems, startIndex = 6, count = 10) {
        const sourcesToWarm = trackItems
            .slice(startIndex, startIndex + count)
            .map((track) => toValidCoverSource(getTrackCoverPreview(track)))
            .filter((source) => source !== FALLBACK_COVER && !coverWarmCache.has(source));

        if (sourcesToWarm.length === 0) {
            return;
        }

        const warm = () => {
            sourcesToWarm.forEach((source) => {
                if (coverWarmCache.has(source)) return;
                const warmImage = new Image();
                warmImage.decoding = "async";
                warmImage.src = source;
                coverWarmCache.add(source);
            });
        };

        if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(warm, { timeout: 700 });
        } else {
            setTimeout(warm, 80);
        }
    }
    
    function setUpCoverLoad(coverImage, previewCover, isTopPriority) {
        coverImage.dataset.src = previewCover;
        coverImage.decoding = "async";
        coverImage.loading = isTopPriority ? "eager" : "lazy";
        coverImage.fetchPriority = isTopPriority ? "high" : "low";
        coverImage.classList.add("cover-loading");
        coverImage.addEventListener("load", () => coverImage.classList.remove("cover-loading"), { once: true });

        if (isTopPriority || !lazyCoverObserver) {
            setSafeImageSource(coverImage, previewCover);
        } else {
            attachImageFallback(coverImage);
            lazyCoverObserver.observe(coverImage);
        }
    }

    function updateModalImageFrameFromNaturalSize() {
        if (!coverModalContent || !coverModalImage) return;

        const naturalWidth = Number.isFinite(coverModalImage.naturalWidth) && coverModalImage.naturalWidth > 0
            ? coverModalImage.naturalWidth
            : 640;
        const naturalHeight = Number.isFinite(coverModalImage.naturalHeight) && coverModalImage.naturalHeight > 0
            ? coverModalImage.naturalHeight
            : 640;

        const maxWidth = Math.min(window.innerWidth * 0.84, 700);
        const maxHeight = Math.min(window.innerHeight * 0.8, 700);
        const minWidth = Math.min(window.innerWidth * 0.52, 430);
        const minHeight = Math.min(window.innerHeight * 0.46, 330);

        let scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
        if (!Number.isFinite(scale) || scale <= 0) {
            scale = 1;
        }

        let targetWidth = naturalWidth * scale;
        let targetHeight = naturalHeight * scale;

        if (targetWidth < minWidth && targetHeight < minHeight) {
            const upscale = Math.max(minWidth / naturalWidth, minHeight / naturalHeight);
            const maxScale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
            const appliedScale = Math.min(upscale, maxScale);

            if (Number.isFinite(appliedScale) && appliedScale > scale) {
                targetWidth = naturalWidth * appliedScale;
                targetHeight = naturalHeight * appliedScale;
            }
        }

        targetWidth = Math.max(240, Math.min(targetWidth, maxWidth));
        targetHeight = Math.max(240, Math.min(targetHeight, maxHeight));

        coverModalContent.style.setProperty("--modal-width", `${Math.round(targetWidth)}px`);
        coverModalContent.style.setProperty("--modal-height", `${Math.round(targetHeight)}px`);
    }

    // Function to open cover modal
    window.openCoverModal = function(imageSrc, title, previewSrc = imageSrc, grayscale = false) {
        if (coverModalImage && coverModal) {
            const safeImageSrc = toValidCoverSource(imageSrc);
            const safePreviewSrc = toValidCoverSource(previewSrc);
            activeModalCover = safeImageSrc;
            setSafeImageSource(coverModalImage, safePreviewSrc);
            coverModalImage.classList.toggle("cover-grayscale", grayscale);
            coverModalImage.alt = `${title} Cover`;
            coverModal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
            document.body.classList.add("modal-open");
            updateModalImageFrameFromNaturalSize();

            if (safeImageSrc !== safePreviewSrc) {
                const fullResImage = new Image();
                fullResImage.src = safeImageSrc;
                fullResImage.onload = () => {
                    if (coverModal.classList.contains("active") && activeModalCover === safeImageSrc) {
                        setSafeImageSource(coverModalImage, safeImageSrc);
                        updateModalImageFrameFromNaturalSize();
                    }
                };
                fullResImage.onerror = () => {
                    if (coverModal.classList.contains("active") && activeModalCover === safeImageSrc) {
                        setSafeImageSource(coverModalImage, FALLBACK_COVER);
                        updateModalImageFrameFromNaturalSize();
                    }
                };
            }
        }
    };
    
    // Function to close cover modal
    function closeCoverModal() {
        if (coverModal) {
            // Start fade out
            coverModal.classList.remove("active");
            
            // Wait for fade out to complete before hiding
            setTimeout(() => {
                if (!coverModal.classList.contains("active")) {
                    // Modal is still closed, safe to restore scrolling
                    document.body.style.overflow = ""; // Restore scrolling
                    document.body.classList.remove("modal-open");
                    activeModalCover = "";
                }
            }, 300); // Match CSS transition duration
        }
    }
    
    // Close modal handlers
    if (coverModalClose) {
        coverModalClose.addEventListener("click", closeCoverModal);
    }
    if (coverModalOverlay) {
        coverModalOverlay.addEventListener("click", closeCoverModal);
    }

    if (coverModalImage) {
        coverModalImage.addEventListener("click", closeCoverModal);
        coverModalImage.addEventListener("load", () => {
            if (coverModal && coverModal.classList.contains("active")) {
                updateModalImageFrameFromNaturalSize();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && coverModal && coverModal.classList.contains("active")) {
            closeCoverModal();
        }
    });

    if (record) {
        record.addEventListener("click", () => {
            toggleCurrentTrackFromRecord();
        });
    }

    if (recordRewindButton) {
        recordRewindButton.addEventListener("click", () => {
            seekCurrentAudioBy(-10);
        });
    }

    if (recordForwardButton) {
        recordForwardButton.addEventListener("click", () => {
            seekCurrentAudioBy(10);
        });
    }

    if (recordPrevButton) {
        recordPrevButton.addEventListener("click", () => playPreviousTrack());
    }

    if (recordNextButton) {
        recordNextButton.addEventListener("click", () => playNextTrack());
    }

    // Two decks share the music: one plays while the other gets the next song ready, so
    // keep-playing can blend songs together. `player` is whichever deck is playing now.
    // Both decks stay in use for the whole visit so playback can keep going in the background.
    const decks = [new Audio(), new Audio()];
    decks.forEach((deck) => {
        deck.preload = "auto";
    });
    let player = decks[0];
    // iPhones ignore volume changes from the page (only the hardware buttons set it)
    const canFadeVolume = (() => {
        const probe = new Audio();
        probe.volume = 0.5;
        return Math.abs(probe.volume - 0.5) < 0.01;
    })();
    let upNext = null; // the song waiting on the spare deck for keep-playing
    let mixOut = null; // the last song, playing out its final moment as the new one starts
    let autoMixBlocked = false;
    let currentTrackData = null;
    let isSwitchingTrack = false;
    let scratch = null; // the record currently held for DJ scratching
    let isSpinning = false;
    let rotationAngle = 0; // Declare rotationAngle here
    let recordFlipAngle = 0; // 0 = A-side facing out, 180 = B-side (jukebox turned around)
    let spinRequest; // Declare spinRequest here
    let whereCurrentOpacity = 0;
    let whereTargetOpacity = 0;
    let whereFadeFrame = null;
    let whereFadeStartOpacity = 0;
    let whereFadeStartTime = null;
    let whereFadeDurationMs = 0;
    let recordSeekNudgeFrame = null;
    let viewportLockFrame = null;
    let viewportShift = 0; // how far Safari's screen has drifted from the page's fixed layer
    let trackListScrollAnimationFrame = null;
    let trackListScrollAnimationResolve = null;
    let trackListScrollAnimationId = 0;
    let randomPlayRequestId = 0;
    let continuousPlayEnabled = false; // keep playing: the next song follows on its own
    let repeatOneEnabled = false; // the same song again and again
    let shuffleEnabled = false;
    let npShownTrack;
    let playingRowParts = null; // the playing song's row: its wave, times and progress line
    let waveScrub = null; // a finger or mouse dragging along the playing song's wave
    let trackStartOffset = 0; // where the playing song was started (shown while it loads)
    let songSettleAt = 0; // measuring a new song's sound waits until its row has finished opening
    const TRACK_PLAYING_FADE_OUT_MS = 220;
    // Keep in sync with the full-height layout media queries in styles.css
    const APP_LAYOUT_QUERY = "(max-width: 600px), (orientation: portrait) and (pointer: coarse) and (max-width: 1100px), (orientation: landscape) and (pointer: coarse)";
    // The two-panel deck: touch screens held sideways, and desktop windows with room for both panels
    // (keep in sync with the deck media queries in styles.css)
    const DECK_LAYOUT_QUERY = "(orientation: landscape) and (pointer: coarse), (orientation: landscape) and (pointer: fine) and (min-width: 1000px) and (min-height: 560px)";

    function isMobileViewport() {
        return window.matchMedia("(max-width: 600px)").matches;
    }

    function isAppLayoutViewport() {
        return window.matchMedia(APP_LAYOUT_QUERY).matches;
    }

    function getMobileViewportHeight() {
        const visualViewportHeight = window.visualViewport && Number.isFinite(window.visualViewport.height)
            ? window.visualViewport.height
            : window.innerHeight;
        // An on-screen keyboard shrinks the visual viewport but not the window, so don't
        // squash the jukebox for it (the larger of the two is the real window height)
        return Math.max(320, Math.round(Math.max(visualViewportHeight, window.innerHeight)));
    }

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function canUseNativeSmoothTrackScroll() {
        return !!(trackList && typeof trackList.scrollTo === "function" && "scrollBehavior" in document.documentElement.style);
    }

    function easeInOutCubic(progress) {
        return progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    function stopTrackListScrollAnimation() {
        if (trackListScrollAnimationFrame !== null) {
            cancelAnimationFrame(trackListScrollAnimationFrame);
            trackListScrollAnimationFrame = null;
        }

        if (typeof trackListScrollAnimationResolve === "function") {
            const resolve = trackListScrollAnimationResolve;
            trackListScrollAnimationResolve = null;
            resolve(false);
        }

        trackListScrollAnimationId += 1;
    }

    function getMinimumAppHeight() {
        if (window.matchMedia("(orientation: landscape) and (pointer: coarse)").matches) return 300;
        return window.innerWidth > 600 ? 600 : 520;
    }

    // Safari on iOS 26 and later can leave what's on screen (the visual viewport) offset from the
    // page's fixed layer after its address bar or a dropdown's picker comes and goes, and not put it
    // back. The whole jukebox is fixed, so it's drawn that much too high: the record cut off at the
    // top and a gap underneath. Shift it by the same amount so it lines up with the screen again.
    function getVisualViewportShift() {
        const viewport = window.visualViewport;
        if (!viewport || !Number.isFinite(viewport.offsetTop)) return 0;
        // Zoomed in, the visual viewport is meant to pan around
        if (Math.abs((viewport.scale || 1) - 1) > 0.01) return 0;
        // It may also pan to keep a dropdown in sight while the dropdown's picker is up
        const focused = document.activeElement;
        if (focused && /^(SELECT|INPUT|TEXTAREA)$/.test(focused.tagName) && viewport.height < window.innerHeight - 80) return 0;
        const shift = Math.round(viewport.offsetTop);
        return Math.abs(shift) >= 1 && Math.abs(shift) < window.innerHeight / 2 ? shift : 0;
    }

    function setViewportShift(shift) {
        if (shift === viewportShift) return;
        viewportShift = shift;
        document.documentElement.style.setProperty("--viewport-shift", `${shift}px`);
        document.documentElement.classList.toggle("viewport-shifted", shift !== 0);
    }

    function applyMobileViewportLock() {
        if (!isAppLayoutViewport()) {
            document.documentElement.style.removeProperty("--app-height");
            document.documentElement.classList.remove("viewport-short");
            setViewportShift(0);
            return;
        }

        // When the window gets short (e.g. a keyboard is up), keep the jukebox full size
        // and let the page scroll instead of squashing the song list to nothing
        const viewportHeight = getMobileViewportHeight();
        const minimumHeight = getMinimumAppHeight();
        const isShort = viewportHeight < minimumHeight;
        document.documentElement.classList.toggle("viewport-short", isShort);
        document.documentElement.style.setProperty("--app-height", `${Math.max(viewportHeight, minimumHeight)}px`);
        setViewportShift(isShort ? 0 : getVisualViewportShift());
        if (isShort) return;

        if (window.scrollY !== 0) {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    }

    function scheduleMobileViewportLock() {
        if (viewportLockFrame !== null) return;
        viewportLockFrame = requestAnimationFrame(() => {
            viewportLockFrame = null;
            applyMobileViewportLock();
        });
    }

    function getTrackListStickyBounds() {
        const listRect = trackList.getBoundingClientRect();
        const listStyles = window.getComputedStyle(trackList);
        const borderTopWidth = parseFloat(listStyles.borderTopWidth) || 0;
        const borderBottomWidth = parseFloat(listStyles.borderBottomWidth) || 0;
        const paddingTop = parseFloat(listStyles.paddingTop) || 0;
        const paddingBottom = parseFloat(listStyles.paddingBottom) || 0;

        return {
            top: listRect.top + borderTopWidth + paddingTop,
            bottom: listRect.bottom - borderBottomWidth - paddingBottom
        };
    }

    function getTrackScrollTargetWithinList(trackElement, margin = 12) {
        if (!trackElement || !trackList) return;

        // A stuck (sticky) playing card reports where it's pinned, not where it sits
        // in the list, so measure it unstuck
        const stuckClasses = ["track-playing-stick-top", "track-playing-stick-bottom"]
            .filter((className) => trackElement.classList.contains(className));
        trackElement.classList.remove(...stuckClasses);
        const listRect = trackList.getBoundingClientRect();
        const trackRect = trackElement.getBoundingClientRect();
        trackElement.classList.add(...stuckClasses);
        let targetScrollTop = trackList.scrollTop;

        if (trackRect.top < listRect.top + margin) {
            targetScrollTop += trackRect.top - listRect.top - margin;
        } else if (trackRect.bottom > listRect.bottom - margin) {
            targetScrollTop += trackRect.bottom - listRect.bottom + margin;
        } else {
            return;
        }

        const maxScrollTop = Math.max(0, trackList.scrollHeight - trackList.clientHeight);
        targetScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));
        return targetScrollTop;
    }

    function animateTrackListScrollToWithRaf(targetScrollTop, durationMs) {
        if (!trackList) return Promise.resolve(false);

        const startScrollTop = trackList.scrollTop;
        const distance = targetScrollTop - startScrollTop;
        if (Math.abs(distance) <= 0.5) {
            trackList.scrollTop = targetScrollTop;
            return Promise.resolve(false);
        }

        if (typeof requestAnimationFrame !== "function") {
            trackList.scrollTop = targetScrollTop;
            return Promise.resolve(true);
        }

        stopTrackListScrollAnimation();
        const animationId = ++trackListScrollAnimationId;
        const normalizedDuration = Number.isFinite(durationMs) ? durationMs : 320;
        const clampedDuration = Math.max(160, Math.min(680, normalizedDuration));

        return new Promise((resolve) => {
            trackListScrollAnimationResolve = resolve;
            let startTime = null;

            function step(timestamp) {
                if (animationId !== trackListScrollAnimationId) {
                    return;
                }

                if (startTime === null) {
                    startTime = timestamp;
                }

                const elapsedMs = Math.max(0, timestamp - startTime);
                const progress = Math.min(elapsedMs / clampedDuration, 1);
                const easedProgress = easeInOutCubic(progress);
                trackList.scrollTop = startScrollTop + (distance * easedProgress);

                if (progress >= 1 || Math.abs(trackList.scrollTop - targetScrollTop) <= 0.5) {
                    trackList.scrollTop = targetScrollTop;
                    trackListScrollAnimationFrame = null;
                    trackListScrollAnimationResolve = null;
                    resolve(true);
                    return;
                }

                trackListScrollAnimationFrame = requestAnimationFrame(step);
            }

            trackListScrollAnimationFrame = requestAnimationFrame(step);
        });
    }

    function animateTrackListScrollTo(targetScrollTop, durationMs) {
        if (!trackList) return Promise.resolve(false);

        const startScrollTop = trackList.scrollTop;
        const distance = targetScrollTop - startScrollTop;
        if (Math.abs(distance) <= 0.5) {
            trackList.scrollTop = targetScrollTop;
            return Promise.resolve(false);
        }

        if (!canUseNativeSmoothTrackScroll()) {
            return animateTrackListScrollToWithRaf(targetScrollTop, durationMs);
        }

        stopTrackListScrollAnimation();
        const animationId = ++trackListScrollAnimationId;
        const normalizedDuration = Number.isFinite(durationMs) ? durationMs : 320;
        const settleTimeoutMs = Math.max(420, Math.min(1500, Math.round(normalizedDuration * 2.5)));
        trackList.scrollTo({
            top: targetScrollTop,
            behavior: "smooth"
        });

        return new Promise((resolve) => {
            trackListScrollAnimationResolve = resolve;
            let startTime = null;
            let previousTop = trackList.scrollTop;
            let stationaryFrames = 0;

            function settle(timestamp) {
                if (animationId !== trackListScrollAnimationId) {
                    return;
                }

                if (startTime === null) {
                    startTime = timestamp;
                }

                const elapsedMs = Math.max(0, timestamp - startTime);
                const currentTop = trackList.scrollTop;
                const distanceToTarget = Math.abs(currentTop - targetScrollTop);
                const delta = Math.abs(currentTop - previousTop);
                previousTop = currentTop;

                if (distanceToTarget <= 1) {
                    trackList.scrollTop = targetScrollTop;
                    trackListScrollAnimationFrame = null;
                    trackListScrollAnimationResolve = null;
                    resolve(true);
                    return;
                }

                if (delta <= 0.2) {
                    stationaryFrames += 1;
                } else {
                    stationaryFrames = 0;
                }

                if (elapsedMs >= settleTimeoutMs || stationaryFrames >= 10) {
                    trackListScrollAnimationFrame = null;
                    trackListScrollAnimationResolve = null;
                    animateTrackListScrollToWithRaf(targetScrollTop, durationMs).then(resolve);
                    return;
                }

                trackListScrollAnimationFrame = requestAnimationFrame(settle);
            }

            trackListScrollAnimationFrame = requestAnimationFrame(settle);
        });
    }

    function scrollTrackIntoViewWithinList(trackElement, options = "smooth") {
        const normalizedOptions = typeof options === "string"
            ? { behavior: options }
            : (options || {});
        const behavior = normalizedOptions.behavior === "auto" ? "auto" : "smooth";
        const margin = Number.isFinite(normalizedOptions.margin)
            ? Math.max(0, normalizedOptions.margin)
            : 12;
        const targetScrollTop = getTrackScrollTargetWithinList(trackElement, margin);

        if (!Number.isFinite(targetScrollTop)) {
            return Promise.resolve(false);
        }

        if (behavior === "auto" || prefersReducedMotion()) {
            stopTrackListScrollAnimation();
            trackList.scrollTop = targetScrollTop;
            return Promise.resolve(true);
        }

        const distance = Math.abs(targetScrollTop - trackList.scrollTop);
        const durationMs = Math.round(Math.max(180, Math.min(620, 180 + (distance * 0.45))));
        return animateTrackListScrollTo(targetScrollTop, durationMs);
    }

    function syncPlayingTrackStickPosition() {
        if (deferWhileFrontHidden()) return;
        trackList.querySelectorAll(".track-playing-stick-top, .track-playing-stick-bottom").forEach((trackElement) => {
            trackElement.classList.remove("track-playing-stick-top", "track-playing-stick-bottom");
        });

        const playingTrack = trackList.querySelector(".track.track-playing");
        if (!playingTrack) {
            return;
        }

        const trackRect = playingTrack.getBoundingClientRect();
        const stickyBounds = getTrackListStickyBounds();
        const topThreshold = stickyBounds.top;
        const bottomThreshold = stickyBounds.bottom;
        const epsilon = 0.5;

        if (trackRect.bottom <= topThreshold + epsilon) {
            playingTrack.classList.add("track-playing-stick-top");
            return;
        }

        if (trackRect.top >= bottomThreshold - epsilon) {
            playingTrack.classList.add("track-playing-stick-bottom");
            return;
        }

        const overlapsTopBoundary = trackRect.top < topThreshold + epsilon && trackRect.bottom > topThreshold - epsilon;
        const overlapsBottomBoundary = trackRect.bottom > bottomThreshold - epsilon && trackRect.top < bottomThreshold + epsilon;

        if (overlapsTopBoundary && !overlapsBottomBoundary) {
            playingTrack.classList.add("track-playing-stick-top");
        } else if (overlapsBottomBoundary && !overlapsTopBoundary) {
            playingTrack.classList.add("track-playing-stick-bottom");
        } else if (overlapsTopBoundary && overlapsBottomBoundary) {
            const trackMidpoint = (trackRect.top + trackRect.bottom) / 2;
            const listMidpoint = (topThreshold + bottomThreshold) / 2;
            playingTrack.classList.add(trackMidpoint <= listMidpoint ? "track-playing-stick-top" : "track-playing-stick-bottom");
        }
    }

    function getCurrentTrackElement() {
        if (!currentTrackData) return null;
        const file = CSS.escape(currentTrackData.file);
        // (a two-sided song's row may already show its other side, mid-flip)
        return trackList.querySelector(`.track[data-file="${file}"]`) || trackList.querySelector(`.track[data-sides~="${file}"]`);
    }

    function getTrackDataForElement(trackElement) {
        if (!trackElement) return null;
        return tracks.find((track) => track.file === trackElement.dataset.file) || null;
    }

    function isPlayerActive() {
        // A song held mid-scratch still counts as playing (it picks up again on release)
        if (scratch && scratch.wasPlaying) return true;
        return Boolean(currentTrackData) && !player.paused && !player.ended;
    }

    function setPlayButtonLabel(button, label) {
        if (!button || button.dataset.label === label) return;
        button.dataset.label = label;
        animateTextChange(button, label);
    }

    function resetTrackElementUi(trackElement) {
        if (!trackElement) return;
        setPlayButtonLabel(trackElement.querySelector(".play-button"), "Play");
        trackElement.querySelector(".song-progress")?.classList.remove("is-loading", "is-unavailable");
    }

    function updatePlayingTrackStickyState() {
        const playingTrack = getCurrentTrackElement();
        trackList.querySelectorAll(".track.track-playing").forEach((trackElement) => {
            if (trackElement !== playingTrack) {
                trackElement.classList.remove("track-playing");
            }
        });

        if (playingTrack) {
            playingTrack.classList.remove("track-playing-fade-out");
            playingTrack.classList.add("track-playing");
        }

        syncPlayingTrackStickPosition();
    }

    function triggerTrackPlayingFadeOut(trackElement) {
        if (!trackElement || !trackList.contains(trackElement)) {
            return;
        }

        trackElement.classList.remove("track-playing-fade-out");
        // Restart the animation if Random is pressed quickly in succession.
        void trackElement.offsetWidth;
        trackElement.classList.add("track-playing-fade-out");

        window.setTimeout(() => {
            if (trackElement.classList.contains("track-playing-fade-out")) {
                trackElement.classList.remove("track-playing-fade-out");
            }
        }, TRACK_PLAYING_FADE_OUT_MS);
    }

    function stopCurrentPlayback() {
        const previousTrack = getCurrentTrackElement();
        finishAutoMixNow();
        discardUpNext();

        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
            volumeFadeInterval = null;
        }

        if (currentTrackData) {
            currentTrackData = null;
            player.pause();
            player.volume = 1.0;
            resetTrackElementUi(previousTrack);
        }

        if (previousTrack) {
            triggerTrackPlayingFadeOut(previousTrack);
        }

        showModeButtonsOnTrack(null);
        stopSpinning();
        if (record) {
            record.classList.remove("up");
        }
        updateWhereBackgroundFromPlayback();

        return previousTrack;
    }

    // The x button: stop the song and unload it (also clears the lock screen player)
    function clearCurrentTrack() {
        cancelSideSwitch();
        closeRhythmInvite(false);
        if (!currentTrackData) return;
        stopCurrentPlayback();
        setDeckSource(player, null);
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = null;
            navigator.mediaSession.playbackState = "none";
        }
    }

    async function playRandomVisibleTrack(excludedTrack = null, options = {}) {
        const visibleTracks = getVisibleTracks();

        if (visibleTracks.length === 0) {
            return;
        }

        const blockedTrack = excludedTrack || getCurrentTrackElement();

        let candidates = visibleTracks;
        if (blockedTrack && visibleTracks.length > 1) {
            const nonBlockedTracks = visibleTracks.filter((trackElement) => trackElement !== blockedTrack);
            if (nonBlockedTracks.length > 0) {
                candidates = nonBlockedTracks;
            }
        }

        const targetTrack = candidates[Math.floor(Math.random() * candidates.length)];
        await playTrackElement(targetTrack, options);
    }

    function getVisibleTracks() {
        return Array.from(trackList.querySelectorAll(".track"))
            .filter((trackElement) => !trackElement.classList.contains("track-skeleton"));
    }

    // `immediate` starts the song right away (needed in the background, where
    // animation frames are paused) and scrolls to it alongside
    async function playTrackElement(targetTrack, options = {}) {
        const requestId = ++randomPlayRequestId;
        const track = getTrackDataForElement(targetTrack);
        if (!track) return;
        const scrollOptions = {
            behavior: "smooth",
            margin: isMobileViewport() ? 8 : 12
        };

        if (options.immediate || document.hidden) {
            startTrack(track, options);
            if (!document.hidden) {
                scrollTrackIntoViewWithinList(targetTrack, scrollOptions);
            }
            return;
        }

        await scrollTrackIntoViewWithinList(targetTrack, scrollOptions);

        if (requestId !== randomPlayRequestId || !trackList.contains(targetTrack)) {
            return;
        }

        startTrack(track, options);
        scheduleMobileViewportLock();
    }

    // The song after `currentElement`: the next one down the list, or a random one on shuffle
    function pickNextTrackElement(currentElement) {
        const visibleTracks = getVisibleTracks();
        if (visibleTracks.length === 0) return null;

        if (shuffleEnabled) {
            const candidates = visibleTracks.length > 1
                ? visibleTracks.filter((trackElement) => trackElement !== currentElement)
                : visibleTracks;
            return candidates[Math.floor(Math.random() * candidates.length)];
        }

        const currentIndex = visibleTracks.indexOf(currentElement);
        return visibleTracks[(currentIndex + 1) % visibleTracks.length];
    }

    // Called when a track finishes and "keep playing" is on, or Next is pressed
    function playNextTrackAfter(finishedTrack) {
        // The song already waiting on the spare deck, if it's still the right one
        const queuedTrack = upNext && isUpNextStillValid(upNext)
            ? getVisibleTracks().find((trackElement) => trackElement.dataset.file === upNext.track.file)
            : null;
        const nextTrack = queuedTrack || pickNextTrackElement(finishedTrack);
        if (nextTrack) {
            playTrackElement(nextTrack, { immediate: true });
        }
    }

    function playNextTrack() {
        if (!currentTrackData) {
            startFirstTrack();
            return;
        }
        playNextTrackAfter(getCurrentTrackElement());
    }

    function togglePlayback() {
        if (!currentTrackData) {
            startFirstTrack();
        } else if (player.paused) {
            resumeCurrentTrack();
        } else {
            pauseCurrentTrack();
        }
    }

    function playPreviousTrack() {
        if (currentTrackData && player.currentTime > 3) {
            finishAutoMixNow();
            player.currentTime = 0;
            updateNowPlayingProgress();
            return;
        }

        const visibleTracks = getVisibleTracks();
        if (visibleTracks.length === 0) return;

        const currentIndex = visibleTracks.indexOf(getCurrentTrackElement());
        const previousIndex = currentIndex <= 0 ? visibleTracks.length - 1 : currentIndex - 1;
        playTrackElement(visibleTracks[previousIndex], { immediate: true });
    }

    function startFirstTrack() {
        if (shuffleEnabled) {
            playRandomVisibleTrack(null, { immediate: true });
            return;
        }
        const firstTrack = getVisibleTracks()[0];
        if (firstTrack) {
            playTrackElement(firstTrack, { immediate: true });
        }
    }

    // Off by default; the last choice is remembered (localStorage, with a cookie as a backup)
    function readPlaybackModePreference(key) {
        try {
            const stored = localStorage.getItem(key);
            if (stored !== null) return stored === "true";
        } catch (error) {
            // Storage blocked; fall back to the cookie
        }
        const match = document.cookie.match(new RegExp(`(?:^|; )${key}=(true|false)`));
        return match ? match[1] === "true" : false;
    }

    function savePlaybackModePreference(key, value) {
        try {
            localStorage.setItem(key, String(value));
        } catch (error) {
            // Storage blocked; the cookie below still remembers it
        }
        document.cookie = `${key}=${value}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
    }

    function updatePlaybackModeButtons() {
        [trackList, nowPlaying].forEach((element) => {
            if (!element) return;
            element.classList.toggle("continuous-on", continuousPlayEnabled);
            element.classList.toggle("repeat-one", repeatOneEnabled);
            element.classList.toggle("shuffle-on", shuffleEnabled);
        });
        const loopLabel = repeatOneEnabled ? "Repeat this song" : "Keep playing songs";
        let loopTitle = "Keep playing songs";
        if (continuousPlayEnabled) loopTitle = "Keeping songs playing (tap again to repeat just this one)";
        if (repeatOneEnabled) loopTitle = "Repeating this song (tap again to turn off)";
        document.querySelectorAll(".mode-button--continuous, #np-continuous").forEach((button) => {
            button.setAttribute("aria-pressed", String(continuousPlayEnabled || repeatOneEnabled));
            button.setAttribute("aria-label", loopLabel);
            button.setAttribute("title", loopTitle);
        });
        document.querySelectorAll(".mode-button--shuffle, #np-shuffle").forEach((button) => {
            button.setAttribute("aria-pressed", String(shuffleEnabled));
        });
    }

    // Only the current song shows the keep-playing / shuffle buttons
    function showModeButtonsOnTrack(trackElement, animate = true) {
        // Where the rows in sight are now, so they can slide into their new places
        const rowsBefore = animate && !prefersReducedMotion() ? measureRowsInSight(trackElement) : null;

        trackList.querySelectorAll(".track.track-modes-visible").forEach((element) => {
            if (element !== trackElement) {
                // Its buttons fold away at once, so the row is straight away the shape it's going to
                // be and only its wave slides
                element.classList.add("is-closing");
                setTimeout(() => element.classList.remove("is-closing"), ROW_RESHAPE_MS);
                element.classList.remove("track-modes-visible");
                setRowWavePlaying(element, false);
            }
        });
        if (trackElement) {
            trackElement.classList.remove("is-closing");
            trackElement.classList.add("track-modes-visible");
            setRowWavePlaying(trackElement, true);
        }
        // (once the rest of the song's start has run: the playing row may stick to an edge too)
        if (rowsBefore) queueMicrotask(() => slideRowsIntoPlace(rowsBefore));
        playingRowParts = trackElement ? {
            wave: trackElement.querySelector(".song-wave"),
            progress: trackElement.querySelector(".song-progress"),
            elapsed: trackElement.querySelector(".song-time-elapsed"),
            total: trackElement.querySelector(".song-time-total")
        } : null;
        updateNowPlayingProgress();
        // The x narrows the title, so re-check which titles need to scroll
        requestAnimationFrame(syncTitleMarquees);
    }

    // A row opening up for the playing song (or closing again) changes shape smoothly: it grows or
    // shrinks instead of jumping (the rows below glide along), and its wave slides from beside the
    // Play button down onto its own line, or back up. Each row moves by transform from where it
    // was, so the layout is final straight away and the sliding is left to the compositor.
    const ROW_RESHAPE_MS = 420;
    const ROW_RESHAPE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

    function measureRowsInSight(openingRow) {
        const listRect = trackList.getBoundingClientRect();
        const rows = [];
        trackList.querySelectorAll(".track").forEach((row) => {
            const rect = row.getBoundingClientRect();
            if (!rect.height || rect.bottom < listRect.top - 160 || rect.top > listRect.bottom + 160) return;
            const reshaping = row === openingRow || row.classList.contains("track-modes-visible");
            rows.push({
                row,
                rect,
                wave: reshaping ? row.querySelector(".song-wave")?.getBoundingClientRect() : null,
                time: reshaping ? row.querySelector(".song-time")?.getBoundingClientRect() : null
            });
        });
        return rows;
    }

    function slideRowsIntoPlace(rowsBefore) {
        if (typeof Element.prototype.animate !== "function") return;
        const timing = { duration: ROW_RESHAPE_MS, easing: ROW_RESHAPE_EASING };
        rowsBefore.forEach((before) => {
            const { row } = before;
            if (!row.isConnected) return;
            const now = row.getBoundingClientRect();
            const wave = before.wave ? row.querySelector(".song-wave") : null;
            const time = before.time ? row.querySelector(".song-time") : null;
            const waveNow = wave?.getBoundingClientRect();
            const timeNow = time?.getBoundingClientRect();
            const moved = before.rect.top - now.top;
            const grown = now.height - before.rect.height;

            // A row that grew keeps its new part hidden until the rows below have made room
            if (Math.abs(moved) > 0.5 || grown > 1) {
                const keyframes = [{ transform: `translateY(${moved.toFixed(1)}px)` }, { transform: "none" }];
                if (grown > 1) {
                    keyframes[0].clipPath = `inset(-24px -24px ${grown.toFixed(1)}px -24px)`;
                    keyframes[1].clipPath = "inset(-24px -24px 0px -24px)";
                }
                row.animate(keyframes, timing);
            }

            // Its wave (and the times) start where they were in the row, as big, then settle
            const slide = (part, from, to, keepSize) => {
                if (!part || !from || !to || !to.width || !to.height) return;
                const dx = keepSize
                    ? (from.right - before.rect.left) - (to.right - now.left)
                    : (from.left - before.rect.left) - (to.left - now.left);
                const dy = (from.top - before.rect.top) - (to.top - now.top);
                if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(from.width - to.width) < 0.5) return;
                const scale = keepSize ? "" : ` scale(${(from.width / to.width).toFixed(3)}, ${(from.height / to.height).toFixed(3)})`;
                part.animate([
                    { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)${scale}`, transformOrigin: "0 0" },
                    { transform: "none", transformOrigin: "0 0" }
                ], timing);
            };
            slide(wave, before.wave, waveNow, false);
            slide(time, before.time, timeNow, true);
        });
    }

    // The loop button goes round: off → keep playing → repeat this song → off
    function cycleLoopMode() {
        if (repeatOneEnabled) {
            setLoopMode(false, false);
        } else if (continuousPlayEnabled) {
            setLoopMode(false, true);
        } else {
            setLoopMode(true, false);
        }
    }

    function setLoopMode(keepPlaying, repeatOne) {
        continuousPlayEnabled = keepPlaying;
        repeatOneEnabled = repeatOne;
        savePlaybackModePreference("museJukeboxContinuousPlay", keepPlaying);
        savePlaybackModePreference("museJukeboxRepeatOne", repeatOne);
        if (!keepPlaying) {
            discardUpNext();
        }
        syncDeckLooping();
        updatePlaybackModeButtons();
    }

    // Repeat-one loops the playing deck itself, so it carries on with the screen off
    function syncDeckLooping() {
        decks.forEach((deck) => {
            deck.loop = repeatOneEnabled && deck === player;
        });
    }

    function toggleShuffle() {
        shuffleEnabled = !shuffleEnabled;
        savePlaybackModePreference("museJukeboxShuffle", shuffleEnabled);
        // The queued song was picked for the old order
        discardUpNext();
        updatePlaybackModeButtons();
    }

    function setWhereBackgroundOpacity(opacityValue) {
        if (!whereBackground) return;
        whereBackground.style.opacity = opacityValue.toFixed(4);
        updateBackdropColor(opacityValue);
    }

    // `spaceOpacity` is how far the space background has faded in (0 → 1)
    function updateBackdropColor(spaceOpacity) {
        const rgb = IDLE_BACKDROP_RGB.map((idle, index) => Math.round(idle + ((SPACE_BACKDROP_RGB[index] - idle) * spaceOpacity)));
        const hex = `#${rgb.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
        if (hex === backdropHex) return;
        backdropHex = hex;

        // Set straight on the few things that use it: a variable on the root would restyle the
        // whole page at every step of the fade
        document.documentElement.style.backgroundColor = hex;
        document.body.style.backgroundColor = hex;
        if (edgeBlend) {
            // Once the strips match the sky there's no seam to hide, so the stars can reach the edges
            const blur = Math.round(40 - (26 * spaceOpacity));
            const spread = Math.round(14 - (13 * spaceOpacity));
            edgeBlend.style.boxShadow = `inset 0 0 ${blur}px ${spread}px ${hex}`;
        }
        if (themeColorMeta) {
            themeColorMeta.setAttribute("content", hex);
        }
    }

    function updateRecordTransform() {
        const spin = `${rotationAngle.toFixed(2)}deg`;
        [recordDisc, npRecordDisc].forEach((disc) => {
            if (!disc) return;
            disc.style.transform = `rotate(${spin})`;
            // The edge counter-rotates so it always reads as the rim when the disc is edge-on
            disc.style.setProperty("--record-spin", spin);
        });
    }

    function getRecordTurnTransform(angle) {
        return `perspective(900px) rotateY(${angle}deg)`;
    }

    // Turns the records over (the spin carries on inside). Animated on the compositor so a busy
    // main thread can't make the turn stutter.
    function turnRecords(toAngle, durationMs, easing) {
        const fromAngle = recordFlipAngle;
        recordFlipAngle = toAngle % 360;
        recordTurns.forEach((turn) => {
            if (turn.getAnimations) {
                turn.getAnimations().forEach((animation) => animation.cancel());
            }
            turn.style.transform = getRecordTurnTransform(recordFlipAngle);
            if (durationMs > 0 && typeof turn.animate === "function") {
                turn.animate([
                    { transform: getRecordTurnTransform(fromAngle) },
                    { transform: getRecordTurnTransform(toAngle) }
                ], { duration: durationMs, easing });
            }
        });
    }

    function setRecordSeekControlsVisible(isVisible) {
        if (!recordSeekControls) return;
        recordSeekControls.classList.toggle("visible", isVisible);
        recordSeekControls.setAttribute("aria-hidden", isVisible ? "false" : "true");
    }

    function stepWhereBackgroundFade(timestamp) {
        if (whereFadeStartTime === null) {
            whereFadeStartTime = timestamp;
        }

        const increasing = whereTargetOpacity > whereFadeStartOpacity;
        const totalDelta = whereTargetOpacity - whereFadeStartOpacity;
        const elapsedMs = Math.max(0, timestamp - whereFadeStartTime);
        const progress = whereFadeDurationMs <= 0 ? 1 : Math.min(elapsedMs / whereFadeDurationMs, 1);
        const easedProgress = increasing ? (progress * progress) : progress;
        whereCurrentOpacity = whereFadeStartOpacity + (totalDelta * easedProgress);

        setWhereBackgroundOpacity(whereCurrentOpacity);

        if (progress >= 1 || Math.abs(whereCurrentOpacity - whereTargetOpacity) <= 0.0001) {
            whereCurrentOpacity = whereTargetOpacity;
            setWhereBackgroundOpacity(whereCurrentOpacity);
            whereFadeFrame = null;
            whereFadeStartTime = null;
            return;
        }

        whereFadeFrame = requestAnimationFrame(stepWhereBackgroundFade);
    }

    function setWhereBackgroundTargetOpacity(nextTarget) {
        whereTargetOpacity = Math.max(0, Math.min(1, nextTarget));
        const distance = Math.abs(whereTargetOpacity - whereCurrentOpacity);
        if (distance <= 0.0001) {
            whereCurrentOpacity = whereTargetOpacity;
            setWhereBackgroundOpacity(whereCurrentOpacity);
            return;
        }

        whereFadeStartOpacity = whereCurrentOpacity;
        whereFadeStartTime = null;

        if (whereTargetOpacity > whereFadeStartOpacity) {
            whereFadeDurationMs = distance * WHERE_FADE_IN_SECONDS * 1000;
        } else {
            whereFadeDurationMs = distance * WHERE_FADE_OUT_SECONDS * 1000;
        }

        if (whereFadeFrame === null) {
            whereFadeFrame = requestAnimationFrame(stepWhereBackgroundFade);
        }
    }

    function updateWhereBackgroundFromPlayback() {
        const hasActivePlayback = isPlayerActive();
        if (jukeboxContainer) {
            jukeboxContainer.classList.toggle("is-music-playing", hasActivePlayback);
        }
        setWhereBackgroundTargetOpacity(hasActivePlayback ? 1 : 0);
        setRecordSeekControlsVisible(Boolean(currentTrackData));
        updatePlayingTrackStickyState();
        updateNowPlaying();
    }

    function seekCurrentAudioBy(offsetSeconds) {
        if (!currentTrackData || !Number.isFinite(player.currentTime)) return;
        finishAutoMixNow();

        const duration = player.duration;
        const previousTime = player.currentTime;
        const maxSeekTime = Number.isFinite(duration) ? duration : Math.max(player.currentTime, 0);
        const nextTime = Math.min(Math.max(player.currentTime + offsetSeconds, 0), maxSeekTime);
        player.currentTime = nextTime;
        const appliedSeekOffset = nextTime - previousTime;

        updateNowPlayingProgress();
        nudgeRecordForSeek(appliedSeekOffset);
    }

    function nudgeRecordForSeek(appliedSeekOffsetSeconds) {
        if (!record || !Number.isFinite(appliedSeekOffsetSeconds) || appliedSeekOffsetSeconds === 0) return;

        const direction = Math.sign(appliedSeekOffsetSeconds);
        const tenSecondUnits = Math.abs(appliedSeekOffsetSeconds) / 10;
        const turnsPerTenSeconds = 2.25;
        spinRecordBy(direction * turnsPerTenSeconds * tenSecondUnits * 360, 170);
    }

    // Extra spin on top of any playback spin (seeking, flipping the jukebox, fixing Jukebot)
    function spinRecordBy(totalDegrees, durationMs) {
        if (recordSeekNudgeFrame !== null) {
            cancelAnimationFrame(recordSeekNudgeFrame);
            recordSeekNudgeFrame = null;
        }

        let startTime = null;
        let previousProgress = 0;

        function animateNudge(timestamp) {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const deltaProgress = easedProgress - previousProgress;
            previousProgress = easedProgress;

            rotationAngle = (rotationAngle + (totalDegrees * deltaProgress)) % 360;
            updateRecordTransform();

            if (progress < 1) {
                recordSeekNudgeFrame = requestAnimationFrame(animateNudge);
            } else {
                recordSeekNudgeFrame = null;
            }
        }

        recordSeekNudgeFrame = requestAnimationFrame(animateNudge);
    }

    // Pop the record up (if it's tucked away) and give it a whirl
    function showOffRecordSpin(totalDegrees, durationMs) {
        const wasUp = record ? record.classList.contains("up") : true;
        if (!wasUp) {
            record.classList.add("up");
        }
        spinRecordBy(totalDegrees, durationMs);
        if (!wasUp) {
            setTimeout(() => {
                if (!currentTrackData) {
                    record.classList.remove("up");
                }
            }, durationMs + 400);
        }
    }

    function toggleCurrentTrackFromRecord() {
        if (!currentTrackData) return;

        if (player.paused) {
            resumeCurrentTrack();
        } else {
            pauseCurrentTrack();
        }
    }

    function resumeCurrentTrack() {
        if (!currentTrackData) return;

        const currentButton = getCurrentTrackElement()?.querySelector(".play-button");
        updateNowPlayingProgress();

        record.classList.add("up");
        startSpinning();
        const playPromise = player.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
                setPlayButtonLabel(getCurrentTrackElement()?.querySelector(".play-button"), "Play");
                stopSpinning();
                updateNowPlaying();
            });
        }
        if (!document.hidden) {
            fadeInAudio(player);
        }
        setPlayButtonLabel(currentButton, "Pause");
    }

    function pauseCurrentTrack() {
        if (!currentTrackData) return;
        finishAutoMixNow();

        if (document.hidden) {
            player.pause();
        } else {
            fadeOutAudio(player, () => {});
        }
        stopSpinning();
        setPlayButtonLabel(getCurrentTrackElement()?.querySelector(".play-button"), "Play");
    }

    // Load a song into the shared player and start it from the beginning
    function startTrack(track, options = {}) {
        if (!options.sideFlip) cancelSideSwitch();
        const previousTrack = getCurrentTrackElement();
        // Switching while a song is playing gets the record whirl (like a record changer); turning
        // a song over to its other side doesn't
        const switchingWhilePlaying = !options.sideFlip && (options.flourish
            || (isPlayerActive() && Boolean(currentTrackData) && currentTrackData.file !== track.file));

        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
            volumeFadeInterval = null;
        }
        finishAutoMixNow();
        // If this is the song already waiting on the spare deck, it can start straight away
        const prepared = takeUpNextFor(track);

        if (previousTrack && currentTrackData.file !== track.file && !options.sideFlip) {
            resetTrackElementUi(previousTrack);
        }

        isSwitchingTrack = true;
        currentTrackData = track;
        const trackElement = getCurrentTrackElement();
        showModeButtonsOnTrack(trackElement);
        setPlayButtonLabel(trackElement?.querySelector(".play-button"), "Pause");

        const startingInBackground = document.hidden;
        // Hold the sound back while the record drops. Only where the page can set the volume:
        // an iPhone would play a blip of the song and then restart it.
        const holdAudio = !startingInBackground && canFadeVolume && !options.sideFlip;
        // A tap on the song's wave starts it from there; a song mixed in skips its silent intro
        const startOffset = options.startAt > 0 ? options.startAt : (prepared ? prepared.startAt : 0);
        trackStartOffset = startOffset;
        songSettleAt = performance.now() + ROW_RESHAPE_MS + 150;
        if (prepared) {
            const previousDeck = player;
            player = prepared.deck;
            previousDeck.pause();
            resetDeckSpeed(previousDeck);
            setDeckSource(previousDeck, null);
            cueDeck(player, startOffset);
        } else {
            // (#t= asks the browser to start there, so not a moment of the beginning is heard)
            setDeckSource(player, startOffset > 0 ? `${track.file}#t=${startOffset.toFixed(2)}` : track.file);
        }
        const deck = player;
        syncDeckLooping();
        deck.volume = holdAudio ? 0 : 1;
        const playbackStartTime = performance.now() + 300;
        const playPromise = deck.play();

        updateMediaSessionMetadata(track);
        updatePlayingTrackStickyState();
        updateNowPlaying();
        if (prepared) {
            // Already loaded, so no loadedmetadata is coming
            updateMediaSessionPosition();
            requestSongBeats(track);
        }

        if (startingInBackground || options.sideFlip) {
            record.classList.add("up");
            startSpinning();
        } else {
            moveRecordDownAndUp(() => startSpinning());
            if (switchingWhilePlaying) {
                spinRecordBy(720, 900);
            }
        }
        startBeatVisuals();

        // Hold the audio back until the record has dropped into place
        const startFromBeginningAfterRecordEffect = () => {
            isSwitchingTrack = false;
            if (!holdAudio) return;
            const remainingDelay = Math.max(0, playbackStartTime - performance.now());
            setTimeout(() => {
                if (currentTrackData !== track || deck !== player || deck.paused) {
                    deck.volume = 1;
                    return;
                }
                const revealAudioAtBeginning = () => {
                    deck.removeEventListener("seeked", revealAudioAtBeginning);
                    if (currentTrackData === track && !deck.paused) {
                        deck.volume = 1;
                    }
                };

                deck.addEventListener("seeked", revealAudioAtBeginning, { once: true });
                deck.currentTime = startOffset;
                if (!deck.seeking) {
                    revealAudioAtBeginning();
                }
            }, remainingDelay);
        };

        if (playPromise && typeof playPromise.then === "function") {
            playPromise
                .then(startFromBeginningAfterRecordEffect)
                .catch((error) => {
                    // A newer song replaced this one before it started
                    if (currentTrackData !== track || (error && error.name === "AbortError")) return;
                    isSwitchingTrack = false;
                    deck.volume = 1;
                    resetTrackElementUi(getCurrentTrackElement());
                    currentTrackData = null;
                    showModeButtonsOnTrack(null);
                    stopSpinning();
                    updateWhereBackgroundFromPlayback();
                });
        } else {
            startFromBeginningAfterRecordEffect();
        }
    }

    // ───── Side A / side B ─────
    // A song that comes in two versions (Countdown Island and its slowed-down pause music) is one
    // row with a label on its cover that flips it over. Flipped while it plays, the record winds
    // down (or up) to the other side's speed and the other side carries on from the same spot.
    const SIDE_SWITCH_MS = 650;
    const shownSides = new Map(); // side A's file -> the side its row was last flipped to
    let sideSwitch = null; // a flip while playing, until the other side takes over

    function getOtherSide(track) {
        const file = track && (track.sideB || track.sideA);
        return file ? tracks.find((other) => other.file === file) || null : null;
    }

    function getListedSide(song) {
        const other = getOtherSide(song);
        if (!other) return song;
        if (currentTrackData === other || (sideSwitch && sideSwitch.to === other)) return other;
        if (currentTrackData === song) return song;
        // Filtered by something only the other side has (like "Slowed"): that side
        const tag = tagFilter ? tagFilter.value : "all";
        const has = (track) => track.tags.includes(tag) || track.date === tag;
        if (tag !== "all" && has(other) && !has(song)) return other;
        return shownSides.get(song.file) || song;
    }

    function updateSideSwitch(row, track) {
        const button = row.querySelector(".side-switch");
        if (!button) return;
        const sideB = Boolean(track.sideA);
        const other = getOtherSide(track);
        button.classList.toggle("is-side-b", sideB);
        button.querySelector(".side-switch-label").textContent = sideB ? "Side B" : "Side A";
        button.title = `Flip to side ${sideB ? "A" : "B"}`;
        button.setAttribute("aria-label", `Side ${sideB ? "B" : "A"}: ${track.title}. Flip to side ${sideB ? "A" : "B"}${other ? `, ${other.title}` : ""}`);
    }

    // The row shows the other side: its name, cover (turning over), length and wave
    function showRowSide(row, track, turnCover = false) {
        row.dataset.file = track.file;
        const title = row.querySelector(".title-text");
        if (title) title.textContent = track.title;
        const cover = row.querySelector("img");
        if (cover) {
            cover.alt = `${track.title} Cover`;
            const tint = () => cover.classList.toggle("cover-grayscale", Boolean(track.grayscaleCover));
            if (turnCover && !prefersReducedMotion() && typeof cover.animate === "function") {
                cover.animate([
                    { transform: "perspective(500px) rotateY(0deg)" },
                    { transform: "perspective(500px) rotateY(90deg)", offset: 0.5 },
                    { transform: "perspective(500px) rotateY(0deg)" }
                ], { duration: 460, easing: "ease-in-out" });
                setTimeout(tint, 230);
            } else {
                tint();
            }
        }
        const total = row.querySelector(".song-time-total");
        if (total) total.textContent = formatKnownDuration(track.file);
        updateSideSwitch(row, track);
        const wave = row.querySelector(".song-wave");
        if (wave) drawSongWave(wave);
        requestAnimationFrame(syncTitleMarquees);
    }

    function flipSongSide(row) {
        const shown = getTrackDataForElement(row);
        const other = getOtherSide(shown);
        if (!shown || !other || sideSwitch) return;
        shownSides.set(shown.sideA || shown.file, other);
        const isCurrent = currentTrackData === shown;
        const playing = isCurrent && isPlayerActive() && !scratch;
        showRowSide(row, other, true);
        if (!isCurrent) return;
        if (playing) {
            switchSidesWhilePlaying(row, shown, other);
        } else {
            switchSidesWhilePaused(row, other);
        }
    }

    // Where `to` is at the same point in the song as the playing side is now
    function getSidePosition(deck, to) {
        const fromDuration = deck.duration;
        const toDuration = getKnownDuration(to.file);
        if (!Number.isFinite(fromDuration) || fromDuration <= 0 || !(toDuration > 0)) return 0;
        return Math.min(toDuration - 0.5, (deck.currentTime / fromDuration) * toDuration);
    }

    // Paused: the other side is lined up at the same spot, ready for Play
    function switchSidesWhilePaused(row, to) {
        const startAt = getSidePosition(player, to);
        finishAutoMixNow();
        discardUpNext();
        currentTrackData = to;
        trackStartOffset = startAt;
        setDeckSource(player, startAt > 0 ? `${to.file}#t=${startAt.toFixed(2)}` : to.file);
        updateMediaSessionMetadata(to);
        showModeButtonsOnTrack(row, false);
        updatePlayingTrackStickyState();
        updateNowPlaying();
    }

    function resetDeckSpeed(deck) {
        deck.playbackRate = 1;
        if ("preservesPitch" in deck) deck.preservesPitch = true;
        if ("webkitPreservesPitch" in deck) deck.webkitPreservesPitch = true;
    }

    // Playing: this side winds to the other side's speed (so it already sounds like it) while the
    // other side loads on the spare deck a moment ahead; when this side gets there, they swap
    function switchSidesWhilePlaying(row, from, to) {
        const deck = player;
        const spare = getSpareDeck();
        const fromDuration = deck.duration;
        const toDuration = getKnownDuration(to.file);
        if (!spare || !Number.isFinite(fromDuration) || fromDuration <= 0 || !(toDuration > 0)) {
            startTrack(to, { startAt: getSidePosition(deck, to), sideFlip: true });
            return;
        }
        finishAutoMixNow();
        discardUpNext();
        const rate = fromDuration / toDuration;
        const cueAt = Math.min(toDuration - 0.5, getSidePosition(deck, to) + ((SIDE_SWITCH_MS / 1000) * Math.max(1, 1 / rate)) + 0.4);
        const entry = { track: to, deck: spare, shuffled: shuffleEnabled, startAt: cueAt, ready: false, starting: false, controller: null };
        const state = { row, from, to, deck, entry, wound: false, timer: null, giveUp: null };
        sideSwitch = state;
        upNext = entry;
        setDeckSource(spare, `${to.file}#t=${cueAt.toFixed(2)}`);

        const settle = () => {
            if (sideSwitch !== state || !state.wound || !entry.ready) return;
            clearTimeout(state.timer);
            // (this side now plays at the other's pace: one second of it per second)
            const lead = entry.startAt - getSidePosition(deck, to);
            if (lead > 0.03) {
                state.timer = setTimeout(settle, lead * 1000);
            } else if (lead < -0.3) {
                // The other side took a while to load and this one's gone past: cue it on a bit
                entry.ready = false;
                entry.startAt = Math.min(toDuration - 0.5, getSidePosition(deck, to) + 0.6);
                spare.addEventListener("seeked", markReady, { once: true });
                cueDeck(spare, entry.startAt);
            } else {
                finishSideSwitch(state);
            }
        };
        const markReady = () => {
            if (sideSwitch !== state) return;
            entry.ready = true;
            settle();
        };
        spare.addEventListener("canplay", markReady, { once: true });
        // It never loaded: start it the ordinary way
        state.giveUp = setTimeout(() => finishSideSwitch(state, true), 5000);

        if ("preservesPitch" in deck) deck.preservesPitch = false;
        if ("webkitPreservesPitch" in deck) deck.webkitPreservesPitch = false;
        const startedAt = performance.now();
        const wind = (now) => {
            if (sideSwitch !== state) return;
            if (deck.paused && !scratch) {
                // Paused part-way: the other side waits at the same spot instead
                cancelSideSwitch();
                switchSidesWhilePaused(row, to);
                return;
            }
            const progress = Math.min(1, (now - startedAt) / SIDE_SWITCH_MS);
            const eased = progress < 0.5 ? 2 * progress * progress : 1 - (Math.pow((-2 * progress) + 2, 2) / 2);
            deck.playbackRate = 1 + ((rate - 1) * eased);
            if (progress < 1) {
                requestAnimationFrame(wind);
            } else {
                state.wound = true;
                settle();
            }
        };
        requestAnimationFrame(wind);
    }

    function finishSideSwitch(state, gaveUp = false) {
        if (sideSwitch !== state) return;
        clearTimeout(state.timer);
        clearTimeout(state.giveUp);
        sideSwitch = null;
        const startAt = gaveUp ? getSidePosition(state.deck, state.to) : state.entry.startAt;
        if (gaveUp) {
            discardUpNext();
        } else {
            upNext = state.entry;
        }
        startTrack(state.to, { startAt, sideFlip: true });
        resetDeckSpeed(state.deck);
    }

    // Something else happened first (another song, a scratch, the song cleared): the flip's off
    function cancelSideSwitch(revert = false) {
        const state = sideSwitch;
        if (!state) return;
        sideSwitch = null;
        clearTimeout(state.timer);
        clearTimeout(state.giveUp);
        resetDeckSpeed(state.deck);
        if (upNext === state.entry) discardUpNext();
        if (revert && state.row.isConnected) {
            shownSides.set(state.from.sideA || state.from.file, state.from);
            showRowSide(state.row, state.from, true);
        }
    }

    // A slowed-down side turns slower (like a record at 33 instead of 45), and the record winds
    // down or up with a flip
    function getRecordSpinScale() {
        const scale = (currentTrackData && currentTrackData.spinScale) || 1;
        return sideSwitch ? scale * (player.playbackRate || 1) : scale;
    }

    function handleTrackPlayButton(track) {
        if (currentTrackData && (currentTrackData.file === track.file || (sideSwitch && sideSwitch.to === track))) {
            if (player.paused) {
                resumeCurrentTrack();
            } else {
                pauseCurrentTrack();
            }
            return;
        }

        startTrack(track);
    }

    // A song reached its end (or the silence at its end)
    function handleTrackFinished() {
        if (!currentTrackData) return;
        // The deck loops by itself for repeat-one; this catches a song that ended just as it was turned on
        if (repeatOneEnabled) {
            restartCurrentTrack();
            return;
        }
        // The next song is already on its way in on the spare deck
        if (continuousPlayEnabled && upNext && upNext.starting) return;

        const finishedTrack = getCurrentTrackElement();
        stopSpinning();
        record.classList.remove("up");
        resetTrackElementUi(finishedTrack);

        if (continuousPlayEnabled) {
            // Start the next song straight from this event so phones keep
            // playing with the screen off
            playNextTrackAfter(finishedTrack);
            return;
        }

        discardUpNext();
        currentTrackData = null;
        showModeButtonsOnTrack(null);
        if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "none";
        }
        updateWhereBackgroundFromPlayback();
    }

    // Player events: keep the song card, deck and lock screen in sync
    function setUpPlayerEvents() {
        // Only the deck that's playing drives the UI (the other one is loading or fading out)
        const onPlayingDeck = (type, handler) => {
            decks.forEach((deck) => {
                deck.addEventListener(type, (event) => {
                    if (event.currentTarget === player) handler(event);
                });
            });
        };

        onPlayingDeck("loadstart", () => updateNowPlayingProgress());
        onPlayingDeck("loadedmetadata", () => {
            updateNowPlayingProgress();
            updateMediaSessionPosition();
            requestSongBeats(currentTrackData);
            rememberSongDuration(currentTrackData, player.duration);
        });
        onPlayingDeck("timeupdate", () => {
            updateNowPlayingProgress();
            checkAutoMix();
        });
        onPlayingDeck("seeked", () => {
            updateMediaSessionPosition();
            updateNowPlayingProgress();
        });

        // The last song keeps its own time while it finishes
        decks.forEach((deck) => {
            deck.addEventListener("timeupdate", () => {
                if (mixOut && mixOut.deck === deck) checkMixOut();
            });
        });

        onPlayingDeck("play", () => {
            if (!currentTrackData) return;
            startBeatVisuals();
            setPlayButtonLabel(getCurrentTrackElement()?.querySelector(".play-button"), "Pause");
            if (record && record.classList.contains("up")) {
                startSpinning();
            }
            if ("mediaSession" in navigator) {
                navigator.mediaSession.playbackState = "playing";
            }
            updateWhereBackgroundFromPlayback();
        });

        onPlayingDeck("pause", () => {
            if (player.ended || scratch) return;
            // Paused from outside the page (a call, another app): drop any fade in progress
            finishAutoMixNow();
            stopSpinning();
            if (!isSwitchingTrack) {
                setPlayButtonLabel(getCurrentTrackElement()?.querySelector(".play-button"), "Play");
                if ("mediaSession" in navigator) {
                    navigator.mediaSession.playbackState = currentTrackData ? "paused" : "none";
                }
            }
            updateMediaSessionPosition();
            updateWhereBackgroundFromPlayback();
        });

        onPlayingDeck("ended", handleTrackFinished);

        onPlayingDeck("error", () => {
            if (!currentTrackData) return;
            const trackElement = getCurrentTrackElement();
            const progress = trackElement?.querySelector(".song-progress");
            if (progress) {
                progress.classList.remove("is-loading");
                progress.classList.add("is-unavailable");
            }
            setPlayButtonLabel(trackElement?.querySelector(".play-button"), "Play");
            isSwitchingTrack = false;
            currentTrackData = null;
            showModeButtonsOnTrack(null);
            stopSpinning();
            updateWhereBackgroundFromPlayback();
        });
    }

    // Lock screen / control center / headphone controls
    function setUpMediaSession() {
        if (!("mediaSession" in navigator)) return;

        const handlers = {
            play: () => (currentTrackData ? resumeCurrentTrack() : startFirstTrack()),
            pause: () => pauseCurrentTrack(),
            previoustrack: () => playPreviousTrack(),
            nexttrack: () => playNextTrack(),
            seekto: (details) => {
                if (!currentTrackData || !Number.isFinite(details.seekTime)) return;
                finishAutoMixNow();
                player.currentTime = details.seekTime;
                updateNowPlayingProgress();
            }
        };

        Object.entries(handlers).forEach(([action, handler]) => {
            try {
                navigator.mediaSession.setActionHandler(action, handler);
            } catch (error) {
                // Action not supported by this browser
            }
        });
    }

    function updateMediaSessionMetadata(track) {
        if (!("mediaSession" in navigator) || typeof MediaMetadata !== "function") return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: "Jason Muse",
            album: track.game ? track.game.name : "Muse Jukebox",
            artwork: [{ src: new URL(getTrackCoverFull(track), window.location.href).href }]
        });
    }

    function updateMediaSessionPosition() {
        if (!("mediaSession" in navigator) || typeof navigator.mediaSession.setPositionState !== "function") return;
        if (!currentTrackData || !Number.isFinite(player.duration)) return;

        try {
            navigator.mediaSession.setPositionState({
                duration: player.duration,
                playbackRate: player.playbackRate || 1,
                position: Math.min(player.currentTime, player.duration)
            });
        } catch (error) {
            // Ignore out-of-range positions while a song is loading
        }
    }

    // Landscape deck: big record, song info, scrubber and transport controls
    function updateNowPlaying() {
        updateSideRailState();
        if (!nowPlaying) return;

        const track = currentTrackData;
        const isPlaying = isPlayerActive();
        nowPlaying.classList.toggle("is-playing", isPlaying);
        nowPlaying.classList.toggle("is-empty", !track);
        if (npPlay) {
            npPlay.classList.toggle("is-playing", isPlaying);
            npPlay.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
        }

        refreshLedSigns();
        if (track !== npShownTrack) {
            npShownTrack = track;
            if (npEyebrow) npEyebrow.textContent = track ? "Now playing" : "Muse Jukebox";
            if (npTitle) npTitle.textContent = track ? track.title : "Pick a song";
            if (npSub) {
                npSub.textContent = track
                    ? [track.date, ...(track.game ? [track.game.name] : track.tags)].join(" \u00b7 ")
                    : "Press play and let the jukebox spin";
            }

            if (npWave) {
                drawSongWave(npWave);
                // The new song's shape grows out of the middle
                if (track && !prefersReducedMotion() && typeof npWave.animate === "function") {
                    npWave.querySelectorAll(".song-wave-bars").forEach((bars) => bars.animate(
                        [{ transform: "scaleY(0.15)", opacity: 0.3 }, { transform: "none", opacity: 1 }],
                        { duration: 480, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
                    ));
                }
            }

            const cover = track ? getTrackCoverPreview(track) : "images/penguin.gif";
            setSafeImageSource(npCover, cover);
            setSafeImageSource(npBackdrop, cover);
            nowPlaying.classList.toggle("np-grayscale", Boolean(track && track.grayscaleCover));

            const meta = nowPlaying.querySelector(".np-meta");
            if (meta) {
                meta.classList.remove("np-swap");
                void meta.offsetWidth;
                meta.classList.add("np-swap");
            }
        }

        updateNowPlayingProgress();
    }

    // Where the playing song is: its row's wave fills up as it plays (and the deck's), the times
    // count along and the side rail's ring goes round. `previewTime` shows a spot being scratched to.
    function updateNowPlayingProgress(previewTime = null) {
        const playerDuration = currentTrackData && Number.isFinite(player.duration) && player.duration > 0 ? player.duration : 0;
        const loading = Boolean(currentTrackData) && !playerDuration;
        // Until the song has loaded, its known length shows where it's about to start from
        const knownDuration = loading ? getKnownDuration(currentTrackData.file) : 0;
        let duration = playerDuration || (knownDuration > 0 ? knownDuration : 0);
        let position = currentTrackData ? (playerDuration ? player.currentTime : trackStartOffset) : 0;
        if (sideSwitch && playerDuration) {
            // Winding round to the other side: its times, at the same point in the song
            const otherDuration = getKnownDuration(sideSwitch.to.file);
            if (otherDuration > 0) {
                position = (position / duration) * otherDuration;
                duration = otherDuration;
            }
        }
        if (previewTime === null && scratch) previewTime = scratch.targetTime;
        const dragging = Boolean(waveScrub && waveScrub.active);
        if (previewTime !== null) {
            position = previewTime;
        } else if (dragging && duration) {
            position = waveScrub.fraction * duration;
        }
        const fraction = duration ? Math.min(1, Math.max(0, position / duration)) : 0;
        const following = previewTime !== null || dragging;
        const now = performance.now();
        let gliding = false;
        const glide = (element) => {
            const shown = glidePlayhead(element, fraction, duration, following, now);
            if (shown !== fraction) gliding = true;
            return shown;
        };

        if (railRingProgress) {
            railRingProgress.style.strokeDashoffset = String(RAIL_RING_LENGTH * (1 - glide(railRingProgress)));
        }
        if (playingRowParts && playingRowParts.wave) {
            const shown = glide(playingRowParts.wave);
            setWaveProgress(playingRowParts.wave, shown, position, duration);
            playingRowParts.progress?.classList.toggle("is-loading", loading);
            if (playingRowParts.elapsed) setTextIfChanged(playingRowParts.elapsed, formatTime(duration ? shown * duration : position));
            if (playingRowParts.total && duration) setTextIfChanged(playingRowParts.total, formatTime(duration));
        }
        if (npWave) {
            const shown = glide(npWave);
            setWaveProgress(npWave, shown, position, duration);
            npWave.parentElement?.classList.toggle("is-loading", loading);
            const cantSeek = String(!playerDuration);
            if (npWave.getAttribute("aria-disabled") !== cantSeek) npWave.setAttribute("aria-disabled", cantSeek);
            if (npElapsed) setTextIfChanged(npElapsed, formatTime(duration ? shown * duration : position));
            if (npDuration) setTextIfChanged(npDuration, duration ? formatTime(duration) : "--:--");
        }

        // Keep drawing while it glides, and while the song plays if nothing else is drawing frames
        if (gliding || (beatFrame === null && isPlayerActive() && !document.hidden)) {
            schedulePlayheadFrame();
        }
    }

    // The playhead glides to a new spot (a song starting part-way through, a tap, a skip, the next
    // song) rather than jumping there. While the song plays it just follows along, and while it's
    // dragged or scratched it follows the finger, only easing in to where the drag began.
    const PLAYHEAD_GLIDE_MS = 500;
    const PLAYHEAD_CATCH_UP_MS = 220;
    const PLAYHEAD_JUMP_SECONDS = 1; // more than playing ever moves it between two updates
    const playheads = new WeakMap(); // element -> where its playhead is drawn, and any glide
    let playheadFrame = null;

    function glidePlayhead(element, target, duration, following, now) {
        let head = playheads.get(element);
        if (!head) {
            head = { shown: 0, target: 0, from: 0, start: 0, length: 0, following: false };
            playheads.set(element, head);
        }
        const jumped = Math.abs(target - head.target) * (duration || 1) > PLAYHEAD_JUMP_SECONDS;
        if (jumped && (!following || !head.following) && !prefersReducedMotion()) {
            head.from = head.shown;
            head.start = now;
            head.length = following ? PLAYHEAD_CATCH_UP_MS : PLAYHEAD_GLIDE_MS;
        }
        head.target = target;
        head.following = following;
        const progress = head.length ? (now - head.start) / head.length : 1;
        if (progress >= 1) {
            head.length = 0;
            head.shown = target;
        } else {
            const eased = 1 - Math.pow(1 - Math.max(0, progress), 4);
            head.shown = head.from + ((target - head.from) * eased);
        }
        return head.shown;
    }

    function schedulePlayheadFrame() {
        if (playheadFrame !== null) return;
        playheadFrame = requestAnimationFrame(() => {
            playheadFrame = null;
            updateNowPlayingProgress();
        });
    }

    function setUpNowPlayingControls() {
        if (!nowPlaying) return;

        npPlay?.addEventListener("click", togglePlayback);
        npRecord?.addEventListener("click", togglePlayback);
        npPrev?.addEventListener("click", playPreviousTrack);
        npNext?.addEventListener("click", playNextTrack);
        npContinuous?.addEventListener("click", cycleLoopMode);
        npClear?.addEventListener("click", clearCurrentTrack);
        npShuffle?.addEventListener("click", toggleShuffle);
    }

    let accelerationRequest; // New variable to track acceleration frame

    // Spin speeds are degrees per 60th of a second. Each frame moves the record by the time that
    // actually passed, so it turns at the same pace on 120 Hz screens and when frames get dropped
    // (a busy moment, like the jukebox turning around, used to make it slow down)
    function getSpinSteps(timestamp, lastTimestamp) {
        if (lastTimestamp === null) return 1;
        return Math.min(6, Math.max(0, (timestamp - lastTimestamp) / (1000 / 60)));
    }

    // Modify startSpinning to implement smooth acceleration (like a record starting)
    function startSpinning() {
        if (isSpinning) return;
        isSpinning = true;
        let currentSpeed = currentRotationSpeed || 0; // Start from current speed (might be decelerating)
        const targetSpeed = 0.5;
        const accelerationRate = 0.008; // More subtle acceleration
        let lastTimestamp = null;

        function accelerate(timestamp = performance.now()) {
            if (isSpinning) {
                const steps = getSpinSteps(timestamp, lastTimestamp);
                lastTimestamp = timestamp;
                // Gradually accelerate to target speed
                if (currentSpeed < targetSpeed) {
                    currentSpeed = Math.min(currentSpeed + (accelerationRate * steps), targetSpeed);
                }
                
                if (!scratch) {
                    rotationAngle = (rotationAngle + (currentSpeed * steps * getRecordSpinScale())) % 360;
                    updateRecordTransform();
                }
                currentRotationSpeed = currentSpeed; // Update tracked speed

                accelerationRequest = requestAnimationFrame(accelerate);
            }
        }

        accelerate();
    }

    let decelerateRequest; // New variable to track deceleration frame
    let currentRotationSpeed = 0; // Track current rotation speed
    let volumeFadeInterval = null; // Track volume fade interval

    // Function to fade out audio volume
    function fadeOutAudio(audioElement, callback) {
        if (!audioElement || audioElement.paused) {
            if (callback) callback();
            return;
        }
        
        // Clear any existing fade
        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
        }
        
        let volume = audioElement.volume || 1.0;
        const duration = 80; // Very quick fade out
        const steps = 5;
        const stepSize = volume / steps;
        const intervalTime = duration / steps;
        
        volumeFadeInterval = setInterval(() => {
            if (audioElement.paused) {
                clearInterval(volumeFadeInterval);
                volumeFadeInterval = null;
                audioElement.volume = 1.0; // Reset volume
                if (callback) callback();
                return;
            }
            
            if (volume > 0) {
                volume = Math.max(volume - stepSize, 0);
                audioElement.volume = volume;
            } else {
                // Faded out, pause and reset
                clearInterval(volumeFadeInterval);
                volumeFadeInterval = null;
                audioElement.pause();
                audioElement.volume = 1.0; // Reset volume for next play
                if (callback) callback();
            }
        }, intervalTime);
    }

    // Function to fade in audio volume
    function fadeInAudio(audioElement) {
        if (!audioElement) return;
        
        // Clear any existing fade
        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
        }
        
        // Start at 0 volume
        audioElement.volume = 0;
        
        let volume = 0;
        const targetVolume = 1.0;
        const duration = 100; // Very quick fade in
        const steps = 5;
        const stepSize = targetVolume / steps;
        const intervalTime = duration / steps;
        
        volumeFadeInterval = setInterval(() => {
            if (audioElement.paused) {
                clearInterval(volumeFadeInterval);
                volumeFadeInterval = null;
                audioElement.volume = 1.0;
                return;
            }
            
            if (volume < targetVolume) {
                volume = Math.min(volume + stepSize, targetVolume);
                audioElement.volume = volume;
            } else {
                // Faded in completely
                clearInterval(volumeFadeInterval);
                volumeFadeInterval = null;
                audioElement.volume = 1.0; // Ensure full volume
            }
        }, intervalTime);
    }

    // Modify stopSpinning to implement smooth deceleration (like a record slowing down)
    function stopSpinning() {
        isSpinning = false;
        let deceleration = currentRotationSpeed || 0.5; // Start from current speed
        let lastTimestamp = null;

        function decelerate(timestamp = performance.now()) {
            if (deceleration > 0) {
                const steps = getSpinSteps(timestamp, lastTimestamp);
                lastTimestamp = timestamp;
                if (!scratch) {
                    rotationAngle = (rotationAngle + (deceleration * steps)) % 360;
                    updateRecordTransform();
                }
                deceleration -= 0.015 * steps; // More subtle deceleration
                currentRotationSpeed = deceleration;

                // Continue decelerating until the speed reaches zero
                decelerateRequest = requestAnimationFrame(decelerate);
            } else {
                currentRotationSpeed = 0;
                cancelAnimationFrame(decelerateRequest); // Stop animation when deceleration completes
            }
        }

        decelerate();
    }


    // Function to move the record down briefly before starting the next spin
    function moveRecordDownAndUp(callback) {
        switchSound.volume = 0.5;
        const switchPlayPromise = switchSound.play();
        if (switchPlayPromise && typeof switchPlayPromise.catch === "function") {
            switchPlayPromise.catch(() => {});
        }
        record.classList.remove("up");
        setTimeout(() => {
            record.classList.add("up");
            if (callback) callback();
        }, 300);
    }

    // Helper function to format time in M:SS format
    function formatTime(seconds) {
        if (isNaN(seconds)) return "--:--";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    // Helper function to split text into letter spans for animation
    function splitIntoLetters(text) {
        return text.split('').map((letter, index) => 
            `<span style="transition-delay: ${index * 30}ms">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');
    }

    // Helper function to animate text change with letter-by-letter effect
    function animateTextChange(button, newText) {
        // Add transitioning class to animate letters out (scale down)
        button.classList.add("transitioning");
        
        // Wait for letters to animate out, then change text
        setTimeout(() => {
            // Store current width
            const currentWidth = button.offsetWidth;
            
            // Set explicit width to maintain current size
            button.style.width = currentWidth + 'px';
            
            // Change text content
            button.innerHTML = splitIntoLetters(newText);
            
            // Force reflow
            void button.offsetWidth;
            
            // Remove transitioning class to trigger bounce-in animation
            button.classList.remove("transitioning");
            
            // Measure new width with auto, then animate to it
            const tempWidth = button.style.width;
            button.style.width = 'auto';
            const newWidth = button.offsetWidth;
            button.style.width = currentWidth + 'px';
            
            // Force reflow again
            void button.offsetWidth;
            
            // Animate to new width
            setTimeout(() => {
                button.style.width = newWidth + 'px';
                
                // After transition, reset to auto
                setTimeout(() => {
                    button.style.width = '';
                }, 300);
            }, 50);
        }, 250);
    }

    // The progress updates come many times a second, so only touch the page when something changes
    function setTextIfChanged(element, text) {
        if (element.textContent !== text) element.textContent = text;
    }

    // ───── Song waves: each song's shape in its row; the playing song's is its scrubber ─────
    // waves.json has every song's length and how loud it is along the way (tools/make-waves.py
    // makes it). A song that isn't in it yet gets a plain wave until it's been heard all the way
    // through, then its real one (remembered on this device).
    const WAVE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const WAVE_POINTS = 96;
    const WAVE_BAR = 2.5; // px wide, with round ends
    const WAVE_GAP = 2;
    const WAVE_CURVE = 2.4; // most of a song sits near the top, so the top is spread out
    const WAVE_PLAIN_LEVEL = 0.62;
    const WAVE_STORAGE_KEY = "museJukeboxWaves";
    const songWaves = new Map(); // file -> { duration, levels }
    const learnedWaves = readLearnedWaves();
    const drawnWaves = new WeakMap();
    const waveWidths = new WeakMap();
    const shownWaveProgress = new WeakMap();
    const waveObserver = typeof ResizeObserver === "function"
        ? new ResizeObserver((entries) => entries.forEach((entry) => drawSongWave(entry.target)))
        : null;

    function readLearnedWaves() {
        try {
            return JSON.parse(localStorage.getItem(WAVE_STORAGE_KEY) || "{}") || {};
        } catch (error) {
            return {};
        }
    }

    function decodeWaveShape(shape) {
        const levels = new Float32Array(shape.length);
        for (let index = 0; index < shape.length; index += 1) {
            levels[index] = Math.max(0, WAVE_ALPHABET.indexOf(shape[index])) / 63;
        }
        return levels;
    }

    function addSongWave(file, entry) {
        if (!entry || !(entry.duration > 0)) return;
        songWaves.set(file, {
            duration: entry.duration,
            levels: typeof entry.shape === "string" && entry.shape.length ? decodeWaveShape(entry.shape) : null
        });
    }

    async function loadSongWaves() {
        Object.entries(learnedWaves).forEach(([file, entry]) => addSongWave(file, entry));
        try {
            const response = await fetch("waves.json", { cache: "no-cache" });
            if (response.ok) {
                Object.entries(await response.json()).forEach(([file, entry]) => addSongWave(file, entry));
            }
        } catch (error) {
            // No waves: the rows keep their plain ones
        }
        trackList.querySelectorAll(".track").forEach((trackElement) => {
            const total = trackElement.querySelector(".song-time-total");
            if (total && !total.textContent) total.textContent = formatKnownDuration(trackElement.dataset.file);
            const wave = trackElement.querySelector(".song-wave");
            if (wave) drawSongWave(wave);
        });
        if (npWave) drawSongWave(npWave);
    }

    function getKnownDuration(file) {
        if (currentTrackData && currentTrackData.file === file && Number.isFinite(player.duration)) return player.duration;
        const wave = songWaves.get(file);
        return wave ? wave.duration : NaN;
    }

    function formatKnownDuration(file) {
        const duration = getKnownDuration(file);
        return Number.isFinite(duration) ? formatTime(duration) : "";
    }

    // A song that isn't in waves.json yet: at least its length shows from now on
    function rememberSongDuration(track, duration) {
        if (!track || !Number.isFinite(duration) || songWaves.has(track.file)) return;
        songWaves.set(track.file, { duration, levels: null });
        const total = trackList.querySelector(`.track[data-file="${CSS.escape(track.file)}"] .song-time-total`);
        if (total) total.textContent = formatTime(duration);
    }

    // Once a song without a wave has been measured all the way through (the spectrum's left and
    // right levels), its real wave is worked out and remembered
    function learnSongWave(spectrum) {
        const known = songWaves.get(spectrum.file);
        if ((known && known.levels) || spectrum.measuredCount < spectrum.frameCount * 0.97) return;

        const loudness = new Float32Array(WAVE_POINTS);
        for (let point = 0; point < WAVE_POINTS; point += 1) {
            const from = Math.floor((point * spectrum.frameCount) / WAVE_POINTS);
            const to = Math.max(from + 1, Math.floor(((point + 1) * spectrum.frameCount) / WAVE_POINTS));
            let power = 0;
            for (let frame = from; frame < to; frame += 1) {
                for (let side = 0; side < 2; side += 1) {
                    const level = (spectrum.levels[(frame * SPECTRUM_VALUES) + SPECTRUM_BANDS + side] / 2) - 100;
                    power += Math.pow(10, level / 10) / 2;
                }
            }
            loudness[point] = 10 * Math.log10((power / (to - from)) + 1e-12);
        }
        const top = Math.max(...loudness);
        let shape = "";
        loudness.forEach((level) => {
            shape += WAVE_ALPHABET[Math.round(Math.max(0, Math.min(1, (level - (top - 36)) / 36)) * 63)];
        });

        const entry = { duration: Math.round(spectrum.duration * 100) / 100, shape };
        addSongWave(spectrum.file, entry);
        learnedWaves[spectrum.file] = entry;
        try {
            localStorage.setItem(WAVE_STORAGE_KEY, JSON.stringify(learnedWaves));
        } catch (error) {
            // Storage full or blocked: it's just not remembered
        }
        const wave = trackList.querySelector(`.track[data-file="${CSS.escape(spectrum.file)}"] .song-wave`);
        if (wave) drawSongWave(wave);
        if (npWave) drawSongWave(npWave);
    }

    function watchSongWave(wave) {
        if (waveObserver) {
            waveObserver.observe(wave);
        } else {
            requestAnimationFrame(() => drawSongWave(wave));
        }
    }

    // One round-ended bar per few pixels, each as tall as the loudest part of the song it covers
    function buildWavePath(levels, width, height) {
        const pitch = WAVE_BAR + WAVE_GAP;
        const count = Math.max(4, Math.floor((width + WAVE_GAP) / pitch));
        const first = ((width - ((count * pitch) - WAVE_GAP)) / 2) + (WAVE_BAR / 2);
        const middle = height / 2;
        const reach = Math.max(0, (height - WAVE_BAR) / 2);
        let path = "";
        for (let bar = 0; bar < count; bar += 1) {
            let level = WAVE_PLAIN_LEVEL;
            if (levels) {
                const from = Math.floor((bar * levels.length) / count);
                const to = Math.max(from + 1, Math.ceil(((bar + 1) * levels.length) / count));
                level = 0;
                for (let index = from; index < to; index += 1) {
                    level = Math.max(level, levels[index]);
                }
            }
            const half = Math.max(0.01, Math.pow(level, WAVE_CURVE) * reach);
            const x = (first + (bar * pitch)).toFixed(2);
            path += `M${x} ${(middle - half).toFixed(2)}V${(middle + half).toFixed(2)}`;
        }
        return path;
    }

    function drawSongWave(wave) {
        const width = wave.clientWidth;
        const height = wave.clientHeight;
        const file = wave === npWave
            ? (currentTrackData ? currentTrackData.file : "")
            : wave.closest(".track")?.dataset.file;
        const levels = file && songWaves.has(file) ? songWaves.get(file).levels : null;
        const key = `${file}|${width}|${height}|${levels ? "shape" : "plain"}`;
        waveWidths.set(wave, width);
        if (drawnWaves.get(wave) === key) return;
        drawnWaves.set(wave, key);
        shownWaveProgress.delete(wave);

        const path = width > 0 && height > 0 && file ? buildWavePath(levels, width, height) : "";
        wave.querySelectorAll("svg").forEach((svg) => {
            svg.setAttribute("viewBox", `0 0 ${Math.max(1, width)} ${Math.max(1, height)}`);
            svg.firstElementChild.setAttribute("d", path);
        });
        wave.classList.toggle("has-shape", Boolean(levels));
        // A new size moves the playhead too (even while the song's paused)
        if (isPlayingWave(wave)) updateNowPlayingProgress();
    }

    function setWaveProgress(wave, fraction, position, duration) {
        if (!wave) return;
        const shown = shownWaveProgress.get(wave) || {};
        const progress = fraction.toFixed(4);
        if (shown.progress !== progress) {
            wave.style.setProperty("--wave-progress", progress);
            // The playhead moves by transform, so following the song never re-lays out the page
            const thumb = wave.querySelector(".song-wave-thumb");
            if (thumb) thumb.style.transform = `translateX(${(fraction * (waveWidths.get(wave) || 0)).toFixed(1)}px)`;
            shown.progress = progress;
        }
        const seconds = Math.round(position);
        const total = Math.round(duration);
        if (shown.seconds !== seconds || shown.total !== total) {
            wave.setAttribute("aria-valuenow", String(seconds));
            wave.setAttribute("aria-valuemax", String(total));
            wave.setAttribute("aria-valuetext", duration ? `${formatTime(position)} of ${formatTime(duration)}` : "Loading");
            shown.seconds = seconds;
            shown.total = total;
        }
        shownWaveProgress.set(wave, shown);
    }

    // The playing song's wave is a slider you can drag (or use the arrow keys on); the others are
    // just pictures you can tap to start the song from there
    function setRowWavePlaying(trackElement, isPlaying) {
        const wave = trackElement.querySelector(".song-wave");
        if (!wave) return;
        if (isPlaying) {
            trackElement.querySelector(".song-progress")?.classList.remove("is-unavailable");
            wave.setAttribute("role", "slider");
            wave.setAttribute("tabindex", "0");
            wave.setAttribute("aria-label", "Song position");
            wave.setAttribute("aria-valuemin", "0");
            wave.removeAttribute("aria-hidden");
            wave.removeAttribute("title");
        } else {
            ["role", "tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"].forEach((name) => wave.removeAttribute(name));
            wave.setAttribute("aria-hidden", "true");
            wave.setAttribute("title", "Play from here");
            wave.classList.remove("is-scrubbing");
            wave.style.removeProperty("--wave-progress");
            wave.querySelector(".song-wave-thumb")?.style.removeProperty("transform");
            shownWaveProgress.delete(wave);
            playheads.delete(wave);
        }
    }

    function isPlayingWave(wave) {
        return Boolean(currentTrackData) && (wave === npWave || (playingRowParts && wave === playingRowParts.wave));
    }

    function getWaveFraction(wave, clientX) {
        const rect = wave.getBoundingClientRect();
        return rect.width ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0;
    }

    function seekPlayingSong(time) {
        if (!currentTrackData || !Number.isFinite(player.duration)) return;
        finishAutoMixNow();
        player.currentTime = Math.min(Math.max(0, time), Math.max(0, player.duration - 0.25));
        updateNowPlayingProgress();
    }

    // Dragging along the playing song's wave. A mouse scrubs straight away; a finger only once it
    // moves sideways (up and down still scrolls the list), and a tap jumps to that spot.
    function setUpSongWaves() {
        document.addEventListener("pointerdown", (event) => {
            const wave = event.target.closest(".song-wave");
            if (!wave || !isPlayingWave(wave) || !Number.isFinite(player.duration)) return;
            if (event.pointerType === "mouse" && event.button !== 0) return;
            waveScrub = {
                wave,
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                fraction: getWaveFraction(wave, event.clientX),
                active: event.pointerType === "mouse"
            };
            if (waveScrub.active) {
                event.preventDefault();
                wave.setPointerCapture?.(event.pointerId);
                wave.classList.add("is-scrubbing");
                updateNowPlayingProgress();
            }
        });

        document.addEventListener("pointermove", (event) => {
            if (!waveScrub || event.pointerId !== waveScrub.pointerId) return;
            const { wave } = waveScrub;
            if (!waveScrub.active) {
                const sideways = Math.abs(event.clientX - waveScrub.startX);
                if (sideways < 6 || sideways < Math.abs(event.clientY - waveScrub.startY)) return;
                waveScrub.active = true;
                wave.setPointerCapture?.(event.pointerId);
                wave.classList.add("is-scrubbing");
            }
            waveScrub.fraction = getWaveFraction(wave, event.clientX);
            updateNowPlayingProgress();
        });

        const finishScrub = (event, commit) => {
            if (!waveScrub || event.pointerId !== waveScrub.pointerId) return;
            const { wave, fraction, active } = waveScrub;
            const moved = Math.hypot(event.clientX - waveScrub.startX, event.clientY - waveScrub.startY);
            waveScrub = null;
            wave.classList.remove("is-scrubbing");
            if (commit && (active || moved < 10) && isPlayingWave(wave)) {
                seekPlayingSong(fraction * player.duration);
            } else {
                updateNowPlayingProgress();
            }
        };
        document.addEventListener("pointerup", (event) => finishScrub(event, true));
        document.addEventListener("pointercancel", (event) => finishScrub(event, false));

        // Another song's wave: start that song from where it was tapped
        trackList.addEventListener("click", (event) => {
            const wave = event.target.closest(".song-wave");
            if (!wave || isPlayingWave(wave)) return;
            const track = getTrackDataForElement(wave.closest(".track"));
            if (!track) return;
            const duration = getKnownDuration(track.file);
            const fraction = getWaveFraction(wave, event.clientX);
            startTrack(track, { startAt: Number.isFinite(duration) ? fraction * duration : 0 });
        });

        document.addEventListener("keydown", (event) => {
            const wave = event.target.closest?.(".song-wave");
            if (!wave || !isPlayingWave(wave) || !Number.isFinite(player.duration)) return;
            const duration = player.duration;
            const steps = {
                ArrowRight: 5,
                ArrowUp: 5,
                ArrowLeft: -5,
                ArrowDown: -5,
                PageUp: duration / 10,
                PageDown: -duration / 10
            };
            if (event.key in steps) {
                seekPlayingSong(player.currentTime + steps[event.key]);
            } else if (event.key === "Home") {
                seekPlayingSong(0);
            } else if (event.key === "End") {
                seekPlayingSong(duration);
            } else {
                return;
            }
            event.preventDefault();
        });

        if (npWave) watchSongWave(npWave);
        loadSongWaves();
    }

    function showTrackListSkeleton(count = 8) {
        const skeletonItems = Array.from({ length: count }, () => `
            <div class="track track-skeleton" aria-hidden="true">
                <div class="skeleton-cover skeleton-shimmer"></div>
                <div class="track-info">
                    <div class="skeleton-line skeleton-title skeleton-shimmer"></div>
                    <div class="skeleton-tags">
                        <span class="skeleton-pill skeleton-shimmer"></span>
                        <span class="skeleton-pill skeleton-shimmer"></span>
                        <span class="skeleton-pill skeleton-shimmer"></span>
                    </div>
                    <div class="skeleton-controls">
                        <span class="skeleton-button skeleton-shimmer"></span>
                        <span class="skeleton-time skeleton-shimmer"></span>
                    </div>
                </div>
            </div>
        `).join("");

        trackList.classList.remove("tracks-ready");
        trackList.classList.add("skeleton-loading");
        trackList.innerHTML = skeletonItems;
    }

    function syncAllTrackCoverHeights() {
        const trackRows = trackList.querySelectorAll(".track");
        trackRows.forEach((trackRow) => {
            const coverImage = trackRow.querySelector("img");
            if (!coverImage) return;

            const configuredSize = getComputedStyle(trackRow).getPropertyValue("--cover-size").trim();
            if (!configuredSize) return;

            coverImage.style.width = configuredSize;
            coverImage.style.height = configuredSize;
        });
    }

    function syncTitleMarquees() {
        if (deferWhileFrontHidden()) return;
        trackList.querySelectorAll(".title").forEach((titleElement) => {
            const titleContent = titleElement.querySelector(".title-scroll-content");
            if (!titleContent) return;

            titleElement.classList.remove("title-overflowing");
            titleElement.style.removeProperty("--title-scroll-distance");
            titleElement.style.removeProperty("--title-scroll-duration");

            const naturalOverflowDistance = Math.ceil(titleContent.scrollWidth - titleElement.clientWidth);
            if (naturalOverflowDistance <= 2) return;

            titleElement.classList.add("title-overflowing");
            const overflowDistance = naturalOverflowDistance + 2;
            const durationSeconds = Math.max(12, Math.min(24, 9 + overflowDistance / 10));
            titleElement.style.setProperty("--title-scroll-distance", `${overflowDistance}px`);
            titleElement.style.setProperty("--title-scroll-duration", `${durationSeconds}s`);
        });
    }

    function syncTagMarquees() {
        if (deferWhileFrontHidden()) return;
        trackList.querySelectorAll(".tags").forEach((tagsElement) => {
            const tagsContent = tagsElement.querySelector(".tags-scroll-content");
            if (!tagsContent) return;

            tagsElement.classList.remove("tags-overflowing");
            tagsElement.style.removeProperty("--tag-scroll-distance");
            tagsElement.style.removeProperty("--tag-scroll-duration");
            tagsElement.scrollLeft = 0;

            const naturalOverflowDistance = Math.ceil(tagsContent.scrollWidth - tagsElement.clientWidth);
            if (naturalOverflowDistance <= 2) return;

            tagsElement.classList.add("tags-overflowing");
            const overflowDistance = naturalOverflowDistance + 2;
            const durationSeconds = Math.max(12, Math.min(24, 9 + overflowDistance / 10));
            tagsElement.style.setProperty("--tag-scroll-distance", `${overflowDistance}px`);
            tagsElement.style.setProperty("--tag-scroll-duration", `${durationSeconds}s`);
        });
    }

    function syncMarquees() {
        syncTitleMarquees();
        syncTagMarquees();
    }

    function enableHorizontalDragScroll(scrollElement) {
        if (!scrollElement || scrollElement.dataset.dragScrollEnabled === "true") {
            return;
        }

        let pointerActive = false;
        let startX = 0;
        let startY = 0;
        let startScrollLeft = 0;
        let dragged = false;
        let pointerId = null;

        scrollElement.addEventListener("pointerdown", (event) => {
            if (scrollElement.classList.contains("tags-overflowing")) {
                return;
            }
            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }
            pointerActive = true;
            dragged = false;
            pointerId = event.pointerId;
            startX = event.clientX;
            startY = event.clientY;
            startScrollLeft = scrollElement.scrollLeft;
            scrollElement.classList.add("dragging");
        });

        scrollElement.addEventListener("pointermove", (event) => {
            if (!pointerActive || (pointerId !== null && event.pointerId !== pointerId)) return;
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;

            if (!dragged && Math.abs(deltaY) > 6 && Math.abs(deltaY) > Math.abs(deltaX)) {
                pointerActive = false;
                pointerId = null;
                scrollElement.classList.remove("dragging");
                return;
            }

            if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY) + 2) {
                dragged = true;
            }

            if (dragged) {
                event.preventDefault();
                scrollElement.scrollLeft = startScrollLeft - deltaX;
            }
        });

        const endDrag = () => {
            pointerActive = false;
            pointerId = null;
            scrollElement.classList.remove("dragging");
        };

        scrollElement.addEventListener("pointerup", endDrag);
        scrollElement.addEventListener("pointercancel", endDrag);
        scrollElement.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse" && pointerActive) {
                endDrag();
            }
        });

        scrollElement.addEventListener("click", (event) => {
            if (!dragged) return;
            event.preventDefault();
            event.stopPropagation();
            dragged = false;
        }, true);

        scrollElement.dataset.dragScrollEnabled = "true";
    }

    function initializeHorizontalDragScroll() {
        trackList.querySelectorAll(".horizontal-scroll").forEach(enableHorizontalDragScroll);
    }

    // Populate track list dynamically
    // After the list is rebuilt (filter / sort), point the UI back at the song that's still playing
    function restoreCurrentTrackUi() {
        const trackElement = getCurrentTrackElement();
        showModeButtonsOnTrack(trackElement, false);
        if (!trackElement) return;

        const label = player.paused ? "Play" : "Pause";
        const playButton = trackElement.querySelector(".play-button");
        playButton.dataset.label = label;
        playButton.innerHTML = splitIntoLetters(label);
    }

    function populateTrackList(tracks) {
        trackList.classList.remove("skeleton-loading", "tracks-ready");
        // The old rows' waves go with them
        if (waveObserver) {
            waveObserver.disconnect();
            if (npWave) waveObserver.observe(npWave);
        }
        trackList.innerHTML = '';

        tracks.forEach((song, index) => {
            // A two-sided song shows the side that's playing (or the one it was last flipped to)
            const track = getListedSide(song);
            const otherSide = getOtherSide(song);
            const previewCover = getTrackCoverPreview(track);
            const fullCover = getTrackCoverFull(track);
            const isTopPriority = index < 4;
            const tagMarkup = track.game
                ? ""
                : track.tags.map(tag => `<span class="tag-bubble clickable-tag">${tag}</span>`).join('');
            const gameLinkMarkup = track.game
                ? `<a class="game-link" href="${track.game.url}" target="_blank" rel="noopener noreferrer"><span class="game-link-icon ${track.game.iconClass || ""}" aria-hidden="true">${track.game.icon}</span><span>Featured in ${track.game.name}</span><svg class="game-link-external" viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 2.5h4v4M13.25 2.75 7.5 8.5M7 3.5H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9"/></svg></a>`
                : "";
            const trackElement = document.createElement("div");
            trackElement.classList.add("track", "track-enter");
            trackElement.dataset.file = track.file;
            if (otherSide) trackElement.dataset.sides = `${song.file} ${otherSide.file}`;
            trackElement.style.setProperty("--track-delay", `${Math.min(index, 14) * 24}ms`);
            trackElement.innerHTML = `
            <img src="${COVER_PLACEHOLDER}" data-preview-src="${previewCover}" data-full-src="${fullCover}" alt="${track.title} Cover" loading="${isTopPriority ? "eager" : "lazy"}" fetchpriority="${isTopPriority ? "high" : "low"}" decoding="async" width="80" height="80">
            ${otherSide ? `<button class="side-switch" type="button">${SIDE_ICON}<span class="side-switch-label"></span></button>` : ""}
            <div class="track-info">
            <p class="title"><span class="title-scroll-content"><span class="title-text">${track.title}</span><span class="release-date clickable-tag">${track.date}</span></span></p>
            <p class="tags horizontal-scroll"><span class="tags-scroll-content">${tagMarkup}${gameLinkMarkup}</span></p>
            <div class="playback-controls">
            <button class="mode-button skip-button skip-button--prev" type="button" aria-label="Previous song (or back to the start)" title="Previous song">${PREV_ICON}</button>
            <button class="play-button">Play</button>
            <button class="mode-button skip-button skip-button--next" type="button" aria-label="Next song" title="Next song">${NEXT_ICON}</button>
            <button class="mode-button mode-button--continuous" type="button" aria-pressed="false" aria-label="Keep playing songs" title="Keep playing songs">${LOOP_ICON}</button>
            <button class="mode-button mode-button--shuffle" type="button" aria-pressed="false" aria-label="Shuffle songs" title="Shuffle songs">${SHUFFLE_ICON}</button>
            <div class="song-progress">
            <div class="song-wave" aria-hidden="true" title="Play from here">
            <svg class="song-wave-bars" aria-hidden="true"><path></path></svg>
            <svg class="song-wave-bars song-wave-played" aria-hidden="true"><path></path></svg>
            <span class="song-wave-thumb" aria-hidden="true"></span>
            </div>
            <span class="song-time"><span class="song-time-elapsed">0:00</span><span class="song-time-total">${formatKnownDuration(track.file)}</span></span>
            </div>
            </div>
            </div>
            <button class="track-clear" type="button" aria-label="Stop and clear this song" title="Stop and clear">${CLEAR_ICON}</button>
            `;
            trackList.appendChild(trackElement);

            const playButton = trackElement.querySelector(".play-button");
            const coverImage = trackElement.querySelector("img");
            trackElement.querySelector(".mode-button--continuous").addEventListener("click", cycleLoopMode);
            trackElement.querySelector(".mode-button--shuffle").addEventListener("click", toggleShuffle);
            trackElement.querySelector(".skip-button--prev").addEventListener("click", playPreviousTrack);
            trackElement.querySelector(".skip-button--next").addEventListener("click", playNextTrack);
            trackElement.querySelector(".track-clear").addEventListener("click", clearCurrentTrack);
            watchSongWave(trackElement.querySelector(".song-wave"));
            coverImage.classList.toggle("cover-grayscale", Boolean(track.grayscaleCover));
            if (otherSide) {
                updateSideSwitch(trackElement, track);
                trackElement.querySelector(".side-switch").addEventListener("click", (event) => {
                    event.stopPropagation();
                    flipSongSide(trackElement);
                });
            }

            
            // Initialize button with letter spans
            playButton.innerHTML = splitIntoLetters("Play");
            playButton.dataset.label = "Play";
            
            // Add click handler for cover image modal
            coverImage.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent any other click handlers
                const shown = getTrackDataForElement(trackElement) || track;
                if (window.openCoverModal) {
                    window.openCoverModal(fullCover, shown.title, coverImage.currentSrc || coverImage.src, Boolean(shown.grayscaleCover));
                }
            });
            
            setUpCoverLoad(coverImage, previewCover, isTopPriority);

            playButton.addEventListener("click", () => handleTrackPlayButton(getTrackDataForElement(trackElement) || track));
        });

        restoreCurrentTrackUi();
        updatePlaybackModeButtons();
        initializeHorizontalDragScroll();
        syncMarquees();

        // Add event listeners to each tag bubble for filtering
        document.querySelectorAll(".clickable-tag").forEach(tagElement => {
            tagElement.addEventListener("click", () => {
                tagFilter.value = tagElement.textContent;
                applyTagFilter(tagElement.textContent);
            });
        });

        syncAllTrackCoverHeights();
        updatePlayingTrackStickyState();
        requestAnimationFrame(() => {
            trackList.classList.add("tracks-ready");
        });
    }

    // Populate tag filter options
    function populateTagFilter(tracks) {
        const tags = new Set();
        tracks.forEach(track => {
            track.tags.forEach(tag => tags.add(tag));
            tags.add(track.date);
        });

        tagFilter.innerHTML = '<option value="all">All</option>';

        tags.forEach(tag => {
            const option = document.createElement("option");
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    }

    // Each song once: a side B is in its side A's row (and found by either side's tags)
    function getFilteredTracks(selectedTag) {
        const songs = tracks.filter((track) => !track.sideA);
        const matches = (track) => Boolean(track) && (track.tags.includes(selectedTag) || track.date === selectedTag);
        return selectedTag === "all"
            ? songs
            : songs.filter((track) => matches(track) || matches(getOtherSide(track)));
    }

    // Apply filter and sort selection together
    function applyCurrentFiltersAndSort() {
        const selectedTag = tagFilter ? tagFilter.value : "all";
        const selectedSort = sortFilter ? sortFilter.value : "newest";
        const filteredTracks = getFilteredTracks(selectedTag);
        const sortedFilteredTracks = sortTracks(filteredTracks, selectedSort);
        preloadTopTrackCovers(sortedFilteredTracks);
        warmUpcomingTrackCovers(sortedFilteredTracks);
        populateTrackList(sortedFilteredTracks);
    }

    // Apply filter by selected tag
    function applyTagFilter(selectedTag) {
        if (tagFilter) {
            tagFilter.value = selectedTag;
        }
        applyCurrentFiltersAndSort();
    }

    // Filter by selected tag from dropdown
    if (tagFilter) {
        tagFilter.addEventListener("change", applyCurrentFiltersAndSort);
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", applyCurrentFiltersAndSort);
    }

    if (randomTrackButton) {
        randomTrackButton.addEventListener("click", (event) => {
            event.preventDefault();
            randomTrackButton.blur();
            const wasPlaying = isPlayerActive();
            const excludedTrack = stopCurrentPlayback();
            playRandomVisibleTrack(excludedTrack, { flourish: wasPlaying });
        });
    }

    // ───── DJ scratching: grab a record and drag it back and forth ─────
    // While held, the song stops (hand on the vinyl) and a short slice of it is
    // played at the speed and direction the record is moved, like a turntable.
    const SCRATCH_SECONDS_PER_TURN = 1.8; // 33 1/3 rpm
    const SCRATCH_START_DISTANCE = 5;
    const SCRATCH_SNIPPET_SECONDS = 3;
    const MP3_BITRATES_V1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
    const MP3_BITRATES_V2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
    const MP3_SAMPLE_RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };
    const audioFileInfo = new Map();
    let scratchAudio = null;
    let scratchSnippet = null;
    let scratchSnippetRequest = null;
    let scratchSleepTimer = null;
    let pendingScratch = null;
    let suppressRecordClick = false;

    function getScratchAudio() {
        if (scratchAudio) return scratchAudio;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;

        try {
            // iOS: let scratch sounds play like music (not muted by the silent switch)
            if (navigator.audioSession) navigator.audioSession.type = "playback";
        } catch (error) {
            // Audio Session API not available
        }

        const context = new AudioContextClass();
        scratchAudio = { context, fallback: buildScratchFallbackSample(context) };
        return scratchAudio;
    }

    // Called from taps on music controls, so the audio context is started by a user gesture
    function unlockScratchAudio() {
        const audio = getScratchAudio();
        if (!audio) return;
        const { context } = audio;
        if (context.state !== "running") {
            context.resume().catch(() => {});
        }
        const silence = context.createBufferSource();
        silence.buffer = context.createBuffer(1, 1, context.sampleRate);
        silence.connect(context.destination);
        silence.start(0);
        scheduleScratchAudioSleep();
    }

    // Idle audio contexts keep the audio hardware busy, so suspend between scratches
    function scheduleScratchAudioSleep() {
        clearTimeout(scratchSleepTimer);
        scratchSleepTimer = setTimeout(() => {
            if (scratchAudio && !scratch && scratchAudio.context.state === "running") {
                scratchAudio.context.suspend().catch(() => {});
            }
        }, 4000);
    }

    // A classic "ahh" scratch sample, used when the song slice can't be loaded
    function buildScratchFallbackSample(context) {
        const sampleRate = context.sampleRate;
        const length = Math.floor(sampleRate * 2.4);
        const voice = new Float32Array(length);
        let phase = 0;
        for (let index = 0; index < length; index += 1) {
            const time = index / sampleRate;
            const pitch = 150 + (6 * Math.sin(2 * Math.PI * 5 * time)) - (20 * time);
            phase = (phase + (pitch / sampleRate)) % 1;
            voice[index] = ((phase * 2) - 1) * 0.6 + ((Math.random() * 2) - 1) * 0.06;
        }

        const data = new Float32Array(length);
        [[800, 10, 1], [1150, 12, 0.5], [2900, 20, 0.22]].forEach(([frequency, quality, gain]) => {
            const omega = (2 * Math.PI * frequency) / sampleRate;
            const alpha = Math.sin(omega) / (2 * quality);
            const a0 = 1 + alpha;
            const b0 = alpha / a0;
            const b2 = -alpha / a0;
            const a1 = (-2 * Math.cos(omega)) / a0;
            const a2 = (1 - alpha) / a0;
            let x1 = 0;
            let x2 = 0;
            let y1 = 0;
            let y2 = 0;
            for (let index = 0; index < length; index += 1) {
                const x0 = voice[index];
                const y0 = (b0 * x0) + (b2 * x2) - (a1 * y1) - (a2 * y2);
                x2 = x1;
                x1 = x0;
                y2 = y1;
                y1 = y0;
                data[index] += y0 * gain;
            }
        });

        let peak = 0;
        data.forEach((value) => {
            peak = Math.max(peak, Math.abs(value));
        });
        const fade = Math.floor(sampleRate * 0.03);
        for (let index = 0; index < length; index += 1) {
            const edge = Math.min(1, index / fade, (length - 1 - index) / fade);
            data[index] = (data[index] / (peak || 1)) * 0.8 * edge;
        }
        return { data, sampleRate, isFallback: true };
    }

    // An MPEG audio layer III frame header at `index`, or null if there isn't one there
    function readMp3FrameHeader(bytes, index) {
        if (index + 4 > bytes.length || bytes[index] !== 0xFF || (bytes[index + 1] & 0xE0) !== 0xE0) return null;
        const version = (bytes[index + 1] >> 3) & 3;
        const layer = (bytes[index + 1] >> 1) & 3;
        const bitrateIndex = bytes[index + 2] >> 4;
        const sampleRateIndex = (bytes[index + 2] >> 2) & 3;
        if (version === 1 || layer !== 1 || bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) return null;

        const lsf = version !== 3; // MPEG-2 / 2.5: one granule per frame
        const bitrate = (lsf ? MP3_BITRATES_V2 : MP3_BITRATES_V1)[bitrateIndex] * 1000;
        const sampleRate = MP3_SAMPLE_RATES[version][sampleRateIndex];
        const padding = (bytes[index + 2] >> 1) & 1;
        return {
            lsf,
            sampleRate,
            samplesPerFrame: lsf ? 576 : 1152,
            length: Math.floor(((lsf ? 72 : 144) * bitrate) / sampleRate) + padding
        };
    }

    // Find the first real MP3 frame so a slice from the middle of the file decodes cleanly
    function findMp3FrameStart(bytes) {
        for (let index = 0; index < bytes.length - 4; index += 1) {
            const header = readMp3FrameHeader(bytes, index);
            if (!header) continue;
            const next = index + header.length;
            if (next + 1 < bytes.length && bytes[next] === 0xFF && (bytes[next + 1] & 0xE0) === 0xE0) {
                return index;
            }
        }
        return 0;
    }

    function decodeAudio(context, arrayBuffer) {
        return new Promise((resolve, reject) => {
            const result = context.decodeAudioData(arrayBuffer, resolve, reject);
            if (result && typeof result.then === "function") {
                result.then(resolve, reject);
            }
        });
    }

    // Byte size + where the audio starts (after the ID3 tag), so we can ask for slices of a song
    // (fetched once, however many things ask for it at the same time)
    function fetchAudioFileInfo(file) {
        if (!audioFileInfo.has(file)) {
            const request = loadAudioFileInfo(file);
            audioFileInfo.set(file, request);
            request.catch(() => audioFileInfo.delete(file));
        }
        return audioFileInfo.get(file);
    }

    async function loadAudioFileInfo(file) {
        const response = await fetch(file, { headers: { Range: "bytes=0-9" } });
        const contentRange = response.headers.get("Content-Range") || "";
        const total = Number(contentRange.split("/")[1]);
        if (response.status !== 206 || !Number.isFinite(total)) {
            if (response.body) response.body.cancel();
            throw new Error("Range requests not supported");
        }

        const header = new Uint8Array(await response.arrayBuffer());
        let audioStart = 0;
        if (header[0] === 0x49 && header[1] === 0x44 && header[2] === 0x33) {
            // Skip the ID3 tag at the front of the file
            audioStart = 10 + (((header[6] & 0x7F) << 21) | ((header[7] & 0x7F) << 14) | ((header[8] & 0x7F) << 7) | (header[9] & 0x7F));
        }
        return { total, audioStart };
    }

    // Fetch and decode ~6 seconds of the song around `centerTime`
    async function loadScratchSnippet(track, centerTime) {
        const audio = getScratchAudio();
        const duration = player.duration;
        if (!audio || !Number.isFinite(duration) || duration <= 0) throw new Error("Nothing to scratch");

        const info = await fetchAudioFileInfo(track.file);
        const bytesPerSecond = (info.total - info.audioStart) / duration;
        const startTime = Math.max(0, centerTime - SCRATCH_SNIPPET_SECONDS);
        const endTime = Math.min(duration, centerTime + SCRATCH_SNIPPET_SECONDS);
        const startByte = info.audioStart + Math.floor(startTime * bytesPerSecond);
        const endByte = Math.min(info.total - 1, info.audioStart + Math.ceil(endTime * bytesPerSecond));

        const response = await fetch(track.file, { headers: { Range: `bytes=${startByte}-${endByte}` } });
        if (response.status !== 206) {
            if (response.body) response.body.cancel();
            throw new Error("Range requests not supported");
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const frameStart = findMp3FrameStart(bytes);
        const decoded = await decodeAudio(audio.context, bytes.slice(frameStart).buffer);

        const data = new Float32Array(decoded.length);
        for (let channel = 0; channel < decoded.numberOfChannels; channel += 1) {
            const channelData = decoded.getChannelData(channel);
            for (let index = 0; index < decoded.length; index += 1) {
                data[index] += channelData[index] / decoded.numberOfChannels;
            }
        }

        const sliceStart = startTime + (frameStart / bytesPerSecond);
        return {
            file: track.file,
            data,
            sampleRate: decoded.sampleRate,
            startTime: sliceStart,
            endTime: sliceStart + decoded.duration
        };
    }

    function requestScratchSnippet(track, centerTime) {
        const covers = (snippet) => snippet && snippet.file === track.file
            && centerTime > snippet.startTime + 1.5 && centerTime < snippet.endTime - 1.5;
        if (covers(scratchSnippet)) return Promise.resolve(scratchSnippet);
        if (scratchSnippetRequest && scratchSnippetRequest.file === track.file
            && Math.abs(scratchSnippetRequest.centerTime - centerTime) < 1.5) {
            return scratchSnippetRequest.promise;
        }

        const promise = loadScratchSnippet(track, centerTime).then((snippet) => {
            scratchSnippet = snippet;
            return snippet;
        });
        scratchSnippetRequest = { file: track.file, centerTime, promise };
        promise.catch(() => {}).finally(() => {
            if (scratchSnippetRequest && scratchSnippetRequest.promise === promise) scratchSnippetRequest = null;
        });
        return promise;
    }

    function sampleAt(source, position) {
        const { data } = source;
        let index = position;
        if (source.isFallback) {
            index = ((index % data.length) + data.length) % data.length;
        } else if (index < 0 || index >= data.length - 1) {
            return 0;
        }
        const whole = Math.floor(index);
        const next = whole + 1 < data.length ? whole + 1 : 0;
        const fraction = index - whole;
        return data[whole] + ((data[next] - data[whole]) * fraction);
    }

    function getScratchTargetIndex(state, source) {
        if (source.isFallback) {
            return (source.data.length / 2) + ((state.targetTime - state.holdStartTime) * source.sampleRate);
        }
        return (state.targetTime - source.startTime) * source.sampleRate;
    }

    function startScratchEngine(audio, state) {
        const { context } = audio;
        const processor = context.createScriptProcessor(1024, 1, 1);
        const highpass = context.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 40;
        const lowpass = context.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 6000;
        const output = context.createGain();
        output.gain.value = 1;
        processor.connect(highpass);
        highpass.connect(lowpass);
        lowpass.connect(output);
        output.connect(context.destination);

        const engine = { processor, lowpass, output, playhead: null, source: null, gain: 0 };
        processor.onaudioprocess = (event) => {
            const out = event.outputBuffer.getChannelData(0);
            const source = state.source;
            if (!source) {
                out.fill(0);
                return;
            }

            const target = getScratchTargetIndex(state, source);
            if (engine.source !== source || engine.playhead === null) {
                engine.source = source;
                engine.playhead = target;
            }

            // Glide to where the record is now over this block; speed 1 = normal playback
            const velocity = Math.max(-10, Math.min(10, (target - engine.playhead) / out.length));
            const gainTarget = Math.min(1, Math.abs(velocity) * 1.6);
            for (let index = 0; index < out.length; index += 1) {
                engine.playhead += velocity;
                engine.gain += (gainTarget - engine.gain) * 0.004;
                out[index] = sampleAt(source, engine.playhead) * engine.gain;
            }
            lowpass.frequency.setTargetAtTime(1200 + (9000 * Math.min(1.2, Math.abs(velocity))), context.currentTime, 0.02);
        };
        return engine;
    }

    function stopScratchEngine(engine) {
        if (!engine) return;
        const { context } = scratchAudio;
        engine.output.gain.setTargetAtTime(0, context.currentTime, 0.02);
        setTimeout(() => {
            engine.processor.onaudioprocess = null;
            engine.processor.disconnect();
            engine.output.disconnect();
        }, 150);
    }

    function previewScratchTime(time) {
        const duration = player.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;
        updateNowPlayingProgress(time);
    }

    function setPreservesPitch(value) {
        if ("preservesPitch" in player) player.preservesPitch = value;
        if ("webkitPreservesPitch" in player) player.webkitPreservesPitch = value;
    }

    // Turntable start-up "wow" as the platter gets back up to speed
    function spinUpPlayback() {
        const canBendPitch = "preservesPitch" in player || "webkitPreservesPitch" in player;
        if (canBendPitch) {
            setPreservesPitch(false);
            player.playbackRate = 0.55;
        }
        const playPromise = player.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
                setPlayButtonLabel(getCurrentTrackElement()?.querySelector(".play-button"), "Play");
                updateWhereBackgroundFromPlayback();
            });
        }
        if (!canBendPitch) return;

        const startedAt = performance.now();
        const ramp = () => {
            const progress = Math.min(1, (performance.now() - startedAt) / 300);
            if (scratch) return;
            player.playbackRate = 0.55 + (0.45 * (1 - Math.pow(1 - progress, 2)));
            if (progress < 1) {
                requestAnimationFrame(ramp);
            } else {
                player.playbackRate = 1;
                setPreservesPitch(true);
            }
        };
        requestAnimationFrame(ramp);
    }

    function getRecordCenter(element) {
        const rect = element.getBoundingClientRect();
        return { x: rect.left + (rect.width / 2), y: rect.top + (rect.height / 2) };
    }

    function beginScratch(pending, event) {
        cancelSideSwitch(true);
        const center = getRecordCenter(pending.element);
        const state = {
            element: pending.element,
            pointerId: pending.pointerId,
            centerX: center.x,
            centerY: center.y,
            lastAngle: Math.atan2(event.clientY - center.y, event.clientX - center.x),
            turned: 0,
            startRotation: rotationAngle,
            holdStartTime: currentTrackData && Number.isFinite(player.currentTime) ? player.currentTime : 0,
            targetTime: 0,
            wasPlaying: Boolean(currentTrackData) && !player.paused && !player.ended,
            source: null,
            engine: null
        };
        state.targetTime = state.holdStartTime;
        scratch = state;
        finishAutoMixNow();

        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
            volumeFadeInterval = null;
        }
        if (state.wasPlaying) {
            player.pause();
            player.volume = 1;
        }

        pending.element.setPointerCapture(pending.pointerId);
        pending.element.classList.add("is-scratching");
        if (nowPlaying) {
            nowPlaying.classList.add("has-scratched");
        }
        try {
            localStorage.setItem("museJukeboxScratched", "true");
        } catch (error) {
            // Storage unavailable; the hint may show again next visit
        }

        const audio = getScratchAudio();
        if (!audio) return;
        clearTimeout(scratchSleepTimer);
        if (audio.context.state !== "running") {
            audio.context.resume().catch(() => {});
        }
        state.engine = startScratchEngine(audio, state);

        if (!currentTrackData) {
            state.source = audio.fallback;
            return;
        }
        const track = currentTrackData;
        const snippetRequest = pending.snippetRequest || requestScratchSnippet(track, state.holdStartTime);
        snippetRequest
            .then((snippet) => {
                if (scratch === state && currentTrackData === track) state.source = snippet;
            })
            .catch(() => {
                if (scratch === state) state.source = audio.fallback;
            });
    }

    function updateScratch(event) {
        const state = scratch;
        const offsetX = event.clientX - state.centerX;
        const offsetY = event.clientY - state.centerY;
        // Too close to the spindle to read a direction reliably
        if (Math.hypot(offsetX, offsetY) < 12) return;

        const angle = Math.atan2(offsetY, offsetX);
        let delta = angle - state.lastAngle;
        if (delta > Math.PI) delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;
        state.lastAngle = angle;
        state.turned += (delta * 180) / Math.PI;

        rotationAngle = state.startRotation + state.turned;
        updateRecordTransform();

        let targetTime = state.holdStartTime + ((state.turned / 360) * SCRATCH_SECONDS_PER_TURN);
        if (currentTrackData && Number.isFinite(player.duration)) {
            targetTime = Math.max(0, Math.min(player.duration, targetTime));
            previewScratchTime(targetTime);
        }
        state.targetTime = targetTime;
    }

    function endScratch() {
        const state = scratch;
        scratch = null;
        state.element.classList.remove("is-scratching");
        stopScratchEngine(state.engine);
        scheduleScratchAudioSleep();

        if (currentTrackData && Number.isFinite(player.duration)) {
            player.currentTime = Math.max(0, Math.min(player.duration - 0.05, state.targetTime));
            updateNowPlayingProgress();
            if (state.wasPlaying) {
                spinUpPlayback();
            }
        }
        updateWhereBackgroundFromPlayback();
    }

    function setUpRecordScratching() {
        [record, npRecord].forEach((element) => {
            if (!element) return;
            element.querySelectorAll("img").forEach((image) => {
                image.draggable = false;
            });
            if (element.tagName === "IMG") element.draggable = false;

            element.addEventListener("pointerdown", (event) => {
                if (scratch || (event.pointerType === "mouse" && event.button !== 0)) return;
                const pending = {
                    element,
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    snippetRequest: null,
                    prefetchTimer: null
                };
                // Pressed and held (not just a tap): start fetching the song slice so it's ready for the drag
                pending.prefetchTimer = setTimeout(() => {
                    if (pendingScratch === pending && currentTrackData && scratchAudio) {
                        pending.snippetRequest = requestScratchSnippet(currentTrackData, player.currentTime);
                        pending.snippetRequest.catch(() => {});
                    }
                }, 120);
                pendingScratch = pending;
                if (scratchAudio && scratchAudio.context.state !== "running") {
                    scratchAudio.context.resume().catch(() => {});
                }
            });

            element.addEventListener("pointermove", (event) => {
                if (scratch && event.pointerId === scratch.pointerId) {
                    event.preventDefault();
                    updateScratch(event);
                    return;
                }
                if (!pendingScratch || pendingScratch.element !== element || event.pointerId !== pendingScratch.pointerId) return;
                const distance = Math.hypot(event.clientX - pendingScratch.startX, event.clientY - pendingScratch.startY);
                if (distance >= SCRATCH_START_DISTANCE) {
                    clearTimeout(pendingScratch.prefetchTimer);
                    beginScratch(pendingScratch, event);
                    pendingScratch = null;
                    updateScratch(event);
                }
            });

            const finish = (event) => {
                if (pendingScratch && event.pointerId === pendingScratch.pointerId) {
                    clearTimeout(pendingScratch.prefetchTimer);
                    pendingScratch = null;
                }
                if (scratch && event.pointerId === scratch.pointerId) {
                    suppressRecordClick = true;
                    endScratch();
                    // Clear the flag if no click follows (e.g. the pointer was cancelled)
                    setTimeout(() => {
                        suppressRecordClick = false;
                    }, 400);
                }
            };
            element.addEventListener("pointerup", finish);
            element.addEventListener("pointercancel", finish);

            // A drag shouldn't also count as a tap (play / pause)
            element.addEventListener("click", (event) => {
                if (!suppressRecordClick) return;
                suppressRecordClick = false;
                event.preventDefault();
                event.stopImmediatePropagation();
            }, true);
        });

        // Unlock scratch audio (and the spare deck) on taps that show the visitor wants music
        document.addEventListener("click", (event) => {
            if (event.target.closest(".play-button, .np-button, .rail-button, .record, .np-record, .record-seek-button, #random-track-button, .side-switch")) {
                unlockScratchAudio();
                primeDecks();
            } else if (event.target.closest(".mode-button")) {
                primeDecks();
            }
        }, true);

        document.addEventListener("visibilitychange", () => {
            if (document.hidden && scratchAudio && !scratch && scratchAudio.context.state === "running") {
                scratchAudio.context.suspend().catch(() => {});
            }
        });

        try {
            if (localStorage.getItem("museJukeboxScratched") === "true" && nowPlaying) {
                nowPlaying.classList.add("has-scratched");
            }
        } catch (error) {
            // Storage unavailable; show the hint
        }
    }

    // ───── Beat visuals: speakers, penguins, glow and notes move with the music ─────
    // Only with Rhythm on (below): then the penguins dance to the song's beats, the speakers thump
    // with its bass, the glow pulses and notes float out. With it off the jukebox stays calm.
    const NOTE_COLORS = ["#ffd1f4", "#c7f9ff", "#fff3b0", "#d9dcff", "#ffd8b0"];
    const NOTE_SHAPES = [
        `<svg viewBox="0 0 24 24"><ellipse cx="9.5" cy="18" rx="4" ry="3" transform="rotate(-20 9.5 18)"/><path d="M13.2 18V3.5c1.2 3.2 6 3.8 6 9.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
        `<svg viewBox="0 0 24 24"><ellipse cx="6.5" cy="18.5" rx="3.4" ry="2.6" transform="rotate(-20 6.5 18.5)"/><ellipse cx="16.5" cy="16.5" rx="3.4" ry="2.6" transform="rotate(-20 16.5 16.5)"/><path d="M9.4 18.5V6.2l10-2.6v12.9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.4 6.2l10-2.6v3.2l-10 2.6z"/></svg>`
    ];
    let beatFrame = null;
    let beatLevel = 0;
    let lastBeatIndex = null;
    let eqShape = [];
    let eqBeatIndex = null;
    // How hard the beat has hit lately, so it can roll out through the penguins' sound waves
    const WAVE_RIPPLE_SECONDS = 0.07; // from one wave to the next one out
    const punchTimes = new Float64Array(64);
    const punchValues = new Float32Array(64);
    let punchSlot = 0;

    // ───── Rhythm: the jukebox moving to the beat ─────
    // Off at the start of every visit: things bouncing to a beat nobody asked for just look like a
    // glitch. Once a song has been playing for a few seconds the penguins ask (once a visit) if they
    // should dance to it, and tapping them switches it on or off any time.
    const RHYTHM_INVITE_AFTER_MS = 4000;
    const RHYTHM_INVITE_LINGER_MS = 14000;
    const rhythmInvite = document.getElementById("rhythm-invite");
    const rhythmNote = document.getElementById("rhythm-note");
    let rhythmOn = false;
    let rhythmInviteState = "waiting"; // then "open", then "answered" (not asked again this visit)
    let rhythmInviteTimer = null;
    let rhythmNoteTimer = null;
    let listeningSince = null; // when the song that's playing started (or carried on) playing

    function setRhythm(on) {
        rhythmOn = on;
        if (jukeboxContainer) jukeboxContainer.classList.toggle("rhythm-on", on);
        titlePenguins.forEach((penguin) => {
            if (penguin.hasAttribute("aria-pressed")) penguin.setAttribute("aria-pressed", String(on));
            penguin.title = on ? "Rhythm is on: tap to stop the dancing" : "Rhythm: dance to the beat";
        });
        showRhythmNote(on);
        if (on) {
            PENGUIN_POSES.forEach((source) => {
                const image = new Image();
                image.src = source;
            });
            requestSongBeats(currentTrackData);
        } else {
            calmVisualsFor = null;
            applyCalmVisuals(isPlayerActive());
        }
        startBeatVisuals();
    }

    function showRhythmNote(on) {
        if (!rhythmNote) return;
        rhythmNote.textContent = on ? "♪ Rhythm on" : "Rhythm off";
        rhythmNote.classList.toggle("is-off", !on);
        rhythmNote.classList.add("is-visible");
        clearTimeout(rhythmNoteTimer);
        rhythmNoteTimer = setTimeout(() => rhythmNote.classList.remove("is-visible"), 1500);
    }

    function openRhythmInvite() {
        if (!rhythmInvite || rhythmInviteState !== "waiting" || rhythmOn) return;
        if (isFrontHidden() || isJukeboxFlipping || scratch || (coverModal && coverModal.classList.contains("active"))) return;
        rhythmInviteState = "open";
        rhythmInvite.classList.add("is-open");
        clearTimeout(rhythmInviteTimer);
        rhythmInviteTimer = setTimeout(() => closeRhythmInvite(true), RHYTHM_INVITE_LINGER_MS);
    }

    // Answered (or left to time out), it isn't asked again this visit; put away for another reason
    // (the jukebox turned around, the song cleared away) it can ask next time
    function closeRhythmInvite(answered) {
        if (!rhythmInvite || rhythmInviteState !== "open") return;
        rhythmInviteState = answered ? "answered" : "waiting";
        listeningSince = null;
        clearTimeout(rhythmInviteTimer);
        rhythmInvite.classList.remove("is-open");
    }

    function setUpRhythm() {
        titlePenguins.forEach((penguin) => {
            penguin.addEventListener("click", () => {
                closeRhythmInvite(true);
                setRhythm(!rhythmOn);
            });
        });
        if (rhythmInvite) {
            rhythmInvite.querySelector(".rhythm-invite-button--yes").addEventListener("click", () => {
                closeRhythmInvite(true);
                setRhythm(true);
            });
            rhythmInvite.querySelector(".rhythm-invite-button--no").addEventListener("click", () => closeRhythmInvite(true));
        }
        // Each equaliser bar's place, for the gentle ripple when Rhythm is off
        eqBars.forEach((bar, index) => bar.style.setProperty("--i", index));
    }

    // ───── Beats: where every beat of a song lands ─────
    // With Rhythm on the whole song is gone through a stretch at a time (decoded off to the side:
    // phones won't let a page measure the audio it's playing without breaking background playback),
    // measuring 43 times a second how sharply the sound gets louder across the spectrum. From that
    // the tempo is found the way librosa does it (the average of the autocorrelations in 8 second
    // windows, leaning towards 120 BPM) and every beat is placed by dynamic programming (Ellis's beat
    // tracker: beats on strong onsets, each about one beat after the last), so they stay on the
    // music all the way through.
    const BEAT_FFT_SIZE = 2048;
    const BEAT_HOP = 512; // at 22050 Hz: 43 measurements a second
    const BEAT_BAND_COUNT = 40; // from 30 Hz to 8 kHz, evenly spaced in pitch
    const BEAT_FLOOR_DB = -60;
    const BEAT_CHUNK_SECONDS = 20;
    const BEAT_TIGHTNESS = 100; // how firmly the beats keep to the tempo
    const BEAT_ONSET_LAG = 0.03; // seconds
    const BEAT_SLICE_MS = 5; // the longest the page works on it at a time
    const beatAnalyses = new Map();
    const beatBandBins = new Map(); // by sample rate

    // One offline context decodes every slice we measure (phones only allow a few contexts)
    let analysisContext = null;
    function getAnalysisContext() {
        if (analysisContext) return analysisContext;
        const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!OfflineContext) throw new Error("No offline audio");
        analysisContext = new OfflineContext(1, 1, 22050);
        return analysisContext;
    }

    function requestSongBeats(track) {
        if (!track || !rhythmOn || document.hidden || track !== currentTrackData) return;
        const settling = songSettleAt - performance.now();
        if (settling > 0) {
            setTimeout(() => requestSongBeats(track), settling + 20);
            return;
        }
        const duration = player.duration;
        if (!Number.isFinite(duration) || duration < 8) return;

        let analysis = beatAnalyses.get(track.file);
        if (!analysis) {
            let sampleRate;
            try {
                sampleRate = getAnalysisContext().sampleRate;
            } catch (error) {
                return;
            }
            const rate = sampleRate / BEAT_HOP;
            const frameCount = Math.floor((duration * sampleRate) / BEAT_HOP) + 1;
            const chunkFrames = Math.round(BEAT_CHUNK_SECONDS * rate);
            analysis = {
                file: track.file,
                duration,
                sampleRate,
                rate,
                onsets: new Float32Array(frameCount),
                chunkFrames,
                chunksDone: new Uint8Array(Math.ceil(frameCount / chunkFrames)),
                period: 0, // the tempo: a beat's length in frames
                periodComplete: false, // (worked out from the whole song)
                beats: null, // when each beat lands (seconds)
                strengths: null, // and how hard it hits (0–1)
                firstIndex: 0, // which beat of the song the first one is
                busy: false,
                failures: 0
            };
            beatAnalyses.set(track.file, analysis);
            while (beatAnalyses.size > 6) {
                beatAnalyses.delete(beatAnalyses.keys().next().value);
            }
        }
        continueSongBeats(analysis);
    }

    function getPlayingBeatChunk(analysis) {
        const time = Number.isFinite(player.currentTime) ? player.currentTime : 0;
        return Math.min(analysis.chunksDone.length - 1, Math.max(0, Math.floor((time * analysis.rate) / analysis.chunkFrames)));
    }

    // Measure the next stretch: from the one that's playing onwards, then from the top
    function continueSongBeats(analysis) {
        if (analysis.busy || analysis.failures >= 3 || !rhythmOn || document.hidden) return;
        if (!currentTrackData || currentTrackData.file !== analysis.file) return;
        const chunkCount = analysis.chunksDone.length;
        const playingChunk = getPlayingBeatChunk(analysis);
        let chunk = -1;
        for (let step = 0; step < chunkCount && chunk < 0; step += 1) {
            const candidate = (playingChunk + step) % chunkCount;
            if (!analysis.chunksDone[candidate]) chunk = candidate;
        }
        if (chunk < 0) return;

        analysis.busy = true;
        measureBeatChunk(analysis, chunk)
            .then(() => new Promise((resolve) => setTimeout(resolve, 0)))
            .then(() => {
                analysis.chunksDone[chunk] = 1;
                placeSongBeats(analysis);
            })
            .catch(() => {
                // A stretch that won't decode is left out (it has no beats) rather than holding up the rest
                analysis.failures += 1;
                if (beatAnalyses.get(analysis.file) === analysis) analysis.chunksDone[chunk] = 1;
            })
            .finally(() => {
                analysis.busy = false;
                setTimeout(() => continueSongBeats(analysis), 40);
            });
    }

    async function measureBeatChunk(analysis, chunk) {
        const first = chunk * analysis.chunkFrames;
        const end = Math.min(analysis.onsets.length, first + analysis.chunkFrames);
        // Frame f looks at BEAT_FFT_SIZE samples from f × BEAT_HOP, and its onset is how much louder
        // it is than the frame before, so the stretch starts a frame early
        const from = Math.max(0, first - 1);
        const fromTime = Math.max(0, ((from * BEAT_HOP) / analysis.sampleRate) - SPECTRUM_PREROLL_SECONDS);
        const toTime = Math.min(analysis.duration, (((end - 1) * BEAT_HOP) + BEAT_FFT_SIZE) / analysis.sampleRate);
        const { buffer, startTime } = await decodeSongSlice(analysis.file, analysis.duration, fromTime, toTime);
        // (the buffer's length and channel count read once: in the loop they'd be asked for every sample)
        const length = buffer.length;
        const channels = buffer.numberOfChannels;
        const mono = new Float32Array(length);
        for (let channel = 0; channel < channels; channel += 1) {
            const data = buffer.getChannelData(channel);
            for (let index = 0; index < length; index += 1) {
                mono[index] += data[index] / channels;
            }
        }
        const tables = getFftTables(BEAT_FFT_SIZE);
        const bins = getBeatBandBins(buffer.sampleRate);
        const offset = Math.round(startTime * buffer.sampleRate);
        const levels = new Float32Array(BEAT_BAND_COUNT);
        let previous = null;
        let sliceStart = performance.now();
        for (let frame = from; frame < end; frame += 1) {
            measureBeatBands(mono, (frame * BEAT_HOP) - offset, tables, bins, levels);
            if (frame >= first) {
                let rise = 0;
                if (previous) {
                    for (let band = 0; band < BEAT_BAND_COUNT; band += 1) {
                        rise += Math.max(0, levels[band] - previous[band]);
                    }
                }
                analysis.onsets[frame] = rise / BEAT_BAND_COUNT;
            }
            previous = previous || new Float32Array(BEAT_BAND_COUNT);
            previous.set(levels);
            // A few milliseconds at a time, so frames keep coming even on a slow phone
            if (performance.now() - sliceStart > BEAT_SLICE_MS) {
                await new Promise((resolve) => setTimeout(resolve, 0));
                if (beatAnalyses.get(analysis.file) !== analysis) throw new Error("Song forgotten");
                sliceStart = performance.now();
            }
        }
    }

    // The FFT bins in each band
    function getBeatBandBins(sampleRate) {
        if (!beatBandBins.has(sampleRate)) {
            const binHz = sampleRate / BEAT_FFT_SIZE;
            const edges = [];
            for (let band = 0; band <= BEAT_BAND_COUNT; band += 1) {
                edges.push(Math.round((30 * Math.pow(8000 / 30, band / BEAT_BAND_COUNT)) / binHz));
            }
            const bins = [];
            for (let band = 0; band < BEAT_BAND_COUNT; band += 1) {
                const low = Math.max(1, edges[band]);
                bins.push([low, Math.max(low + 1, edges[band + 1])]);
            }
            beatBandBins.set(sampleRate, bins);
        }
        return beatBandBins.get(sampleRate);
    }

    // How loud (dB) each band is in the BEAT_FFT_SIZE samples from `start`
    function measureBeatBands(samples, start, tables, bins, out) {
        const { real, imag } = transformWindow(samples, start, tables);
        for (let band = 0; band < bins.length; band += 1) {
            const [low, high] = bins[band];
            let power = 0;
            for (let bin = low; bin < high; bin += 1) {
                power += (real[bin] * real[bin]) + (imag[bin] * imag[bin]);
            }
            out[band] = Math.max(BEAT_FLOOR_DB, 10 * Math.log10((power / (high - low)) + 1e-10));
        }
    }

    // The beats through the measured stretch that's playing (the whole song once it's all in)
    function placeSongBeats(analysis) {
        const chunks = analysis.chunksDone;
        let firstChunk = getPlayingBeatChunk(analysis);
        if (!chunks[firstChunk]) firstChunk = chunks.indexOf(1);
        if (firstChunk < 0) return;
        let lastChunk = firstChunk;
        while (firstChunk > 0 && chunks[firstChunk - 1]) firstChunk -= 1;
        while (lastChunk + 1 < chunks.length && chunks[lastChunk + 1]) lastChunk += 1;

        const from = firstChunk * analysis.chunkFrames;
        const onsets = analysis.onsets.subarray(from, Math.min(analysis.onsets.length, (lastChunk + 1) * analysis.chunkFrames));
        // The tempo from the first 40 seconds measured (20 can be all intro), and again once the whole
        // song is in (in between the beats follow the music anyway)
        const complete = chunks.indexOf(0) < 0;
        if (!complete && onsets.length < 2 * analysis.chunkFrames) return;
        if (!analysis.period || (complete && !analysis.periodComplete)) {
            analysis.period = findBeatPeriod(onsets, analysis.rate);
            analysis.periodComplete = complete;
        }
        const period = analysis.period;
        const { frames, strengths } = trackBeats(onsets, period);
        if (frames.length < 2) return;
        // A frame is the middle of the samples it looks at, and a sound starts showing in it a little
        // before it lands (30ms, measured with a click track), so beats are put that much later
        const centre = ((BEAT_FFT_SIZE / 2) / analysis.sampleRate) + BEAT_ONSET_LAG;
        analysis.beats = frames.map((frame) => ((from + frame) / analysis.rate) + centre);
        analysis.strengths = strengths;
        analysis.firstIndex = Math.round(analysis.beats[0] / (period / analysis.rate));
    }

    // The tempo as a beat's length in frames: the average of the onsets' autocorrelations in 8 second
    // windows (each scaled by its own loudness), leaning towards 120 BPM
    function findBeatPeriod(onsets, rate) {
        const windowLength = Math.round(8 * rate);
        const minLag = Math.max(1, Math.round((60 * rate) / 260));
        const maxLag = Math.min(windowLength - 1, Math.round((60 * rate) / 40));
        const hann = new Float32Array(windowLength);
        for (let index = 0; index < windowLength; index += 1) {
            hann[index] = 0.5 - (0.5 * Math.cos((2 * Math.PI * index) / (windowLength - 1)));
        }
        const sums = new Float64Array(maxLag + 1);
        const piece = new Float32Array(windowLength);
        let windows = 0;
        // (a window every couple of seconds is plenty for the average)
        for (let start = -Math.floor(windowLength / 2); start + (windowLength / 2) < onsets.length; start += Math.round(rate * 2)) {
            let energy = 0;
            for (let index = 0; index < windowLength; index += 1) {
                const position = start + index;
                piece[index] = (position >= 0 && position < onsets.length ? onsets[position] : 0) * hann[index];
                energy += piece[index] * piece[index];
            }
            if (energy <= 0) continue;
            for (let lag = minLag; lag <= maxLag; lag += 1) {
                let sum = 0;
                for (let index = 0; index + lag < windowLength; index += 1) {
                    sum += piece[index] * piece[index + lag];
                }
                sums[lag] += sum / energy;
            }
            windows += 1;
        }
        let bestLag = Math.round((60 * rate) / 120);
        let best = -Infinity;
        for (let lag = minLag; lag <= maxLag; lag += 1) {
            const bpm = (60 * rate) / lag;
            const score = Math.log1p(1e6 * Math.max(0, sums[lag] / Math.max(1, windows))) - (0.5 * Math.pow(Math.log2(bpm / 120), 2));
            if (score > best) {
                best = score;
                bestLag = lag;
            }
        }
        // Between whole frames: a parabola through the autocorrelation around the best lag
        let lag = bestLag;
        if (bestLag > minLag && bestLag < maxLag) {
            const before = sums[bestLag - 1];
            const after = sums[bestLag + 1];
            const curve = before - (2 * sums[bestLag]) + after;
            if (curve < 0) lag += Math.max(-0.5, Math.min(0.5, (0.5 * (before - after)) / curve));
        }
        return lag;
    }

    // Ellis's dynamic programming: the best chain of beats, each on a strong onset and about a
    // period after the one before. Gives the frames of the beats and how hard each one hits.
    function trackBeats(onsets, period) {
        const count = onsets.length;
        let mean = 0;
        for (let index = 0; index < count; index += 1) mean += onsets[index];
        mean /= Math.max(1, count);
        let spread = 0;
        for (let index = 0; index < count; index += 1) spread += Math.pow(onsets[index] - mean, 2);
        spread = Math.sqrt(spread / Math.max(1, count)) || 1;

        // Each frame's onsets, smoothed a little (the gaussian is a 32nd of a beat wide, so it only
        // needs to reach three of those either side)
        const reach = Math.max(1, Math.ceil((period * 3) / 32));
        const weights = new Float32Array((reach * 2) + 1);
        for (let offset = -reach; offset <= reach; offset += 1) {
            weights[offset + reach] = Math.exp(-0.5 * Math.pow((offset * 32) / period, 2));
        }
        const local = new Float32Array(count);
        let localMax = 0;
        for (let index = 0; index < count; index += 1) {
            let sum = 0;
            for (let offset = -reach; offset <= reach; offset += 1) {
                const position = index + offset;
                if (position >= 0 && position < count) sum += (onsets[position] / spread) * weights[offset + reach];
            }
            local[index] = sum;
            localMax = Math.max(localMax, sum);
        }

        // The best total for a chain of beats ending at each frame, and the beat before it there
        const score = new Float32Array(count);
        const before = new Int32Array(count).fill(-1);
        const nearest = Math.round(period / 2);
        const furthest = Math.round(period * 2);
        // What a gap between two beats costs: nothing at the tempo, more the further off it is
        const gapCosts = new Float32Array(furthest + 1);
        for (let gap = nearest; gap <= furthest; gap += 1) {
            gapCosts[gap] = BEAT_TIGHTNESS * Math.pow(Math.log(gap / period), 2);
        }
        let started = false;
        for (let index = 0; index < count; index += 1) {
            let best = -Infinity;
            let from = -1;
            for (let gap = nearest; gap <= furthest && index - gap >= 0; gap += 1) {
                const value = score[index - gap] - gapCosts[gap];
                if (value > best) {
                    best = value;
                    from = index - gap;
                }
            }
            score[index] = local[index] + (from >= 0 ? best : 0);
            // The chain can't start on next to nothing
            if (started || local[index] >= 0.01 * localMax) {
                before[index] = from;
                started = true;
            }
        }

        // The last beat: the last peak in the totals that's at least half the typical peak
        const peaks = [];
        for (let index = 1; index < count - 1; index += 1) {
            if (score[index] > score[index - 1] && score[index] >= score[index + 1]) peaks.push(score[index]);
        }
        peaks.sort((a, b) => a - b);
        const typical = peaks.length ? peaks[Math.floor(peaks.length / 2)] : 0;
        let last = count - 1;
        for (let index = count - 2; index > 0; index -= 1) {
            if (score[index] > score[index - 1] && score[index] >= score[index + 1] && score[index] >= 0.5 * typical) {
                last = index;
                break;
            }
        }
        const frames = [];
        for (let index = last; index >= 0; index = before[index]) {
            frames.push(index);
        }
        frames.reverse();

        // Leave off weak beats at the ends (a quiet intro or fade-out isn't danced to)
        const hits = frames.map((frame) => local[frame]);
        const typicalHit = Math.sqrt(hits.reduce((sum, hit) => sum + (hit * hit), 0) / Math.max(1, hits.length));
        let firstKept = 0;
        let lastKept = frames.length;
        while (firstKept < lastKept && hits[firstKept] < 0.5 * typicalHit) firstKept += 1;
        while (lastKept > firstKept && hits[lastKept - 1] < 0.5 * typicalHit) lastKept -= 1;
        const sorted = hits.slice(firstKept, lastKept).sort((a, b) => a - b);
        const loud = sorted[Math.floor(sorted.length * 0.9)] || 1;
        return {
            frames: frames.slice(firstKept, lastKept),
            strengths: hits.slice(firstKept, lastKept).map((hit) => Math.min(1, hit / loud))
        };
    }

    // Which beat `time` is in, and how far through it; null where there are no beats
    function getBeatPosition(analysis, time) {
        const beats = analysis && analysis.beats;
        if (!beats || time < beats[0] || time >= beats[beats.length - 1]) return null;
        let low = 0;
        let high = beats.length - 1;
        while (high - low > 1) {
            const middle = (low + high) >> 1;
            if (beats[middle] <= time) {
                low = middle;
            } else {
                high = middle;
            }
        }
        const length = beats[low + 1] - beats[low];
        return {
            index: analysis.firstIndex + low,
            phase: (time - beats[low]) / length,
            period: length,
            strength: analysis.strengths[low]
        };
    }

    // ───── The penguins' dance ─────
    // Locked to the beats: a hop each beat, landing on it with a squash and leaning one way then
    // the other; side steps in the third bar of every four, and a spinning jump to end the fourth.
    // Their heads bob on the beat too (the gif's two poses, a beat each), and they dance bigger
    // when the music hits harder.
    const PENGUIN_GIF = "images/penguin.gif";
    const PENGUIN_POSES = ["images/penguin-pose-a.png", "images/penguin-pose-b.png"];
    const penguinIcons = titlePenguins.map((penguin) => penguin.querySelector(".penguin-icon")).filter(Boolean);
    let penguinPose = null; // which pose they're in, or null when they aren't dancing
    let danceEnergy = 0.5;
    let danceBeat = null; // the penguins' own count of beats danced (and how far into this one)
    let danceSongTime = null; // the song's time when it was last counted

    // The penguins keep their own count, going at the song's tempo and easing towards where its
    // beats are: when the beats are worked out again as more of the song is measured, the dance
    // drifts over instead of jumping. (A jump in the song puts them straight back in step.)
    function followBeat(position, time) {
        if (!position) {
            danceBeat = null;
            return null;
        }
        const target = position.index + position.phase;
        if (danceBeat === null || Math.abs(time - danceSongTime) > 1) {
            danceBeat = target;
        } else {
            danceBeat += (time - danceSongTime) / position.period;
            // Only how far through a beat counts: the whole beats are the dance's own
            let behind = (target - danceBeat) % 1;
            if (behind > 0.5) behind -= 1;
            if (behind < -0.5) behind += 1;
            danceBeat += behind * 0.15;
        }
        danceSongTime = time;
        const index = Math.floor(danceBeat);
        return { index, phase: danceBeat - index, period: position.period, strength: position.strength };
    }

    function dancePenguins(position, elapsed) {
        if (!position) {
            stopPenguinDance();
            return;
        }
        if (penguinPose === null && jukeboxContainer) jukeboxContainer.classList.add("penguins-dancing");
        const beat = position.index;
        const phase = position.phase;
        danceEnergy += ((0.35 + (0.65 * position.strength)) - danceEnergy) * (1 - Math.exp(-elapsed / 0.8));
        const move = ((beat % 16) + 16) % 16;
        const hop = 4 * phase * (1 - phase); // up between beats, landing on each one
        const landing = Math.exp(-phase * 8);
        let lift = hop * (0.08 + (0.1 * danceEnergy));
        let lean = (beat % 2 === 0 ? 1 : -1) * Math.sin(Math.PI * phase) * (4 + (6 * danceEnergy));
        let step = 0;
        let spin = 0;
        if (move >= 8 && move < 12) {
            // Side steps: out, in, out, in
            const eased = easeInOutCubic(phase);
            step = 0.12 * (move % 2 === 0 ? eased : 1 - eased);
            lean *= 0.5;
        } else if (move === 15) {
            // The big finish: a higher jump with a spin
            lift *= 1.9;
            spin = 360 * easeInOutCubic(phase);
            lean = 0;
        }
        const squash = 0.15 * landing * danceEnergy;
        penguinIcons.forEach((icon, index) => {
            const side = index === 0 ? -1 : 1; // the left one leans and steps left, the right one right
            icon.style.transform = `translate(${(side * step).toFixed(3)}em, ${(-lift).toFixed(3)}em) rotate(${(side * lean).toFixed(2)}deg) perspective(6em) rotateY(${(side * spin).toFixed(1)}deg) scale(${(1 + (squash * 0.8)).toFixed(3)}, ${(1 - squash).toFixed(3)})${index === 0 ? "" : " scaleX(-1)"}`;
        });
        // Their shadows shrink as they jump
        titlePenguins.forEach((penguin) => penguin.style.setProperty("--hop", Math.min(1, lift / 0.36).toFixed(3)));
        const pose = ((beat % 2) + 2) % 2;
        if (pose !== penguinPose) {
            penguinPose = pose;
            penguinIcons.forEach((icon) => {
                icon.src = PENGUIN_POSES[pose];
            });
        }
    }

    function stopPenguinDance() {
        if (penguinPose === null) return;
        penguinPose = null;
        if (jukeboxContainer) jukeboxContainer.classList.remove("penguins-dancing");
        penguinIcons.forEach((icon) => {
            icon.style.transform = "";
            icon.src = PENGUIN_GIF;
        });
        titlePenguins.forEach((penguin) => penguin.style.removeProperty("--hop"));
    }

    function spawnMusicNote(source, direction) {
        if (!musicNotes || !jukeboxContainer || !source) return;
        const rect = source.getBoundingClientRect();
        if (!rect.width) return;

        const containerRect = jukeboxContainer.getBoundingClientRect();
        const note = document.createElement("span");
        note.className = "music-note";
        note.innerHTML = NOTE_SHAPES[Math.floor(Math.random() * NOTE_SHAPES.length)];
        note.style.left = `${(rect.left + (rect.width / 2) - containerRect.left).toFixed(1)}px`;
        note.style.top = `${(rect.top + (rect.height * 0.35) - containerRect.top).toFixed(1)}px`;
        note.style.setProperty("--note-color", NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)]);
        note.style.setProperty("--drift-x", `${(direction * (14 + (Math.random() * 34))).toFixed(1)}px`);
        note.style.setProperty("--drift-rotate", `${(direction * (8 + (Math.random() * 22))).toFixed(1)}deg`);
        musicNotes.appendChild(note);
        setTimeout(() => note.remove(), 2200);
    }

    function onBeat(beatIndex) {
        if (document.hidden) return;
        if (beatIndex % 2 === 0 && Math.random() < 0.75) {
            const fromLeft = Math.random() < 0.5;
            spawnMusicNote(speakerCones[fromLeft ? 0 : 1], fromLeft ? -1 : 1);
        }
        if (beatIndex % 8 === 4 && record && record.classList.contains("up") && Math.random() < 0.6) {
            spawnMusicNote(record, Math.random() < 0.5 ? -1 : 1);
        }
    }

    // Until a song's sound has been measured, the bars dance to its beats: a new shape every beat
    // (fuller in the bass), scaled by how hard the beat hits
    function guessLevels(level, beatIndex, out) {
        if (beatIndex !== null && beatIndex !== eqBeatIndex) {
            eqBeatIndex = beatIndex;
            eqShape = eqBars.map((bar, index) => (1 - (0.4 * index / Math.max(1, eqBars.length - 1))) * (0.5 + (Math.random() * 0.5)));
        }
        for (let band = 0; band < SPECTRUM_BANDS; band += 1) {
            out[band] = level * (eqShape[band] || 0);
        }
        out[SPECTRUM_BANDS] = 0.35 + (level * 0.5);
        out[SPECTRUM_BANDS + 1] = 0.3 + (level * 0.55);
        return level;
    }

    function applyBeatLevel(levels, punch) {
        const playing = isPlayerActive();
        calmVisualsFor = null;
        speakerCones.forEach((cone) => {
            cone.style.transform = `scale(${(1 + (punch * 0.14)).toFixed(3)})`;
        });
        eqBars.forEach((bar, band) => {
            bar.style.transform = `scaleY(${(0.1 + (0.9 * levels[band])).toFixed(3)})`;
        });
        // The side lights: a level meter for each speaker
        cabinetLightShades.forEach((shade, side) => {
            shade.style.transform = `translateY(${(-100 * levels[SPECTRUM_BANDS + side]).toFixed(1)}%)`;
        });
        const loudness = (levels[SPECTRUM_BANDS] + levels[SPECTRUM_BANDS + 1]) / 2;
        if (jukeboxGlow) {
            jukeboxGlow.style.opacity = playing ? (0.18 + (loudness * 0.22) + (punch * 0.3)).toFixed(3) : "0";
        }
        // The penguins' sound waves: each beat rolls out through them, the nearest first, and they
        // glow with how loud their side is
        const now = performance.now() / 1000;
        punchSlot = (punchSlot + 1) % punchTimes.length;
        punchTimes[punchSlot] = now;
        punchValues[punchSlot] = punch;
        titleWaves.forEach((waves, side) => {
            const sideLevel = levels[SPECTRUM_BANDS + side];
            waves.forEach((wave, index) => {
                const hit = playing ? punchAgo(now, index * WAVE_RIPPLE_SECONDS) : 0;
                wave.style.opacity = playing ? Math.min(1, 0.4 + (sideLevel * 0.2) + (hit * 0.45)).toFixed(2) : "";
                wave.style.transform = hit > 0.003 ? `scale(${(1 + (hit * 0.1)).toFixed(3)})` : "";
            });
        });
    }

    // With Rhythm off: everything still, apart from a steady glow while a song plays (and the
    // equaliser's gentle ripple, the waves and the side lights' own idle animations, in CSS)
    let calmVisualsFor = null; // whether the calm look was last set for a song playing or not
    function applyCalmVisuals(playing) {
        stopPenguinDance();
        if (calmVisualsFor === playing) return;
        calmVisualsFor = playing;
        speakerCones.forEach((cone) => {
            cone.style.transform = "";
        });
        eqBars.forEach((bar) => {
            bar.style.transform = "";
        });
        cabinetLightShades.forEach((shade) => {
            shade.style.transform = "";
        });
        if (jukeboxGlow) jukeboxGlow.style.opacity = playing ? "0.3" : "0";
        titleWaves.forEach((waves) => waves.forEach((wave) => {
            wave.style.opacity = "";
            wave.style.transform = "";
        }));
    }

    // How hard the beat was hitting a moment ago
    function punchAgo(now, seconds) {
        for (let back = 0; back < punchTimes.length; back += 1) {
            const slot = (punchSlot - back + punchTimes.length) % punchTimes.length;
            if (now - punchTimes[slot] >= seconds) return punchValues[slot];
        }
        return 0;
    }

    function stepBeatVisuals(timestamp) {
        const playing = isPlayerActive() && Boolean(currentTrackData) && !document.hidden;
        const elapsed = lastVisualTimestamp === null ? 1 / 60 : Math.min(0.1, Math.max(0, (timestamp - lastVisualTimestamp) / 1000));
        lastVisualTimestamp = timestamp;
        let beatIndex = null;
        let position = null;
        let songTime = null;
        let bass = 0;

        if (playing) {
            // Listening for a little while (and not asked yet this visit): shall the penguins dance?
            if (listeningSince === null) {
                listeningSince = timestamp;
            } else if (!rhythmOn && rhythmInviteState === "waiting" && timestamp - listeningSince >= RHYTHM_INVITE_AFTER_MS) {
                openRhythmInvite();
            }
            const time = scratch ? scratch.targetTime : player.currentTime;
            songTime = time;

            // The song's wave fills smoothly (between the few time updates a second)
            updateNowPlayingProgress(scratch ? time : null);

            const spectrum = getSpectrum(currentTrackData);
            if (spectrum && !isFrontHidden()) {
                measureSpectrumAhead(spectrum, time);
            }
            if (rhythmOn) {
                position = getBeatPosition(beatAnalyses.get(currentTrackData.file), time);
                let level = 0;
                if (position) {
                    beatIndex = position.index;
                    const accent = ((beatIndex % 4) + 4) % 4 === 0 ? 1 : 0.7;
                    level = Math.exp(-(position.phase * position.period) / 0.12) * accent;
                    if (lastBeatIndex !== null && beatIndex === lastBeatIndex + 1) {
                        onBeat(beatIndex);
                    }
                }
                lastBeatIndex = beatIndex;

                if (spectrum && readSpectrum(spectrum, time + SPECTRUM_LEAD_SECONDS, targetLevels)) {
                    // The speakers thump when the bass jumps (a kick drum), and lean out a little with
                    // a steady bass line
                    let kick = 0;
                    let low = 0;
                    bassAverages.forEach((average, band) => {
                        const bandLevel = targetLevels[band];
                        bassAverages[band] = average + ((bandLevel - average) * (1 - Math.exp(-elapsed / 0.35)));
                        kick = Math.max(kick, bandLevel - bassAverages[band]);
                        low += bandLevel / bassAverages.length;
                    });
                    bass = Math.max(Math.min(1, kick / 0.2), low * 0.4);
                } else {
                    bass = guessLevels(level, beatIndex, targetLevels);
                }
            }
        } else {
            listeningSince = null;
        }
        if (!playing || !rhythmOn) {
            lastBeatIndex = null;
            targetLevels.fill(0);
            bassAverages.fill(0);
        }

        // Like a real meter: up at once, then falling back smoothly
        let moving = false;
        for (let value = 0; value < SPECTRUM_VALUES; value += 1) {
            const target = targetLevels[value];
            const shown = shownLevels[value];
            const settle = target > shown ? 0.03 : (value < SPECTRUM_BANDS ? 0.16 : 0.24);
            shownLevels[value] = shown + ((target - shown) * (1 - Math.exp(-elapsed / settle)));
            if (shownLevels[value] > 0.01) moving = true;
        }
        beatLevel = Math.max(bass, beatLevel * Math.exp(-elapsed / 0.12));
        if (rhythmOn) {
            applyBeatLevel(shownLevels, Math.pow(beatLevel, 1.5));
            dancePenguins(followBeat(position, songTime), elapsed);
        } else {
            applyCalmVisuals(playing);
        }

        if (playing || (rhythmOn && (moving || beatLevel > 0.01))) {
            beatFrame = requestAnimationFrame(stepBeatVisuals);
        } else {
            shownLevels.fill(0);
            beatLevel = 0;
            if (rhythmOn) {
                applyBeatLevel(shownLevels, 0);
                stopPenguinDance();
            } else {
                applyCalmVisuals(false);
            }
            beatFrame = null;
            lastVisualTimestamp = null;
        }
    }

    function startBeatVisuals() {
        if (beatFrame !== null || prefersReducedMotion()) return;
        beatFrame = requestAnimationFrame(stepBeatVisuals);
    }

    // ───── Frequencies: the equaliser, speakers and lights follow the real sound ─────
    // Like the tempo, the levels can't come from the audio that's playing (that stops phones playing
    // with the screen off), so each song is measured a few seconds ahead of where it's playing: a
    // slice of it is decoded off to the side and split into frequency bands, 30 times a second.
    const SPECTRUM_RATE = 30; // measurements per second of song
    const SPECTRUM_FFT_SIZE = 1024; // at 22050 Hz: 46ms windows with bins 21.5 Hz apart
    // The bins in each equaliser bar: half an octave apart, from the bass (43 Hz) to the top (11 kHz)
    const SPECTRUM_BAND_BINS = [2, 3, 4, 6, 8, 11, 16, 23, 32, 45, 64, 91, 128, 181, 256, 362, 512];
    const SPECTRUM_BANDS = SPECTRUM_BAND_BINS.length - 1;
    const SPECTRUM_VALUES = SPECTRUM_BANDS + 2; // the bars, then the left and right channels
    const SPECTRUM_SLICE_SECONDS = 6;
    const SPECTRUM_LOOKAHEAD_SECONDS = 4;
    const SPECTRUM_PREROLL_SECONDS = 0.2; // a slice's first moment can decode wrong, so it starts early
    const SPECTRUM_LEAD_SECONDS = 0.05; // a song's measurements land a touch late; this lines them up
    // How loud (dB) the top of each bar usually is in these songs, used until a song has been
    // measured for a while; after that each bar's top is the song's own loudest moments
    const SPECTRUM_TYPICAL_TOPS = [-15, -14, -16, -21, -22, -22, -22, -23, -25, -26, -29, -31, -33, -34, -32, -37, -9.5, -9.5];
    const SPECTRUM_TRUST_SECONDS = 40;
    const SPECTRUM_TRUST_UP_SECONDS = 6;
    const SPECTRUM_BAND_RANGE = 28; // dB from the bottom of a bar to the top
    const SPECTRUM_CHANNEL_RANGE = 20;
    const spectra = new Map();
    const songSources = new Map(); // songs fetched whole (the next song) are measured from memory
    const targetLevels = new Float32Array(SPECTRUM_VALUES);
    const shownLevels = new Float32Array(SPECTRUM_VALUES);
    let lastVisualTimestamp = null;
    const bassAverages = new Float32Array(4); // the lowest bars' recent levels
    const fftTableSets = new Map(); // by FFT size

    function getSpectrum(track) {
        let spectrum = spectra.get(track.file);
        if (spectrum) return spectrum;
        const duration = player.duration;
        if (!Number.isFinite(duration) || duration < 1) return null;

        const frameCount = Math.floor(duration * SPECTRUM_RATE) + 1;
        spectrum = {
            file: track.file,
            duration,
            frameCount,
            levels: new Uint8Array(frameCount * SPECTRUM_VALUES), // dB, in half-dB steps from -100
            measured: new Uint8Array(frameCount),
            measuredCount: 0,
            histogram: new Uint32Array(SPECTRUM_VALUES * 256),
            bottoms: new Float32Array(SPECTRUM_VALUES),
            spans: new Float32Array(SPECTRUM_VALUES),
            busy: false,
            failures: 0,
            retryAt: 0
        };
        updateSpectrumScale(spectrum);
        spectra.set(track.file, spectrum);
        if (spectra.size > 8) {
            spectra.delete(spectra.keys().next().value);
        }
        return spectrum;
    }

    // Measure the next stretch of the song that hasn't been measured yet, if it's coming up soon
    function measureSpectrumAhead(spectrum, time) {
        if (spectrum.busy || spectrum.failures >= 3 || performance.now() < Math.max(spectrum.retryAt, songSettleAt)) return;
        const from = Math.max(0, Math.floor(time * SPECTRUM_RATE));
        const to = Math.min(spectrum.frameCount - 1, Math.ceil((time + SPECTRUM_LOOKAHEAD_SECONDS) * SPECTRUM_RATE));
        let frame = from;
        while (frame <= to && spectrum.measured[frame]) frame += 1;
        if (frame > to) return;

        spectrum.busy = true;
        measureSpectrumSlice(spectrum, frame)
            .catch(() => {
                spectrum.failures += 1;
                spectrum.retryAt = performance.now() + 2000;
            })
            .finally(() => {
                spectrum.busy = false;
            });
    }

    async function measureSpectrumSlice(spectrum, firstFrame) {
        const fromTime = firstFrame / SPECTRUM_RATE;
        const toTime = Math.min(spectrum.duration, fromTime + SPECTRUM_SLICE_SECONDS);
        const lastFrame = Math.min(spectrum.frameCount - 1, Math.floor(toTime * SPECTRUM_RATE));
        const slice = await decodeSongSlice(spectrum.file, spectrum.duration, Math.max(0, fromTime - SPECTRUM_PREROLL_SECONDS), toTime);
        const { buffer } = slice;
        const left = buffer.getChannelData(0);
        const right = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : left;
        const mono = new Float32Array(left.length);
        for (let index = 0; index < mono.length; index += 1) {
            mono[index] = (left[index] + right[index]) / 2;
        }

        const values = new Float32Array(SPECTRUM_VALUES);
        const halfHop = Math.round(buffer.sampleRate / SPECTRUM_RATE / 2);
        for (let frame = firstFrame; frame <= lastFrame; frame += 1) {
            if (!spectra.has(spectrum.file)) return;
            if (!spectrum.measured[frame]) {
                const center = Math.round(((frame / SPECTRUM_RATE) - slice.startTime) * buffer.sampleRate);
                measureBands(mono, center, values);
                values[SPECTRUM_BANDS] = measureLoudness(left, center - halfHop, center + halfHop);
                values[SPECTRUM_BANDS + 1] = measureLoudness(right, center - halfHop, center + halfHop);
                const offset = frame * SPECTRUM_VALUES;
                for (let value = 0; value < SPECTRUM_VALUES; value += 1) {
                    const byte = Math.max(0, Math.min(255, Math.round((values[value] + 100) * 2)));
                    spectrum.levels[offset + value] = byte;
                    spectrum.histogram[(value * 256) + byte] += 1;
                }
                spectrum.measured[frame] = 1;
                spectrum.measuredCount += 1;
            }
            // A breather now and then, so the page never stutters
            if ((frame - firstFrame) % 45 === 44) {
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }
        updateSpectrumScale(spectrum);
        learnSongWave(spectrum);
    }

    // A stretch of the song, decoded: from memory when the whole song is here, otherwise fetched.
    // Resolves to the audio and the song time it starts at.
    async function decodeSongSlice(file, duration, fromTime, toTime) {
        const context = getAnalysisContext();
        const source = songSources.get(file);
        if (source) {
            const { blob, frames } = source;
            const frameSeconds = frames.samplesPerFrame / frames.sampleRate;
            const first = Math.min(frames.offsets.length - 1, Math.floor(fromTime / frameSeconds));
            const last = Math.min(frames.offsets.length, Math.ceil(toTime / frameSeconds) + 1);
            const end = last < frames.offsets.length ? frames.offsets[last] : frames.end;
            const buffer = await decodeAudio(context, await blob.slice(frames.offsets[first], end).arrayBuffer());
            // Lined up by its end: a decoder can drop a little from the front, never the back
            return { buffer, startTime: (last * frameSeconds) - buffer.duration };
        }

        if (navigator.connection && navigator.connection.saveData) throw new Error("Saving data");
        const info = await fetchAudioFileInfo(file);
        const bytesPerSecond = (info.total - info.audioStart) / duration;
        const startByte = info.audioStart + Math.floor(fromTime * bytesPerSecond);
        const endByte = Math.min(info.total - 1, info.audioStart + Math.ceil(toTime * bytesPerSecond) + 1500);
        const response = await fetch(file, { headers: { Range: `bytes=${startByte}-${endByte}` } });
        if (response.status !== 206) {
            if (response.body) response.body.cancel();
            throw new Error("Range requests not supported");
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const frameStart = findMp3FrameStart(bytes);
        // Whole frames only, so the slice's end is a known moment in the song
        let end = frameStart;
        let frameCount = 0;
        let header = readMp3FrameHeader(bytes, end);
        const firstHeader = header;
        while (header && end + header.length <= bytes.length) {
            end += header.length;
            frameCount += 1;
            header = readMp3FrameHeader(bytes, end);
        }
        if (!firstHeader || !frameCount) throw new Error("No MP3 frames");
        const buffer = await decodeAudio(context, bytes.slice(frameStart, end).buffer);
        const endTime = ((startByte + frameStart - info.audioStart) / bytesPerSecond)
            + ((frameCount * firstHeader.samplesPerFrame) / firstHeader.sampleRate);
        return { buffer, startTime: endTime - buffer.duration };
    }

    function getFftTables(size = SPECTRUM_FFT_SIZE) {
        if (fftTableSets.has(size)) return fftTableSets.get(size);
        const bits = Math.round(Math.log2(size));
        const reversed = new Uint16Array(size);
        for (let index = 0; index < size; index += 1) {
            let value = 0;
            for (let bit = 0; bit < bits; bit += 1) {
                value |= ((index >> bit) & 1) << (bits - 1 - bit);
            }
            reversed[index] = value;
        }
        const cos = new Float32Array(size / 2);
        const sin = new Float32Array(size / 2);
        for (let index = 0; index < size / 2; index += 1) {
            cos[index] = Math.cos((2 * Math.PI * index) / size);
            sin[index] = Math.sin((2 * Math.PI * index) / size);
        }
        const window = new Float32Array(size);
        let windowPower = 0;
        for (let index = 0; index < size; index += 1) {
            window[index] = 0.5 - (0.5 * Math.cos((2 * Math.PI * index) / size));
            windowPower += window[index] * window[index];
        }
        const tables = {
            size,
            reversed,
            cos,
            sin,
            window,
            // Scaled so a band's power reads like the loudness of the sound in it
            scale: 2 / (size * windowPower),
            real: new Float32Array(size),
            imag: new Float32Array(size)
        };
        fftTableSets.set(size, tables);
        return tables;
    }

    // How loud (dB) each band is in the window of samples centred on `center`
    function measureBands(samples, center, out) {
        const { scale, real, imag } = transformWindow(samples, center - (SPECTRUM_FFT_SIZE / 2), getFftTables());
        for (let band = 0; band < SPECTRUM_BANDS; band += 1) {
            let power = 0;
            for (let bin = SPECTRUM_BAND_BINS[band]; bin < SPECTRUM_BAND_BINS[band + 1]; bin += 1) {
                power += (real[bin] * real[bin]) + (imag[bin] * imag[bin]);
            }
            out[band] = 10 * Math.log10((power * scale) + 1e-12);
        }
    }

    // The spectrum of the (Hann-windowed) samples from `start`, left in the tables' real and imag
    function transformWindow(samples, start, tables) {
        const { size, reversed, cos, sin, window, real, imag } = tables;
        for (let index = 0; index < size; index += 1) {
            const position = start + index;
            const sample = position >= 0 && position < samples.length ? samples[position] : 0;
            real[reversed[index]] = sample * window[index];
            imag[reversed[index]] = 0;
        }
        for (let half = 1; half < size; half *= 2) {
            const step = size / (half * 2);
            for (let group = 0; group < size; group += half * 2) {
                for (let pair = 0; pair < half; pair += 1) {
                    const even = group + pair;
                    const odd = even + half;
                    const twiddle = pair * step;
                    const oddReal = (real[odd] * cos[twiddle]) + (imag[odd] * sin[twiddle]);
                    const oddImag = (imag[odd] * cos[twiddle]) - (real[odd] * sin[twiddle]);
                    real[odd] = real[even] - oddReal;
                    imag[odd] = imag[even] - oddImag;
                    real[even] += oddReal;
                    imag[even] += oddImag;
                }
            }
        }
        return tables;
    }

    function measureLoudness(samples, from, to) {
        let sum = 0;
        let count = 0;
        for (let index = Math.max(0, from); index < Math.min(samples.length, to); index += 1) {
            sum += samples[index] * samples[index];
            count += 1;
        }
        return 10 * Math.log10((count ? sum / count : 0) + 1e-12);
    }

    // Where each bar's bottom and top sit (dB): its top is how loud it gets in the song's loudest
    // moments, though a band the song hardly uses stays low instead of being blown up to match.
    // A loud song raises the tops within seconds; a quiet start only lowers them slowly.
    function updateSpectrumScale(spectrum) {
        const measuredSeconds = spectrum.measuredCount / SPECTRUM_RATE;
        const trustUp = Math.min(1, measuredSeconds / SPECTRUM_TRUST_UP_SECONDS);
        const trustDown = Math.min(1, measuredSeconds / SPECTRUM_TRUST_SECONDS);
        const tops = new Float32Array(SPECTRUM_VALUES);
        for (let value = 0; value < SPECTRUM_VALUES; value += 1) {
            let measuredTop = SPECTRUM_TYPICAL_TOPS[value];
            if (spectrum.measuredCount) {
                let remaining = spectrum.measuredCount * 0.03;
                let byte = 255;
                while (byte > 0 && remaining >= spectrum.histogram[(value * 256) + byte]) {
                    remaining -= spectrum.histogram[(value * 256) + byte];
                    byte -= 1;
                }
                measuredTop = (byte / 2) - 100;
            }
            const trust = measuredTop > SPECTRUM_TYPICAL_TOPS[value] ? trustUp : trustDown;
            tops[value] = SPECTRUM_TYPICAL_TOPS[value] + ((measuredTop - SPECTRUM_TYPICAL_TOPS[value]) * trust);
        }
        let loudestBand = -100;
        for (let band = 0; band < SPECTRUM_BANDS; band += 1) {
            loudestBand = Math.max(loudestBand, tops[band]);
        }
        const channelTop = Math.max(tops[SPECTRUM_BANDS], tops[SPECTRUM_BANDS + 1]);
        for (let value = 0; value < SPECTRUM_VALUES; value += 1) {
            const isBand = value < SPECTRUM_BANDS;
            // A little headroom, so a steady bass note doesn't pin its bar to the top
            const top = (isBand ? Math.max(tops[value], loudestBand - 20) : channelTop) + 2;
            const range = isBand ? SPECTRUM_BAND_RANGE : SPECTRUM_CHANNEL_RANGE;
            // Kept in the same half-dB steps as the measurements
            spectrum.bottoms[value] = (top - range + 100) * 2;
            spectrum.spans[value] = range * 2;
        }
    }

    // Each bar's level (0–1), then the left and right channels', at `time`; false if not measured yet
    function readSpectrum(spectrum, time, out) {
        const position = Math.max(0, time * SPECTRUM_RATE);
        const frame = Math.min(spectrum.frameCount - 2, Math.floor(position));
        if (frame < 0 || !spectrum.measured[frame] || !spectrum.measured[frame + 1]) return false;

        const mix = Math.min(1, position - frame);
        const { levels, bottoms, spans } = spectrum;
        const offset = frame * SPECTRUM_VALUES;
        for (let value = 0; value < SPECTRUM_VALUES; value += 1) {
            const before = levels[offset + value];
            const after = levels[offset + SPECTRUM_VALUES + value];
            const level = (before + ((after - before) * mix) - bottoms[value]) / spans[value];
            out[value] = Math.max(0, Math.min(1, level));
        }
        return true;
    }

    // The next song's whole file, so it can be measured without fetching it again
    function rememberSongSource(file, blob, frames) {
        songSources.delete(file);
        songSources.set(file, { blob, frames });
        while (songSources.size > 2) {
            songSources.delete(songSources.keys().next().value);
        }
    }

    // ───── Auto-mix: keep-playing moves from each song straight into the next ─────
    // Every song plays right to its end, with no fading, and the next one is started a moment early
    // on the spare deck so there's no gap. Each song's ending is measured so that a long stretch of
    // silence at the end gets skipped, leaving just a short pause.
    const MIX_ANALYSIS_SECONDS = 20;
    const MIX_HEAD_SECONDS = 4;
    const MIX_SILENCE_DB = -60; // quieter than this is silence; a fading reverb tail still counts as the song
    const MIX_LONG_SILENCE_SECONDS = 3; // a silent ending this long is empty space worth skipping
    const MIX_PAUSE_SECONDS = 1; // what's left of it, like the gap between tracks on an album
    const MIX_GAPLESS_LEAD_SECONDS = 0.06;
    const MIX_PREPARE_SECONDS = 40;
    const SILENT_CLIP = `data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAACA${"gICA".repeat(133)}`;
    const mixInfoCache = new Map();
    const mixInfoRequests = new Set();
    const deckBlobUrls = new Map();
    const primedDecks = new Set();
    let autoMixTimer = null;
    let mixOutTimer = null;

    // Loudness (dBFS) of each 50ms window, lined up so the last window ends with the buffer
    function measureWindowLevels(buffer) {
        const windowLength = Math.max(1, Math.round(buffer.sampleRate * 0.05));
        const count = Math.floor(buffer.length / windowLength);
        const firstSample = buffer.length - (count * windowLength);
        const channels = [];
        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            channels.push(buffer.getChannelData(channel));
        }

        const levels = new Float32Array(count);
        for (let windowIndex = 0; windowIndex < count; windowIndex += 1) {
            const from = firstSample + (windowIndex * windowLength);
            let sum = 0;
            for (let index = from; index < from + windowLength; index += 1) {
                let sample = 0;
                for (let channel = 0; channel < channels.length; channel += 1) {
                    sample += channels[channel][index];
                }
                sample /= channels.length;
                sum += sample * sample;
            }
            levels[windowIndex] = 10 * Math.log10((sum / windowLength) + 1e-12);
        }
        return { levels, windowSeconds: windowLength / buffer.sampleRate, offset: firstSample / buffer.sampleRate };
    }

    // Where only silence is left (song time), from a slice of the song's ending
    function measureMixInfo(tail, duration, head) {
        const { levels, windowSeconds } = measureWindowLevels(tail);
        const sliceStart = duration - (levels.length * windowSeconds);
        let last = levels.length - 1;
        while (last >= 0 && levels[last] <= MIX_SILENCE_DB) last -= 1;
        // Nothing audible at all is more likely a bad decode than a silent song: don't trim anything
        if (last < 0) return { silentFrom: duration, audibleStart: 0 };

        const silentFrom = Math.min(duration, Math.max(0, sliceStart + ((last + 1) * windowSeconds)));

        // A silent intro gets skipped when the song is mixed in (if there's enough of one to notice)
        let audibleStart = 0;
        if (head) {
            const intro = measureWindowLevels(head);
            let first = 0;
            while (first < intro.levels.length && intro.levels[first] <= MIX_SILENCE_DB) first += 1;
            const start = intro.offset + (first * intro.windowSeconds) - 0.05;
            if (first < intro.levels.length && start >= 0.25) audibleStart = Math.min(start, silentFrom);
        }
        return { silentFrom, audibleStart };
    }

    async function analyzeMixFromBytes(bytes, frames) {
        const context = getAnalysisContext();
        const { offsets, sampleRate, samplesPerFrame } = frames;
        const frameSeconds = samplesPerFrame / sampleRate;
        const tailFrame = Math.max(0, offsets.length - Math.ceil(MIX_ANALYSIS_SECONDS / frameSeconds));
        const headFrame = Math.min(offsets.length - 1, Math.ceil(MIX_HEAD_SECONDS / frameSeconds));
        const duration = offsets.length * frameSeconds;
        const tail = checkDecodedLength(await decodeAudio(context, bytes.slice(offsets[tailFrame]).buffer), Math.min(MIX_ANALYSIS_SECONDS, duration));
        const head = await decodeAudio(context, bytes.slice(offsets[0], offsets[headFrame]).buffer);
        return measureMixInfo(tail, duration, head);
    }

    // A slice that decoded far shorter than asked for can't be lined up with the song's end
    function checkDecodedLength(buffer, expectedSeconds) {
        if (buffer.duration < expectedSeconds * 0.6) throw new Error("Slice didn't decode fully");
        return buffer;
    }

    // Songs started from the list stream straight from the file, so fetch just their ending
    async function analyzeMixFromUrl(track, duration) {
        const info = await fetchAudioFileInfo(track.file);
        const bytesPerSecond = (info.total - info.audioStart) / duration;
        const sliceBytes = Math.ceil(Math.min(MIX_ANALYSIS_SECONDS, duration) * bytesPerSecond);
        const startByte = Math.max(info.audioStart, info.total - sliceBytes);
        const response = await fetch(track.file, { headers: { Range: `bytes=${startByte}-${info.total - 1}` } });
        if (response.status !== 206) {
            if (response.body) response.body.cancel();
            throw new Error("Range requests not supported");
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const tail = await decodeAudio(getAnalysisContext(), bytes.slice(findMp3FrameStart(bytes)).buffer);
        return measureMixInfo(checkDecodedLength(tail, Math.min(MIX_ANALYSIS_SECONDS, duration)), duration, null);
    }

    function requestMixInfo(track) {
        if (!track || mixInfoCache.has(track.file) || mixInfoRequests.has(track.file)) return;
        const duration = player.duration;
        if (!Number.isFinite(duration) || duration < 1) return;

        mixInfoRequests.add(track.file);
        analyzeMixFromUrl(track, duration)
            .then((info) => mixInfoCache.set(track.file, info))
            .catch(() => mixInfoCache.set(track.file, null))
            .finally(() => mixInfoRequests.delete(track.file));
    }

    // Where this song is over and the next one comes in: the very end, unless it ends in a long
    // silence, which is cut down to a short pause
    function computeMixPlan(info, duration) {
        const skipsSilence = duration - info.silentFrom >= MIX_LONG_SILENCE_SECONDS;
        const endAt = skipsSilence ? info.silentFrom + MIX_PAUSE_SECONDS : duration;
        return { endAt, mixAt: Math.max(0, endAt - MIX_GAPLESS_LEAD_SECONDS), skipsSilence };
    }

    // Every frame of an MP3, so a moment in the song can be found in the file
    function parseMp3Frames(bytes) {
        let offset = 0;
        if (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) {
            offset = 10 + (((bytes[6] & 0x7F) << 21) | ((bytes[7] & 0x7F) << 14) | ((bytes[8] & 0x7F) << 7) | (bytes[9] & 0x7F));
        }
        offset += findMp3FrameStart(bytes.subarray(offset));
        const first = readMp3FrameHeader(bytes, offset);
        if (!first) throw new Error("No MP3 frames");

        const offsets = [];
        let header = first;
        while (header && header.lsf === first.lsf && header.sampleRate === first.sampleRate && offset + header.length <= bytes.length) {
            offsets.push(offset);
            offset += header.length;
            header = readMp3FrameHeader(bytes, offset);
        }
        return { offsets, end: offset, sampleRate: first.sampleRate, samplesPerFrame: first.samplesPerFrame };
    }

    function getSpareDeck() {
        return decks.find((deck) => deck !== player);
    }

    // Point a deck at a song (or at nothing), tidying up the song file it held before
    function setDeckSource(deck, src, options = {}) {
        const previousUrl = deckBlobUrls.get(deck);
        deckBlobUrls.delete(deck);
        if (src) {
            deck.src = src;
            if (options.blob) deckBlobUrls.set(deck, src);
        } else {
            deck.removeAttribute("src");
            deck.load();
        }
        if (previousUrl && previousUrl !== src) {
            URL.revokeObjectURL(previousUrl);
        }
    }

    // iPhones only let a deck start by itself once a tap has started it, so warm up idle decks on taps
    function primeDecks() {
        decks.forEach((deck) => {
            if (primedDecks.has(deck)) return;
            if (!deck.paused) {
                primedDecks.add(deck);
                return;
            }
            if (deck.getAttribute("src")) return; // holding a song: leave it be

            primedDecks.add(deck);
            deck.src = SILENT_CLIP;
            const playPromise = deck.play();
            if (!playPromise || typeof playPromise.then !== "function") return;
            playPromise
                .then(() => {
                    autoMixBlocked = false;
                    if (deck.getAttribute("src") === SILENT_CLIP) {
                        deck.pause();
                        setDeckSource(deck, null);
                    }
                })
                .catch(() => {
                    // Interrupted by a song loading onto it is fine; anything else gets another go next tap
                    if (deck.getAttribute("src") === SILENT_CLIP) primedDecks.delete(deck);
                });
        });
    }

    // The queued song is still what should play next (the list or shuffle may have changed since)
    function isUpNextStillValid(entry) {
        if (entry.shuffled !== shuffleEnabled) return false;
        const visibleTracks = getVisibleTracks();
        const queuedElement = visibleTracks.find((trackElement) => trackElement.dataset.file === entry.track.file);
        if (!queuedElement) return false;

        const currentElement = getCurrentTrackElement();
        if (shuffleEnabled) return queuedElement !== currentElement || visibleTracks.length === 1;
        const currentIndex = visibleTracks.indexOf(currentElement);
        return visibleTracks[(currentIndex + 1) % visibleTracks.length] === queuedElement;
    }

    // Get the next song ready on the spare deck: fetched whole and measured
    function prepareUpNext() {
        const deck = getSpareDeck();
        const track = getTrackDataForElement(pickNextTrackElement(getCurrentTrackElement()));
        if (!deck || !track) return;

        const entry = { track, deck, shuffled: shuffleEnabled, startAt: 0, ready: false, starting: false, controller: null };
        upNext = entry;
        loadUpNext(entry).catch(() => {
            if (upNext !== entry) return;
            // Couldn't fetch it whole: stream it on the spare deck instead
            setDeckSource(deck, track.file);
            entry.startAt = 0;
            entry.ready = true;
        });
    }

    async function loadUpNext(entry) {
        entry.controller = typeof AbortController === "function" ? new AbortController() : null;
        const response = await fetch(entry.track.file, entry.controller ? { signal: entry.controller.signal } : undefined);
        if (!response.ok) throw new Error("Couldn't load the song");
        const bytes = new Uint8Array(await response.arrayBuffer());
        if (upNext !== entry) return;

        let frames = null;
        try {
            frames = parseMp3Frames(bytes);
            const info = await analyzeMixFromBytes(bytes, frames);
            mixInfoCache.set(entry.track.file, info);
            entry.startAt = info.audibleStart;
        } catch (error) {
            // Couldn't measure it: it still plays, just from the very start and right to the end
        }
        if (upNext !== entry) return;

        const blob = new Blob([bytes], { type: "audio/mpeg" });
        if (frames) {
            rememberSongSource(entry.track.file, blob, frames);
        }
        setDeckSource(entry.deck, URL.createObjectURL(blob), { blob: true });
        cueDeck(entry.deck, entry.startAt);
        entry.ready = true;
    }

    // Line a deck up at `time` (older Safari throws if it hasn't loaded yet; it's tried again at the start)
    function cueDeck(deck, time) {
        if (!(time > 0) || Math.abs(deck.currentTime - time) < 0.15) return;
        try {
            deck.currentTime = time;
        } catch (error) {
            // Not loaded yet
        }
    }

    function discardUpNext() {
        const entry = upNext;
        if (!entry) return;
        upNext = null;
        clearTimeout(autoMixTimer);
        if (entry.controller) entry.controller.abort();
        if (entry.deck !== player) {
            entry.deck.pause();
            setDeckSource(entry.deck, null);
        }
    }

    // A pick that happens to be the queued song can start from the deck that's ready for it
    function takeUpNextFor(track) {
        const entry = upNext;
        if (entry && entry.ready && !entry.starting && entry.track.file === track.file) {
            upNext = null;
            clearTimeout(autoMixTimer);
            return entry;
        }
        discardUpNext();
        return null;
    }

    // Runs on every timeupdate of the playing deck
    function checkAutoMix() {
        if (!currentTrackData || scratch || player.paused || player.seeking) return;
        const time = player.currentTime;
        const duration = player.duration;
        if (!Number.isFinite(time) || !Number.isFinite(duration)) return;

        const info = mixInfoCache.get(currentTrackData.file);
        if (info === undefined && time > 1) {
            requestMixInfo(currentTrackData);
        }
        const plan = info ? computeMixPlan(info, duration) : null;
        // Into a long silent ending (past the short pause that's kept): the song is over
        const inSilentEnding = Boolean(plan) && plan.skipsSilence && time >= plan.endAt;

        if (repeatOneEnabled) {
            // Round again: a long silent ending is skipped here too (otherwise the deck loops by itself)
            if (plan && plan.skipsSilence) {
                const wait = (plan.endAt - time) / (player.playbackRate || 1);
                if (wait <= 0.02) {
                    restartCurrentTrack();
                } else if (wait < 1.5) {
                    scheduleAutoMixCheck(wait);
                }
            }
            return;
        }

        if (!continuousPlayEnabled) {
            if (inSilentEnding) finishTrackEarly();
            return;
        }

        if (upNext && !upNext.starting && !isUpNextStillValid(upNext)) {
            discardUpNext();
        }
        const mixAt = plan ? plan.mixAt : duration;
        if (!upNext && !mixOut && !autoMixBlocked && time > Math.min(2, duration * 0.2) && mixAt - time <= MIX_PREPARE_SECONDS) {
            prepareUpNext();
        }

        if (plan && upNext && upNext.ready && !upNext.starting && !mixOut) {
            const wait = (plan.mixAt - time) / (player.playbackRate || 1);
            if (wait <= 0.02) {
                startAutoMix(upNext, plan);
            } else if (wait < 1.5) {
                scheduleAutoMixCheck(wait);
            }
            return;
        }

        if (inSilentEnding && !(upNext && upNext.starting)) {
            finishTrackEarly();
        }
    }

    // Timeupdates come a few times a second, so the last stretch is timed precisely
    function scheduleAutoMixCheck(waitSeconds) {
        clearTimeout(autoMixTimer);
        autoMixTimer = setTimeout(() => {
            autoMixTimer = null;
            checkAutoMix();
        }, waitSeconds * 1000);
    }

    // Repeat-one: back to the top of the song
    function restartCurrentTrack() {
        clearTimeout(autoMixTimer);
        const info = mixInfoCache.get(currentTrackData.file);
        player.currentTime = info ? info.audibleStart : 0;
        if (player.paused) {
            const playPromise = player.play();
            if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
        }
    }

    // Nothing but silence left: treat the song as finished
    function finishTrackEarly() {
        clearTimeout(autoMixTimer);
        player.pause();
        handleTrackFinished();
    }

    // Start the queued song; once it's actually playing it takes over as the current song
    function startAutoMix(entry, plan) {
        entry.starting = true;
        clearTimeout(autoMixTimer);
        const incoming = entry.deck;
        cueDeck(incoming, entry.startAt);
        incoming.volume = 1;

        const giveUpTimer = setTimeout(() => {
            if (upNext !== entry) return;
            // It never got going: carry on the old-fashioned way
            discardUpNext();
            if (player.ended) handleTrackFinished();
        }, 5000);
        const handOver = () => {
            clearTimeout(giveUpTimer);
            if (upNext !== entry) return;
            upNext = null;
            handOverToDeck(entry, plan);
        };

        const playPromise = incoming.play();
        if (!playPromise || typeof playPromise.then !== "function") {
            handOver();
            return;
        }
        playPromise.then(handOver).catch(() => {
            clearTimeout(giveUpTimer);
            if (upNext !== entry) return;
            // This browser won't start the spare deck by itself: no early starts until a tap allows it
            autoMixBlocked = true;
            primedDecks.delete(incoming);
            discardUpNext();
            if (player.ended) handleTrackFinished();
        });
    }

    // The queued song is playing: it becomes the current song while the last one plays out its
    // final moment
    function handOverToDeck(entry, outgoingPlan) {
        const outgoing = player;
        const previousElement = getCurrentTrackElement();
        player = entry.deck;
        currentTrackData = entry.track;
        syncDeckLooping();

        mixOut = {
            deck: outgoing,
            endAt: outgoingPlan.endAt,
            deadline: performance.now() + ((Math.max(0, outgoingPlan.endAt - outgoing.currentTime) + 3) * 1000)
        };
        clearInterval(mixOutTimer);
        mixOutTimer = setInterval(checkMixOut, 50);
        checkMixOut();

        resetTrackElementUi(previousElement);
        const trackElement = getCurrentTrackElement();
        showModeButtonsOnTrack(trackElement);
        setPlayButtonLabel(trackElement?.querySelector(".play-button"), "Pause");
        updateMediaSessionMetadata(entry.track);
        if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "playing";
        }
        updateMediaSessionPosition();
        if (record) {
            record.classList.add("up");
        }
        startSpinning();
        startBeatVisuals();
        updateWhereBackgroundFromPlayback();
        requestSongBeats(entry.track);

        if (!document.hidden) {
            // A lazy whirl as the next record takes over, and the list follows along
            spinRecordBy(360, 1600);
            if (trackElement) {
                scrollTrackIntoViewWithinList(trackElement, { behavior: "smooth", margin: isMobileViewport() ? 8 : 12 });
            }
        }
    }

    // The last song's deck is freed once it reaches its end (or the silence that's being skipped)
    function checkMixOut() {
        if (!mixOut) return;
        const { deck } = mixOut;
        const time = deck.currentTime;
        if (deck.ended || deck.paused || !Number.isFinite(time) || time >= mixOut.endAt - 0.02 || performance.now() > mixOut.deadline) {
            retireMixOut();
        }
    }

    function retireMixOut() {
        clearInterval(mixOutTimer);
        mixOutTimer = null;
        const mix = mixOut;
        if (!mix) return;
        mixOut = null;
        mix.deck.pause();
        setDeckSource(mix.deck, null);
    }

    // The visitor took over (pause, seek, skip, scratch): drop the last song's final moment
    function finishAutoMixNow() {
        if (upNext && upNext.starting) {
            discardUpNext();
        }
        retireMixOut();
    }

    // ───── Side rail: controls in a screen's side strip (folded Duo cover screen) ─────
    const RAIL_RING_LENGTH = 2 * Math.PI * 20;
    const RAIL_MIN_INSET = 50;
    let railShownTrack;
    let railFraction = 0.62;

    function readRailFraction() {
        try {
            const value = Number(localStorage.getItem("museJukeboxRailPosition"));
            return value > 0 && value < 1 ? value : 0.62;
        } catch (error) {
            return 0.62;
        }
    }

    function saveRailFraction(value) {
        try {
            localStorage.setItem("museJukeboxRailPosition", value.toFixed(3));
        } catch (error) {
            // Storage unavailable; the rail just starts in its default spot
        }
    }

    function positionSideRail() {
        const halfHeight = sideRail.offsetHeight / 2;
        const viewportHeight = window.innerHeight;
        const centerY = Math.max(halfHeight + 8, Math.min(viewportHeight - halfHeight - 8, railFraction * viewportHeight));
        sideRail.style.setProperty("--rail-y", `${Math.round(centerY)}px`);
    }

    // Only show the rail when the browser reports a wide side safe area to put it in
    function updateSideRailLayout() {
        if (!sideRail || !safeAreaProbe) return;

        const probeStyles = window.getComputedStyle(safeAreaProbe);
        const leftInset = parseFloat(probeStyles.paddingLeft) || 0;
        const rightInset = parseFloat(probeStyles.paddingRight) || 0;
        const inset = Math.max(leftInset, rightInset);
        const isDeckLayout = window.matchMedia(DECK_LAYOUT_QUERY).matches;
        // Only where the page really leaves that strip free: some browsers report the side strip
        // but lay the page out underneath it anyway, and then the rail would sit on the songs
        const cabinet = jukeboxPanel ? jukeboxPanel.getBoundingClientRect() : null;
        const room = !cabinet ? inset : (rightInset >= leftInset ? window.innerWidth - cabinet.right : cabinet.left);
        const enabled = inset >= RAIL_MIN_INSET && room >= RAIL_MIN_INSET * 0.8 && !isDeckLayout;

        document.body.classList.toggle("has-side-rail", enabled);
        document.body.classList.toggle("side-rail-left", enabled && leftInset > rightInset);
        document.body.classList.toggle("side-rail-right", enabled && rightInset >= leftInset);
        if (!enabled) return;

        document.body.style.setProperty("--side-inset", `${inset}px`);
        positionSideRail();
        updatePlayingTrackStickyState();
    }

    function updateSideRailState() {
        if (!sideRail) return;

        const track = currentTrackData;
        const isPlaying = isPlayerActive();
        sideRail.classList.toggle("is-playing", isPlaying);
        sideRail.classList.toggle("is-empty", !track);
        railPlay.setAttribute("aria-label", isPlaying ? "Pause" : "Play");

        if (track !== railShownTrack) {
            railShownTrack = track;
            setSafeImageSource(railCover, track ? getTrackCoverPreview(track) : "images/penguin.gif");
            railCover.classList.toggle("cover-grayscale", Boolean(track && track.grayscaleCover));
        }
    }

    function setUpSideRail() {
        if (!sideRail) return;

        railFraction = readRailFraction();
        railPrev.addEventListener("click", playPreviousTrack);
        railPlay.addEventListener("click", togglePlayback);
        railNext.addEventListener("click", playNextTrack);

        // Drag the rail up or down the strip (e.g. to dodge the browser's own buttons)
        let drag = null;
        let suppressClick = false;
        sideRail.addEventListener("pointerdown", (event) => {
            drag = { pointerId: event.pointerId, startY: event.clientY, startFraction: railFraction, moved: false };
        });
        sideRail.addEventListener("pointermove", (event) => {
            if (!drag || event.pointerId !== drag.pointerId) return;
            const deltaY = event.clientY - drag.startY;
            if (!drag.moved && Math.abs(deltaY) < 8) return;
            if (!drag.moved) {
                drag.moved = true;
                sideRail.classList.add("is-dragging");
                sideRail.setPointerCapture(event.pointerId);
            }
            railFraction = Math.max(0.05, Math.min(0.95, drag.startFraction + (deltaY / window.innerHeight)));
            positionSideRail();
        });
        const endDrag = (event) => {
            if (!drag || event.pointerId !== drag.pointerId) return;
            if (drag.moved) {
                suppressClick = true;
                sideRail.classList.remove("is-dragging");
                saveRailFraction(railFraction);
            }
            drag = null;
        };
        sideRail.addEventListener("pointerup", endDrag);
        sideRail.addEventListener("pointercancel", endDrag);
        sideRail.addEventListener("click", (event) => {
            if (!suppressClick) return;
            suppressClick = false;
            event.preventDefault();
            event.stopPropagation();
        }, true);

        updateSideRailLayout();
        updateSideRailState();
    }

    // ───── Back of the jukebox: flip animation (the Jukebot game lives in jukebot.js) ─────
    // Both sides stay laid out (the back lies over the front), so turning around only changes which
    // one shows. The turn itself is a CSS animation: speed up to edge-on, swap sides, settle.
    const FLIP_OUT_MS = 210;
    const FLIP_IN_MS = 340;
    const FLIP_OUT_EASING = "cubic-bezier(0.55, 0, 0.8, 0.3)";
    const FLIP_IN_EASING = "cubic-bezier(0.2, 0.9, 0.3, 1.12)";
    let isJukeboxFlipping = false;
    let frontSyncPending = false;

    // While the back is out the song list isn't rendered, so anything that measures it waits
    function isFrontHidden() {
        return jukeboxPanel.classList.contains("is-flipped") && !jukeboxPanel.classList.contains("is-turning");
    }

    function deferWhileFrontHidden() {
        if (!jukeboxPanel || !isFrontHidden()) return false;
        frontSyncPending = true;
        return true;
    }

    function syncFrontAfterFlip() {
        if (!frontSyncPending) return;
        frontSyncPending = false;
        syncAllTrackCoverHeights();
        syncMarquees();
        syncPlayingTrackStickPosition();
    }

    function setJukeboxSide(showBack) {
        jukeboxPanel.classList.toggle("is-flipped", showBack);
        syncBackTips();
        if (!showBack) {
            if (window.jukebot) {
                window.jukebot.reset();
            }
            syncFrontAfterFlip();
        }
    }

    // Calls back when the panel's turn animation ends (or a good while after it should have, in
    // case the browser skips animation events, e.g. in a background tab)
    function whenJukeboxTurnEnds(animationName, durationMs, callback) {
        let fallback = null;
        const finish = (event) => {
            if (event && (event.target !== jukeboxPanel || event.animationName !== animationName)) return;
            jukeboxPanel.removeEventListener("animationend", finish);
            clearTimeout(fallback);
            callback();
        };
        jukeboxPanel.addEventListener("animationend", finish);
        fallback = setTimeout(finish, durationMs + 1000);
    }

    function flipJukebox(showBack) {
        if (!jukeboxPanel || isJukeboxFlipping || jukeboxPanel.classList.contains("is-flipped") === showBack) return;

        const focusOtherSide = () => {
            const target = jukeboxPanel.querySelector(showBack ? ".back-flip-button" : ".flip-sign");
            if (target) target.focus({ preventScroll: true });
        };

        closeRhythmInvite(false);
        // Jukebot's board is drawn while the page is idle; make sure it's ready before it shows
        if (showBack && window.jukebot) {
            window.jukebot.prepare();
        }

        if (prefersReducedMotion()) {
            setJukeboxSide(showBack);
            turnRecords(showBack ? 180 : 0, 0);
            focusOtherSide();
            return;
        }

        // The record flips over along with the jukebox (its B-side shows while the back is out)
        const dropRecordAfterFlip = liftRecordForFlip();
        const recordTarget = showBack ? 180 : (recordFlipAngle > 90 ? 360 : 0);
        turnRecords((recordFlipAngle + recordTarget) / 2, FLIP_OUT_MS, FLIP_OUT_EASING);

        isJukeboxFlipping = true;
        jukeboxPanel.classList.remove("powered-up");
        jukeboxPanel.classList.add("is-flipping", "flip-out");
        // A frame into the turn (so it starts straight away), draw the side that's coming round,
        // still hidden, so it's ready by the time the jukebox is edge-on
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (isJukeboxFlipping) jukeboxPanel.classList.add("is-turning");
        }));
        whenJukeboxTurnEnds("jukeboxTurnAway", FLIP_OUT_MS, () => {
            // Edge-on: swap sides, then the cabinet and the record turn the rest of the way together
            jukeboxPanel.classList.add("is-turning");
            jukeboxPanel.classList.toggle("is-flipped", showBack);
            jukeboxPanel.classList.replace("flip-out", "flip-in");
            turnRecords(recordTarget, FLIP_IN_MS, FLIP_IN_EASING);
            whenJukeboxTurnEnds("jukeboxTurnBack", FLIP_IN_MS, () => {
                jukeboxPanel.classList.remove("is-flipping", "flip-in", "is-turning");
                setJukeboxSide(showBack);
                isJukeboxFlipping = false;
                dropRecordAfterFlip();
                focusOtherSide();
            });
        });
    }

    // A record that's down pops up so you can see it flip, and drops again afterwards
    function liftRecordForFlip() {
        if (!record || record.classList.contains("up")) return () => {};
        record.classList.add("up");
        return () => {
            setTimeout(() => {
                if (!currentTrackData) {
                    record.classList.remove("up");
                }
            }, 500);
        };
    }

    // ───── LED signs: along the bottom of Jukebot's panel, and the flip sign on phones ─────
    // The words are written twice over so a lap loops without a seam (or once, sitting still, if
    // they fit), and a lap takes as long as its words need, so every sign scrolls at the same pace
    const LED_PIXELS_PER_SECOND = 40;
    const coverLed = document.querySelector(".cover-led");
    const flipSignLed = document.querySelector(".flip-sign-led");
    const ledSignWords = new WeakMap();
    let tickerShowsTips = false; // the panel's too short for the tips card, so they're on its sign

    function writeLedSign(sign, items) {
        const track = sign?.querySelector(".led-sign-track");
        if (!track) return;
        const words = `${sign.clientWidth}\n${items.map(([text, kind]) => `${kind}:${text}`).join("\n")}`;
        if (ledSignWords.get(sign) === words) return;
        ledSignWords.set(sign, words);

        const lap = document.createElement("span");
        lap.className = "led-sign-lap";
        items.forEach(([text, kind]) => {
            const item = document.createElement("span");
            item.className = kind ? `led-sign-item is-${kind}` : "led-sign-item";
            item.textContent = text;
            lap.append(item);
        });
        track.replaceChildren(lap);
        const still = lap.offsetWidth <= sign.clientWidth;
        sign.classList.toggle("is-still", still);
        if (!still) {
            track.append(lap.cloneNode(true));
            track.style.setProperty("--led-seconds", `${Math.max(8, lap.offsetWidth / LED_PIXELS_PER_SECOND).toFixed(1)}s`);
        }
    }

    function refreshLedSigns() {
        const invitation = ["Psst\u2026 flip me around", ""];
        const song = currentTrackData
            ? [`${isPlayerActive() ? "Now spinning" : "Paused"}: ${currentTrackData.title}`, "song"]
            : null;
        writeLedSign(flipSignLed, song ? [song, invitation] : [invitation]);

        const panelItems = [["Muse Tunes", "brand"], song || ["Pick a song, any song", "song"]];
        if (tickerShowsTips) {
            document.querySelectorAll(".back-tip span").forEach((tip) => panelItems.push([`Tip: ${tip.textContent}`, ""]));
        }
        panelItems.push(["Made by Muse", "brand"], ["Play it loud", ""]);
        writeLedSign(coverLed, panelItems);
    }

    function setUpLedSigns() {
        refreshLedSigns();
        // A sign that changes size (a phone turned round) is written again for its new width
        if (typeof ResizeObserver === "function") {
            const observer = new ResizeObserver(() => refreshLedSigns());
            [coverLed, flipSignLed].forEach((sign) => sign && observer.observe(sign));
        }
    }

    // The tips on the back: as many as there's room for under Jukebot's sticker. When they don't
    // all fit they come a page at a time: tap for the next page, and they move on by themselves
    // while the back is out (unless a pointer or focus is on them)
    const TIP_PAGE_SECONDS = 8;
    const MIN_TIPS_PER_PAGE = 3;
    const TIP_COLUMN_MIN_WIDTH = 230; // px: two columns of tips on panels at least twice this wide
    const TIP_MAX_SPREAD = 18; // px: the most extra room between two tips when there's space to fill
    let syncBackTips = () => {};

    function setUpBackTips() {
        const tipsBox = document.querySelector(".back-tips");
        const list = tipsBox?.querySelector(".back-tips-list");
        const tips = list ? Array.from(list.querySelectorAll(".back-tip")) : [];
        const scroller = tipsBox?.parentElement;
        if (!tips.length || !scroller) return;
        const count = tipsBox.querySelector(".back-tips-count");
        const below = tipsBox.nextElementSibling; // the Frog Quest badge, down at the bottom
        let perPage = tips.length;
        let page = 0;
        let timer = null;
        let held = false;

        const pageCount = () => Math.ceil(tips.length / perPage);
        const showPage = (index, direction) => {
            page = (index + pageCount()) % pageCount();
            list.dataset.direction = direction < 0 ? "back" : "forward";
            tips.forEach((tip, tipIndex) => {
                const order = tipIndex - (page * perPage);
                const shown = order >= 0 && order < perPage;
                tip.classList.toggle("is-shown", shown);
                tip.classList.toggle("is-entering", shown && direction !== 0);
                tip.style.setProperty("--tip-order", shown ? order : 0);
            });
            if (count) count.textContent = `${page + 1} / ${pageCount()}`;
        };

        // The tallest page if the tips go so many to a page, in so many columns
        const tallestPage = (heights, pageSize, columns, rowGap) => {
            let tallest = 0;
            for (let first = 0; first < heights.length; first += pageSize) {
                const last = Math.min(first + pageSize, heights.length);
                let height = -rowGap;
                for (let row = first; row < last; row += columns) {
                    height += rowGap + Math.max(...heights.slice(row, Math.min(row + columns, last)));
                }
                tallest = Math.max(tallest, height);
            }
            return tallest;
        };

        // How many tips fit: the list gets the room it has now plus the space left over below the
        // card (less anything already overflowing). They go in one column, or two on a wide panel
        // if that needs fewer pages, and the card takes the tallest page's height so it keeps its
        // size as they turn.
        const fitTips = () => {
            if (!scroller.clientHeight) return;
            // (measured with the card in its place)
            tipsBox.classList.remove("is-ticker");
            scroller.classList.remove("has-tip-ticker");
            const gap = parseFloat(getComputedStyle(scroller).rowGap) || 0;
            const spare = below ? below.offsetTop - (tipsBox.offsetTop + tipsBox.offsetHeight) - gap : 0;
            const overflow = scroller.scrollHeight - scroller.clientHeight;
            const room = list.offsetHeight + Math.max(0, spare) - Math.max(0, overflow);

            tipsBox.classList.remove("is-paged");
            list.style.minHeight = "";
            list.style.rowGap = "";
            const listStyle = getComputedStyle(list);
            const rowGap = parseFloat(listStyle.rowGap) || 0;
            const maxColumns = list.clientWidth >= (2 * TIP_COLUMN_MIN_WIDTH) + (parseFloat(listStyle.columnGap) || 0) ? 2 : 1;
            let best = null;
            let threeTips = 0;
            for (let columns = 1; columns <= maxColumns; columns += 1) {
                list.style.gridTemplateColumns = columns > 1 ? `repeat(${columns}, minmax(0, 1fr))` : "";
                const heights = tips.map((tip) => tip.offsetHeight);
                if (columns === 1) threeTips = tallestPage(heights, MIN_TIPS_PER_PAGE, 1, rowGap);
                for (let pages = 1; pages <= tips.length; pages += 1) {
                    // Pages as even as they can be (not a last page with one tip on it)
                    const pageSize = Math.ceil(tips.length / pages);
                    if (Math.ceil(tips.length / pageSize) !== pages) continue;
                    const height = tallestPage(heights, pageSize, columns, rowGap);
                    if (height <= room + 1 || pageSize <= MIN_TIPS_PER_PAGE) {
                        if (!best || pages < best.pages) best = { columns, pages, pageSize, height };
                        break;
                    }
                }
            }
            // Not even a page of three fits (a short screen): they go along the LED sign instead, and
            // the card's only kept for screen readers
            const onSign = room + 1 < threeTips && !prefersReducedMotion();
            if (onSign) best = { columns: 1, pages: 1, pageSize: tips.length, height: 0 };

            // The card fills the rest of the panel, and the tips spread out over it (up to a point) so
            // it isn't left with an empty end
            const rows = Math.ceil((best.pages > 1 ? best.pageSize : tips.length) / best.columns);
            const spreadGap = onSign ? rowGap : rowGap + Math.min(TIP_MAX_SPREAD, Math.max(0, room - best.height) / (rows + 1));
            list.style.gridTemplateColumns = best.columns > 1 ? `repeat(${best.columns}, minmax(0, 1fr))` : "";
            list.style.rowGap = spreadGap > rowGap ? `${spreadGap.toFixed(1)}px` : "";
            list.style.minHeight = best.pages > 1 ? `${Math.ceil(best.height + ((rows - 1) * (spreadGap - rowGap)))}px` : "";
            tipsBox.classList.toggle("is-paged", best.pages > 1);
            tipsBox.classList.toggle("is-ticker", onSign);
            scroller.classList.toggle("has-tip-ticker", onSign);
            if (onSign !== tickerShowsTips) {
                tickerShowsTips = onSign;
                refreshLedSigns();
            }
            if (best.pageSize !== perPage) {
                const firstShown = page * perPage;
                perPage = best.pageSize;
                showPage(Math.floor(firstShown / perPage), 0);
                syncBackTips();
            }
        };

        syncBackTips = () => {
            clearInterval(timer);
            timer = null;
            if (held || pageCount() < 2 || document.hidden || prefersReducedMotion() || !jukeboxPanel.classList.contains("is-flipped")) return;
            timer = setInterval(() => showPage(page + 1, 1), TIP_PAGE_SECONDS * 1000);
        };
        const step = (direction) => {
            if (pageCount() < 2) return;
            showPage(page + direction, direction);
            syncBackTips();
        };

        tipsBox.querySelectorAll("[data-tip-step]").forEach((button) => {
            button.addEventListener("click", () => step(Number(button.dataset.tipStep)));
        });
        list.addEventListener("click", () => step(1));
        const hold = (isHeld) => {
            held = isHeld;
            syncBackTips();
        };
        tipsBox.addEventListener("pointerenter", () => hold(true));
        tipsBox.addEventListener("pointerleave", () => hold(tipsBox.contains(document.activeElement)));
        tipsBox.addEventListener("focusin", () => hold(true));
        tipsBox.addEventListener("focusout", (event) => hold(tipsBox.contains(event.relatedTarget)));
        document.addEventListener("visibilitychange", () => syncBackTips());

        // Fit again whenever the room changes: the panel's size, or anything else in it (Jukebot's
        // sticker grows during a repair job, and the text and badge settle once they've loaded)
        if (typeof ResizeObserver === "function") {
            const observer = new ResizeObserver(fitTips);
            observer.observe(scroller);
            Array.from(scroller.children).forEach((child) => {
                if (child !== tipsBox) observer.observe(child);
            });
        } else {
            fitTips();
            window.addEventListener("resize", fitTips);
        }
        // The tips' own text settles once its font has loaded
        if (document.fonts) {
            document.fonts.addEventListener("loadingdone", fitTips);
            document.fonts.ready.then(fitTips);
        }
    }

    function setUpJukeboxBack() {
        if (!jukeboxPanel) return;
        setUpLedSigns();
        setUpBackTips();

        document.querySelectorAll("[data-flip-jukebox]").forEach((button) => {
            button.addEventListener("click", () => flipJukebox(button.dataset.flipJukebox === "back"));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && jukeboxPanel.classList.contains("is-flipped") && !coverModal?.classList.contains("active")) {
                flipJukebox(false);
            }
        });

        // Jukebot fixed: the jukebox powers up and the record does a victory spin
        document.addEventListener("jukebot:fixed", () => {
            jukeboxPanel.classList.remove("powered-up");
            void jukeboxPanel.offsetWidth;
            jukeboxPanel.classList.add("powered-up");
            setTimeout(() => jukeboxPanel.classList.remove("powered-up"), 1300);
            showOffRecordSpin(1080, 1400);
        });

        // Jukebot's secret turns the record gold: turn around to show it off
        document.addEventListener("jukebot:secret", (event) => {
            if (!event.detail || !event.detail.gold) return;
            setTimeout(() => {
                if (!jukeboxPanel.classList.contains("is-flipped")) return;
                flipJukebox(false);
                setTimeout(() => showOffRecordSpin(1080, 1400), FLIP_OUT_MS + FLIP_IN_MS + 100);
            }, 2200);
        });
    }

    continuousPlayEnabled = readPlaybackModePreference("museJukeboxContinuousPlay");
    repeatOneEnabled = !continuousPlayEnabled && readPlaybackModePreference("museJukeboxRepeatOne");
    shuffleEnabled = readPlaybackModePreference("museJukeboxShuffle");
    syncDeckLooping();
    setUpPlayerEvents();
    setUpMediaSession();
    setUpNowPlayingControls();
    setUpSongWaves();
    setUpJukeboxBack();
    setUpSideRail();
    setUpRecordScratching();
    setUpRhythm();

    // Initial population of filter and track list.
    // Populate tags first so the dropdown has its final option set before skeleton/track content appears.
    populateTagFilter(tracks);
    if (tagFilter) {
        tagFilter.value = "all";
    }
    if (sortFilter) {
        sortFilter.value = "newest";
    }
    showTrackListSkeleton();
    const sortedTracks = sortTracks(getFilteredTracks("all"), sortFilter ? sortFilter.value : "newest");
    preloadTopTrackCovers(sortedTracks);
    warmUpcomingTrackCovers(sortedTracks);
    populateTrackList(sortedTracks);

    if (document.fonts?.ready) {
        document.fonts.ready.then(() => requestAnimationFrame(syncMarquees));
    }
    if (window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches) {
        document.documentElement.classList.add("is-standalone");
    }
    setWhereBackgroundOpacity(0);
    updateWhereBackgroundFromPlayback();
    updatePlaybackModeButtons();
    applyMobileViewportLock();

    trackList.addEventListener("scroll", syncPlayingTrackStickPosition, { passive: true });
    trackList.addEventListener("touchstart", stopTrackListScrollAnimation, { passive: true });
    trackList.addEventListener("pointerdown", stopTrackListScrollAnimation, { passive: true });
    trackList.addEventListener("wheel", stopTrackListScrollAnimation, { passive: true });
    window.addEventListener("orientationchange", () => {
        setTimeout(scheduleMobileViewportLock, 80);
        setTimeout(updateSideRailLayout, 120);
    });
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            scheduleMobileViewportLock();
            // Songs may have advanced while the screen was off
            updateWhereBackgroundFromPlayback();
            requestSongBeats(currentTrackData);
            startBeatVisuals();
            const currentTrack = getCurrentTrackElement();
            if (currentTrack) {
                scrollTrackIntoViewWithinList(currentTrack, { behavior: "auto", margin: 8 });
            }
        }
    });
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", scheduleMobileViewportLock, { passive: true });
        window.visualViewport.addEventListener("scroll", scheduleMobileViewportLock, { passive: true });
    }
    window.addEventListener("scroll", scheduleMobileViewportLock, { passive: true });
    // A dropdown's picker can leave the screen offset once it's gone (see getVisualViewportShift),
    // and Safari may only settle after its closing animation
    document.addEventListener("focusout", (event) => {
        if (!(event.target instanceof Element) || !event.target.matches("select, input, textarea")) return;
        scheduleMobileViewportLock();
        setTimeout(scheduleMobileViewportLock, 350);
        setTimeout(scheduleMobileViewportLock, 900);
    });

    window.addEventListener("resize", () => {
        requestAnimationFrame(() => {
            syncAllTrackCoverHeights();
            syncMarquees();
            syncPlayingTrackStickPosition();
            scheduleMobileViewportLock();
            updateSideRailLayout();
            if (coverModal && coverModal.classList.contains("active")) {
                updateModalImageFrameFromNaturalSize();
            }
        });
    });
});
