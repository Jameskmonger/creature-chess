import { BoardSelectors } from "@shoki/board";

import { PlayerStatus } from "@creature-chess/models";

import { PlayerState } from "..";

export const getPlayerBoard = (state: PlayerState) => state.board;
export const isPlayerBoardLocked = (state: PlayerState) => state.board.locked;
export const getPlayerBench = (state: PlayerState) => state.bench;

export const getPlayerMoney = (state: PlayerState): number =>
	state.playerInfo.money;
export const getPlayerHealth = (state: PlayerState): number =>
	state.playerInfo.health;
export const getPlayerLevel = (state: PlayerState): number =>
	state.playerInfo.level;
export const getPlayerXp = (state: PlayerState): number => state.playerInfo.xp;
export const getPlayerBattle = (state: PlayerState) => state.playerInfo.battle;
export const getPlayerStatus = (state: PlayerState) => state.playerInfo.status;
export const isNotQuit = (state: PlayerState) =>
	state.playerInfo.status !== PlayerStatus.QUIT;
export const getPlayerStreak = (state: PlayerState) => state.playerInfo.streak;
export const isPlayerReady = (state: PlayerState) => state.playerInfo.ready;
export const getOpponentId = (state: PlayerState) =>
	state.playerInfo.opponentId;

export const isPlayerAlive = (state: PlayerState): boolean =>
	state.playerInfo.health > 0;
export const getPlayerCards = (state: PlayerState) => state.cardShop.cards;
export const isPlayerShopLocked = (state: PlayerState): boolean =>
	state.cardShop.locked;

export const getAllPieceCount = (state: PlayerState) =>
	[
		...BoardSelectors.getAllPieces(state.board),
		...BoardSelectors.getAllPieces(state.bench),
	].length;

// todo use piece limit from board, remove this
export const getPlayerBelowPieceLimit = (
	state: PlayerState,
	playerId: string
): boolean => {
	const ownedBoardPieceCount = BoardSelectors.getAllPieces(state.board).filter(
		(p) => p.ownerId === playerId
	).length;
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
