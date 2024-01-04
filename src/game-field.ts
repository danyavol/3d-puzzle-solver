import { Coords } from "./types";

export class Triangle {
    isTaken = false;

    // References for sibling triangles
    rightLeg: Triangle | null = null;
    leftLeg: Triangle | null = null;
    hypotenuse: Triangle | null = null;
    top: Triangle | null = null;
    bottom: Triangle | null = null;

    constructor(public readonly coords: Coords) {}
}

export class GameField {
    layers: Triangle[][][] = [];

    constructor() {
        this.initTriangles();
    }

    clearTaken(): void {
        this.layers.forEach((layer) => {
            layer.forEach((square) => {
                square.forEach((triangle) => {
                    triangle.isTaken = false;
                });
            });
        });
    }

    private initTriangles(): void {
        for (let layer = 0; layer < 4; layer++) {
            this.layers[layer] = [];
            for (let square = 0; square < 4; square++) {
                this.layers[layer][square] = [];
                for (let triangle = 0; triangle < 4; triangle++) {
                    this.layers[layer][square][triangle] = new Triangle({
                        layer,
                        square,
                        triangle,
                    });

                    if (triangle === 3) {
                        // All triangles are created - add references
                        const thisSquare = this.layers[layer][square];

                        this.connectTriangles(thisSquare[0], "left", thisSquare[1]);
                        this.connectTriangles(thisSquare[1], "left", thisSquare[2]);
                        this.connectTriangles(thisSquare[2], "left", thisSquare[3]);
                        this.connectTriangles(thisSquare[3], "left", thisSquare[0]);
                    }
                }

                if (square === 3) {
                    const thisLayer = this.layers[layer];

                    // All square are created - add references
                    this.connectTriangles(thisLayer[0][2], "hypotenuse", thisLayer[1][0]);
                    this.connectTriangles(thisLayer[1][3], "hypotenuse", thisLayer[2][1]);
                    this.connectTriangles(thisLayer[2][0], "hypotenuse", thisLayer[3][2]);
                    this.connectTriangles(thisLayer[3][1], "hypotenuse", thisLayer[0][3]);
                }
            }

            if (layer === 3) {
                // All layers are created - add references
                this.connectLayers(this.layers[0], this.layers[1]);
                this.connectLayers(this.layers[1], this.layers[2]);
                this.connectLayers(this.layers[2], this.layers[3]);
            }
        }
    }

    // Connecting 2 triangles by adding references from selected side
    private connectTriangles(triangle1: Triangle, triangle1Side: "left" | "hypotenuse", triangle2: Triangle): void {
        switch (triangle1Side) {
            case "left":
                // rightLeg will always connect to the leftleg and vice versa
                triangle1.leftLeg = triangle2;
                triangle2.rightLeg = triangle1;
                break;
            case "hypotenuse":
                // hypotenuse will always connect to the hypotenuse
                triangle1.hypotenuse = triangle2;
                triangle2.hypotenuse = triangle1;
                break;
        }
    }

    private connectLayers(bottomLayer: Triangle[][], topLayer: Triangle[][]): void {
        for (let square = 0; square < 4; square++) {
            for (let triangle = 0; triangle < 4; triangle++) {
                bottomLayer[square][triangle].top = topLayer[square][triangle];
                topLayer[square][triangle].bottom = bottomLayer[square][triangle];
            }
        }
    }
}
