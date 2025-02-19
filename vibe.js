// vibe.js - AI Performance & Collaboration System
class VibeAI {
    constructor() {
        this.mood = "chill";
        this.lyricsVisible = true;
        this.micMode = false;
        this.zoomMode = "waveform"; // Default Zoom Monitor mode
        this.init();
    }

    init() {
        console.log("🎤 V.I.B.E. AI Initialized!");
        this.createUI();
    }

    createUI() {
        let vibeContainer = document.createElement("div");
        vibeContainer.id = "vibe-container";
        vibeContainer.innerHTML = `
            <div id="zoom-monitor">
                <canvas id="waveformCanvas"></canvas>
                <video id="videoChat" style="display:none;" autoplay></video>
            </div>
            <div id="vibe-panel">
                <button onclick="vibe.startPerformance()">🎶 Start AI Performance</button>
                <button onclick="vibe.changeMood('hype')">🔥 Hype Mode</button>
                <button onclick="vibe.toggleVideoChat()">🎥 Toggle Video</button>
                <button onclick="vibe.toggleLyrics()">📜 Show Lyrics</button>
            </div>
        `;
        document.body.appendChild(vibeContainer);
    }

    startPerformance() {
        console.log("🎤 AI Performance Started!");
        document.getElementById("waveformCanvas").style.background = "cyan";
    }

    stopPerformance() {
        console.log("⏹️ AI Performance Stopped.");
        document.getElementById("waveformCanvas").style.background = "gray";
    }

    changeMood(newMood) {
        this.mood = newMood;
        console.log(`🎨 Mood changed to: ${newMood}`);
    }

    toggleVideoChat() {
        let video = document.getElementById("videoChat");
        video.style.display = video.style.display === "none" ? "block" : "none";
    }

    toggleLyrics() {
        this.lyricsVisible = !this.lyricsVisible;
        console.log(`📜 Lyrics ${this.lyricsVisible ? "Shown" : "Hidden"}`);
    }
}

// Initialize V.I.B.E.
const vibe = new VibeAI();
