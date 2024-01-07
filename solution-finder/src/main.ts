import { findAllCorrectCombinations, filterInvalidPositions, findFirstCorrectCombination } from "./combinations";
import { ALL_ELEMENTS } from "./elements";
import { GameField } from "./game-field";
import { drawElement } from "./visualize";
import { writeFileSync } from 'fs';

const field = new GameField();
const possibleSolutions = filterInvalidPositions(field, ALL_ELEMENTS);

// First Solutions
const solution = findFirstCorrectCombination(possibleSolutions);
if (solution) {
    console.log('SOLUTION FOUND\n');
    solution.forEach(elem => {
        const { layer, square, triangle} = elem.triangle;
        drawElement(`Element ${elem.elementId}`, elem.pieces, field.layers[layer][square][triangle]);
    })
}

// All Solutions
field.clear();
const solutions = findAllCorrectCombinations(possibleSolutions);
writeFileSync('./solutions.json', JSON.stringify(solutions));
