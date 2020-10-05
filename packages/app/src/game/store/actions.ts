import { ConnectionStatus } from "@creature-chess/shared/networking";
import { ReadyUpAction } from "@creature-chess/shared/player/actions";
import { GamePhaseUpdateAction, MoneyUpdateAction } from "@creature-chess/shared/player/gameInfo";

export const FIND_GAME = "FIND_GAME";
export type FIND_GAME = typeof FIND_GAME;
export const JOIN_COMPLETE = "JOIN_COMPLETE";
export type JOIN_COMPLETE = typeof JOIN_COMPLETE;
export const JOIN_ERROR = "JOIN_ERROR";
export type JOIN_ERROR = typeof JOIN_ERROR;
export const PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
export type PLAYERS_RESURRECTED = typeof PLAYERS_RESURRECTED;
export const ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
export type ENABLE_DEBUG_MODE = typeof ENABLE_DEBUG_MODE;
export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export type UPDATE_CONNECTION_STATUS = typeof UPDATE_CONNECTION_STATUS;
export const FINISH_GAME = "FINISH_GAME";
export type FINISH_GAME = typeof FINISH_GAME;

export type FindGameAction = ({ type: FIND_GAME, payload: { serverIP: string } });
export type JoinCompleteAction = ({ type: JOIN_COMPLETE, payload: { playerId: string } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string } });
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string }});
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] }});

export type GameAction =
    FindGameAction
    | JoinErrorAction
    | JoinCompleteAction
    | GamePhaseUpdateAction
    | ({ type: ENABLE_DEBUG_MODE })
    | UpdateConnectionStatusAction
    | FinishGameAction
    | PlayersResurrectedAction
    | MoneyUpdateAction
    | ReadyUpAction;

export const findGameAction = (serverIP: string): FindGameAction => ({
    type: FIND_GAME,
    payload: {
        serverIP
    }
});

export const joinCompleteAction = (playerId: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        playerId
    }
});

export const joinGameError = (error: string): JoinErrorAction => ({
    type: JOIN_ERROR,
    payload: {
        error
    }
});

export const enableDebugMode = () => ({
    type: ENABLE_DEBUG_MODE
});

export const playersResurrected = (playerIds: string[]): PlayersResurrectedAction => ({
    type: PLAYERS_RESURRECTED,
    payload: {
        playerIds
    }
});

export const updateConnectionStatus = (status: ConnectionStatus): UpdateConnectionStatusAction => ({
    type: UPDATE_CONNECTION_STATUS,
    payload: {
        status
    }
});

export const finishGameAction = (winnerName: string): FinishGameAction => ({
    type: FINISH_GAME,
    payload: {
        winnerName
    }
});
