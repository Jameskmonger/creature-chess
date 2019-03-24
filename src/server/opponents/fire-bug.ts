import { makeEnemy } from "../../shared/pokemon-piece";

export const createBoard = () => {
    return [
        makeEnemy(77, [0, 0]),
        makeEnemy(15, [1, 0]),
        makeEnemy(123, [4, 0]),
        makeEnemy(58, [5, 0]),
        makeEnemy(6, [4, 3]),
        makeEnemy(11, [3, 1])
    ];
};
