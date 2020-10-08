import { GamePhase, PlayerListPlayer } from "@creature-chess/models";

export const GAME_PHASE_STARTED_EVENT = "GAME_PHASE_STARTED_EVENT";
export type GAME_PHASE_STARTED_EVENT = typeof GAME_PHASE_STARTED_EVENT;
export type GamePhaseStartedEvent = ({
    type: GAME_PHASE_STARTED_EVENT,
    payload: { phase: GamePhase, startedAt: number, round?: number }
});
export const gamePhaseStartedEvent = (phase: GamePhase, startedAt: number, round?: number): GamePhaseStartedEvent => ({
    type: GAME_PHASE_STARTED_EVENT,
    payload: { phase, startedAt, round }
});

export const PLAYER_LIST_CHANGED_EVENT = "PLAYER_LIST_CHANGED_EVENT";
export type PLAYER_LIST_CHANGED_EVENT = typeof PLAYER_LIST_CHANGED_EVENT;
export type PlayerListChangedEvent = ({
    type: PLAYER_LIST_CHANGED_EVENT,
    payload: { players: PlayerListPlayer[] }
});
export const playerListChangedEvent = (players: PlayerListPlayer[]): PlayerListChangedEvent => ({
    type: PLAYER_LIST_CHANGED_EVENT,
    payload: { players }
});

export const PLAYERS_RESURRECTED_EVENT = "PLAYERS_RESURRECTED_EVENT";
export type PLAYERS_RESURRECTED_EVENT = typeof PLAYERS_RESURRECTED_EVENT;
export type PlayersResurrectedEvent = ({
    type: PLAYERS_RESURRECTED_EVENT,
    payload: { playerIds: string[] }
});
export const playersResurrectedEvent = (playerIds: string[]): PlayersResurrectedEvent => ({
    type: PLAYERS_RESURRECTED_EVENT,
    payload: { playerIds }
});

export type GameEvent =
    GamePhaseStartedEvent | PlayerListChangedEvent | PlayersResurrectedEvent;
