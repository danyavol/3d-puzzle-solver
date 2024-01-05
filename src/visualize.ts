import { Triangle } from "./game-field";
import { traversePieces } from "./traverse";
import { Piece } from "./types";

export function drawElement(name: string, pieces: Piece[], firstTriangle: Triangle) {
    const usedPieces = new Set<string>();
    traversePieces(pieces, firstTriangle, (tr) => {
        const { layer, square, triangle } = tr.coords;
        usedPieces.add(`${layer}${square}${triangle}`);
    });
    
    function t(usedPieceId: string) {
        const used = usedPieces.has(usedPieceId);
        const type = usedPieceId[2];
        switch (type) {
            case "0": return used ? "◢" : "◿";
            case "1": return used ? "◣" : "◺";
            case "2": return used ? "◤" : "◸";
            case "3": return used ? "◥" : "◹";
            default: throw Error('Invalid piece ID');
        }
    }

    function drawLine(array: string[]) {
        return array.map(item => {
            if (["0", "1", "2", "3"].includes(item[0])) {
                // This is piceId
                return t(item);
            }
            return item;
        }).join('');
    }

    console.log(
        name + '\n' +
        drawLine([
            '   ', '000', ' ', '001', '   ', ' | ',
            '   ', '100', ' ', '101', '   ', ' | ',
            '   ', '200', ' ', '201', '   ', ' | ',
            '   ', '300', ' ', '301', '   ', '\n'
        ]) +
        drawLine([
            '030', ' ', '031', '003', ' ', '002', '010', ' ', '011', ' | ',
            '130', ' ', '131', '103', ' ', '102', '110', ' ', '111', ' | ',
            '230', ' ', '231', '203', ' ', '202', '210', ' ', '211', ' | ',
            '330', ' ', '331', '303', ' ', '302', '310', ' ', '311', '\n'
        ]) +
        drawLine([
            '033', ' ', '032', '020', ' ', '021', '013', ' ', '012', ' | ',
            '133', ' ', '132', '120', ' ', '121', '113', ' ', '112', ' | ',
            '233', ' ', '232', '220', ' ', '221', '213', ' ', '212', ' | ',
            '333', ' ', '332', '320', ' ', '321', '313', ' ', '312', '\n'
        ]) +
        drawLine([
            '   ', '023', ' ', '022', '   ', ' | ',
            '   ', '123', ' ', '122', '   ', ' | ',
            '   ', '223', ' ', '222', '   ', ' | ',
            '   ', '323', ' ', '322', '   '
        ]) +
        '\n---------------------------------------------'
    );
}