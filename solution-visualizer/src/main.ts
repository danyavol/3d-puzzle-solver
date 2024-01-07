import "./styles/styles.scss";

import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { initThreeJs } from './config';

// Setup

const { scene, animate } = initThreeJs();

const meshMaterial = new THREE.MeshLambertMaterial( {
    color: 0xff0000,
    opacity: 0.5,
    side: THREE.DoubleSide,
    transparent: true
} );

const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 1, 0, 1 ) );
points.push( new THREE.Vector3( 0, 0, 2 ) );
points.push( new THREE.Vector3( 0, 1, 0 ) );
points.push( new THREE.Vector3( 1, 1, 1 ) );
points.push( new THREE.Vector3( 0, 1, 2 ) );

const meshGeometry = new ConvexGeometry( points );
const triangle = new THREE.Mesh( meshGeometry, meshMaterial );

scene.add( triangle );


animate();