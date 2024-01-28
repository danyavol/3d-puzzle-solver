import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const headerHeight = 50;

export function initThreeJs() {
    // Init Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Init renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - headerHeight);
    const canvas = renderer.domElement;
    document.body.appendChild(canvas);

    // Init camera
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.up.set(0, 0, 1);

    // Init camera controls
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
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

    const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
    resizeObserver.observe(canvas, {box: 'content-box'});

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let clickedObject: THREE.Object3D | null = null;
    let objectClickCallback: (object: THREE.Object3D) => void | undefined;
    const objectClick = (callback: (object: THREE.Object3D) => void) => {
        objectClickCallback = callback
    }

    function getCurrentObj(x: number, y: number) {
        const rect = canvas.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;

        pointer.x = ( x / canvas.clientWidth ) * 2 - 1;
        pointer.y = - ( y / (canvas.clientHeight) ) * 2 + 1; 

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

    function resizeCanvasToDisplaySize() {
        const canvas = renderer.domElement;
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
      
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      
        // update any render target sizes here
    }
    
    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }
}
