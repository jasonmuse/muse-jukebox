// Song data embedded directly into the script
const tracks = [

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
document.addEventListener("DOMContentLoaded", () => {
    const trackList = document.getElementById("track-list");
    const tagFilter = document.getElementById("tag-filter");
    const record = document.querySelector(".record");
    const switchSound = new Audio("audio/jukeboxswitch.mp3");
    
    // Cover modal elements
    const coverModal = document.getElementById("cover-modal");
    const coverModalImage = document.getElementById("cover-modal-image");
    const coverModalClose = document.querySelector(".cover-modal-close");
    const coverModalOverlay = document.querySelector(".cover-modal-overlay");
    let activeModalCover = "";

    function getTrackCoverPreview(track) {
        return track.thumbnail || track.cover;
    }


    const lazyCoverObserver = "IntersectionObserver" in window
        ? new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const image = entry.target;
                const targetSrc = image.dataset.src;
                if (targetSrc && image.getAttribute("src") !== targetSrc) {
                    image.src = targetSrc;
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
                preload.href = track.cover;
            };
            document.head.appendChild(preload);
        });
    }
    
    function setUpCoverLoad(coverImage, previewCover, isTopPriority, updateCoverSize) {
        coverImage.dataset.src = previewCover;

        if (isTopPriority || !lazyCoverObserver) {
            coverImage.src = previewCover;
        } else {
            lazyCoverObserver.observe(coverImage);
        }

        if (coverImage.complete) {
            updateCoverSize();
        } else {
            coverImage.addEventListener("load", updateCoverSize, { once: true });
        }
    }

    // Function to open cover modal
    window.openCoverModal = function(imageSrc, title, previewSrc = imageSrc) {
        if (coverModalImage && coverModal) {
            activeModalCover = imageSrc;
            coverModalImage.src = previewSrc;
            coverModalImage.alt = `${title} Cover`;
            coverModal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling

            if (imageSrc !== previewSrc) {
                const fullResImage = new Image();
                fullResImage.src = imageSrc;
                fullResImage.onload = () => {
                    if (coverModal.classList.contains("active") && activeModalCover === imageSrc) {
                        coverModalImage.src = imageSrc;
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

    function syncTrackCoverHeight(trackElement) {
        const title = trackElement.querySelector(".title");
        const controls = trackElement.querySelector(".playback-controls");

        if (!title || !controls) return;

        const titleRect = title.getBoundingClientRect();
        const controlsRect = controls.getBoundingClientRect();
        const coverSize = Math.max(60, Math.round(controlsRect.bottom - titleRect.top));

        trackElement.style.setProperty("--cover-size", `${coverSize}px`);
    }

    function syncAllTrackCoverHeights() {
        document.querySelectorAll(".track").forEach(syncTrackCoverHeight);
    }

    // Populate track list dynamically
    function populateTrackList(tracks) {
        trackList.innerHTML = '';
        audioElements = [];

        tracks.forEach((track, index) => {
            const previewCover = getTrackCoverPreview(track);
            const isTopPriority = index < 4;
            const trackElement = document.createElement("div");
            trackElement.classList.add("track");
            trackElement.innerHTML = `
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" data-preview-src="${previewCover}" data-full-src="${track.cover}" alt="${track.title} Cover" loading="lazy" fetchpriority="${isTopPriority ? "high" : "low"}" decoding="async">
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
                    window.openCoverModal(track.cover, track.title, coverImage.currentSrc || coverImage.src);
                }
            });
            
            audioElements.push(audio);

            const updateCoverSize = () => syncTrackCoverHeight(trackElement);
            requestAnimationFrame(updateCoverSize);
            setUpCoverLoad(coverImage, previewCover, isTopPriority, updateCoverSize);
            if (coverImage.complete) {
                updateCoverSize();
            } else {
                coverImage.addEventListener("load", updateCoverSize, { once: true });
            }

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
                }

                if (audio.paused) {
                    if (currentAudio !== audio) {
                        if (!audio.src) {
                            audio.src = audio.getAttribute("data-src");
                        }
                        currentAudio = audio;

                        moveRecordDownAndUp(() => startSpinning());
                        setTimeout(() => {
                            audio.play();
                            fadeInAudio(audio); // Fade in audio volume
                            // Trigger animation after a tiny delay to ensure smooth transition
                            setTimeout(() => timeDisplay.classList.add("visible"), 50);
                        }, 300);
                    } else {
                        startSpinning();
                        audio.play();
                        fadeInAudio(audio); // Fade in audio volume
                        setTimeout(() => timeDisplay.classList.add("visible"), 50);
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

            // Update time display when the audio is playing
            audio.addEventListener("timeupdate", () => {
                const currentTime = formatTime(audio.currentTime);
                const duration = formatTime(audio.duration);
                timeDisplay.textContent = `${currentTime} / ${duration}`;
            });

            // Reset the display when a track ends
            audio.addEventListener("ended", () => {
                stopSpinning();
                record.classList.remove("up");
                
                // Smooth letter-by-letter text transition to "Play"
                animateTextChange(playButton, "Play");
                
                timeDisplay.classList.remove("visible");
                currentAudio = null;
            });

            // Pause event to stop spinning if no other track is playing
            audio.addEventListener("pause", () => {
                const anyPlaying = audioElements.some(a => !a.paused && a !== audio);
                if (!anyPlaying) {
                    stopSpinning();
                }
            });
        });

        // Add event listeners to each tag bubble for filtering
        document.querySelectorAll(".clickable-tag").forEach(tagElement => {
            tagElement.addEventListener("click", () => {
                tagFilter.value = tagElement.textContent;
                applyTagFilter(tagElement.textContent);
            });
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

    // Apply filter by selected tag
    function applyTagFilter(selectedTag) {
        const filteredTracks = selectedTag === 'all' ? tracks : tracks.filter(track => track.tags.includes(selectedTag) || track.date === selectedTag);
        populateTrackList(filteredTracks);
    }

    // Filter by selected tag from dropdown
    tagFilter.addEventListener('change', () => {
        applyTagFilter(tagFilter.value);
    });

    // Initial population of track list and filter
    preloadTopTrackCovers(tracks);
    populateTrackList(tracks);
    populateTagFilter(tracks);

    window.addEventListener("resize", () => {
        requestAnimationFrame(syncAllTrackCoverHeights);
    });
});
