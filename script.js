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
    const jukeboxContainer = document.getElementById("jukebox-container");
    const jukeboxGlow = document.getElementById("jukebox-glow");
    const musicNotes = document.getElementById("music-notes");
    const speakerCones = Array.from(document.querySelectorAll(".speaker-cone"));
    const titlePenguins = Array.from(document.querySelectorAll(".title-penguin"));
    const npCover = document.getElementById("np-cover");
    const npBackdrop = document.getElementById("np-backdrop");
    const npEyebrow = document.getElementById("np-eyebrow");
    const npTitle = document.getElementById("np-title");
    const npSub = document.getElementById("np-sub");
    const npSeek = document.getElementById("np-seek");
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
    const KEEP_PLAYING_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 11.5V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12.5V14a4 4 0 0 1-4 4h-13"/></svg>`;
    const CLEAR_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>`;
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

    // One shared player for every song, so playback can keep going in the background
    const player = new Audio();
    player.preload = "auto";
    let currentTrackData = null;
    let isSwitchingTrack = false;
    let scratch = null; // the record currently held for DJ scratching
    let isSpinning = false;
    let rotationAngle = 0; // Declare rotationAngle here
    let recordFlipAngle = 0; // 0 = A-side facing out, 180 = B-side (jukebox turned around)
    let recordFlipFrame = null;
    let spinRequest; // Declare spinRequest here
    let whereCurrentOpacity = 0;
    let whereTargetOpacity = 0;
    let whereFadeFrame = null;
    let whereFadeStartOpacity = 0;
    let whereFadeStartTime = null;
    let whereFadeDurationMs = 0;
    let recordSeekNudgeFrame = null;
    let viewportLockFrame = null;
    let trackListScrollAnimationFrame = null;
    let trackListScrollAnimationResolve = null;
    let trackListScrollAnimationId = 0;
    let randomPlayRequestId = 0;
    let continuousPlayEnabled = false;
    let shuffleEnabled = false;
    let npShownTrack;
    let npSeekDragging = false;
    const TRACK_PLAYING_FADE_OUT_MS = 220;
    // Keep in sync with the full-height layout media queries in styles.css
    const APP_LAYOUT_QUERY = "(max-width: 600px), (orientation: portrait) and (pointer: coarse) and (max-width: 1100px), (orientation: landscape) and (pointer: coarse)";

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

    function applyMobileViewportLock() {
        if (!isAppLayoutViewport()) {
            document.documentElement.style.removeProperty("--app-height");
            document.documentElement.classList.remove("viewport-short");
            return;
        }

        // When the window gets short (e.g. a keyboard is up), keep the jukebox full size
        // and let the page scroll instead of squashing the song list to nothing
        const viewportHeight = getMobileViewportHeight();
        const minimumHeight = getMinimumAppHeight();
        const isShort = viewportHeight < minimumHeight;
        document.documentElement.classList.toggle("viewport-short", isShort);
        document.documentElement.style.setProperty("--app-height", `${Math.max(viewportHeight, minimumHeight)}px`);
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
        return trackList.querySelector(`.track[data-file="${CSS.escape(currentTrackData.file)}"]`);
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
        const timeDisplay = trackElement.querySelector(".time-display");
        if (timeDisplay) {
            timeDisplay.classList.remove("visible");
            resetTimeDisplay(timeDisplay);
        }
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
        if (!currentTrackData) return;
        stopCurrentPlayback();
        player.removeAttribute("src");
        player.load();
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

    // Called when a track finishes and "keep playing" is on, or Next is pressed
    function playNextTrackAfter(finishedTrack) {
        if (shuffleEnabled) {
            playRandomVisibleTrack(finishedTrack, { immediate: true });
            return;
        }

        const visibleTracks = getVisibleTracks();
        if (visibleTracks.length === 0) return;

        const finishedIndex = visibleTracks.indexOf(finishedTrack);
        const nextTrack = visibleTracks[(finishedIndex + 1) % visibleTracks.length];
        playTrackElement(nextTrack, { immediate: true });
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
            element.classList.toggle("shuffle-on", shuffleEnabled);
        });
        document.querySelectorAll(".mode-button--continuous, #np-continuous").forEach((button) => {
            button.setAttribute("aria-pressed", String(continuousPlayEnabled));
        });
        document.querySelectorAll(".mode-button--shuffle, #np-shuffle").forEach((button) => {
            button.setAttribute("aria-pressed", String(shuffleEnabled));
        });
    }

    // Only the current song shows the keep-playing / shuffle buttons
    function showModeButtonsOnTrack(trackElement) {
        trackList.querySelectorAll(".track.track-modes-visible").forEach((element) => {
            if (element !== trackElement) {
                element.classList.remove("track-modes-visible");
            }
        });
        if (trackElement) {
            trackElement.classList.add("track-modes-visible");
        }
        // The x narrows the title, so re-check which titles need to scroll
        requestAnimationFrame(syncTitleMarquees);
    }

    function toggleContinuousPlay() {
        continuousPlayEnabled = !continuousPlayEnabled;
        savePlaybackModePreference("museJukeboxContinuousPlay", continuousPlayEnabled);
        updatePlaybackModeButtons();
    }

    function toggleShuffle() {
        shuffleEnabled = !shuffleEnabled;
        savePlaybackModePreference("museJukeboxShuffle", shuffleEnabled);
        updatePlaybackModeButtons();
    }

    function setWhereBackgroundOpacity(opacityValue) {
        if (!whereBackground) return;
        whereBackground.style.opacity = opacityValue.toFixed(4);
    }

    function updateRecordTransform() {
        const transform = `perspective(900px) rotateY(${recordFlipAngle.toFixed(2)}deg) rotate(${rotationAngle.toFixed(2)}deg)`;
        const spin = `${rotationAngle.toFixed(2)}deg`;
        [recordDisc, npRecordDisc].forEach((disc) => {
            if (!disc) return;
            disc.style.transform = transform;
            // The edge counter-rotates so it always reads as the rim when the disc is edge-on
            disc.style.setProperty("--record-spin", spin);
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

        const duration = player.duration;
        const previousTime = player.currentTime;
        const maxSeekTime = Number.isFinite(duration) ? duration : Math.max(player.currentTime, 0);
        const nextTime = Math.min(Math.max(player.currentTime + offsetSeconds, 0), maxSeekTime);
        player.currentTime = nextTime;
        const appliedSeekOffset = nextTime - previousTime;

        const activeTimeDisplay = getCurrentTrackElement()?.querySelector(".time-display");
        if (activeTimeDisplay && Number.isFinite(player.duration)) {
            setTimeDisplayReady(player, activeTimeDisplay, nextTime);
            activeTimeDisplay.classList.add("visible");
        }

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

        const currentTrack = getCurrentTrackElement();
        const currentButton = currentTrack?.querySelector(".play-button");
        const currentTimeDisplay = currentTrack?.querySelector(".time-display");

        if (currentTimeDisplay) {
            currentTimeDisplay.classList.add("visible");
            if (player.readyState < 1 || !Number.isFinite(player.duration)) {
                setTimeDisplayLoading(currentTimeDisplay);
            } else {
                setTimeDisplayReady(player, currentTimeDisplay);
            }
        }

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
        const previousTrack = getCurrentTrackElement();
        // Switching while a song is playing gets the record whirl (like a record changer)
        const switchingWhilePlaying = options.flourish
            || (isPlayerActive() && Boolean(currentTrackData) && currentTrackData.file !== track.file);

        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
            volumeFadeInterval = null;
        }

        if (previousTrack && currentTrackData.file !== track.file) {
            resetTrackElementUi(previousTrack);
        }

        isSwitchingTrack = true;
        currentTrackData = track;
        const trackElement = getCurrentTrackElement();
        const timeDisplay = trackElement?.querySelector(".time-display");
        showModeButtonsOnTrack(trackElement);
        if (timeDisplay) {
            timeDisplay.classList.add("visible");
            setTimeDisplayLoading(timeDisplay);
        }
        setPlayButtonLabel(trackElement?.querySelector(".play-button"), "Pause");

        const startingInBackground = document.hidden;
        player.src = track.file;
        player.volume = startingInBackground ? 1 : 0;
        const playbackStartTime = performance.now() + 300;
        const playPromise = player.play();

        updateMediaSessionMetadata(track);
        updatePlayingTrackStickyState();
        updateNowPlaying();

        if (startingInBackground) {
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
            if (startingInBackground) return;
            const remainingDelay = Math.max(0, playbackStartTime - performance.now());
            setTimeout(() => {
                if (currentTrackData !== track || player.paused) {
                    player.volume = 1;
                    return;
                }
                const revealAudioAtBeginning = () => {
                    player.removeEventListener("seeked", revealAudioAtBeginning);
                    if (currentTrackData === track && !player.paused) {
                        player.volume = 1;
                    }
                };

                player.addEventListener("seeked", revealAudioAtBeginning, { once: true });
                player.currentTime = 0;
                if (!player.seeking) {
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
                    player.volume = 1;
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

    function handleTrackPlayButton(track) {
        if (currentTrackData && currentTrackData.file === track.file) {
            if (player.paused) {
                resumeCurrentTrack();
            } else {
                pauseCurrentTrack();
            }
            return;
        }

        startTrack(track);
    }

    // Shared player events: keep the song card, deck and lock screen in sync
    function setUpPlayerEvents() {
        player.addEventListener("loadstart", () => {
            const timeDisplay = getCurrentTrackElement()?.querySelector(".time-display");
            if (timeDisplay) {
                setTimeDisplayLoading(timeDisplay);
                timeDisplay.classList.add("visible");
            }
        });

        const syncTime = () => {
            const timeDisplay = getCurrentTrackElement()?.querySelector(".time-display");
            if (timeDisplay && Number.isFinite(player.duration)) {
                setTimeDisplayReady(player, timeDisplay);
            }
            updateNowPlayingProgress();
        };
        player.addEventListener("loadedmetadata", () => {
            syncTime();
            updateMediaSessionPosition();
            requestTrackTempo(currentTrackData);
        });
        player.addEventListener("timeupdate", syncTime);
        player.addEventListener("seeked", updateMediaSessionPosition);

        player.addEventListener("play", () => {
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

        player.addEventListener("pause", () => {
            if (player.ended || scratch) return;
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

        player.addEventListener("ended", () => {
            if (!currentTrackData) return;
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

            currentTrackData = null;
            showModeButtonsOnTrack(null);
            if ("mediaSession" in navigator) {
                navigator.mediaSession.playbackState = "none";
            }
            updateWhereBackgroundFromPlayback();
        });

        player.addEventListener("error", () => {
            if (!currentTrackData) return;
            const trackElement = getCurrentTrackElement();
            const timeDisplay = trackElement?.querySelector(".time-display");
            if (timeDisplay) {
                timeDisplay.classList.remove("loading");
                timeDisplay.classList.add("ready", "visible");
                timeDisplay.textContent = "unavailable";
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

        if (track !== npShownTrack) {
            npShownTrack = track;
            if (npEyebrow) npEyebrow.textContent = track ? "Now playing" : "Muse Jukebox";
            if (npTitle) npTitle.textContent = track ? track.title : "Pick a song";
            if (npSub) {
                npSub.textContent = track
                    ? [track.date, ...(track.game ? [track.game.name] : track.tags)].join(" \u00b7 ")
                    : "Press play and let the jukebox spin";
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

    function updateNowPlayingProgress() {
        if (railRingProgress) {
            const progress = currentTrackData && Number.isFinite(player.duration) && player.duration > 0
                ? player.currentTime / player.duration
                : 0;
            railRingProgress.style.strokeDashoffset = String(RAIL_RING_LENGTH * (1 - Math.min(1, progress)));
        }
        if (!nowPlaying || !npSeek) return;

        const duration = currentTrackData && Number.isFinite(player.duration) ? player.duration : 0;
        if (!npSeekDragging) {
            const position = currentTrackData ? player.currentTime : 0;
            npSeek.value = duration ? Math.round((position / duration) * 1000) : 0;
            if (npElapsed) npElapsed.textContent = formatTime(position);
        }
        npSeek.style.setProperty("--progress", `${npSeek.value / 10}%`);
        npSeek.disabled = !duration;
        if (npDuration) npDuration.textContent = duration ? formatTime(duration) : "--:--";
    }

    function setUpNowPlayingControls() {
        if (!nowPlaying) return;

        npPlay?.addEventListener("click", togglePlayback);
        npRecord?.addEventListener("click", togglePlayback);
        npPrev?.addEventListener("click", playPreviousTrack);
        npNext?.addEventListener("click", playNextTrack);
        npContinuous?.addEventListener("click", toggleContinuousPlay);
        npClear?.addEventListener("click", clearCurrentTrack);
        npShuffle?.addEventListener("click", toggleShuffle);

        if (npSeek) {
            npSeek.addEventListener("input", () => {
                npSeekDragging = true;
                const duration = Number.isFinite(player.duration) ? player.duration : 0;
                npSeek.style.setProperty("--progress", `${npSeek.value / 10}%`);
                if (npElapsed) npElapsed.textContent = formatTime((npSeek.value / 1000) * duration);
            });
            npSeek.addEventListener("change", () => {
                npSeekDragging = false;
                if (currentTrackData && Number.isFinite(player.duration)) {
                    player.currentTime = (npSeek.value / 1000) * player.duration;
                }
                updateNowPlayingProgress();
            });
        }
    }

    let accelerationRequest; // New variable to track acceleration frame

    // Modify startSpinning to implement smooth acceleration (like a record starting)
    function startSpinning() {
        if (isSpinning) return;
        isSpinning = true;
        let currentSpeed = currentRotationSpeed || 0; // Start from current speed (might be decelerating)
        const targetSpeed = 0.5;
        const accelerationRate = 0.008; // More subtle acceleration

        function accelerate() {
            if (isSpinning) {
                // Gradually accelerate to target speed
                if (currentSpeed < targetSpeed) {
                    currentSpeed = Math.min(currentSpeed + accelerationRate, targetSpeed);
                }
                
                if (!scratch) {
                    rotationAngle = (rotationAngle + currentSpeed) % 360;
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

        function decelerate() {
            if (deceleration > 0) {
                if (!scratch) {
                    rotationAngle = (rotationAngle + deceleration) % 360;
                    updateRecordTransform();
                }
                deceleration -= 0.015; // More subtle deceleration
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

    function setTimeDisplayLoading(timeDisplay) {
        timeDisplay.classList.remove("ready", "ready-fade");
        timeDisplay.classList.add("loading");
        timeDisplay.textContent = "loading";
    }

    function triggerTimeDisplayFade(timeDisplay) {
        timeDisplay.classList.remove("ready-fade");
        void timeDisplay.offsetWidth;
        timeDisplay.classList.add("ready-fade");
    }

    function setTimeDisplayReady(audio, timeDisplay, currentTime = audio.currentTime) {
        if (!Number.isFinite(audio.duration)) return;
        const wasLoading = timeDisplay.classList.contains("loading");
        const formattedCurrentTime = formatTime(currentTime);
        const formattedDuration = formatTime(audio.duration);
        timeDisplay.innerHTML = `${formattedCurrentTime}<span class="time-total"> / ${formattedDuration}</span>`;
        timeDisplay.classList.remove("loading");
        timeDisplay.classList.add("ready");
        if (wasLoading) {
            triggerTimeDisplayFade(timeDisplay);
        }
    }

    function resetTimeDisplay(timeDisplay) {
        timeDisplay.classList.remove("loading", "ready", "ready-fade");
        timeDisplay.innerHTML = '0:00<span class="time-total"> / --:--</span>';
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
        showModeButtonsOnTrack(trackElement);
        if (!trackElement) return;

        const label = player.paused ? "Play" : "Pause";
        const playButton = trackElement.querySelector(".play-button");
        playButton.dataset.label = label;
        playButton.innerHTML = splitIntoLetters(label);

        const timeDisplay = trackElement.querySelector(".time-display");
        timeDisplay.classList.add("visible");
        if (Number.isFinite(player.duration)) {
            setTimeDisplayReady(player, timeDisplay);
        } else {
            setTimeDisplayLoading(timeDisplay);
        }
    }

    function populateTrackList(tracks) {
        trackList.classList.remove("skeleton-loading", "tracks-ready");
        trackList.innerHTML = '';

        tracks.forEach((track, index) => {
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
            trackElement.style.setProperty("--track-delay", `${Math.min(index, 14) * 24}ms`);
            trackElement.innerHTML = `
            <img src="${COVER_PLACEHOLDER}" data-preview-src="${previewCover}" data-full-src="${fullCover}" alt="${track.title} Cover" loading="${isTopPriority ? "eager" : "lazy"}" fetchpriority="${isTopPriority ? "high" : "low"}" decoding="async" width="80" height="80">
            <div class="track-info">
            <p class="title"><span class="title-scroll-content"><span class="title-text">${track.title}</span><span class="release-date clickable-tag">${track.date}</span></span></p>
            <p class="tags horizontal-scroll"><span class="tags-scroll-content">${tagMarkup}${gameLinkMarkup}</span></p>
            <div class="playback-controls">
            <button class="play-button">Play</button>
            <button class="mode-button mode-button--continuous" type="button" aria-pressed="false" aria-label="Keep playing songs" title="Keep playing songs">${KEEP_PLAYING_ICON}</button>
            <button class="mode-button mode-button--shuffle" type="button" aria-pressed="false" aria-label="Shuffle songs" title="Shuffle songs">${SHUFFLE_ICON}</button>
            <span class="time-display">0:00<span class="time-total"> / --:--</span></span>
            </div>
            </div>
            <button class="track-clear" type="button" aria-label="Stop and clear this song" title="Stop and clear">${CLEAR_ICON}</button>
            `;
            trackList.appendChild(trackElement);

            const playButton = trackElement.querySelector(".play-button");
            const coverImage = trackElement.querySelector("img");
            trackElement.querySelector(".mode-button--continuous").addEventListener("click", toggleContinuousPlay);
            trackElement.querySelector(".mode-button--shuffle").addEventListener("click", toggleShuffle);
            trackElement.querySelector(".track-clear").addEventListener("click", clearCurrentTrack);
            coverImage.classList.toggle("cover-grayscale", Boolean(track.grayscaleCover));

            
            // Initialize button with letter spans
            playButton.innerHTML = splitIntoLetters("Play");
            playButton.dataset.label = "Play";
            
            // Add click handler for cover image modal
            coverImage.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent any other click handlers
                if (window.openCoverModal) {
                    window.openCoverModal(fullCover, track.title, coverImage.currentSrc || coverImage.src, Boolean(track.grayscaleCover));
                }
            });
            
            setUpCoverLoad(coverImage, previewCover, isTopPriority);

            playButton.addEventListener("click", () => handleTrackPlayButton(track));
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

    function getFilteredTracks(selectedTag) {
        return selectedTag === "all"
            ? tracks
            : tracks.filter((track) => track.tags.includes(selectedTag) || track.date === selectedTag);
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

    // Find the first real MP3 frame so a slice from the middle of the file decodes cleanly
    function findMp3FrameStart(bytes) {
        for (let index = 0; index < bytes.length - 4; index += 1) {
            if (bytes[index] !== 0xFF || (bytes[index + 1] & 0xE0) !== 0xE0) continue;
            const version = (bytes[index + 1] >> 3) & 3;
            const layer = (bytes[index + 1] >> 1) & 3;
            const bitrateIndex = bytes[index + 2] >> 4;
            const sampleRateIndex = (bytes[index + 2] >> 2) & 3;
            if (version === 1 || layer !== 1 || bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) continue;

            const bitrate = (version === 3 ? MP3_BITRATES_V1 : MP3_BITRATES_V2)[bitrateIndex] * 1000;
            const frameSampleRate = MP3_SAMPLE_RATES[version][sampleRateIndex];
            const padding = (bytes[index + 2] >> 1) & 1;
            const frameLength = Math.floor(((version === 3 ? 144 : 72) * bitrate) / frameSampleRate) + padding;
            const next = index + frameLength;
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
    async function fetchAudioFileInfo(file) {
        if (audioFileInfo.has(file)) return audioFileInfo.get(file);

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
        const info = { total, audioStart };
        audioFileInfo.set(file, info);
        return info;
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
        const timeDisplay = getCurrentTrackElement()?.querySelector(".time-display");
        if (timeDisplay) {
            setTimeDisplayReady(player, timeDisplay, time);
        }
        if (npSeek) {
            npSeek.value = Math.round((time / duration) * 1000);
            npSeek.style.setProperty("--progress", `${npSeek.value / 10}%`);
        }
        if (npElapsed) {
            npElapsed.textContent = formatTime(time);
        }
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

        // Unlock scratch audio on taps that show the visitor wants music
        document.addEventListener("click", (event) => {
            if (event.target.closest(".play-button, .np-button, .rail-button, .record, .np-record, .record-seek-button, #random-track-button")) {
                unlockScratchAudio();
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
    // Phones won't let a page measure the audio it's playing without breaking
    // background playback, so each song's tempo is worked out from a short slice of it.
    const DEFAULT_TEMPO = { period: 60 / 112, firstBeat: 0 };
    const NOTE_COLORS = ["#ffd1f4", "#c7f9ff", "#fff3b0", "#d9dcff", "#ffd8b0"];
    const NOTE_SHAPES = [
        `<svg viewBox="0 0 24 24"><ellipse cx="9.5" cy="18" rx="4" ry="3" transform="rotate(-20 9.5 18)"/><path d="M13.2 18V3.5c1.2 3.2 6 3.8 6 9.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
        `<svg viewBox="0 0 24 24"><ellipse cx="6.5" cy="18.5" rx="3.4" ry="2.6" transform="rotate(-20 6.5 18.5)"/><ellipse cx="16.5" cy="16.5" rx="3.4" ry="2.6" transform="rotate(-20 16.5 16.5)"/><path d="M9.4 18.5V6.2l10-2.6v12.9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.4 6.2l10-2.6v3.2l-10 2.6z"/></svg>`
    ];
    const tempoCache = new Map();
    const tempoRequests = new Set();
    let beatFrame = null;
    let beatLevel = 0;
    let lastBeatIndex = null;

    function detectTempo(buffer, sliceStart) {
        const sampleRate = buffer.sampleRate;
        const mono = new Float32Array(buffer.length);
        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const channelData = buffer.getChannelData(channel);
            for (let index = 0; index < buffer.length; index += 1) {
                mono[index] += channelData[index] / buffer.numberOfChannels;
            }
        }

        // Low-passed energy per ~12ms hop picks out the kick and bass
        const hop = Math.max(1, Math.round(sampleRate * 0.0116));
        const hopSeconds = hop / sampleRate;
        const alpha = 1 - Math.exp((-2 * Math.PI * 160) / sampleRate);
        const frames = Math.floor(mono.length / hop);
        const energy = new Float32Array(frames);
        let low = 0;
        for (let frame = 0; frame < frames; frame += 1) {
            let sum = 0;
            for (let index = frame * hop; index < (frame + 1) * hop; index += 1) {
                low += alpha * (mono[index] - low);
                sum += low * low;
            }
            energy[frame] = Math.sqrt(sum / hop);
        }
        const onset = new Float32Array(frames);
        for (let frame = 1; frame < frames; frame += 1) {
            onset[frame] = Math.max(0, energy[frame] - energy[frame - 1]);
        }

        // Autocorrelate for a tempo between 70 and 180 BPM, leaning towards ~120
        const minLag = Math.round(60 / 180 / hopSeconds);
        const maxLag = Math.min(frames - 1, Math.round(60 / 70 / hopSeconds));
        const scores = [];
        let bestLag = 0;
        let bestScore = 0;
        for (let lag = minLag; lag <= maxLag; lag += 1) {
            let score = 0;
            for (let frame = 0; frame + lag < frames; frame += 1) {
                score += onset[frame] * onset[frame + lag];
            }
            score /= (frames - lag);
            scores[lag] = score;
            const bpm = 60 / (lag * hopSeconds);
            const weighted = score * Math.exp(-0.5 * Math.pow(Math.log2(bpm / 120) / 0.7, 2));
            if (weighted > bestScore) {
                bestScore = weighted;
                bestLag = lag;
            }
        }
        if (!bestLag) throw new Error("No beat found");

        let lag = bestLag;
        const before = scores[bestLag - 1];
        const after = scores[bestLag + 1];
        if (before !== undefined && after !== undefined) {
            const curve = before - (2 * scores[bestLag]) + after;
            if (curve !== 0) lag += (0.5 * (before - after)) / curve;
        }

        // Find where the beats land within the slice
        let bestOffset = 0;
        let bestSum = -1;
        for (let offset = 0; offset < Math.ceil(lag); offset += 1) {
            let sum = 0;
            for (let position = offset; position < frames; position += lag) {
                sum += onset[Math.round(position)] || 0;
            }
            if (sum > bestSum) {
                bestSum = sum;
                bestOffset = offset;
            }
        }

        return { period: lag * hopSeconds, firstBeat: sliceStart + (bestOffset * hopSeconds) };
    }

    async function analyzeTrackTempo(track, duration) {
        const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!OfflineContext) throw new Error("No offline audio");

        const info = await fetchAudioFileInfo(track.file);
        const bytesPerSecond = (info.total - info.audioStart) / duration;
        const sliceLength = Math.min(10, duration);
        const startTime = Math.max(0, Math.min(duration * 0.3, duration - sliceLength));
        const startByte = info.audioStart + Math.floor(startTime * bytesPerSecond);
        const endByte = Math.min(info.total - 1, info.audioStart + Math.ceil((startTime + sliceLength) * bytesPerSecond));

        const response = await fetch(track.file, { headers: { Range: `bytes=${startByte}-${endByte}` } });
        if (response.status !== 206) {
            if (response.body) response.body.cancel();
            throw new Error("Range requests not supported");
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const frameStart = findMp3FrameStart(bytes);
        const decoded = await decodeAudio(new OfflineContext(1, 1, 22050), bytes.slice(frameStart).buffer);
        return detectTempo(decoded, startTime + (frameStart / bytesPerSecond));
    }

    function requestTrackTempo(track) {
        if (!track || document.hidden || tempoCache.has(track.file) || tempoRequests.has(track.file)) return;
        const duration = player.duration;
        if (!Number.isFinite(duration) || duration < 4) return;

        tempoRequests.add(track.file);
        analyzeTrackTempo(track, duration)
            .then((tempo) => tempoCache.set(track.file, tempo))
            .catch(() => tempoCache.set(track.file, null))
            .finally(() => tempoRequests.delete(track.file));
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

    function applyBeatLevel(level, beatIndex) {
        speakerCones.forEach((cone) => {
            cone.style.transform = `scale(${(1 + (level * 0.13)).toFixed(3)})`;
        });
        const sway = beatIndex === null ? 0 : (beatIndex % 2 === 0 ? 1 : -1);
        titlePenguins.forEach((penguin, index) => {
            const facing = index === 0 ? 1 : -1;
            penguin.style.transform = `translateY(${(-level * 5).toFixed(2)}px) rotate(${(sway * facing * level * 7).toFixed(2)}deg)`;
        });
        if (jukeboxGlow) {
            jukeboxGlow.style.opacity = isPlayerActive() ? (0.22 + (level * 0.45)).toFixed(3) : "0";
        }
    }

    function stepBeatVisuals() {
        const playing = isPlayerActive() && Boolean(currentTrackData) && !document.hidden;
        let level = 0;
        let beatIndex = null;

        if (playing) {
            const tempo = tempoCache.get(currentTrackData.file) || DEFAULT_TEMPO;
            const time = scratch ? scratch.targetTime : player.currentTime;
            const beats = (time - tempo.firstBeat) / tempo.period;
            beatIndex = Math.floor(beats);
            const phase = beats - beatIndex;
            const accent = ((beatIndex % 4) + 4) % 4 === 0 ? 1 : 0.7;
            level = Math.exp(-(phase * tempo.period) / 0.12) * accent;
            if (lastBeatIndex !== null && beatIndex === lastBeatIndex + 1) {
                onBeat(beatIndex);
            }
            lastBeatIndex = beatIndex;
        } else {
            lastBeatIndex = null;
        }

        beatLevel = playing ? level : beatLevel * 0.82;
        applyBeatLevel(beatLevel, beatIndex);

        if (playing || beatLevel > 0.01) {
            beatFrame = requestAnimationFrame(stepBeatVisuals);
        } else {
            applyBeatLevel(0, null);
            beatFrame = null;
        }
    }

    function startBeatVisuals() {
        if (beatFrame !== null || prefersReducedMotion()) return;
        beatFrame = requestAnimationFrame(stepBeatVisuals);
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
        const isDeckLayout = window.matchMedia("(orientation: landscape) and (pointer: coarse)").matches;
        const enabled = inset >= RAIL_MIN_INSET && !isDeckLayout;

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
    let isJukeboxFlipping = false;

    function setJukeboxSide(showBack) {
        if (showBack) {
            // The desktop layout sizes to its content, so keep the back as tall as the front
            if (!isAppLayoutViewport()) {
                jukeboxPanel.style.height = window.getComputedStyle(jukeboxPanel).height;
            }
        } else {
            jukeboxPanel.style.height = "";
            if (window.jukebot) {
                window.jukebot.reset();
            }
        }

        jukeboxPanel.classList.toggle("is-flipped", showBack);

        if (!showBack) {
            requestAnimationFrame(() => {
                syncMarquees();
                syncPlayingTrackStickPosition();
            });
        }
    }

    function flipJukebox(showBack) {
        if (!jukeboxPanel || isJukeboxFlipping || jukeboxPanel.classList.contains("is-flipped") === showBack) return;

        const focusOtherSide = () => {
            const target = jukeboxPanel.querySelector(showBack ? ".back-flip-button" : ".flip-sign");
            if (target) target.focus({ preventScroll: true });
        };

        if (prefersReducedMotion()) {
            setJukeboxSide(showBack);
            recordFlipAngle = showBack ? 180 : 0;
            updateRecordTransform();
            focusOtherSide();
            return;
        }

        // The record flips over along with the jukebox (its B-side shows while the back is out)
        flipRecords(showBack);

        isJukeboxFlipping = true;
        jukeboxPanel.classList.add("flip-out");
        setTimeout(() => {
            setJukeboxSide(showBack);
            jukeboxPanel.classList.remove("flip-out");
            jukeboxPanel.classList.add("flip-in-start");
            void jukeboxPanel.offsetWidth;
            jukeboxPanel.classList.remove("flip-in-start");
            jukeboxPanel.classList.add("flip-in");
            setTimeout(() => {
                jukeboxPanel.classList.remove("flip-in");
                isJukeboxFlipping = false;
                focusOtherSide();
            }, 340);
        }, 210);
    }

    function flipRecords(showBack) {
        const wasUp = record ? record.classList.contains("up") : true;
        if (!wasUp) {
            record.classList.add("up");
        }

        const startAngle = recordFlipAngle;
        // Always turn the same way the jukebox does
        const targetAngle = showBack ? 180 : (startAngle > 90 ? 360 : 0);
        const halfTurn = (targetAngle - startAngle) / 2;
        // Same timing as the cabinet: speed up to edge-on, then settle with a little overshoot
        const turnInMs = 210;
        const turnOutMs = 340;
        let startTime = null;
        cancelAnimationFrame(recordFlipFrame);

        const step = (timestamp) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            if (elapsed < turnInMs) {
                const progress = elapsed / turnInMs;
                recordFlipAngle = startAngle + (halfTurn * progress * progress * progress);
            } else {
                const progress = Math.min(1, (elapsed - turnInMs) / turnOutMs) - 1;
                const settle = 1 + (2.2 * progress * progress * progress) + (1.2 * progress * progress);
                recordFlipAngle = startAngle + halfTurn + (halfTurn * settle);
            }
            updateRecordTransform();
            if (elapsed < turnInMs + turnOutMs) {
                recordFlipFrame = requestAnimationFrame(step);
            } else {
                recordFlipAngle = targetAngle % 360;
                updateRecordTransform();
                recordFlipFrame = null;
            }
        };
        recordFlipFrame = requestAnimationFrame(step);

        if (!wasUp) {
            setTimeout(() => {
                if (!currentTrackData) {
                    record.classList.remove("up");
                }
            }, turnInMs + turnOutMs + 500);
        }
    }

    function setUpJukeboxBack() {
        if (!jukeboxPanel) return;

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
    }

    continuousPlayEnabled = readPlaybackModePreference("museJukeboxContinuousPlay");
    shuffleEnabled = readPlaybackModePreference("museJukeboxShuffle");
    setUpPlayerEvents();
    setUpMediaSession();
    setUpNowPlayingControls();
    setUpJukeboxBack();
    setUpSideRail();
    setUpRecordScratching();

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
    const sortedTracks = sortTracks(tracks, sortFilter ? sortFilter.value : "newest");
    preloadTopTrackCovers(sortedTracks);
    warmUpcomingTrackCovers(sortedTracks);
    populateTrackList(sortedTracks);

    if (document.fonts?.ready) {
        document.fonts.ready.then(() => requestAnimationFrame(syncMarquees));
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
            requestTrackTempo(currentTrackData);
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
