import { Coords, CorrectTriangle } from "../../solution-finder/src/types";
import { getAllElementsMeshes } from "./create-element";

type XYZ = { x: number, y: number, z: number };

type ElementOffset = {
    position: XYZ,
    rotation: XYZ
};

function getElementOffset(coords: Coords): ElementOffset {
    const offset: ElementOffset = {
        position: { x: 0, y: 0, z: coords.layer },
        rotation: { x: 0, y: 0, z: 0 }
    };

    if (coords.triangle === 1) {
        offset.rotation.z = -0.5 * Math.PI;
        offset.position.y = 2;
    } else if (coords.triangle === 2) {
        offset.rotation.z = Math.PI;
        offset.position.x = 2;
        offset.position.y = 2;
    } else if (coords.triangle === 3) {
        offset.rotation.z = 0.5 * Math.PI;
        offset.position.x = 2;
    }

    if (coords.square === 1) {
        offset.position.y += 2;
    } else if (coords.square === 2) {
        offset.position.y += 2;
        offset.position.x += 2;
    } else if (coords.square === 3) {
        offset.position.x += 2;
    }
    
    return offset;
}

export function displaySolution(solution: CorrectTriangle[]): THREE.Mesh[] {
    const meshes = getAllElementsMeshes();
    const output: THREE.Mesh[] = [];

    solution.forEach(element => {
        const mesh = element.isReversed ? meshes.reversed[element.elementId] : meshes.reversed[element.elementId];

        const offset = getElementOffset(element.coords);
        mesh.position.set(offset.position.x, offset.position.y, offset.position.z);
        mesh.rotation.set(offset.rotation.x, offset.rotation.y, offset.rotation.z);

        mesh.updateMatrix();

        output.push(mesh);
    });

    return output;
}
