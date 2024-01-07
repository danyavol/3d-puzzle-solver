import { Element, FullElement, Piece } from "./types";

export function reverseElement(element: Element): FullElement {
    const reversedPieces = element.pieces.map(piece => {
        const reversedPiece: Piece = { id: piece.id };

        if (piece.top != null) reversedPiece.bottom = piece.top;
        if (piece.bottom != null) reversedPiece.top = piece.bottom;
        if (piece.hypotenuse) reversedPiece.hypotenuse = piece.hypotenuse;
        if (piece.leftLeg) reversedPiece.rightLeg = piece.leftLeg;
        if (piece.rightLeg) reversedPiece.leftLeg = piece.rightLeg;
        
        return reversedPiece;
    });

    return {
        id: element.id,
        pieces: [ ...element.pieces ],
        reversedPieces
    };
}
