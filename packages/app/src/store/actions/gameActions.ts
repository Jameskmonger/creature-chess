import {
    FIND_GAME,
    PHASE_START_SECONDS,
    JOIN_ERROR,
    ENABLE_DEBUG_MODE,
    UPDATE_ANNOUNCEMENT,
    CLEAR_ANNOUNCEMENT,
    UPDATE_CONNECTION_STATUS,
    SHOP_LOCK_UPDATED,
    FINISH_GAME,
    PLAYERS_RESURRECTED
} from "../actiontypes/gameActionTypes";
import { JoinCompleteAction } from "./localPlayerActions";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { GamePhaseUpdateAction, MoneyUpdateAction } from "@creature-chess/shared/player/gameInfo";

export type FindGameAction = ({ type: FIND_GAME, payload: { serverIP: string } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string } });
export type AnnouncementUpdateAction = ({ type: UPDATE_ANNOUNCEMENT, payload: { main: string, sub?: string } });
export type AnnouncementClearAction = ({ type: CLEAR_ANNOUNCEMENT });
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });
export type UpdateShopLockAction = ({ type: SHOP_LOCK_UPDATED, payload: { locked: boolean } });
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string }});
export type PhaseStartSecondsAction = ({ type: PHASE_START_SECONDS, payload: { time: number } });
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] }});

export type GameAction =
    FindGameAction
    | JoinErrorAction
    | PhaseStartSecondsAction
    | JoinCompleteAction
    | GamePhaseUpdateAction
    | ({ type: ENABLE_DEBUG_MODE })
    | AnnouncementUpdateAction
    | AnnouncementClearAction
    | UpdateConnectionStatusAction
    | UpdateShopLockAction
    | FinishGameAction
    | PlayersResurrectedAction
    | MoneyUpdateAction;

export const findGameAction = (serverIP: string): FindGameAction => ({
    type: FIND_GAME,
    payload: {
        serverIP
    }
});

export const joinGameError = (error: string): JoinErrorAction => ({
    type: JOIN_ERROR,
    payload: {
        error
    }
});

export const phaseStartSeconds = (timeSeconds: number): PhaseStartSecondsAction => ({
    type: PHASE_START_SECONDS,
    payload: {
        time: timeSeconds
    }
});

export const enableDebugMode = () => ({
    type: ENABLE_DEBUG_MODE
});

export const updateAnnouncement = (main: string, sub?: string): AnnouncementUpdateAction => ({
    type: UPDATE_ANNOUNCEMENT,
    payload: {
        main, sub
    }
});

export const clearAnnouncement = (): AnnouncementClearAction => ({ type: CLEAR_ANNOUNCEMENT });

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

export const shopLockUpdated = (locked: boolean): UpdateShopLockAction => ({
    type: SHOP_LOCK_UPDATED,
    payload: { locked }
});

export const finishGameAction = (winnerName: string): FinishGameAction => ({
    type: FINISH_GAME,
    payload: {
        winnerName
    }
});
