import { ADDITION, Brush, Evaluator } from "three-bvh-csg";
import { Element, Piece } from "../../solution-finder/src/types";
import * as THREE from "three";

export class ElementsFactory {
    private readonly evaluator = new Evaluator();

    private readonly basicPiece = new Brush(new THREE.ExtrudeGeometry(
        new THREE.Shape().moveTo(0, 0).lineTo(0, 2).lineTo(1, 1).lineTo(0, 0),
        { depth: 1, bevelEnabled: false }
    ));

    createElement(element: Element): Brush {
        const pieces = new Map<number, Brush>();
        pieces.set(element.pieces[0].id, this.basicPiece.clone());

        traversePieces(element.pieces, (piece) => {
            if (pieces.has(piece.id)) return;

            if (piece.bottom != null && pieces.has(piece.bottom)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.bottom)!, 'bottom'));
            } 
            else if (piece.top != null && pieces.has(piece.top)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.top)!, 'top'));
            } 
            else if (piece.leftLeg != null && pieces.has(piece.leftLeg)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.leftLeg)!, 'left'));
            } 
            else if (piece.rightLeg != null && pieces.has(piece.rightLeg)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.rightLeg)!, 'right'));
            } 
            else if (piece.hypotenuse != null && pieces.has(piece.hypotenuse)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.hypotenuse)!, 'hypotenuse'));
            } 
            else {
                throw Error('Something went wrong. Unable to create a piece')
            }
        });

        return this.combineBrushes(Array.from(pieces.values()));
    }

    private createPiece(basePiece: Brush, newPiecePosition: 'left' | 'right' | 'top' | 'bottom' | 'hypotenuse'): Brush {
        let piece = basePiece.clone();

        switch (newPiecePosition) {
            case 'left':
                piece = piece.rotateZ(0.5*Math.PI).translateY(-2);
                break;
            case 'right':
                piece = piece.rotateZ(-0.5*Math.PI).translateX(-2);
                break;
            case 'top':
                piece = piece.translateZ(-1);
                break;
            case 'bottom':
                piece = piece.translateZ(1);
                break;
            case 'hypotenuse':
                piece = piece.rotateZ(Math.PI).translateY(-2);
                break;
        }

        piece.updateMatrixWorld();

        return piece;
    }

    private combineBrushes(brushes: Brush[]): Brush {
        let finalBrush = brushes[0];

        for (let i = 1; i < brushes.length; i++) {
            finalBrush = this.evaluator.evaluate(finalBrush, brushes[i], ADDITION);
        }

        return finalBrush;
    }
}

function traversePieces(
    pieces: Piece[],
    nextPieceCallback: (piece: Piece) => void
): void {
    const visitedPieces = new Set<number>();

    function getPieceById(pieceId: number): Piece {
        return pieces.find((p) => p.id === pieceId)!;
    }

    function traversePiece(piece: Piece): void {
        if (visitedPieces.has(piece.id)) return;

        nextPieceCallback(piece);

        visitedPieces.add(piece.id);

        if (piece.leftLeg != null) {
            traversePiece(getPieceById(piece.leftLeg));
        }

        if (piece.rightLeg != null) {
            traversePiece(getPieceById(piece.rightLeg));
        }

        if (piece.hypotenuse != null) {
            traversePiece(getPieceById(piece.hypotenuse));
        }

        if (piece.top != null) {
            traversePiece(getPieceById(piece.top));
        }

        if (piece.bottom != null) {
            traversePiece(getPieceById(piece.bottom));
        }
    }

    traversePiece(pieces[0]);
}
