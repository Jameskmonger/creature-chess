import { createAction } from "@reduxjs/toolkit";

import { GamePhase } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

import { Match } from "./match";

export type GamePhaseStartedEvent = ReturnType<typeof gamePhaseStartedEvent>;
export const gamePhaseStartedEvent = createAction<
	{ phase: GamePhase; startedAt: number; round?: number },
	"gamePhaseStartedEvent"
>("gamePhaseStartedEvent");

export type GameFinishEvent = ReturnType<typeof gameFinishEvent>;
export const gameFinishEvent = createAction<
	{
		players: {
			id: string;
			position: number;
			finishRound: number;
		}[];
	},
	"gameFinishEvent"
>("gameFinishEvent");

export type PlayerListChangedEvent = ReturnType<typeof playerListChangedEvent>;
export const playerListChangedEvent = createAction<
	{ players: PlayerListPlayer[] },
	"playerListChangedEvent"
>("playerListChangedEvent");

export type PlayerRunPreparingPhaseEvent = ReturnType<
	typeof playerRunPreparingPhaseEvent
>;
export const playerRunPreparingPhaseEvent = createAction(
	"playerRunPreparingPhaseEvent"
);

export type PlayerBeforeReadyPhaseEvent = ReturnType<
	typeof playerBeforeReadyPhaseEvent
>;
export const playerBeforeReadyPhaseEvent = createAction(
	"playerBeforeReadyPhaseEvent"
);

export type PlayerRunReadyPhaseEvent = ReturnType<
	typeof playerRunReadyPhaseEvent
>;
export const playerRunReadyPhaseEvent = createAction<
	{ match: Match },
	"playerRunReadyPhaseEvent"
>("playerRunReadyPhaseEvent");

export const GameEventActionTypesArray = [
	gameFinishEvent.toString(),
	gamePhaseStartedEvent.toString(),
	playerListChangedEvent.toString(),
];

export type GameEvent =
	| GamePhaseStartedEvent
	| GameFinishEvent
	| PlayerListChangedEvent
	| PlayerRunPreparingPhaseEvent
	| PlayerBeforeReadyPhaseEvent
	| PlayerRunReadyPhaseEvent;
