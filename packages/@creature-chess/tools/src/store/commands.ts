import { StreakType, PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { createAction } from "@reduxjs/toolkit";

import { updateCardsCommand, updateShopLockCommand } from "./devCardShop";
export { updateCardsCommand, updateShopLockCommand };

export type UpdateHealthCommand = ReturnType<typeof updateHealthCommand>;
export const updateHealthCommand = createAction<number, "updateHealthCommand">("updateHealthCommand");
export type UpdateMoneyCommand = ReturnType<typeof updateMoneyCommand>;
export const updateMoneyCommand = createAction<number, "updateMoneyCommand">("updateMoneyCommand");
export type UpdateLevelCommand = ReturnType<typeof updateLevelCommand>;
export const updateLevelCommand = createAction<{ level: number; xp: number }, "updateLevelCommand">("updateLevelCommand");
export type UpdateStatusCommand = ReturnType<typeof updateStatusCommand>;
export const updateStatusCommand = createAction<PlayerStatus, "updateStatusCommand">("updateStatusCommand");
export type UpdateReadyCommand = ReturnType<typeof updateReadyCommand>;
export const updateReadyCommand = createAction<boolean, "updateReadyCommand">("updateReadyCommand");
export type UpdateStreakCommand = ReturnType<typeof updateStreakCommand>;
export const updateStreakCommand = createAction<{ type: StreakType; amount: number }, "updateStreakCommand">("updateStreakCommand");


export type PlayerInfoUpdateCommand =
	UpdateStatusCommand
	| UpdateHealthCommand
	| UpdateMoneyCommand
	| UpdateReadyCommand
	| UpdateLevelCommand
	| UpdateStreakCommand;

export const PlayerInfoUpdateCommandActionTypesArray = [
	updateCardsCommand.toString(),
	updateShopLockCommand.toString(),
	updateMoneyCommand.toString(),
	updateLevelCommand.toString(),
	updateHealthCommand.toString(),
	updateStreakCommand.toString()
];
