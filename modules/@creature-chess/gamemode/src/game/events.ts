import { createAction } from "@reduxjs/toolkit";

import { GamePhase } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";

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

/** Keyed map of every Game-level event Gamemode emits. */
export type GamemodeEventByType = {
	phaseStart: GamePhaseStartedEvent;
	finish: GameFinishEvent;
	playerListChange: PlayerListChangedEvent;
};

export const GameEventActionTypesArray = [
	gameFinishEvent.toString(),
	gamePhaseStartedEvent.toString(),
	playerListChangedEvent.toString(),
];

export type GameEvent =
	| GamePhaseStartedEvent
	| GameFinishEvent
	| PlayerListChangedEvent;
