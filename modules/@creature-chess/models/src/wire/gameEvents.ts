import { networkedAction } from "@cc-plugins/api";

import { GamePhase } from "../game-phase";
import { StreakType } from "../../player/streak";
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

export type PieceUpgradedEvent = ReturnType<typeof pieceUpgradedEvent>;
export const pieceUpgradedEvent = networkedAction<
	{ playerId: string; definitionId: number; stage: number },
	"pieceUpgradedEvent"
>("pieceUpgradedEvent");

export type PlayerLevelUpEvent = ReturnType<typeof playerLevelUpEvent>;
export const playerLevelUpEvent = networkedAction<
	{ playerId: string; level: number },
	"playerLevelUpEvent"
>("playerLevelUpEvent");

export type PlayerStreakEvent = ReturnType<typeof playerStreakEvent>;
export const playerStreakEvent = networkedAction<
	{ playerId: string; streakType: StreakType; streakAmount: number },
	"playerStreakEvent"
>("playerStreakEvent");

export type PlayerEliminatedEvent = ReturnType<typeof playerEliminatedEvent>;
export const playerEliminatedEvent = networkedAction<
	{ playerId: string },
	"playerEliminatedEvent"
>("playerEliminatedEvent");

export type GamemodeEventByType = {
	phaseStart: GamePhaseStartedEvent;
	finish: GameFinishEvent;
	playerListChange: PlayerListChangedEvent;
	pieceUpgraded: PieceUpgradedEvent;
	playerLevelUp: PlayerLevelUpEvent;
	playerStreak: PlayerStreakEvent;
	playerEliminated: PlayerEliminatedEvent;
};

export const gameEventCreators = [
	gameFinishEvent,
	gamePhaseStartedEvent,
	playerListChangedEvent,
	pieceUpgradedEvent,
	playerLevelUpEvent,
	playerStreakEvent,
	playerEliminatedEvent,
] as const;

export const GameEventActionTypesArray: readonly string[] = gameEventCreators.map(
	(c) => c.type
);

export type GameEvent =
	| GamePhaseStartedEvent
	| GameFinishEvent
	| PlayerListChangedEvent
	| PieceUpgradedEvent
	| PlayerLevelUpEvent
	| PlayerStreakEvent
	| PlayerEliminatedEvent;
