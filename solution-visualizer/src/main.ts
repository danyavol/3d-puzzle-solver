import "./styles/styles.scss";

import { initThreeJs } from './config';
import firstSolution from "../../data/first-solution.json";
import { displaySolution } from "./display-solution";

const { scene, animate } = initThreeJs();

const meshes = displaySolution(firstSolution);
scene.add(...meshes);

animate();
