import { createAction } from "@reduxjs/toolkit";

import { BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { PieceCombatState, PieceInfoStore } from "./state";

export type BattleTurnEvent = ReturnType<typeof battleTurnEvent>;
export const battleTurnEvent = createAction<{
	turn: number;
	board: BoardState<PieceModel>;
}>("battleTurnEvent");

export type ExposeStoreEvent = ReturnType<typeof exposeStoreEvent>;
export const exposeStoreEvent = createAction<{
	stores: {
		combat: PieceInfoStore<PieceCombatState>;
	};
}>("exposeStoreEvent");

export type BattleFinishEvent = ReturnType<typeof battleFinishEvent>;
export const battleFinishEvent = createAction<{
	turn: number;
}>("battleFinishEvent");

export type BattleEvent = BattleTurnEvent | BattleFinishEvent;
