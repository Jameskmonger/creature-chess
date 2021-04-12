import { createAction } from "@reduxjs/toolkit";
import { GamePhase, PlayerListPlayer } from "@creature-chess/models";

export type GamePhaseStartedEvent = ReturnType<typeof gamePhaseStartedEvent>;
export const gamePhaseStartedEvent = createAction<{ phase: GamePhase, startedAt: number, round?: number }, "gamePhaseStartedEvent">("gamePhaseStartedEvent");

export type GameFinishEvent = ReturnType<typeof gameFinishEvent>;
export const gameFinishEvent = createAction<{ winnerName: string }, "gameFinishEvent">("gameFinishEvent");

export type PlayerListChangedEvent = ReturnType<typeof playerListChangedEvent>;
export const playerListChangedEvent = createAction<{ players: PlayerListPlayer[] }, "playerListChangedEvent">("playerListChangedEvent");

export type GameEvent =
    GamePhaseStartedEvent
    | GameFinishEvent
    | PlayerListChangedEvent;
