import { createAction } from "@reduxjs/toolkit";

export type StartBattleCommand = ReturnType<typeof startBattleCommand>;
export const startBattleCommand = createAction<{ turn?: number }>(
	"startBattleCommand"
);

export type PauseBattleCommand = ReturnType<typeof pauseBattleCommand>;
export const pauseBattleCommand = createAction("pauseBattleCommand");

export type ResumeBattleCommand = ReturnType<typeof resumeBattleCommand>;
export const resumeBattleCommand = createAction("resumeBattleCommand");
