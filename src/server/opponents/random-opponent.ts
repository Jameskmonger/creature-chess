import { createBoard as createElectricNormalBoard } from "./electric-normal";
import { createBoard as createFireBugBoard } from "./fire-bug";

const createBoardFunctions = [ createElectricNormalBoard, createFireBugBoard ];

export const createRandomOpponentBoard = (ownerId: string) => {
    const pointer = Math.floor(Math.random() * createBoardFunctions.length);

    return createBoardFunctions[pointer](ownerId);
};
