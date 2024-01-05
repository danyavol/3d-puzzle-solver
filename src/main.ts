import { findCorrectCombination, filterInvalidPositions } from "./combinations";
import { ALL_ELEMENTS } from "./elements";
import { GameField } from "./game-field";
import { drawElement } from "./visualize";

const field = new GameField();

const possibleSolutions = filterInvalidPositions(field, ALL_ELEMENTS);
const solution = findCorrectCombination(possibleSolutions);

if (solution) {
    console.log('SOLUTION FOUND\n');
    solution.forEach(elem => {
        const { layer, square, triangle} = elem.triangle;
        drawElement(`Element ${elem.elementId}`, elem.pieces, field.layers[layer][square][triangle]);
    })
}
