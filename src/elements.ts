import { Element, Elements } from "./types";

const element0: Element = {
    id: 0,
    pieces: [
        { id: 0, leftLeg: 1 },
        { id: 1, rightLeg: 0, hypotenuse: 2 },
        { id: 2, hypotenuse: 1, rightLeg: 3 },
        { id: 3, leftLeg: 2, hypotenuse: 4 },
        { id: 4, hypotenuse: 3, leftLeg: 5 },
        { id: 5, rightLeg: 4 },
    ],
};

const element1: Element = {
    id: 1,
    pieces: [
        { id: 0, rightLeg: 1 },
        { id: 1, leftLeg: 1, hypotenuse: 2 },
        { id: 2, hypotenuse: 1, rightLeg: 3 },
        { id: 3, leftLeg: 2 },
    ],
};

const element2: Element = {
    id: 2,
    pieces: [
        { id: 0, rightLeg: 1, leftLeg: 3 },
        { id: 1, leftLeg: 0, rightLeg: 2 },
        { id: 2, leftLeg: 1, rightLeg: 3 },
        { id: 3, leftLeg: 2, rightLeg: 0, hypotenuse: 4 },
        { id: 4, hypotenuse: 3, leftLeg: 5 },
        { id: 5, rightLeg: 4 },
    ],
};

const element3: Element = {
    id: 3,
    pieces: [
        { id: 0, leftLeg: 1 },
        { id: 1, rightLeg: 0, top: 2 },
        { id: 2, bottom: 1, leftLeg: 3 },
        { id: 3, rightLeg: 2, top: 4 },
        { id: 4, bottom: 3, leftLeg: 5 },
        { id: 5, rightLeg: 4 },
    ],
};

const element4: Element = {
    id: 4,
    pieces: [
        { id: 0, leftLeg: 1 },
        { id: 1, rightLeg: 0, top: 2 },
        { id: 2, bottom: 1, leftLeg: 3, top: 4 },
        { id: 3, rightLeg: 2 },
        { id: 4, bottom: 2, rightLeg: 5 },
        { id: 5, leftLeg: 4 },
    ],
};

const element5: Element = {
    id: 5,
    pieces: [
        { id: 0, leftLeg: 1, rightLeg: 3, top: 4 },
        { id: 1, rightLeg: 0, leftLeg: 2, top: 5 },
        { id: 2, rightLeg: 1, leftLeg: 3 },
        { id: 3, rightLeg: 2, leftLeg: 0 },
        { id: 4, bottom: 0, leftLeg: 5 },
        { id: 5, bottom: 1, rightLeg: 4 },
    ],
};

const element6: Element = {
    id: 6,
    pieces: [
        { id: 0, rightLeg: 1 },
        { id: 1, leftLeg: 0, hypotenuse: 2 },
        { id: 2, hypotenuse: 1, rightLeg: 3 },
        { id: 3, leftLeg: 2, hypotenuse: 4 },
        { id: 4, hypotenuse: 3, rightLeg: 5 },
        { id: 5, leftLeg: 4 },
    ],
};

const element7: Element = {
    id: 7,
    pieces: [
        { id: 0, leftLeg: 1 },
        { id: 1, rightLeg: 0, hypotenuse: 2 },
        { id: 2, hypotenuse: 1, leftLeg: 3 },
        { id: 3, rightLeg: 2, top: 4 },
        { id: 4, bottom: 3, leftLeg: 5 },
        { id: 5, rightLeg: 4 },
    ],
};

const element8: Element = {
    id: 8,
    pieces: [
        { id: 0, rightLeg: 1 },
        { id: 1, leftLeg: 0, hypotenuse: 2 },
        { id: 2, hypotenuse: 1, rightLeg: 3, top: 4 },
        { id: 3, leftLeg: 2 },
        { id: 4, bottom: 2, leftLeg: 5 },
        { id: 5, rightLeg: 4 },
    ],
};

const element9: Element = {
    id: 9,
    pieces: [
        { id: 0, rightLeg: 1 },
        { id: 1, leftLeg: 0, hypotenuse: 2 },
        { id: 2, hypotenuse: 1, leftLeg: 3 },
        { id: 3, rightLeg: 2, top: 4 },
        { id: 4, bottom: 3, leftLeg: 5 },
        { id: 5, rightLeg: 4 },
    ],
};

const element10: Element = {
    id: 10,
    pieces: [
        { id: 0, leftLeg: 1, top: 2 },
        { id: 1, rightLeg: 0, top: 3 },
        { id: 2, bottom: 0, leftLeg: 3, top: 4 },
        { id: 3, bottom: 1, rightLeg: 2 },
        { id: 4, bottom: 2, rightLeg: 5 },
        { id: 5, leftLeg: 4 },
    ],
};

export const ALL_ELEMENTS: Elements = [
    element0,
    element1,
    element2,
    element3,
    element4,
    element5,
    element6,
    element7,
    element8,
    element9,
    element10,
];
