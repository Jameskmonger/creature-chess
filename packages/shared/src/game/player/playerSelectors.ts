import { TileCoordinates } from "@creature-chess/models";
import { PlayerState } from "./store";
import { getBoardPieceForPosition } from "./pieceSelectors";
import { BoardState } from "../../board";

export const getPlayerMoney = (state: PlayerState): number => state.playerInfo.money;
export const getPlayerLevel = (state: PlayerState): number => state.playerInfo.level;
export const getPlayerXp = (state: PlayerState): number => state.playerInfo.xp;
export const isPlayerAlive = (state: PlayerState): boolean => state.playerInfo.health > 0;
export const isPlayerShopLocked = (state: PlayerState): boolean => state.cardShop.locked;

export const getPlayerBelowPieceLimit = (state: PlayerState, playerId: string): boolean => {
    const ownedBoardPieceCount = Object.values(state.board.pieces).filter(p => p.ownerId === playerId).length;
    const level = getPlayerLevel(state);

    return ownedBoardPieceCount < level;
};

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
const defaultSortPositions = (a: TileCoordinates, b: TileCoordinates) => {
    if (a.y < b.y) {
        return SORT_A_FIRST;
    }

    if (a.y > b.y) {
        return SORT_A_SECOND;
    }

    // todo tie this into board size
    const distanceFromMiddleA = Math.abs(a.x - 3);
    const distanceFromMiddleB = Math.abs(b.x - 3);

    if (distanceFromMiddleA < distanceFromMiddleB) {
        return SORT_A_FIRST;
    }

    if (distanceFromMiddleA > distanceFromMiddleB) {
        return SORT_A_SECOND;
    }

    return SORT_A_FIRST;
}

export const getPlayerFirstEmptyBoardSlot = (state: BoardState, sortPositions: (a: TileCoordinates, b: TileCoordinates) => -1 | 1 = defaultSortPositions): (TileCoordinates | null) => {
    const emptyPositions: TileCoordinates[] = [];

    for (let y = 0; y < state.size.height; y++) {
        for (let x = 0; x < state.size.width; x++) {
            const boardPiece = getBoardPieceForPosition(state, x, y);

            if (!boardPiece) {
                emptyPositions.push({ x, y });
            }
        }
    }

    if (emptyPositions.length === 0) {
        return null;
    }

    emptyPositions.sort(sortPositions);

    const { x, y } = emptyPositions[0];

    return { x, y };
};

export const getMostExpensiveBenchPiece = (state: PlayerState) => {
    const benchPieces = Object.values(state.bench.pieces);

    if (!benchPieces.length) {
        return null;
    }

    benchPieces.sort((a, b) => b.definition.cost - a.definition.cost);

    return benchPieces[0];
};

export const getOpponentId = (state: PlayerState) => state.playerInfo.opponentId;
