/* ZOOM SECTION */
document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("videoChat");
    const waveformContainer = document.getElementById("waveformContainer");
    const videoContainer = document.getElementById("videoContainer");
    const waveformToggle = document.getElementById("waveformToggle");
    const pipButton = document.getElementById("pipMode");

    // 🎥 Enable webcam feed
    async function startVideo() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            videoElement.srcObject = stream;
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    }

    // 🎚️ Toggle between waveform and live video
    waveformToggle.addEventListener("change", () => {
        if (waveformToggle.checked) {
            waveformContainer.style.display = "none";
            videoContainer.style.display = "block";
        } else {
            videoContainer.style.display = "none";
            waveformContainer.style.display = "block";
        }
    });

    // 📺 Enable Picture-in-Picture mode
    pipButton.addEventListener("click", async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (videoElement.requestPictureInPicture) {
                await videoElement.requestPictureInPicture();
            }
        } catch (error) {
            console.error("Error enabling Picture-in-Picture mode:", error);
        }
    });

    // Initialize video feed
    startVideo();
});

/* VIBE PANEL SECTION */
document.addEventListener("DOMContentLoaded", () => {
    const aiWaveform = document.getElementById("aiWaveform");
    const analyzeButton = document.querySelector(".vibe-controls button:first-child");
    const generateButton = document.querySelector(".vibe-controls button:last-child");
    const statusIndicator = document.querySelector(".status-indicator");
    const vibePanel = document.querySelector(".vibe-panel");

    let ctx = aiWaveform.getContext("2d");
    let running = false;
    let animationFrameId;

    // Ensure the canvas has correct dimensions
    aiWaveform.width = aiWaveform.clientWidth || 300;
    aiWaveform.height = aiWaveform.clientHeight || 100;

    function drawWaveform() {
        if (!running || !ctx) return;
        ctx.clearRect(0, 0, aiWaveform.width, aiWaveform.height);
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 2;

        for (let i = 0; i < aiWaveform.width; i += 10) {
            let y = Math.sin(i * 0.05 + Date.now() * 0.005) * 20 + aiWaveform.height / 2;
            ctx.lineTo(i, y);
        }

        ctx.stroke();
        animationFrameId = requestAnimationFrame(drawWaveform);
    }

    function activateAI() {
        if (running) return; // Prevent multiple activations
        running = true;
        vibePanel.classList.add("ai-active");
        statusIndicator.classList.add("ai-active");
        statusIndicator.style.background = "lime";
        drawWaveform();
    }

    function deactivateAI() {
        running = false;
        vibePanel.classList.remove("ai-active");
        statusIndicator.classList.remove("ai-active");
        statusIndicator.style.background = "red";
        ctx.clearRect(0, 0, aiWaveform.width, aiWaveform.height);
        cancelAnimationFrame(animationFrameId); // Stop animation
    }

    analyzeButton.addEventListener("click", () => {
        activateAI();
        setTimeout(deactivateAI, 5000);
    });

    generateButton.addEventListener("click", () => {
        activateAI();
        setTimeout(deactivateAI, 5000);
    });
});

/* MIXER SECTION */
// Add your mixer-related JavaScript below if needed
/* DAW Mixer Automation */
document.addEventListener("DOMContentLoaded", () => {
    const trackContainer = document.querySelector(".tracks");
    const masterFader = document.querySelector(".master-track .fader");
    const addTrackBtn = document.createElement("button");
    addTrackBtn.textContent = "➕ Add Track";
    addTrackBtn.classList.add("daw-button");
    document.querySelector(".master-track").appendChild(addTrackBtn);

    let trackCount = 0;

    // Function to create a track
    function createTrack() {
        trackCount++;
        const track = document.createElement("div");
        track.classList.add("track");
        track.setAttribute("data-id", trackCount);

        // Track Label
        const trackLabel = document.createElement("input");
        trackLabel.type = "text";
        trackLabel.placeholder = `Track ${trackCount}`;
        trackLabel.classList.add("track-label");

        // Volume Fader
        const fader = document.createElement("input");
        fader.type = "range";
        fader.classList.add("fader");
        fader.min = "0";
        fader.max = "100";
        fader.value = "75";

        // Panning Control
        const pan = document.createElement("input");
        pan.type = "range";
        pan.classList.add("pan");
        pan.min = "-50";
        pan.max = "50";
        pan.value = "0";

        // Mute & Solo Buttons
        const muteBtn = document.createElement("button");
        muteBtn.textContent = "Mute";
        muteBtn.classList.add("mute-btn");
        
        const soloBtn = document.createElement("button");
        soloBtn.textContent = "Solo";
        soloBtn.classList.add("solo-btn");

        // Remove Track Button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.classList.add("remove-track");

        // Append elements to track
        track.appendChild(trackLabel);
        track.appendChild(fader);
        track.appendChild(pan);
        track.appendChild(muteBtn);
        track.appendChild(soloBtn);
        track.appendChild(removeBtn);

        trackContainer.appendChild(track);

        // Remove Track Functionality
        removeBtn.addEventListener("click", () => {
            trackContainer.removeChild(track);
        });
    }

    // Master Volume Control
    masterFader.addEventListener("input", (event) => {
        const volume = event.target.value;
        document.querySelectorAll(".fader").forEach(fader => fader.value = volume);
    });

    // Add Track Button Click Event
    addTrackBtn.addEventListener("click", createTrack);
});