import { StreakType, PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { createAction } from "@reduxjs/toolkit";

export const UPDATE_BATTLE_COMMAND = "UPDATE_BATTLE_COMMAND";
export type UPDATE_BATTLE_COMMAND = typeof UPDATE_BATTLE_COMMAND;
export const UPDATE_STREAK_COMMAND = "UPDATE_STREAK_COMMAND";
export type UPDATE_STREAK_COMMAND = typeof UPDATE_STREAK_COMMAND;

export type UpdateBattleCommand = ({ type: UPDATE_BATTLE_COMMAND; payload: { battle: PlayerBattle } });
export type UpdateStreakCommand = ({ type: UPDATE_STREAK_COMMAND; payload: { type: StreakType; amount: number } });

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
export type UpdateOpponentCommand = ReturnType<typeof updateOpponentCommand>;
export const updateOpponentCommand = createAction<string | null, "updateOpponentCommand">("updateOpponentCommand");

export const updateBattleCommand = (battle: PlayerBattle): UpdateBattleCommand => ({ type: UPDATE_BATTLE_COMMAND, payload: { battle } });
export const updateStreakCommand = (type: StreakType, amount: number): UpdateStreakCommand =>
	({ type: UPDATE_STREAK_COMMAND, payload: { type, amount } });

export type PlayerInfoCommand =
	UpdateStatusCommand
	| UpdateHealthCommand
	| UpdateBattleCommand
	| UpdateStreakCommand
	| UpdateMoneyCommand
	| UpdateReadyCommand
	| UpdateOpponentCommand
	| UpdateLevelCommand;
