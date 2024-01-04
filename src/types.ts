export type Piece = {
    id: number;
    // References for sibling triangles
    rightLeg?: number;
    leftLeg?: number;
    hypotenuse?: number;
    top?: number;
    bottom?: number;
}

export type Element = Piece[];

export type Elements = Element[];

export type Coords = {
    layer: number;
    square: number;
    triangle: number;
};