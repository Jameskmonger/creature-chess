import { createAction } from "@reduxjs/toolkit";

import {
	PlayerStatus,
	PlayerBattle,
} from "@creature-chess/models/game/playerList";
import { StreakType, PlayerStreak } from "@creature-chess/models/player";

import { updateCardsCommand, updateShopLockCommand } from "./cardShop";
import { setSpectatingIdCommand } from "./spectating";

export { updateCardsCommand, updateShopLockCommand };

export { setSpectatingIdCommand };

export type UpdateBattleCommand = ReturnType<typeof updateBattleCommand>;
export const updateBattleCommand = createAction<
	PlayerBattle,
	"updateBattleCommand"
>("updateBattleCommand");
export type UpdateStreakCommand = ReturnType<typeof updateStreakCommand>;
export const updateStreakCommand = createAction<
	{ type: StreakType; amount: number },
	"updateStreakCommand"
>("updateStreakCommand");
export type UpdateHealthCommand = ReturnType<typeof updateHealthCommand>;
export const updateHealthCommand = createAction<number, "updateHealthCommand">(
	"updateHealthCommand"
);
export type UpdateMoneyCommand = ReturnType<typeof updateMoneyCommand>;
export const updateMoneyCommand = createAction<number, "updateMoneyCommand">(
	"updateMoneyCommand"
);
export type UpdateLevelCommand = ReturnType<typeof updateLevelCommand>;
export const updateLevelCommand = createAction<
	{ level: number; xp: number },
	"updateLevelCommand"
>("updateLevelCommand");
export type UpdateStatusCommand = ReturnType<typeof updateStatusCommand>;
export const updateStatusCommand = createAction<
	PlayerStatus,
	"updateStatusCommand"
>("updateStatusCommand");
export type UpdateReadyCommand = ReturnType<typeof updateReadyCommand>;
export const updateReadyCommand = createAction<boolean, "updateReadyCommand">(
	"updateReadyCommand"
);
export type UpdateOpponentCommand = ReturnType<typeof updateOpponentCommand>;
export const updateOpponentCommand = createAction<
	string | null,
	"updateOpponentCommand"
>("updateOpponentCommand");

export type PlayerInfoUpdateCommand =
	| UpdateStatusCommand
	| UpdateHealthCommand
	| UpdateBattleCommand
	| UpdateStreakCommand
	| UpdateMoneyCommand
	| UpdateReadyCommand
	| UpdateOpponentCommand
	| UpdateLevelCommand;

export const PlayerInfoUpdateCommandActionTypesArray = [
	setSpectatingIdCommand.toString(),
	updateCardsCommand.toString(),
	updateShopLockCommand.toString(),
	updateMoneyCommand.toString(),
	updateLevelCommand.toString(),
	updateHealthCommand.toString(),
	updateOpponentCommand.toString(),
];
