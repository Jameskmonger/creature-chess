import { createAction } from "@reduxjs/toolkit";

export type BattleTurnEvent = ReturnType<typeof battleTurnEvent>;
export const battleTurnEvent = createAction<{
	turn: number;
	timeMs: number;
}>("battleTurnEvent");

export type BattleFinishEvent = ReturnType<typeof battleFinishEvent>;
export const battleFinishEvent = createAction<{
	turn: number;
}>("battleFinishEvent");

export type BattleEvent = BattleFinishEvent;
