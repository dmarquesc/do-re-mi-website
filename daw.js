document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('videoChat');
    const waveformContainer = document.getElementById('waveformContainer');
    const videoContainer = document.getElementById('videoContainer');
    const waveformToggle = document.getElementById('waveformToggle');
    const pipButton = document.getElementById('pipMode');

    // 🎥 Enable webcam feed
    async function startVideo() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            videoElement.srcObject = stream;
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }

    // 🎚️ Toggle between waveform and live video
    waveformToggle.addEventListener('change', () => {
        if (waveformToggle.checked) {
            waveformContainer.style.display = 'none';
            videoContainer.style.display = 'block';
        } else {
            videoContainer.style.display = 'none';
            waveformContainer.style.display = 'block';
        }
    });

    // 📺 Enable Picture-in-Picture mode
    pipButton.addEventListener('click', async () => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (videoElement.requestPictureInPicture) {
            await videoElement.requestPictureInPicture();
        }
    });

    // Initialize video feed
    startVideo();
});
