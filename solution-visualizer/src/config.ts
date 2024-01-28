import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function initThreeJs() {
    // Init Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Init renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Init camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.up.set(0, 0, 1);

    // Init camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.target = new THREE.Vector3(2, 2, 2);

    // Add light to Scene
    scene.add(new THREE.AmbientLight(0x666666));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 10, 15);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 3);
    light2.position.set(-15, -10, -20);
    scene.add(light2);

    // Temporary Axis Visualizer
    // X - red, Y - green, Z - blue
    scene.add(new THREE.AxesHelper(10));

    window.addEventListener("resize", onWindowResize);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let clickedObject: THREE.Object3D | null = null;
    let objectClickCallback: (object: THREE.Object3D) => void | undefined;
    const objectClick = (callback: (object: THREE.Object3D) => void) => {
        objectClickCallback = callback
    }

    function getCurrentObj(x: number, y: number) {
        pointer.x = ( x / window.innerWidth ) * 2 - 1;
        pointer.y = - ( y / window.innerHeight ) * 2 + 1; 

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        return intersects.length ? intersects[0].object : null;
    }

    window.addEventListener("mousedown", (event) => {
        const obj = getCurrentObj(event.clientX, event.clientY);
        if (obj) clickedObject = obj;
    });

    window.addEventListener("mouseup", (event) => {
        const obj = getCurrentObj(event.clientX, event.clientY);
        if (obj && obj === clickedObject) {
            objectClickCallback?.(obj)
        }
        clickedObject = null;
    });

    return { scene, animate, objectClick };

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }
}
