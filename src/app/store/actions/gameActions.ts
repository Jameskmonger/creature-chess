import {
    FIND_GAME,
    JOIN_GAME,
    MONEY_UPDATE,
    GAME_PHASE_UPDATE,
    PHASE_TIMER_UPDATED,
    CREATE_GAME,
    JOIN_ERROR,
    ENABLE_DEBUG_MODE,
    UPDATE_ANNOUNCEMENT,
    CLEAR_ANNOUNCEMENT,
    UPDATE_CONNECTION_STATUS,
    SHOP_LOCK_UPDATED,
    TOGGLE_SHOP_LOCK,
    FINISH_GAME
} from "../actiontypes/gameActionTypes";
import { JoinCompleteAction } from "./localPlayerActions";
import { ConnectionStatus } from "@common";
import { PhaseUpdatePacket } from "@common/networking/server-to-client";

export type FindGameAction = ({ type: FIND_GAME, payload: { serverIP: string, name: string } });
export type JoinGameAction = ({ type: JOIN_GAME, payload: { serverIP: string, name: string, gameId: string } });
export type CreateGameAction = ({ type: CREATE_GAME, payload: { serverIP: string, name: string } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string } });
export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: PhaseUpdatePacket });
export type AnnouncementUpdateAction = ({ type: UPDATE_ANNOUNCEMENT, payload: { main: string, sub?: string } });
export type AnnouncementClearAction = ({ type: CLEAR_ANNOUNCEMENT });
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });
export type UpdateShopLockAction = ({ type: SHOP_LOCK_UPDATED, payload: { locked: boolean } });
export type ToggleShopLockAction = ({ type: TOGGLE_SHOP_LOCK });
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string }});

export type GameAction =
    FindGameAction
    | JoinGameAction
    | CreateGameAction
    | JoinErrorAction
    | ({ type: MONEY_UPDATE, payload: { money: number } })
    | ({ type: PHASE_TIMER_UPDATED, payload: { time: number } })
    | JoinCompleteAction
    | GamePhaseUpdateAction
    | ({ type: ENABLE_DEBUG_MODE })
    | AnnouncementUpdateAction
    | AnnouncementClearAction
    | UpdateConnectionStatusAction
    | UpdateShopLockAction
    | ToggleShopLockAction
    | FinishGameAction;

export const findGameAction = (serverIP: string, name: string): FindGameAction => ({
    type: FIND_GAME,
    payload: {
        name,
        serverIP
    }
});

export const joinGameAction = (serverIP: string, name: string, gameId: string): JoinGameAction => ({
    type: JOIN_GAME,
    payload: {
        name,
        serverIP,
        gameId
    }
});

export const createGameAction = (serverIP: string, name: string): CreateGameAction => ({
    type: CREATE_GAME,
    payload: {
        name,
        serverIP
    }
});

export const joinGameError = (error: string): JoinErrorAction => ({
    type: JOIN_ERROR,
    payload: {
        error
    }
});

export const gamePhaseUpdate = (packet: PhaseUpdatePacket) => ({
    type: GAME_PHASE_UPDATE,
    payload: packet
});

export const moneyUpdateAction = (money: number) => ({
    type: MONEY_UPDATE,
    payload: {
        money
    }
});

export const phaseTimerUpdated = (time: number) => ({
    type: PHASE_TIMER_UPDATED,
    payload: {
        time
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

export const toggleShopLock = (): ToggleShopLockAction => ({ type: TOGGLE_SHOP_LOCK });

export const finishGameAction = (winnerName: string): FinishGameAction => ({
    type: FINISH_GAME,
    payload: {
        winnerName
    }
});
