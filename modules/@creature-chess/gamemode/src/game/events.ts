import { GamePhase } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";

import { networkedAction } from "../events/networkedAction";

export type GamePhaseStartedEvent = ReturnType<typeof gamePhaseStartedEvent>;
export const gamePhaseStartedEvent = networkedAction<
	{ phase: GamePhase; startedAt: number; round?: number },
	"gamePhaseStartedEvent"
>("gamePhaseStartedEvent");

export type GameFinishEvent = ReturnType<typeof gameFinishEvent>;
export const gameFinishEvent = networkedAction<
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
export const playerListChangedEvent = networkedAction<
	{ players: PlayerListPlayer[] },
	"playerListChangedEvent"
>("playerListChangedEvent");

/** Keyed map of every Game-level event Gamemode emits. */
export type GamemodeEventByType = {
	phaseStart: GamePhaseStartedEvent;
	finish: GameFinishEvent;
	playerListChange: PlayerListChangedEvent;
};

export const GameEventActionTypesArray: string[] = [
	gameFinishEvent.toString(),
	gamePhaseStartedEvent.toString(),
	playerListChangedEvent.toString(),
];

export type GameEvent =
	| GamePhaseStartedEvent
	| GameFinishEvent
	| PlayerListChangedEvent;
