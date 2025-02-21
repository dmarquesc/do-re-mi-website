// 🎵 AI Performance & Collaboration System
class VibeAI {
    constructor() {
        this.mood = "chill";
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.waveformCanvas = document.getElementById("waveform");
        this.canvasCtx = this.waveformCanvas.getContext("2d");

        this.init();
    }

    init() {
        console.log("🎤 V.I.B.E. AI Initialized!");
        document.getElementById("vibe-start").addEventListener("click", () => this.startPerformance());
        document.getElementById("vibe-mood").addEventListener("click", () => this.changeMood());
        document.querySelector(".play").addEventListener("click", () => this.startPerformance());
        document.querySelector(".stop").addEventListener("click", () => this.stopPerformance());
    }

    startPerformance() {
        console.log("🎶 AI Performance Started!");
        this.generateAISequence();
        this.visualizeWaveform();
    }

    stopPerformance() {
        console.log("⏹️ AI Performance Stopped.");
        this.canvasCtx.clearRect(0, 0, this.waveformCanvas.width, this.waveformCanvas.height);
    }

    changeMood() {
        this.mood = this.mood === "chill" ? "hype" : "chill";
        console.log(`🎨 Mood changed to: ${this.mood}`);
    }

    async generateAISequence() {
        console.log("🎼 Generating AI Music...");
        const model = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv');
        await model.initialize();

        const seed = {
            notes: [
                { pitch: 60, startTime: 0, endTime: 0.5 },
                { pitch: 62, startTime: 0.5, endTime: 1 },
            ],
            totalTime: 1
        };

        const generated = await model.continueSequence(seed, 16, 1.1);
        console.log("🎶 AI Music Generated:", generated.notes);
        
        // Optional: Play the generated music
        const audioBuffer = await this.audioContext.decodeAudioData(generated.notes);  // Ensure this method works with Magenta
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start();
    }

    visualizeWaveform() {
        this.analyser.fftSize = 256;
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestAnimationFrame(draw);
            this.analyser.getByteTimeDomainData(dataArray);
            this.canvasCtx.fillStyle = "black";
            this.canvasCtx.fillRect(0, 0, this.waveformCanvas.width, this.waveformCanvas.height);

            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = "cyan";
            this.canvasCtx.beginPath();

            const sliceWidth = this.waveformCanvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                let v = dataArray[i] / 128.0;
                let y = v * this.waveformCanvas.height / 2;

                if (i === 0) {
                    this.canvasCtx.moveTo(x, y);
                } else {
                    this.canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            this.canvasCtx.lineTo(this.waveformCanvas.width, this.waveformCanvas.height / 2);
            this.canvasCtx.stroke();
        };
        draw();
    }
}

// Initialize V.I.B.E.
const vibe = new VibeAI();
