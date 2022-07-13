import { createAction } from "@reduxjs/toolkit";

export type StartBattleCommand = ReturnType<typeof startBattleCommand>;
export const startBattleCommand = createAction<{ turn?: number }>(
	"startBattleCommand"
);
