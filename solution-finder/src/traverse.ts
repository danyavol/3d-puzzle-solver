import { Triangle } from "./game-field";
import { Piece } from "./types";

type ElementPositionInvalidCallback = () => void;

type TraverseCallBack = (triangle: Triangle) => void;

export function traversePieces(
    pieces: Piece[],
    firstTriangle: Triangle,
    nextTriangleCallback?: TraverseCallBack | null,
    invalidCallback?: ElementPositionInvalidCallback | null
): void {
    const placedPieces = new Set<number>();
    let isValid = true;

    function getPieceById(pieceId: number): Piece {
        return pieces.find((p) => p.id === pieceId)!;
    }

    function traversePiece(piece: Piece, triangle: Triangle | null): void {
        if (!isValid || placedPieces.has(piece.id)) {
            // Exit recursion if placement is invalid
            return;
        }
        if (!triangle) {
            // Placement is invalid, element is placed out of the game field bound
            isValid = false;
            invalidCallback?.();
            return;
        }

        nextTriangleCallback?.(triangle);

        placedPieces.add(piece.id);

        if (piece.leftLeg != null) {
            const nextPiece = getPieceById(piece.leftLeg);
            traversePiece(nextPiece, triangle.leftLeg);
        }

        if (piece.rightLeg != null) {
            const nextPiece = getPieceById(piece.rightLeg);
            traversePiece(nextPiece, triangle.rightLeg);
        }

        if (piece.hypotenuse != null) {
            const nextPiece = getPieceById(piece.hypotenuse);
            traversePiece(nextPiece, triangle.hypotenuse);
        }

        if (piece.top != null) {
            const nextPiece = getPieceById(piece.top);
            traversePiece(nextPiece, triangle.top);
        }

        if (piece.bottom != null) {
            const nextPiece = getPieceById(piece.bottom);
            traversePiece(nextPiece, triangle.bottom);
        }
    }

    traversePiece(pieces[0], firstTriangle);
}