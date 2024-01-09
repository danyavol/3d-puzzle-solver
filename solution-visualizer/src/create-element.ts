import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { ALL_ELEMENTS } from "../../solution-finder/src/elements";
import { Piece } from "../../solution-finder/src/types";
import { getMaterial } from "./material";

type MeshesMap = { [elementId: number]: THREE.Mesh };

export function getAllElementsMeshes(): { standard: MeshesMap, reversed: MeshesMap } {
    const factory = new ElementsFactory();

    const map: { [elementId: number]: THREE.Mesh } = {};
    const reversedMap: { [elementId: number]: THREE.Mesh } = {};

    ALL_ELEMENTS.forEach((element) => {
        const mesh = factory.createElement(element.pieces);
        mesh.material = getMaterial(element.id);
        map[element.id] = mesh;

        const reversedMesh = factory.createElement(element.reversedPieces);
        reversedMesh.material = getMaterial(element.id);
        reversedMap[element.id] = reversedMesh;
    });

    console.log(ALL_ELEMENTS[4]);

    return { standard: map, reversed: reversedMap };
}

export class ElementsFactory {
    private readonly basicPiece = new THREE.Mesh(
        new THREE.ExtrudeGeometry(new THREE.Shape().moveTo(0, 0).lineTo(2, 0).lineTo(1, 1).lineTo(0, 0), {
            depth: 1,
            bevelEnabled: false,
        })
    );

    createElement(elementPieces: Piece[]): THREE.Mesh {
        const pieces = new Map<number, THREE.Mesh>();
        pieces.set(elementPieces[0].id, this.basicPiece.clone());

        traversePieces(elementPieces, (piece) => {
            if (pieces.has(piece.id)) return;

            if (piece.bottom != null && pieces.has(piece.bottom)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.bottom)!, "top"));
            } else if (piece.top != null && pieces.has(piece.top)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.top)!, "bottom"));
            } else if (piece.leftLeg != null && pieces.has(piece.leftLeg)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.leftLeg)!, "right"));
            } else if (piece.rightLeg != null && pieces.has(piece.rightLeg)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.rightLeg)!, "left"));
            } else if (piece.hypotenuse != null && pieces.has(piece.hypotenuse)) {
                pieces.set(piece.id, this.createPiece(pieces.get(piece.hypotenuse)!, "hypotenuse"));
            } else {
                throw Error("Something went wrong. Unable to create a piece");
            }
        });

        return this.combineMeshes(Array.from(pieces.values()));
    }

    private createPiece(
        basePiece: THREE.Mesh,
        newPiecePosition: "left" | "right" | "top" | "bottom" | "hypotenuse"
    ): THREE.Mesh {
        let piece = basePiece.clone();

        switch (newPiecePosition) {
            case "left":
                piece = piece.rotateZ(-0.5 * Math.PI).translateX(-2);
                break;
            case "right":
                piece = piece.rotateZ(0.5 * Math.PI).translateY(-2);
                break;
            case "top":
                piece = piece.translateZ(1);
                break;
            case "bottom":
                piece = piece.translateZ(-1);
                break;
            case "hypotenuse":
                piece = piece.rotateZ(Math.PI).translateX(-2);
                break;
        }

        piece.updateMatrix();

        return piece;
    }

    private combineMeshes(meshes: THREE.Mesh[]): THREE.Mesh {
        let finalMesh = meshes[0];

        for (let i = 1; i < meshes.length; i++) {
            finalMesh = CSG.union(finalMesh, meshes[i]);
        }

        return finalMesh;
    }
}

function traversePieces(pieces: Piece[], nextPieceCallback: (piece: Piece) => void): void {
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
