import { createAction } from "@reduxjs/toolkit";
import { GamePhase, PlayerListPlayer } from "@creature-chess/models";
import { Match } from "./match";
import { QuickChatValue } from "@creature-chess/models";

export type GamePhaseStartedEvent = ReturnType<typeof gamePhaseStartedEvent>;
export const gamePhaseStartedEvent = createAction<{ phase: GamePhase; startedAt: number; round?: number }, "gamePhaseStartedEvent">("gamePhaseStartedEvent");

export type GameFinishEvent = ReturnType<typeof gameFinishEvent>;
export const gameFinishEvent = createAction<{ winnerId: string }, "gameFinishEvent">("gameFinishEvent");

export type PlayerListChangedEvent = ReturnType<typeof playerListChangedEvent>;
export const playerListChangedEvent = createAction<{ players: PlayerListPlayer[] }, "playerListChangedEvent">("playerListChangedEvent");

export type PlayerRunPreparingPhaseEvent = ReturnType<typeof playerRunPreparingPhaseEvent>;
export const playerRunPreparingPhaseEvent = createAction("playerRunPreparingPhaseEvent");

export type PlayerBeforeReadyPhaseEvent = ReturnType<typeof playerBeforeReadyPhaseEvent>;
export const playerBeforeReadyPhaseEvent = createAction("playerBeforeReadyPhaseEvent");

export type PlayerRunReadyPhaseEvent = ReturnType<typeof playerRunReadyPhaseEvent>;
export const playerRunReadyPhaseEvent = createAction<{ match: Match }, "playerRunReadyPhaseEvent">("playerRunReadyPhaseEvent");

export type PlayerFinishMatchEvent = ReturnType<typeof playerFinishMatchEvent>;
export const playerFinishMatchEvent = createAction<{
	homeScore: number;
	awayScore: number;
	isHomePlayer: boolean;
}, "playerFinishMatchEvent">("playerFinishMatchEvent");

export type PlayerReceiveQuickChatEvent = ReturnType<typeof playerReceiveQuickChatEvent>;
export const playerReceiveQuickChatEvent = createAction<{
	sendingPlayerId: string;
	receivingPlayerId: string;
	chatValue: QuickChatValue;
}, "playerReceiveQuickChatEvent">("playerReceiveQuickChatEvent");

export type GameEvent =
	GamePhaseStartedEvent
	| GameFinishEvent
	| PlayerListChangedEvent
	| PlayerRunPreparingPhaseEvent
	| PlayerBeforeReadyPhaseEvent
	| PlayerRunReadyPhaseEvent
	| PlayerFinishMatchEvent
	| PlayerReceiveQuickChatEvent;
