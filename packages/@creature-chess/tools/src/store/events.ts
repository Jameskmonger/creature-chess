import { StreakType } from "@creature-chess/models";
import { createAction } from "@reduxjs/toolkit";

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
