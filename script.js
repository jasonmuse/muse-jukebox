// Song data embedded directly into the script
const tracks = [

    {
        "title": "Runaway",
        "file": "audio/runawaynovocals.mp3",
        "cover": "images/runaway.gif",
        "tags": ["Chill", "Ambient", "Lo-fi"],
        "date": "2027"
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
        "date": "2026"
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
        "date": "2024"
    },
    {
        "title": "Frog God",
        "file": "audio/FROGGOD.mp3",
        "cover": "images/Baby_Bowser.png",
        "tags": ["Hype", "Dark", "Mysterious", "Game OST"],
        "date": "2024"
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
        "date": "2024"
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
    const whereBackground = document.getElementById("where-background");
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
    window.openCoverModal = function(imageSrc, title, previewSrc = imageSrc) {
        if (coverModalImage && coverModal) {
            const safeImageSrc = toValidCoverSource(imageSrc);
            const safePreviewSrc = toValidCoverSource(previewSrc);
            activeModalCover = safeImageSrc;
            setSafeImageSource(coverModalImage, safePreviewSrc);
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

    let audioElements = [];
    let isSpinning = false;
    let currentAudio = null;
    let stickyAudio = null;
    let rotationAngle = 0; // Declare rotationAngle here
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
    const TRACK_PLAYING_FADE_OUT_MS = 220;

    function isMobileViewport() {
        return window.matchMedia("(max-width: 600px)").matches;
    }

    function getMobileViewportHeight() {
        const visualViewportHeight = window.visualViewport && Number.isFinite(window.visualViewport.height)
            ? window.visualViewport.height
            : window.innerHeight;
        return Math.max(320, Math.round(visualViewportHeight));
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

    function applyMobileViewportLock() {
        if (!isMobileViewport()) {
            document.documentElement.style.removeProperty("--app-height");
            return;
        }

        document.documentElement.style.setProperty("--app-height", `${getMobileViewportHeight()}px`);

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

        const listRect = trackList.getBoundingClientRect();
        const trackRect = trackElement.getBoundingClientRect();
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

    function updatePlayingTrackStickyState() {
        trackList.querySelectorAll(".track.track-playing").forEach((trackElement) => {
            trackElement.classList.remove("track-playing");
        });

        if (stickyAudio) {
            const stickyTrack = stickyAudio.closest(".track");
            if (stickyAudio.ended || !stickyTrack || !trackList.contains(stickyTrack)) {
                stickyAudio = null;
            }
        }

        if (!stickyAudio && currentAudio && !currentAudio.paused && !currentAudio.ended) {
            stickyAudio = currentAudio;
        }

        if (!stickyAudio) {
            syncPlayingTrackStickPosition();
            return;
        }

        const playingTrack = stickyAudio.closest(".track");
        if (playingTrack && trackList.contains(playingTrack)) {
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

    function stopCurrentPlaybackForRandom() {
        const previousAudio = currentAudio;
        const previousTrack = previousAudio ? previousAudio.closest(".track") : null;

        if (volumeFadeInterval) {
            clearInterval(volumeFadeInterval);
            volumeFadeInterval = null;
        }

        if (previousAudio) {
            previousAudio.pause();
            previousAudio.volume = 1.0;
            previousAudio.currentTime = 0;

            const previousButton = previousAudio.parentElement?.querySelector(".play-button");
            if (previousButton) {
                animateTextChange(previousButton, "Play");
            }

            const previousTimeDisplay = previousAudio.parentElement?.querySelector(".time-display");
            if (previousTimeDisplay) {
                previousTimeDisplay.classList.remove("visible");
                resetTimeDisplay(previousTimeDisplay);
            }

            if (stickyAudio === previousAudio) {
                stickyAudio = null;
            }

            currentAudio = null;
        } else if (stickyAudio) {
            stickyAudio = null;
        }

        if (previousTrack) {
            triggerTrackPlayingFadeOut(previousTrack);
        }

        stopSpinning();
        if (record) {
            record.classList.remove("up");
        }
        updateWhereBackgroundFromPlayback();

        return previousTrack;
    }

    async function playRandomVisibleTrack(excludedTrack = null) {
        const visibleTracks = Array.from(trackList.querySelectorAll(".track"))
            .filter((trackElement) => !trackElement.classList.contains("track-skeleton"));

        if (visibleTracks.length === 0) {
            return;
        }

        let blockedTrack = excludedTrack;
        if (!blockedTrack && currentAudio) {
            blockedTrack = currentAudio.closest(".track");
        }

        let candidates = visibleTracks;
        if (blockedTrack && visibleTracks.length > 1) {
            const nonBlockedTracks = visibleTracks.filter((trackElement) => trackElement !== blockedTrack);
            if (nonBlockedTracks.length > 0) {
                candidates = nonBlockedTracks;
            }
        }

        const targetTrack = candidates[Math.floor(Math.random() * candidates.length)];
        const requestId = ++randomPlayRequestId;
        await scrollTrackIntoViewWithinList(targetTrack, {
            behavior: "smooth",
            margin: isMobileViewport() ? 8 : 12
        });

        if (requestId !== randomPlayRequestId || !trackList.contains(targetTrack)) {
            return;
        }

        const playButton = targetTrack.querySelector(".play-button");
        if (!playButton) return;
        playButton.click();
        scheduleMobileViewportLock();
    }

    function setWhereBackgroundOpacity(opacityValue) {
        if (!whereBackground) return;
        whereBackground.style.opacity = opacityValue.toFixed(4);
    }

    function updateRecordTransform() {
        if (!record) return;
        record.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;
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
        const hasActivePlayback = audioElements.some((audioElement) => !audioElement.paused && !audioElement.ended);
        setWhereBackgroundTargetOpacity(hasActivePlayback ? 1 : 0);
        setRecordSeekControlsVisible(hasActivePlayback);
        updatePlayingTrackStickyState();
    }

    function seekCurrentAudioBy(offsetSeconds) {
        if (!currentAudio || !Number.isFinite(currentAudio.currentTime)) return;

        const duration = currentAudio.duration;
        const previousTime = currentAudio.currentTime;
        const maxSeekTime = Number.isFinite(duration) ? duration : Math.max(currentAudio.currentTime, 0);
        const nextTime = Math.min(Math.max(currentAudio.currentTime + offsetSeconds, 0), maxSeekTime);
        currentAudio.currentTime = nextTime;
        const appliedSeekOffset = nextTime - previousTime;

        const activeTimeDisplay = currentAudio.parentElement?.querySelector(".time-display");
        if (activeTimeDisplay && Number.isFinite(currentAudio.duration)) {
            setTimeDisplayReady(currentAudio, activeTimeDisplay, nextTime);
            activeTimeDisplay.classList.add("visible");
        }

        nudgeRecordForSeek(appliedSeekOffset);
    }

    function nudgeRecordForSeek(appliedSeekOffsetSeconds) {
        if (!record || !Number.isFinite(appliedSeekOffsetSeconds) || appliedSeekOffsetSeconds === 0) return;

        const direction = Math.sign(appliedSeekOffsetSeconds);
        const tenSecondUnits = Math.abs(appliedSeekOffsetSeconds) / 10;
        const turnsPerTenSeconds = 2.25;
        const totalDegrees = direction * turnsPerTenSeconds * tenSecondUnits * 360;
        const durationMs = 170;

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

    function toggleCurrentTrackFromRecord() {
        if (!currentAudio) return;

        const currentButton = currentAudio.parentElement?.querySelector(".play-button");
        const currentTimeDisplay = currentAudio.parentElement?.querySelector(".time-display");

        if (currentAudio.paused) {
            if (currentTimeDisplay) {
                currentTimeDisplay.classList.add("visible");
                if (currentAudio.readyState < 1 || !Number.isFinite(currentAudio.duration)) {
                    setTimeDisplayLoading(currentTimeDisplay);
                } else {
                    setTimeDisplayReady(currentAudio, currentTimeDisplay);
                }
            }

            record.classList.add("up");
            startSpinning();
            const playPromise = currentAudio.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {
                    if (currentButton) {
                        animateTextChange(currentButton, "Play");
                    }
                });
            }
            fadeInAudio(currentAudio);
            if (currentButton) {
                animateTextChange(currentButton, "Pause");
            }
            return;
        }

        fadeOutAudio(currentAudio, () => {});
        stopSpinning();
        if (currentButton) {
            animateTextChange(currentButton, "Play");
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
                
                rotationAngle = (rotationAngle + currentSpeed) % 360;
                updateRecordTransform();
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
                rotationAngle = (rotationAngle + deceleration) % 360;
                updateRecordTransform();
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
        switchSound.play();
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
        timeDisplay.textContent = `${formattedCurrentTime} / ${formattedDuration}`;
        timeDisplay.classList.remove("loading");
        timeDisplay.classList.add("ready");
        if (wasLoading) {
            triggerTimeDisplayFade(timeDisplay);
        }
    }

    function resetTimeDisplay(timeDisplay) {
        timeDisplay.classList.remove("loading", "ready", "ready-fade");
        timeDisplay.textContent = "0:00 / --:--";
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
    function populateTrackList(tracks) {
        trackList.classList.remove("skeleton-loading", "tracks-ready");
        trackList.innerHTML = '';
        audioElements = [];

        tracks.forEach((track, index) => {
            const previewCover = getTrackCoverPreview(track);
            const fullCover = getTrackCoverFull(track);
            const isTopPriority = index < 4;
            const trackElement = document.createElement("div");
            trackElement.classList.add("track", "track-enter");
            trackElement.style.setProperty("--track-delay", `${Math.min(index, 14) * 24}ms`);
            trackElement.innerHTML = `
            <img src="${COVER_PLACEHOLDER}" data-preview-src="${previewCover}" data-full-src="${fullCover}" alt="${track.title} Cover" loading="${isTopPriority ? "eager" : "lazy"}" fetchpriority="${isTopPriority ? "high" : "low"}" decoding="async" width="80" height="80">
            <div class="track-info">
            <p class="title horizontal-scroll"><span class="title-text">${track.title}</span><span class="release-date clickable-tag">${track.date}</span></p>
            <p class="tags horizontal-scroll">${track.tags.map(tag => `<span class="tag-bubble clickable-tag">${tag}</span>`).join('')}</p>
            <div class="playback-controls">
            <button class="play-button">Play</button>
            <span class="time-display">0:00 / --:--</span>
            </div>
            <audio data-src="${track.file}" preload="none" style="display: none;"></audio>
            </div>
            `;
            trackList.appendChild(trackElement);

            const audio = trackElement.querySelector("audio");
            const playButton = trackElement.querySelector(".play-button");
            const timeDisplay = trackElement.querySelector(".time-display");
            const coverImage = trackElement.querySelector("img");

            
            // Initialize button with letter spans
            playButton.innerHTML = splitIntoLetters("Play");
            
            // Add click handler for cover image modal
            coverImage.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent any other click handlers
                if (window.openCoverModal) {
                    window.openCoverModal(fullCover, track.title, coverImage.currentSrc || coverImage.src);
                }
            });
            
            audioElements.push(audio);
            setUpCoverLoad(coverImage, previewCover, isTopPriority);

            // Play/pause logic for the custom button
            playButton.addEventListener("click", () => {
                if (currentAudio && currentAudio !== audio) {
                    const prevButton = currentAudio.parentElement.querySelector(".play-button");
                    const prevTimeDisplay = currentAudio.parentElement.querySelector(".time-display");
                    
                    // Stop any ongoing audio effects
                    if (volumeFadeInterval) {
                        clearInterval(volumeFadeInterval);
                        volumeFadeInterval = null;
                    }
                    
                    // Immediately pause previous track (switching tracks)
                    currentAudio.pause();
                    currentAudio.volume = 1.0;
                    currentAudio.currentTime = 0;
                    
                    // Smooth letter-by-letter text transition for previous button
                    animateTextChange(prevButton, "Play");
                    
                    prevTimeDisplay.classList.remove("visible");
                    resetTimeDisplay(prevTimeDisplay);
                }

                if (audio.paused) {
                    if (currentAudio !== audio) {
                        if (!audio.src) {
                            audio.src = audio.getAttribute("data-src");
                        }
                        currentAudio = audio;
                        timeDisplay.classList.add("visible");
                        if (audio.readyState < 1 || !Number.isFinite(audio.duration)) {
                            setTimeDisplayLoading(timeDisplay);
                        } else {
                            setTimeDisplayReady(audio, timeDisplay, 0);
                        }

                        moveRecordDownAndUp(() => startSpinning());
                        setTimeout(() => {
                            const playPromise = audio.play();
                            if (playPromise && typeof playPromise.catch === "function") {
                                playPromise.catch(() => {
                                    animateTextChange(playButton, "Play");
                                    resetTimeDisplay(timeDisplay);
                                    timeDisplay.classList.remove("visible");
                                    currentAudio = null;
                                    updateWhereBackgroundFromPlayback();
                                });
                            }
                            fadeInAudio(audio); // Fade in audio volume
                        }, 300);
                    } else {
                        timeDisplay.classList.add("visible");
                        if (audio.readyState < 1 || !Number.isFinite(audio.duration)) {
                            setTimeDisplayLoading(timeDisplay);
                        } else {
                            setTimeDisplayReady(audio, timeDisplay);
                        }
                        startSpinning();
                        const playPromise = audio.play();
                        if (playPromise && typeof playPromise.catch === "function") {
                            playPromise.catch(() => {
                                animateTextChange(playButton, "Play");
                                resetTimeDisplay(timeDisplay);
                                timeDisplay.classList.remove("visible");
                                currentAudio = null;
                                updateWhereBackgroundFromPlayback();
                            });
                        }
                        fadeInAudio(audio); // Fade in audio volume
                    }
                    
                    // Smooth letter-by-letter text transition to "Pause"
                    animateTextChange(playButton, "Pause");
                } else {
                    // Fade out audio volume, then pause
                    fadeOutAudio(audio, () => {
                        // Audio is now paused after fade out
                    });
                    stopSpinning(); // Add subtle slow-down effect
                    
                    // Smooth letter-by-letter text transition to "Play"
                    animateTextChange(playButton, "Play");
                }
            });

            audio.addEventListener("loadstart", () => {
                if (audio === currentAudio) {
                    setTimeDisplayLoading(timeDisplay);
                    timeDisplay.classList.add("visible");
                }
            });

            audio.addEventListener("loadedmetadata", () => {
                if (audio === currentAudio) {
                    setTimeDisplayReady(audio, timeDisplay);
                }
            });

            audio.addEventListener("play", () => {
                stickyAudio = audio;
                updateWhereBackgroundFromPlayback();
            });

            // Update time display when the audio is playing
            audio.addEventListener("timeupdate", () => {
                if (Number.isFinite(audio.duration)) {
                    setTimeDisplayReady(audio, timeDisplay);
                }
            });

            // Reset the display when a track ends
            audio.addEventListener("ended", () => {
                stopSpinning();
                record.classList.remove("up");
                
                // Smooth letter-by-letter text transition to "Play"
                animateTextChange(playButton, "Play");
                
                resetTimeDisplay(timeDisplay);
                timeDisplay.classList.remove("visible");
                currentAudio = null;
                if (stickyAudio === audio) {
                    stickyAudio = null;
                }
                updateWhereBackgroundFromPlayback();
            });

            audio.addEventListener("error", () => {
                if (stickyAudio === audio) {
                    stickyAudio = null;
                }
                if (audio === currentAudio) {
                    timeDisplay.classList.remove("loading");
                    timeDisplay.classList.add("ready", "visible");
                    timeDisplay.textContent = "unavailable";
                    animateTextChange(playButton, "Play");
                    currentAudio = null;
                    stopSpinning();
                }
                updateWhereBackgroundFromPlayback();
            });

            // Pause event to stop spinning if no other track is playing
            audio.addEventListener("pause", () => {
                const anyPlaying = audioElements.some(a => !a.paused && a !== audio);
                if (!anyPlaying) {
                    stopSpinning();
                }
                updateWhereBackgroundFromPlayback();
            });
        });

        initializeHorizontalDragScroll();

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
            const excludedTrack = stopCurrentPlaybackForRandom();
            playRandomVisibleTrack(excludedTrack);
        });
    }

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
    setWhereBackgroundOpacity(0);
    updateWhereBackgroundFromPlayback();
    applyMobileViewportLock();

    trackList.addEventListener("scroll", syncPlayingTrackStickPosition, { passive: true });
    trackList.addEventListener("touchstart", stopTrackListScrollAnimation, { passive: true });
    trackList.addEventListener("pointerdown", stopTrackListScrollAnimation, { passive: true });
    trackList.addEventListener("wheel", stopTrackListScrollAnimation, { passive: true });
    window.addEventListener("orientationchange", () => {
        setTimeout(scheduleMobileViewportLock, 80);
    });
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            scheduleMobileViewportLock();
        }
    });
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", scheduleMobileViewportLock, { passive: true });
        window.visualViewport.addEventListener("scroll", scheduleMobileViewportLock, { passive: true });
    }

    window.addEventListener("resize", () => {
        requestAnimationFrame(() => {
            syncAllTrackCoverHeights();
            syncPlayingTrackStickPosition();
            scheduleMobileViewportLock();
            if (coverModal && coverModal.classList.contains("active")) {
                updateModalImageFrameFromNaturalSize();
            }
        });
    });
});
