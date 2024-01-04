import { Triangle } from "./game-field";
import { Element, Piece } from "./types";

type PlacementResult = {
    isValid: boolean;
    isTaken: boolean;
}

export function placeElement(element: Element, firstTriangle: Triangle): PlacementResult {
    const placedPieces = new Set<number>();   
    firstTriangle.elementId = element.id;

    const result: PlacementResult = {
        isValid: true,
        isTaken: false
    };

    function getPieceById(pieceId: number): Piece {
        return element.pieces.find(p => p.id === pieceId)!;
    }

    function placePiece(piece: Piece, triangle: Triangle | null): void {
        if (!result.isValid || placedPieces.has(piece.id)) {
            // Exit recursion if placement is invalid
            return;
        }
        if (!triangle) {
            // Placement is invalid, element is placed out of the game field bound
            result.isValid = false;
            return;
        }
        if (triangle.isTaken) {
            // Another element already placed in this spot
            result.isTaken = true;
        }

        placedPieces.add(piece.id);
        triangle.isTaken = true;

        if (piece.leftLeg != null) {
            const nextPiece = getPieceById(piece.leftLeg);
            placePiece(nextPiece, triangle.leftLeg);
        }

        if (piece.rightLeg != null) {
            const nextPiece = getPieceById(piece.rightLeg);
            placePiece(nextPiece, triangle.rightLeg);
        }

        if (piece.hypotenuse != null) {
            const nextPiece = getPieceById(piece.hypotenuse);
            placePiece(nextPiece, triangle.hypotenuse);
        }

        if (piece.top != null) {
            const nextPiece = getPieceById(piece.top);
            placePiece(nextPiece, triangle.top);
        }

        if (piece.bottom != null) {
            const nextPiece = getPieceById(piece.bottom);
            placePiece(nextPiece, triangle.bottom);
        }
    }

    placePiece(element.pieces[0], firstTriangle);

    return result;
}