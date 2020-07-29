import { PlayerState } from "./store";
import { getBoardPieceForPosition } from "./pieceSelectors";
import { GRID_SIZE } from "@common/models/constants";
import { TileCoordinates } from "@common/models/position";

export const getPlayerMoney = (state: PlayerState): number => state.gameInfo.money;
export const getPlayerLevel = (state: PlayerState): number => state.level.level;
export const getPlayerXp = (state: PlayerState): number => state.level.xp;

export const getPlayerBelowPieceLimit = (state: PlayerState, playerId: string): boolean => {
    const ownedBoardPieceCount = Object.values(state.board.pieces).filter(p => p.ownerId === playerId).length;
    const level = state.level.level;

    return ownedBoardPieceCount < level;
};

const PREFERRED_COLUMN_ORDERS = {
    8: [3, 4, 2, 5, 1, 6, 0, 7],
    7: [3, 4, 2, 5, 1, 6, 0]
};

export const getPlayerFirstEmptyBoardSlot = (state: PlayerState): (TileCoordinates | null) => {
    const preferredColumnOrder = PREFERRED_COLUMN_ORDERS[GRID_SIZE.width];

    for (let y = (GRID_SIZE.height / 2); y < GRID_SIZE.height; y++) {
        for (const x of preferredColumnOrder) {
            const boardPiece = getBoardPieceForPosition(state.board, x, y);

            if (!boardPiece) {
                return {
                    x,
                    y
                };
            }
        }
    }

    return null;
};
