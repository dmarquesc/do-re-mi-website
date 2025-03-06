import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js';

// ✅ Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 5);
scene.add(light);

// ✅ Create a 3D Plane with Logo as Height Map
const geometry = new THREE.PlaneGeometry(4, 4, 256, 256);
const textureLoader = new THREE.TextureLoader();
const heightMap = textureLoader.load('your-logo.png'); // Replace with your actual image path

const material = new THREE.MeshStandardMaterial({
    color: 0xffd700, // Gold color
    displacementMap: heightMap,
    displacementScale: 0.5,
    metalness: 1,
    roughness: 0.3,
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2; // Lay flat
scene.add(plane);

// ✅ Interactive Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ✅ Waveform Animation
function transformToWaveform() {
    const position = plane.geometry.attributes.position;
    const count = position.count;

    for (let i = 0; i < count; i++) {
        let x = position.getX(i);
        let z = Math.sin(x * 4) * 0.5; // Create wave effect

        gsap.to({ z }, {
            z: Math.sin(x * 6 + performance.now() * 0.002) * 0.7,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            onUpdate: function () {
                position.setZ(i, this.targets()[0].z);
                position.needsUpdate = true;
            }
        });
    }
}

// ✅ Start Animation on Click
document.body.addEventListener('click', transformToWaveform);

// ✅ Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// ✅ Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});