import { makeEnemy } from "../../shared/pokemon-piece";

export const createBoard = () => {
    return [
        makeEnemy(25, [1, 3]),
        makeEnemy(82, [2, 3]),
        makeEnemy(101, [3, 3]),
        makeEnemy(125, [4, 3]),
        makeEnemy(41, [7, 0])
    ];
};
