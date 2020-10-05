import { GamePhaseUpdateAction } from "@creature-chess/shared/player/gameInfo";

export const FIND_GAME = "FIND_GAME";
export type FIND_GAME = typeof FIND_GAME;
export const JOIN_COMPLETE = "JOIN_COMPLETE";
export type JOIN_COMPLETE = typeof JOIN_COMPLETE;
export const JOIN_ERROR = "JOIN_ERROR";
export type JOIN_ERROR = typeof JOIN_ERROR;
export const PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
export type PLAYERS_RESURRECTED = typeof PLAYERS_RESURRECTED;
export const FINISH_GAME = "FINISH_GAME";
export type FINISH_GAME = typeof FINISH_GAME;
export const PHASE_START_SECONDS = "PHASE_START_SECONDS";
export type PHASE_START_SECONDS = typeof PHASE_START_SECONDS;

export type FindGameAction = ({ type: FIND_GAME, payload: { serverIP: string } });
export type JoinCompleteAction = ({ type: JOIN_COMPLETE, payload: { gameId: string } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string } });
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string }});
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] }});
export type PhaseStartSecondsAction = ({ type: PHASE_START_SECONDS, payload: { time: number } });

export type GameAction = JoinCompleteAction | GamePhaseUpdateAction | PhaseStartSecondsAction;

export const findGameAction = (serverIP: string): FindGameAction => ({
    type: FIND_GAME,
    payload: {
        serverIP
    }
});

export const joinCompleteAction = (gameId: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        gameId
    }
});

export const joinGameError = (error: string): JoinErrorAction => ({
    type: JOIN_ERROR,
    payload: {
        error
    }
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

export const phaseStartSeconds = (timeSeconds: number): PhaseStartSecondsAction => ({
    type: PHASE_START_SECONDS,
    payload: {
        time: timeSeconds
    }
});
