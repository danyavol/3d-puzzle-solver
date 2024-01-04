import { placeElement } from "./combinations";
import { ALL_ELEMENTS } from "./elements";
import { GameField } from "./game-field";

const field = new GameField();

const element = ALL_ELEMENTS[0];

const searchResult = field.triangles.reduce((possiblePositions, triangle) => {
    const result = placeElement(element, triangle);
    if (result.isValid) {
        possiblePositions.push(triangle.coords);
    }
    return possiblePositions;
}, [] as any[]);

console.log('Number of possible placements - ', searchResult.length);