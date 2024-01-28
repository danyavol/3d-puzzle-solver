import * as THREE from "three";

const solidMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 1,
    side: THREE.FrontSide,
    transparent: true,
    name: "solid"
});

const colorsMap = {
    0: 0xad0041,
    1: 0xe8294a,
    2: 0xff6232,
    3: 0xffaa4f,
    4: 0xffdf7d,
    5: 0xffffb7,
    6: 0xe2f68b,
    7: 0x9ddf9e,
    8: 0x39c5a3,
    9: 0x008ac2,
    10: 0x614ea7,
};

export function getMaterial(elementId: number) {
    const colorId = (elementId % 11) as keyof typeof colorsMap;
    const material = solidMaterial.clone();
    material.color = new THREE.Color(colorsMap[colorId]);
    return material;
}
