import { PlayerStatus } from "@creature-chess/models/game/playerList";

import { PlayerState } from "..";
import { GamePhase } from "@creature-chess/models";
import { Board } from "@creature-chess/board";

export const isPlayerBoardLocked = (state: PlayerState) => state.roundInfo.phase !== GamePhase.PREPARING;

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
export const getOpponentIsClone = (state: PlayerState) =>
	state.playerInfo.opponentIsClone;

export const isPlayerAlive = (state: PlayerState): boolean =>
	state.playerInfo.health > 0;
export const getPlayerCards = (state: PlayerState) => state.cardShop.cards;
export const isPlayerShopLocked = (state: PlayerState): boolean =>
	state.cardShop.locked;

export const getPlayerBelowPieceLimit = (
	level: number,
	board: Board,
	bench: Board,
): boolean => {
	const ownedBoardPieceCount = board.pieceCount + bench.pieceCount;

	return ownedBoardPieceCount < level;
};
