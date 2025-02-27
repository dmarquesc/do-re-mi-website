document.getElementById('vibe-start').addEventListener('click', function() {
    let statusText = document.getElementById('aiStatusText');
    let statusIndicator = document.querySelector('.status-indicator');

    if (statusText.innerText === "Awaiting Activation...") {
        statusText.innerText = "V.I.B.E. Online!";
        statusIndicator.classList.add('ai-active');
    } else {
        statusText.innerText = "Awaiting Activation...";
        statusIndicator.classList.remove('ai-active');
    }
});

/* 🎤 AI Chat Interaction */
document.getElementById('vibe-chat').addEventListener('click', function() {
    alert("V.I.B.E.: 'What’s on your mind? Let's make some music!'");
});

/* 🌊 Audio & Waveform Processing */
let audioContext, analyser, dataArray, audioSource, fileInput, audioElement;

// Initialize Audio API
function setupAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;  // Higher value = more detail

    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
}

// Handle Audio Upload & Play
fileInput = document.getElementById('audioInput');
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    
    if (!audioElement) {
        audioElement = new Audio();
        document.body.appendChild(audioElement);
    }
    audioElement.src = objectURL;
    audioElement.controls = true;
    audioElement.style.position = "absolute";
    audioElement.style.bottom = "10px";

    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(analyser);
    analyser.connect(audioContext.destination);
});

// 🎛 Transport Controls (Play, Stop)
document.querySelector('.play').addEventListener('click', function() {
    if (audioElement) {
        audioElement.play();
        audioContext.resume();
    }
});

document.querySelector('.stop').addEventListener('click', function() {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
});

/* 🌊 WebGL Waveform Visualization */
let scene, camera, renderer, uniforms, geometry, material, mesh;

function initWebGL() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    geometry = new THREE.PlaneGeometry(2, 1, 100, 100);
    material = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color("#ff00ff") },
            color2: { value: new THREE.Color("#00ffff") }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            void main() {
                gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
        `
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    animateWave();
}

// Sync Waveform with Audio Data
function animateWave() {
    requestAnimationFrame(animateWave);
    
    if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            let index = Math.floor((i / geometry.attributes.position.count) * dataArray.length);
            let height = dataArray[index] / 256;
            geometry.attributes.position.setY(i, height * 0.5);
        }
        geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

document.getElementById("color1").addEventListener("input", (e) => {
    material.uniforms.color1.value.set(e.target.value);
});
document.getElementById("color2").addEventListener("input", (e) => {
    material.uniforms.color2.value.set(e.target.value);
});

// 🏁 Initialize Everything
window.onload = function() {
    setupAudio();
    initWebGL();
};

const audio = document.getElementById('audio');
const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 300;

const analyserWaveform = audioContext.createAnalyser();
analyserWaveform.fftSize = 2048;

const sourceWaveform = audioContext.createMediaElementSource(audio);
sourceWaveform.connect(analyserWaveform);
analyserWaveform.connect(audioContext.destination);

const bufferLength = analyserWaveform.frequencyBinCount;
const dataArrayWaveform = new Uint8Array(bufferLength);

function drawWaveform() {
    requestAnimationFrame(drawWaveform);

    analyserWaveform.getByteTimeDomainData(dataArrayWaveform);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'lime';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const y = (dataArrayWaveform[i] / 255) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
    }

    ctx.stroke();
}

audio.onplay = () => audioContext.resume().then(drawWaveform);

const spectrumCanvas = document.getElementById('spectrumCanvas');
const spectrumCtx = spectrumCanvas.getContext('2d');

spectrumCanvas.width = window.innerWidth;
spectrumCanvas.height = 300;

function drawSpectrum() {
    requestAnimationFrame(drawSpectrum);

    analyserWaveform.getByteFrequencyData(dataArrayWaveform);

    spectrumCtx.fillStyle = 'black';
    spectrumCtx.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

    const barWidth = (spectrumCanvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArrayWaveform[i] * 1.5;

        spectrumCtx.fillStyle = `rgb(${barHeight + 100}, 50, 255)`;
        spectrumCtx.fillRect(x, spectrumCanvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

audio.onplay = () => audioContext.resume().then(drawSpectrum);

// 3D Waveform Interaction
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    
    analyserWaveform.getByteFrequencyData(dataArrayWaveform);
    const bass = dataArrayWaveform[0] / 255;  // React to bass
    cube.scale.y = 1 + bass * 3;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

audio.onplay = () => {
    audioContext.resume().then(animate);
};
