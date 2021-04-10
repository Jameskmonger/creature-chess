import { BoardState } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

export const BATTLE_TURN_EVENT = "BATTLE_TURN_EVENT";
export type BATTLE_TURN_EVENT = typeof BATTLE_TURN_EVENT;
export const BATTLE_FINISH_EVENT = "BATTLE_FINISH_EVENT";
export type BATTLE_FINISH_EVENT = typeof BATTLE_FINISH_EVENT;

export type BattleTurnEvent = ({ type: BATTLE_TURN_EVENT, payload: { turn: number, board: BoardState<PieceModel> } });
export type BattleFinishEvent = ({ type: BATTLE_FINISH_EVENT, payload: { turns: number } });

export type BattleEvent = BattleTurnEvent | BattleFinishEvent;

export const battleTurnEvent = (turn: number, board: BoardState<PieceModel>): BattleTurnEvent => ({ type: BATTLE_TURN_EVENT, payload: { turn, board } });
export const battleFinishEvent = (turns: number): BattleFinishEvent => ({ type: BATTLE_FINISH_EVENT, payload: { turns } });
