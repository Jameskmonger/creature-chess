import { networkedAction } from "@cc-plugins/api";

import { GamePhase } from "../game-phase";
import { PlayerListPlayer } from "../../game/playerList";

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

export type GamemodeEventByType = {
	phaseStart: GamePhaseStartedEvent;
	finish: GameFinishEvent;
	playerListChange: PlayerListChangedEvent;
};

export const gameEventCreators = [
	gameFinishEvent,
	gamePhaseStartedEvent,
	playerListChangedEvent,
] as const;

export const GameEventActionTypesArray: readonly string[] = gameEventCreators.map(
	(c) => c.type
);

export type GameEvent =
	| GamePhaseStartedEvent
	| GameFinishEvent
	| PlayerListChangedEvent;
