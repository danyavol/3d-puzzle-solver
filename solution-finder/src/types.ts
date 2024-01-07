import { Triangle } from "./game-field";

// The same as Triangle
// Needed to store Element info in static file
export type Piece = {
    id: number;
    rightLeg?: number;
    leftLeg?: number;
    hypotenuse?: number;
    top?: number;
    bottom?: number;
}

export type Element = {
    id: number;
    pieces: Piece[];
};

export type FullElement = Element & {
    reversedPieces: Piece[]; // Like the figure were rotate by 180 degrees
};

export type Coords = {
    layer: number;
    square: number;
    triangle: number;
};

export type CorrectTriangle = {
    elementId: number;
    isReversed: boolean;
    coords: Coords;
};

export type PossibleSolutions = {
    element: FullElement;
    triangles: Triangle[];
    reversedTriangles: Triangle[];
};