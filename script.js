// Song data embedded directly into the script
const tracks = [
    {
        "title": "Loot Mode",
        "file": "audio/lootmode.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Hype", "Trap", "2024"]
    },
    {
        "title": "Mino",
        "file": "audio/mino.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Hype", "Piano", "Trap", "2024"]
    },
    {
        "title": "Portal",
        "file": "audio/portal.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Chill", "Lo-fi", "2024"]
    },
    {
        "title": "Sundrown",
        "file": "audio/sundrown.mp3",
        "cover": "images/cover.jpg",
        "tags": ["Happy", "Ambient", "2024"]
    }
];

// Elements
const trackList = document.getElementById("track-list");
const tagFilter = document.getElementById("tag-filter");
let audioElements = [];
const record = document.querySelector(".record"); // Select record image
let isSpinning = false; // Track if record is currently spinning
let rotationAngle = 0; // Track current rotation angle
let spinRequest; // Store the animation frame ID for rotation

// Function to start spinning the record
function startSpinning() {
    isSpinning = true;
    function spin() {
        if (isSpinning) {
            rotationAngle = (rotationAngle + 0.5) % 360; // Increment angle
            record.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`; // Apply rotation
            spinRequest = requestAnimationFrame(spin); // Request next frame
        }
    }
    spin();
}

// Function to stop spinning the record
function stopSpinning() {
    isSpinning = false;
    cancelAnimationFrame(spinRequest); // Stop the animation loop
}

// Populate track list dynamically
function populateTrackList(tracks) {
    trackList.innerHTML = ''; // Clear the list
    audioElements = []; // Clear audio element references

    tracks.forEach(track => {
        const trackElement = document.createElement("div");
        trackElement.classList.add("track");
        trackElement.innerHTML = `
        <img src="${track.cover}" alt="${track.title} Cover">
        <div class="track-info">
        <p class="title">${track.title}</p>
        <p class="tags">${track.tags.map(tag => `<span class="tag-bubble">${tag}</span>`).join(', ')}</p>
        <audio controls>
        <source src="${track.file}" type="audio/mp3">
        Your browser does not support the audio element.
        </audio>
        </div>
        `;
        trackList.appendChild(trackElement);

        // Get the audio element and add it to the array
        const audio = trackElement.querySelector("audio");
        audioElements.push(audio);

        // Play event to animate record up and start spinning
        audio.addEventListener("play", () => {
            record.classList.add("up"); // Move up without spin
            startSpinning(); // Start the spin
            audioElements.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause(); // Pause other tracks
                }
            });
        });

        // Pause and ended events to stop spinning and keep the current rotation
        audio.addEventListener("pause", stopSpinning); // Stop spinning without resetting angle
        audio.addEventListener("ended", () => {
            stopSpinning(); // Stop spinning
            record.classList.remove("up"); // Move back down
        });
    });
}

// Populate tag filter options
function populateTagFilter(tracks) {
    const tags = new Set();
    tracks.forEach(track => track.tags.forEach(tag => tags.add(tag)));

    tags.forEach(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

// Filter by selected tag
tagFilter.addEventListener('change', () => {
    const selectedTag = tagFilter.value;
    if (selectedTag === 'all') {
        populateTrackList(tracks); // Show all tracks
    } else {
        const filteredTracks = tracks.filter(track => track.tags.includes(selectedTag));
        populateTrackList(filteredTracks);
    }
});

// Initial population of track list and filter
populateTrackList(tracks);
populateTagFilter(tracks);
