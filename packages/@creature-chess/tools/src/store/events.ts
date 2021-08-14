import { PieceModel, StreakType } from "@creature-chess/models";
import { createAction } from "@reduxjs/toolkit";

export type AfterSellPieceEvent = ReturnType<typeof afterSellPieceEvent>;
export const afterSellPieceEvent = createAction<{ piece: PieceModel }, "afterSellPieceEvent">("afterSellPieceEvent");

export type AfterRerollCardsEvent = ReturnType<typeof afterRerollCardsEvent>;
export const afterRerollCardsEvent = createAction("afterRerollCardsEvent");

export type RunScenarioEvent = ReturnType<typeof runScenarioEvent>;
export const runScenarioEvent = createAction<{
	health: number;
	level: number;
	xp: number;
	streakType: StreakType;
	streakAmount: number;
	money: number;
	ambition: number;
	composure: number;
	competency: number;
	vision: number;
}, "runScenarioEvent">("runScenarioEvent");

export type PlayerEvent =
	AfterSellPieceEvent
	| AfterRerollCardsEvent
	| RunScenarioEvent;
