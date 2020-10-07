import { GamePhase } from "@creature-chess/models";

export const START_GAME_PHASE_COMMAND = "START_GAME_PHASE_COMMAND";
export type START_GAME_PHASE_COMMAND = typeof START_GAME_PHASE_COMMAND;
export const PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
export type PLAYERS_RESURRECTED = typeof PLAYERS_RESURRECTED;

export type StartGamePhaseCommand = ({
    type: START_GAME_PHASE_COMMAND,
    payload: { phase: GamePhase, startedAt: number, round?: number }
});
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] }});

export type GameAction = StartGamePhaseCommand;

export const startGamePhaseCommand = (phase: GamePhase, startedAt: number): StartGamePhaseCommand => ({
    type: START_GAME_PHASE_COMMAND,
    payload: { phase, startedAt }
});

export const startPreparingPhaseCommand = (round: number, startedAt: number): StartGamePhaseCommand => ({
    type: START_GAME_PHASE_COMMAND,
    payload: { phase: GamePhase.PREPARING, round, startedAt }
});

export const playersResurrected = (playerIds: string[]): PlayersResurrectedAction => ({
    type: PLAYERS_RESURRECTED,
    payload: {
        playerIds
    }
});
