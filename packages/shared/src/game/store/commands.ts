import { GamePhase } from "@creature-chess/models";

export const START_GAME_PHASE_COMMAND = "START_GAME_PHASE_COMMAND";
export type START_GAME_PHASE_COMMAND = typeof START_GAME_PHASE_COMMAND;

export type StartGamePhaseCommand = ({
    type: START_GAME_PHASE_COMMAND,
    payload: { phase: GamePhase, startedAt: number, round?: number }
});

export type GameCommand =
    StartGamePhaseCommand;

export const startGamePhaseCommand = (phase: GamePhase, startedAt: number): StartGamePhaseCommand => ({
    type: START_GAME_PHASE_COMMAND,
    payload: { phase, startedAt }
});

export const startPreparingPhaseCommand = (round: number, startedAt: number): StartGamePhaseCommand => ({
    type: START_GAME_PHASE_COMMAND,
    payload: { phase: GamePhase.PREPARING, round, startedAt }
});
