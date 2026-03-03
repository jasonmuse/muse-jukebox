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
        "date": "2024"
    },
    {
        "title": "Closed Eyes",
        "file": "audio/closedeyes.mp3",
        "cover": "images/closedeyes.png",
        "tags": ["Chill", "Lo-fi", "Ambient"],
        "date": "2024"
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
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2023"
    },
    {
        "title": "Upstep",
        "file": "audio/upstep.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Kickout",
        "file": "audio/kickout.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2023"
    },
    {
        "title": "Starstruck",
        "file": "audio/starstruck.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Blackened",
        "file": "audio/blackened.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2023"
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
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Benched",
        "file": "audio/benched.mp3",
        "cover": "images/cover.jpg",
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
        "cover": "images/cover.jpg",
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
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Lockdown",
        "file": "audio/lockdown.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Terror Tower",
        "file": "audio/terrortower.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Old", "Archive", "Unsorted"],
        "date": "2024"
    },
    {
        "title": "Slaw",
        "file": "audio/slaw.mp3",
        "cover": "images/peng.png",
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
        "date": "2024"
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
    const record = document.querySelector(".record");
    const whereBackground = document.getElementById("where-background");
    const switchSound = new Audio("audio/jukeboxswitch.mp3");
    
    // Cover modal elements
    const coverModal = document.getElementById("cover-modal");
    const coverModalImage = document.getElementById("cover-modal-image");
    const coverModalClose = document.querySelector(".cover-modal-close");
    const coverModalOverlay = document.querySelector(".cover-modal-overlay");
    let activeModalCover = "";
    const FALLBACK_COVER = "images/cover.jpg";
    const COVER_PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    const COVER_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
    const coverSourceCheckCache = new Map();
    const WHERE_FADE_IN_SECONDS = 30;
    const WHERE_FADE_OUT_SECONDS = 7;

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

    function isGifSource(source) {
        if (typeof source !== "string") return false;
        return /\.gif(?:[?#].*)?$/i.test(source.trim());
    }

    function getTrackYearSortValue(track) {
        const year = Number.parseInt(track.date, 10);
        return Number.isFinite(year) ? year : Number.NEGATIVE_INFINITY;
    }

    function sortTracksByNewest(trackItems) {
        return [...trackItems].sort((a, b) => {
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
            rootMargin: "140px",
            threshold: 0.01
        })
        : null;

    function preloadTopTrackCovers(trackItems, count = 4) {
        trackItems.slice(0, count).forEach((track) => {
            const preload = document.createElement("link");
            preload.rel = "preload";
            preload.as = "image";
            preload.href = getTrackCoverPreview(track);
            preload.onerror = () => {
                preload.href = getTrackCoverFull(track);
            };
            document.head.appendChild(preload);
        });
    }
    
    function setUpCoverLoad(coverImage, previewCover, isTopPriority) {
        coverImage.dataset.src = previewCover;
        const isGifPreview = isGifSource(previewCover);

        if (isGifPreview) {
            coverImage.decoding = "auto";
            coverImage.loading = "eager";
            coverImage.fetchPriority = isTopPriority ? "high" : "auto";
        }

        if (isTopPriority || isGifPreview || !lazyCoverObserver) {
            setSafeImageSource(coverImage, previewCover);
        } else {
            attachImageFallback(coverImage);
            lazyCoverObserver.observe(coverImage);
        }
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

            if (safeImageSrc !== safePreviewSrc) {
                const fullResImage = new Image();
                fullResImage.src = safeImageSrc;
                fullResImage.onload = () => {
                    if (coverModal.classList.contains("active") && activeModalCover === safeImageSrc) {
                        setSafeImageSource(coverModalImage, safeImageSrc);
                    }
                };
                fullResImage.onerror = () => {
                    if (coverModal.classList.contains("active") && activeModalCover === safeImageSrc) {
                        setSafeImageSource(coverModalImage, FALLBACK_COVER);
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
    
    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && coverModal && coverModal.classList.contains("active")) {
            closeCoverModal();
        }
    });
    let audioElements = [];
    let isSpinning = false;
    let currentAudio = null;
    let rotationAngle = 0; // Declare rotationAngle here
    let spinRequest; // Declare spinRequest here
    let whereCurrentOpacity = 0;
    let whereTargetOpacity = 0;
    let whereFadeFrame = null;
    let whereFadeStartOpacity = 0;
    let whereFadeStartTime = null;
    let whereFadeDurationMs = 0;

    function setWhereBackgroundOpacity(opacityValue) {
        if (!whereBackground) return;
        whereBackground.style.opacity = opacityValue.toFixed(4);
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
                record.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;
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
                record.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;
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

    // Populate track list dynamically
    function populateTrackList(tracks) {
        trackList.innerHTML = '';
        audioElements = [];

        tracks.forEach((track, index) => {
            const previewCover = getTrackCoverPreview(track);
            const fullCover = getTrackCoverFull(track);
            const isTopPriority = index < 4;
            const trackElement = document.createElement("div");
            trackElement.classList.add("track");
            trackElement.innerHTML = `
            <img src="${COVER_PLACEHOLDER}" data-preview-src="${previewCover}" data-full-src="${fullCover}" alt="${track.title} Cover" loading="lazy" fetchpriority="${isTopPriority ? "high" : "low"}" decoding="async" width="80" height="80">
            <div class="track-info">
            <p class="title">${track.title} <span class="release-date clickable-tag">${track.date}</span></p>
            <p class="tags">${track.tags.map(tag => `<span class="tag-bubble clickable-tag">${tag}</span>`).join('')}</p>
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
                setWhereBackgroundTargetOpacity(1);
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
                updateWhereBackgroundFromPlayback();
            });

            audio.addEventListener("error", () => {
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

        // Add event listeners to each tag bubble for filtering
        document.querySelectorAll(".clickable-tag").forEach(tagElement => {
            tagElement.addEventListener("click", () => {
                tagFilter.value = tagElement.textContent;
                applyTagFilter(tagElement.textContent);
            });
        });

        syncAllTrackCoverHeights();
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

    // Apply filter by selected tag
    function applyTagFilter(selectedTag) {
        const filteredTracks = selectedTag === "all"
            ? tracks
            : tracks.filter((track) => track.tags.includes(selectedTag) || track.date === selectedTag);
        populateTrackList(sortTracksByNewest(filteredTracks));
    }

    // Filter by selected tag from dropdown
    tagFilter.addEventListener('change', () => {
        applyTagFilter(tagFilter.value);
    });

    // Initial population of track list and filter
    await resolveTrackCoverSources(tracks);
    const sortedTracks = sortTracksByNewest(tracks);
    preloadTopTrackCovers(sortedTracks);
    populateTrackList(sortedTracks);
    populateTagFilter(tracks);
    setWhereBackgroundOpacity(0);
    updateWhereBackgroundFromPlayback();

    window.addEventListener("resize", () => {
        requestAnimationFrame(syncAllTrackCoverHeights);
    });
});
