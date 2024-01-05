import { GameField, Triangle } from "./game-field";
import { traversePieces } from "./traverse";
import { Coords, FullElement, Piece } from "./types";

type PossibleSolutions = {
    element: FullElement;
    triangles: Triangle[];
    reversedTriangles: Triangle[];
};

export function filterInvalidPositions(field: GameField, elements: FullElement[]): PossibleSolutions[] {
    const possibleSolutionsForElements: PossibleSolutions[] = [];
    for (let element of elements) {
        const validTriangles = field.triangles.filter(triangle => isValidPosition(element.pieces, triangle));
        const validReversedTriangles = field.triangles.filter(triangle => isValidPosition(element.reversedPieces, triangle));
        possibleSolutionsForElements.push({ element, triangles: validTriangles, reversedTriangles: validReversedTriangles });
    }

    return possibleSolutionsForElements;
}


function isValidPosition(pieces: Piece[], firstTriangle: Triangle): boolean {
    let isValid = true;

    traversePieces(pieces, firstTriangle, null, () => {
        isValid = false
    });

    return isValid;
}

function placeElement(pieces: Piece[], triangle: Triangle): boolean {
    const affectedTriangles: Triangle[] = [];
    let isSuccess = true;
    traversePieces(pieces, triangle, (tr) => { 
        if (!tr.isTaken && isSuccess) {
            tr.isTaken = true; 
            affectedTriangles.push(tr);
        } else if (tr.isTaken && isSuccess) {
            isSuccess = false;
        }
    });

    if (!isSuccess) {
        // Revert affected triangles
        affectedTriangles.forEach(tr => tr.isTaken = false);
    }

    return isSuccess;
}

function removeElement(pieces: Piece[], triangle: Triangle): void {
    traversePieces(pieces, triangle, (tr) => { 
        tr.isTaken = false;
    });
}

type CorrectTriangle = {
    elementId: number;
    isReversed: boolean;
    pieces: Piece[];
    triangle: Coords;
};

export function findCorrectCombination(possibleSolutionsForElements: PossibleSolutions[]): CorrectTriangle[] | null {
    function placeNextElement(elementIndex: number): CorrectTriangle[] | null {
        const element = possibleSolutionsForElements[elementIndex];

        // Last index reached
        if (!element) return [];

        for (let triangle of element.triangles) {

            const isSuccess = placeElement(element.element.pieces, triangle);

            if (isSuccess) {
                const otherCorrectTriangles = placeNextElement(elementIndex + 1);

                if (!otherCorrectTriangles) {
                    // No possible combinations found
                    removeElement(element.element.pieces, triangle);
                } else {
                    return [{ elementId: element.element.id, isReversed: false, pieces: element.element.pieces, triangle: triangle.coords }, ...otherCorrectTriangles];
                }
            }
        }

        for (let triangle of element.reversedTriangles) {
            // Try reversed variant if default doesn't suite
            const isReversedSuccess = placeElement(element.element.reversedPieces, triangle);
            
            if (isReversedSuccess) {
                const otherCorrectTriangles = placeNextElement(elementIndex + 1);

                if (!otherCorrectTriangles) {
                    // No possible combinations found
                    removeElement(element.element.reversedPieces, triangle);
                } else {
                    return [{ elementId: element.element.id, isReversed: true, pieces: element.element.reversedPieces, triangle: triangle.coords }, ...otherCorrectTriangles];
                }
            }
        }
        // Correct triangle not found
        return null;
    }

    return placeNextElement(0);
}
