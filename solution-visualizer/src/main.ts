import "./styles/styles.scss";

import { initThreeJs } from './config';
import firstSolution from "../../data/first-solution.json";
import solutions from "../../data/all-solutions.json";
import elementsList from "../../data/list-of-elements.json";
import { displaySolution } from "./display-solution";
import { ElementsFactory } from "./create-element";
import { ALL_ELEMENTS } from "../../solution-finder/src/elements";
import { getMaterial } from "./material";

const { scene, animate } = initThreeJs();

// const meshes = displaySolution(firstSolution);
// scene.add(...meshes);

// const meshes = displaySolution(elementsList);
// scene.add(...meshes);

const factory = new ElementsFactory();
const mesh = factory.createElement(ALL_ELEMENTS[0].reversedPieces);
console.log(ALL_ELEMENTS[0].reversedPieces);
mesh.material = getMaterial(4);
scene.add(mesh);

animate();
