import { StreakType, PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { ReadyUpAction } from "../actions";

export const UPDATE_STATUS_COMMAND = "UPDATE_STATUS_COMMAND";
export type UPDATE_STATUS_COMMAND = typeof UPDATE_STATUS_COMMAND;
export const UPDATE_BATTLE_COMMAND = "UPDATE_BATTLE_COMMAND";
export type UPDATE_BATTLE_COMMAND = typeof UPDATE_BATTLE_COMMAND;
export const UPDATE_HEALTH_COMMAND = "UPDATE_HEALTH_COMMAND";
export type UPDATE_HEALTH_COMMAND = typeof UPDATE_HEALTH_COMMAND;
export const UPDATE_STREAK_COMMAND = "UPDATE_STREAK_COMMAND";
export type UPDATE_STREAK_COMMAND = typeof UPDATE_STREAK_COMMAND;
export const UPDATE_ROUND_DIED_AT_COMMAND = "UPDATE_ROUND_DIED_AT_COMMAND";
export type UPDATE_ROUND_DIED_AT_COMMAND = typeof UPDATE_ROUND_DIED_AT_COMMAND;
export const UPDATE_OPPONENT_COMMAND = "UPDATE_OPPONENT_COMMAND";
export type UPDATE_OPPONENT_COMMAND = typeof UPDATE_OPPONENT_COMMAND;
export const CLEAR_OPPONENT_COMMAND = "CLEAR_OPPONENT_COMMAND";
export type CLEAR_OPPONENT_COMMAND = typeof CLEAR_OPPONENT_COMMAND;
export const UPDATE_LEVEL_COMMAND = "UPDATE_LEVEL_COMMAND";
export type UPDATE_LEVEL_COMMAND = typeof UPDATE_LEVEL_COMMAND;
export const UPDATE_MONEY_COMMAND = "UPDATE_MONEY_COMMAND";
export type UPDATE_MONEY_COMMAND = typeof UPDATE_MONEY_COMMAND;

export type UpdateBattleCommand = ({ type: UPDATE_BATTLE_COMMAND, payload: { battle: PlayerBattle } });
export type UpdateStatusCommand = ({ type: UPDATE_STATUS_COMMAND, payload: { status: PlayerStatus } });
export type UpdateHealthCommand = ({ type: UPDATE_HEALTH_COMMAND, payload: { health: number } });
export type UpdateStreakCommand = ({ type: UPDATE_STREAK_COMMAND, payload: { type: StreakType, amount: number } });
export type UpdateRoundDiedAtCommand = ({ type: UPDATE_ROUND_DIED_AT_COMMAND, payload: { roundDiedAt: number | null } });
export type UpdateOpponentCommand = ({ type: UPDATE_OPPONENT_COMMAND, payload: { opponentId: string } });
export type ClearOpponentCommand = ({ type: CLEAR_OPPONENT_COMMAND });
export type UpdateMoneyCommand = ({ type: UPDATE_MONEY_COMMAND, payload: { money: number } });
export type UpdateLevelCommand = ({ type: UPDATE_LEVEL_COMMAND; payload: { level: number, xp: number } });

export type PlayerInfoCommand =
    UpdateStatusCommand
    | UpdateHealthCommand
    | UpdateBattleCommand
    | UpdateStreakCommand
    | UpdateRoundDiedAtCommand
    | UpdateMoneyCommand
    | ReadyUpAction
    | UpdateOpponentCommand
    | ClearOpponentCommand
    | UpdateLevelCommand;

export const updateStatusCommand = (status: PlayerStatus): UpdateStatusCommand => ({ type: UPDATE_STATUS_COMMAND, payload: { status } });
export const updateBattleCommand = (battle: PlayerBattle): UpdateBattleCommand => ({ type: UPDATE_BATTLE_COMMAND, payload: { battle } });
export const updateHealthCommand = (health: number): UpdateHealthCommand => ({ type: UPDATE_HEALTH_COMMAND, payload: { health } });
export const updateStreakCommand = (type: StreakType, amount: number): UpdateStreakCommand =>
    ({ type: UPDATE_STREAK_COMMAND, payload: { type, amount } });
export const updateRoundDiedAtCommand = (roundDiedAt: number | null): UpdateRoundDiedAtCommand => ({
    type: UPDATE_ROUND_DIED_AT_COMMAND,
    payload: { roundDiedAt }
});
export const updateOpponentCommand = (opponentId: string): UpdateOpponentCommand => ({ type: UPDATE_OPPONENT_COMMAND, payload: { opponentId } });
export const clearOpponentCommand = (): ClearOpponentCommand => ({ type: CLEAR_OPPONENT_COMMAND });
export const updateMoneyCommand = (money: number): UpdateMoneyCommand => ({ type: UPDATE_MONEY_COMMAND, payload: { money } });
export const updateLevelCommand = (level: number, xp: number): UpdateLevelCommand =>
    ({ type: UPDATE_LEVEL_COMMAND, payload: { level, xp } });
