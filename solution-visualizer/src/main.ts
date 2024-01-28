import "./styles/styles.scss";

import { initThreeJs } from './config';
import * as THREE from "three";
import { SolutionsSwitcher } from "./solutions-switcher";

const { scene, animate, objectClick } = initThreeJs();

const group = new THREE.Group();
scene.add(group);

new SolutionsSwitcher(group);

objectClick((object: any) => {
    if (object.material.opacity === 1) {
        object.material.opacity = 0.3;
    } else {
        object.material.opacity = 1;
    }
});

animate();

