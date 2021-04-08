import { BoardSelectors } from "@creature-chess/board";
import { PlayerState } from "./store";

export const getPlayerMoney = (state: PlayerState): number => state.playerInfo.money;
export const getPlayerLevel = (state: PlayerState): number => state.playerInfo.level;
export const getPlayerXp = (state: PlayerState): number => state.playerInfo.xp;
export const isPlayerAlive = (state: PlayerState): boolean => state.playerInfo.health > 0;
export const isPlayerShopLocked = (state: PlayerState): boolean => state.cardShop.locked;

// todo use piece limit from board, remove this
export const getPlayerBelowPieceLimit = (state: PlayerState, playerId: string): boolean => {
    const ownedBoardPieceCount = BoardSelectors.getAllPieces(state.board).filter(p => p.ownerId === playerId).length;
    const level = getPlayerLevel(state);

    return ownedBoardPieceCount < level;
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
