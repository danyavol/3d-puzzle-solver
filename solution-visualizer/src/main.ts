import "./styles/styles.scss";

import { initThreeJs } from './config';
import firstSolution from "../../data/first-solution.json";
import { displaySolution } from "./display-solution";
import * as THREE from "three";

const { scene, animate, objectClick } = initThreeJs();

const meshes = displaySolution(firstSolution);
scene.add(...meshes);

// TODO: Add possibility to switch solutions

objectClick((object: THREE.Object3D) => {
    if (object.material.opacity === 1) {
        object.material.opacity = 0.3;
    } else {
        object.material.opacity = 1;
    }
});

animate();
