document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const lensSelect = document.getElementById("lens");
    const applyLensButton = document.getElementById("applyLens");
    const lightingSuggestion = document.getElementById("lightingSuggestion");
    const toggleGridButton = document.getElementById("toggleGrid");
    const zoomVideo = document.getElementById("zoomVideo");
    let gridVisible = false;

    // ✅ Lens Simulator
    applyLensButton.addEventListener("click", () => {
        const lensEffect = lensSelect.value;

        // Apply filter effects based on lens selection
        const lensFilters = {
            "35mm": "contrast(1.2) saturate(1.1)",
            "50mm": "blur(1px) contrast(1.1)",
            "85mm": "blur(2px) contrast(1.2) brightness(1.1)"
        };

        zoomVideo.style.filter = lensFilters[lensEffect] || "none";
        alert(`Applied ${lensEffect} lens effect.`);
    });

    // ✅ AI Smart Lighting Analysis
    function analyzeLighting() {
        if (!zoomVideo.videoWidth || !zoomVideo.videoHeight) {
            lightingSuggestion.textContent = "Waiting for video feed...";
            return;
        }

        const videoCanvas = document.createElement("canvas");
        const ctx = videoCanvas.getContext("2d");

        videoCanvas.width = zoomVideo.videoWidth;
        videoCanvas.height = zoomVideo.videoHeight;
        ctx.drawImage(zoomVideo, 0, 0, videoCanvas.width, videoCanvas.height);

        const pixelData = ctx.getImageData(0, 0, videoCanvas.width, videoCanvas.height).data;
        let brightness = 0;

        for (let i = 0; i < pixelData.length; i += 4) {
            brightness += (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3;
        }

        brightness /= pixelData.length / 4;

        // AI-based lighting suggestions
        if (brightness < 50) {
            lightingSuggestion.textContent = "Too dark! Increase lighting.";
        } else if (brightness > 200) {
            lightingSuggestion.textContent = "Too bright! Reduce lighting.";
        } else {
            lightingSuggestion.textContent = "Lighting is optimal.";
        }
    }

    // Run AI lighting detection every 5 seconds
    setInterval(analyzeLighting, 5000);

    // ✅ Composition Overlay Grid
    const compositionGrid = document.createElement("div");
    compositionGrid.style.position = "absolute";
    compositionGrid.style.top = "0";
    compositionGrid.style.left = "0";
    compositionGrid.style.width = "100%";
    compositionGrid.style.height = "100%";
    compositionGrid.style.pointerEvents = "none";
    compositionGrid.style.display = "none"; // Initially hidden
    compositionGrid.style.backgroundImage = "url('assets/composition-grid.png')";
    compositionGrid.style.backgroundSize = "cover";
    compositionGrid.style.zIndex = "10";

    document.body.appendChild(compositionGrid);

    toggleGridButton.addEventListener("click", () => {
        gridVisible = !gridVisible;
        compositionGrid.style.display = gridVisible ? "block" : "none";
    });

    // ✅ Zoom Monitor Setup (Webcam or Simulation)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                zoomVideo.srcObject = stream;
                zoomVideo.play();
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
                zoomVideo.src = "assets/sample-video.mp4"; // Fallback to sample video
                zoomVideo.play();
            });
    } else {
        console.warn("Webcam not supported. Using sample video.");
        zoomVideo.src = "assets/sample-video.mp4"; // Fallback video for testing
        zoomVideo.play();
    }
});

