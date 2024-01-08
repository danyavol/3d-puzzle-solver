import "./styles/styles.scss";

import * as THREE from 'three';
import { initThreeJs } from './config';
import { ElementsFactory } from "./create-element";
import elements from "../../data/elements.json";

const { scene, animate } = initThreeJs();

const meshMaterial = new THREE.MeshLambertMaterial( {
    color: 0xff0000,
    opacity: 0.5,
    side: THREE.DoubleSide,
    transparent: true
} );

const factory = new ElementsFactory();

const brush = factory.createElement(elements[6]);

brush.material = meshMaterial;
scene.add(brush);

animate();
