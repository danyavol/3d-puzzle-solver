import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initThreeJs() {
    // Init Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf5f5f5 );

    // Init renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Init camera
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 8, 8, 8 );

    // Init camera controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.target = new THREE.Vector3(2, 2, 2);

    // Add light to Scene
    scene.add( new THREE.AmbientLight( 0x666666 ) );

    const light = new THREE.DirectionalLight( 0xffffff, 3 );
    light.position.set( 5, 10, 15 );
    scene.add( light ); 

    const light2 = new THREE.DirectionalLight( 0xffffff, 3 );
    light2.position.set( -15, -10, -20 );
    scene.add( light2 ); 

    // Temporary Axis Visualizer
    // X - red, Y - green, Z - blue
    scene.add( new THREE.AxesHelper( 10 ) );

    window.addEventListener( 'resize', onWindowResize );

    return { scene, animate }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    function animate() {
        requestAnimationFrame( animate );
    
        renderer.render( scene, camera );
    }    
}

