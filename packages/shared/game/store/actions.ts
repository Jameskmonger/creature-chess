import { GamePhase } from "@creature-chess/models";

export const GAME_PHASE_STARTED = "GAME_PHASE_STARTED";
export type GAME_PHASE_STARTED = typeof GAME_PHASE_STARTED;
export const PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
export type PLAYERS_RESURRECTED = typeof PLAYERS_RESURRECTED;
export const FINISH_GAME = "FINISH_GAME";
export type FINISH_GAME = typeof FINISH_GAME;

export type GamePhaseStartedAction = ({
    type: GAME_PHASE_STARTED,
    payload: { phase: GamePhase, startedAt: number, round?: number }
});
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string }});
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] }});

export type GameAction = GamePhaseStartedAction;

export const gamePhaseStarted = (phase: GamePhase, startedAt: number): GamePhaseStartedAction => ({
    type: GAME_PHASE_STARTED,
    payload: { phase, startedAt }
});

export const preparingPhaseStarted = (round: number, startedAt: number): GamePhaseStartedAction => ({
    type: GAME_PHASE_STARTED,
    payload: { phase: GamePhase.PREPARING, round, startedAt }
});

export const playersResurrected = (playerIds: string[]): PlayersResurrectedAction => ({
    type: PLAYERS_RESURRECTED,
    payload: {
        playerIds
    }
});

export const finishGameAction = (winnerName: string): FinishGameAction => ({
    type: FINISH_GAME,
    payload: {
        winnerName
    }
});
