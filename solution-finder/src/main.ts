import { findAllCorrectCombinations, filterInvalidPositions, findFirstCorrectCombination } from "./combinations";
import { ALL_ELEMENTS } from "./elements";
import { GameField } from "./game-field";
import { drawElement } from "./visualize";
import { writeFileSync } from 'fs';
import path from 'path';

const field = new GameField();
const possibleSolutions = filterInvalidPositions(field, ALL_ELEMENTS);

// First Solutions
const solution = findFirstCorrectCombination(possibleSolutions);
writeFileSync(path.join(__dirname, '../static/first-solution.json'), JSON.stringify(solution));
if (solution) {
    console.log('SOLUTION FOUND\n');
    solution.forEach(elem => {
        const { layer, square, triangle} = elem.coords;
        const pieces = elem.isReversed ? ALL_ELEMENTS[elem.elementId].reversedPieces : ALL_ELEMENTS[elem.elementId].pieces;
        drawElement(`Element ${elem.elementId}`, pieces, field.layers[layer][square][triangle]);
    })
}

// All Solutions
field.clear();
const solutions = findAllCorrectCombinations(possibleSolutions);
writeFileSync(path.join(__dirname, '../static/all-solutions.json'), JSON.stringify(solutions));
