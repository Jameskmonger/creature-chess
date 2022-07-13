import { createAction } from "@reduxjs/toolkit";

import { BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export type BattleTurnEvent = ReturnType<typeof battleTurnEvent>;
export const battleTurnEvent = createAction<{
	turn: number;
	board: BoardState<PieceModel>;
}>("battleTurnEvent");

export type BattleFinishEvent = ReturnType<typeof battleFinishEvent>;
export const battleFinishEvent = createAction<{
	turn: number;
}>("battleFinishEvent");

export type BattleEvent = BattleTurnEvent | BattleFinishEvent;
