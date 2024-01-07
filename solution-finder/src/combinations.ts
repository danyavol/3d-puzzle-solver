import { GameField, Triangle } from "./game-field";
import { traversePieces } from "./traverse";
import { CorrectTriangle, FullElement, Piece, PossibleSolutions } from "./types";


export function filterInvalidPositions(field: GameField, elements: FullElement[]): PossibleSolutions[] {
    const possibleSolutionsForElements: PossibleSolutions[] = [];
    for (let element of elements) {
        const validTriangles = field.triangles.filter(triangle => isValidPosition(element.pieces, triangle));
        const validReversedTriangles = field.triangles.filter(triangle => isValidPosition(element.reversedPieces, triangle));
        possibleSolutionsForElements.push({ element, triangles: validTriangles, reversedTriangles: validReversedTriangles });
    }

    return possibleSolutionsForElements;
}

export function findFirstCorrectCombination(possibleSolutionsForElements: PossibleSolutions[]): CorrectTriangle[] | null {
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
                    return [{ elementId: element.element.id, isReversed: false, coords: triangle.coords }, ...otherCorrectTriangles];
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
                    return [{ elementId: element.element.id, isReversed: true, coords: triangle.coords }, ...otherCorrectTriangles];
                }
            }
        }
        // Correct triangle not found
        return null;
    }

    return placeNextElement(0);
}

export function findAllCorrectCombinations(possibleSolutionsForElements: PossibleSolutions[]): CorrectTriangle[][] {
    let iterations = 0;
    let lastIndexes = 0;
    function placeNextElement(elementIndex: number, correctCallback: (solution: CorrectTriangle[]) => void): void {
        const element = possibleSolutionsForElements[elementIndex];
        iterations++;

        if (elementIndex === 10) {
            lastIndexes++;
        }
        // Last index reached
        if (!element) {
            correctCallback([]);
            return;
        }

        for (let triangle of element.triangles) {
            const isSuccess = placeElement(element.element.pieces, triangle);

            if (isSuccess) {
                placeNextElement(elementIndex + 1, (partialSolution) => {
                    correctCallback([{ 
                        elementId: element.element.id, 
                        isReversed: false,
                        coords: triangle.coords 
                    }, ...partialSolution]);
                });

                removeElement(element.element.pieces, triangle);
            }
        }

        // Try reversed variant if default doesn't fit
        for (let triangle of element.reversedTriangles) {
            const isReversedSuccess = placeElement(element.element.reversedPieces, triangle);

            if (isReversedSuccess) {
                placeNextElement(elementIndex + 1, (partialSolution) => {
                    correctCallback([{ 
                        elementId: element.element.id, 
                        isReversed: true,
                        coords: triangle.coords 
                    }, ...partialSolution]);
                });

                removeElement(element.element.reversedPieces, triangle);
            }
        }
    }

    const allSolutions: CorrectTriangle[][] = [];

    placeNextElement(0, (solution) => {
        allSolutions.push(solution);
        console.log(`New solution found. Number - ${allSolutions.length}. Iteration - ${iterations}`);
    });

    console.log('ALL Iterations', iterations);
    console.log('Number of almost correct solutions', lastIndexes);
    console.log('Number of correct solutions', allSolutions.length);

    return allSolutions;
}

// FUNCTIONS HELPERS

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
