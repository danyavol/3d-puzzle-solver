import "./styles/styles.scss";

import { initThreeJs } from './config';
import * as THREE from "three";
import { SolutionsSwitcher } from "./solutions-switcher";

const { scene, animate, objectClick } = initThreeJs();

const group = new THREE.Group();
scene.add(group);

new SolutionsSwitcher(group);

let prevObj: THREE.Mesh;

objectClick((object) => {
    if (prevObj && prevObj !== object) {
        prevObj.renderOrder = 0;
        (prevObj.material as THREE.MeshLambertMaterial).opacity = 1;
    }
    
    prevObj = object;
    object.renderOrder = 1;
    const material = object.material as THREE.MeshLambertMaterial;
    if (material.opacity === 1) {
        material.opacity = 0.5;
    } else {
        material.opacity = 1;
    }
});

animate();

