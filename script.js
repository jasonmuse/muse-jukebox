// Song data embedded directly into the script
const tracks = [

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
        "title": "BOX 11",
        "file": "audio/box11.mp3",
        "cover": "images/box11.png",
        "tags": ["Chill", "Ambient", "Lo-fi", "Mysterious"],
        "date": "2024"
    },
    {
        "title": "Goodbye Froggy",
        "file": "audio/goodbyefroggy.mp3",
        "cover": "images/goodbyefroggy.png",
        "tags": ["Emotional", "Ambient", "Melancholic", "Game OST"],
        "date": "2024"
    },
    {
        "title": "Frog God",
        "file": "audio/FROGGOD.mp3",
        "cover": "images/baby_bowser.png",
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
        "file": "audio/orbit.mp3",
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
        "file": "audio/Skywatch.mp3",
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
        "cover": "images/cover.jpg",
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
    let audioElements = [];
    let isSpinning = false;
    let currentAudio = null;
    let rotationAngle = 0; // Declare rotationAngle here
    let spinRequest; // Declare spinRequest here

    let accelerationRequest; // New variable to track acceleration frame

    // Modify startSpinning to implement smooth acceleration
    function startSpinning() {
        if (isSpinning) return;
        isSpinning = true;
        let acceleration = 0.1; // Start with a small increment for gradual acceleration

        function accelerate() {
            if (isSpinning) {
                rotationAngle = (rotationAngle + acceleration) % 360;
                record.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;

                // Gradually increase the acceleration until it reaches the target speed (e.g., 0.5)
                if (acceleration < 0.5) {
                    acceleration += 0.01; // Increase speed gradually
                }

                accelerationRequest = requestAnimationFrame(accelerate);
            }
        }

        accelerate();
    }

    let decelerateRequest; // New variable to track deceleration frame

    // Modify stopSpinning to implement smooth deceleration
    function stopSpinning() {
        isSpinning = false;
        let deceleration = 0.5; // Initial deceleration speed

        function decelerate() {
            if (deceleration > 0) {
                rotationAngle = (rotationAngle + deceleration) % 360;
                record.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;
                deceleration -= 0.02; // Gradually slow down

                // Continue decelerating until the speed reaches zero
                decelerateRequest = requestAnimationFrame(decelerate);
            } else {
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

    // Populate track list dynamically
    function populateTrackList(tracks) {
        trackList.innerHTML = '';
        audioElements = [];

        tracks.forEach(track => {
            const trackElement = document.createElement("div");
            trackElement.classList.add("track");
            trackElement.innerHTML = `
            <img src="${track.cover}" alt="${track.title} Cover">
            <div class="track-info">
            <p class="title">${track.title} <span class="release-date clickable-tag">${track.date}</span></p>
            <p class="tags">${track.tags.map(tag => `<span class="tag-bubble clickable-tag">${tag}</span>`).join('')}</p>
            <div class="playback-controls">
            <button class="play-button">Play</button>
            <span class="time-display" style="display:none">0:00 / --:--</span>
            </div>
            <audio data-src="${track.file}" preload="none" style="display: none;"></audio>
            </div>
            `;
            trackList.appendChild(trackElement);

            const audio = trackElement.querySelector("audio");
            const playButton = trackElement.querySelector(".play-button");
            const timeDisplay = trackElement.querySelector(".time-display");
            audioElements.push(audio);

            // Play/pause logic for the custom button
            playButton.addEventListener("click", () => {
                if (currentAudio && currentAudio !== audio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    currentAudio.parentElement.querySelector(".play-button").textContent = "Play";
                    currentAudio.parentElement.querySelector(".time-display").style.display = "none";
                }

                if (audio.paused) {
                    if (currentAudio !== audio) {
                        if (!audio.src) {
                            audio.src = audio.getAttribute("data-src");
                        }
                        currentAudio = audio;

                        moveRecordDownAndUp(() => startSpinning());
                        setTimeout(() => audio.play(), 300);
                    } else {
                        startSpinning();
                        audio.play();
                    }
                    playButton.textContent = "Pause";
                    timeDisplay.style.display = "inline";
                } else {
                    audio.pause();
                    playButton.textContent = "Play";
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
                playButton.textContent = "Play";
                timeDisplay.style.display = "none";
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
    populateTrackList(tracks);
    populateTagFilter(tracks);
});
