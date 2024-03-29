import { Element, FullElement, Piece } from "./types";
import elements from "../../data/elements.json";

export const ALL_ELEMENTS: FullElement[] = elements.map(reverseElement);

function reverseElement(element: Element): FullElement {
    const reversedPieces = element.pieces.map(piece => {
        const reversedPiece: Piece = { id: piece.id };

        if (piece.top != null) reversedPiece.bottom = piece.top;
        if (piece.bottom != null) reversedPiece.top = piece.bottom;
        if (piece.hypotenuse != null) reversedPiece.hypotenuse = piece.hypotenuse;
        if (piece.leftLeg != null) reversedPiece.rightLeg = piece.leftLeg;
        if (piece.rightLeg != null) reversedPiece.leftLeg = piece.rightLeg;
        
        return reversedPiece;
    });

    return {
        id: element.id,
        pieces: [ ...element.pieces ],
        reversedPieces
    };
}
