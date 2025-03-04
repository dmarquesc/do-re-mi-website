// Access User Camera & Microphone
const localVideo = document.getElementById("local-video");
const remoteVideo = document.getElementById("remote-video");
const chatPanel = document.getElementById("chat-panel");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// WebRTC Stream Setup
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        localVideo.muted = true; // Mute local audio to prevent echo
    })
    .catch(err => console.error("Camera access error: ", err));

// Toggle Camera
document.getElementById("toggle-camera").addEventListener("click", () => {
    const videoTrack = localVideo.srcObject?.getVideoTracks()[0];
    if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
});

// Toggle Microphone
document.getElementById("toggle-mic").addEventListener("click", () => {
    const audioTrack = localVideo.srcObject?.getAudioTracks()[0];
    if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
});

// Share Screen
document.getElementById("share-screen").addEventListener("click", async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        localVideo.srcObject = screenStream;
    } catch (err) {
        console.error("Screen sharing error:", err);
    }
});

// Background Blur Effect
document.getElementById("background-blur").addEventListener("click", () => {
    localVideo.style.filter = "blur(5px)";
    setTimeout(() => {
        localVideo.style.filter = "none";
    }, 5000);
});

// Chat System (Basic WebSocket-like Chat)
document.getElementById("chat-btn").addEventListener("click", () => {
    chatPanel.style.display = chatPanel.style.display === "block" ? "none" : "block";
});

chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
        let message = document.createElement("p");
        message.textContent = chatInput.value;
        chatMessages.appendChild(message);
        chatInput.value = "";
    }
});

// Fullscreen Mode
document.getElementById("fullscreen-btn").addEventListener("click", () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    }
});

// Close Button
document.getElementById("close-btn").addEventListener("click", () => {
    document.querySelector(".zoom-monitor").style.display = "none";
});

// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);

// Add Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load 3D Models (Placeholder Cube for Prototype)
const geometry = new THREE.BoxGeometry(2, 2, 2); // Bigger cube
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position cube
cube.position.set(0, 0, 0);

// Ensure camera is far enough to see both cube and background
camera.position.set(0, 0, 5);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Responsive Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Load Background Image
const loader = new THREE.TextureLoader();
loader.load('mall.png', (texture) => {
    const backgroundGeometry = new THREE.PlaneGeometry(20, 10);
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

    backgroundMesh.position.set(0, 0, -5); // Move it back so it stays in view
    scene.add(backgroundMesh);
});





