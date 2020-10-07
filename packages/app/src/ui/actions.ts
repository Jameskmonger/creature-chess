import { ConnectionStatus } from "@creature-chess/shared";
import { Overlay } from "./overlay";

export const FIND_GAME = "FIND_GAME";
export type FIND_GAME = typeof FIND_GAME;
export const OPEN_OVERLAY = "OPEN_OVERLAY";
export type OPEN_OVERLAY = typeof OPEN_OVERLAY;
export const CLOSE_OVERLAY = "CLOSE_OVERLAY";
export type CLOSE_OVERLAY = typeof CLOSE_OVERLAY;
export const UPDATE_ANNOUNCEMENT = "UPDATE_ANNOUNCEMENT";
export type UPDATE_ANNOUNCEMENT = typeof UPDATE_ANNOUNCEMENT;
export const CLEAR_ANNOUNCEMENT = "CLEAR_ANNOUNCEMENT";
export type CLEAR_ANNOUNCEMENT = typeof CLEAR_ANNOUNCEMENT;
export const ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
export type ENABLE_DEBUG_MODE = typeof ENABLE_DEBUG_MODE;
export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export type UPDATE_CONNECTION_STATUS = typeof UPDATE_CONNECTION_STATUS;
export const JOIN_COMPLETE = "JOIN_COMPLETE";
export type JOIN_COMPLETE = typeof JOIN_COMPLETE;
export const JOIN_ERROR = "JOIN_ERROR";
export type JOIN_ERROR = typeof JOIN_ERROR;

export type FindGameAction = ({ type: FIND_GAME, payload: { serverIP: string } });
export type JoinCompleteAction = ({ type: JOIN_COMPLETE, payload: { gameId: string } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string } });
export type OpenOverlayAction = { type: OPEN_OVERLAY, payload: { overlay: Overlay } };
export type CloseOverlayAction = { type: CLOSE_OVERLAY };
export type AnnouncementUpdateAction = ({ type: UPDATE_ANNOUNCEMENT, payload: { main: string, sub?: string } });
export type AnnouncementClearAction = ({ type: CLEAR_ANNOUNCEMENT });
export type EnableDebugModeAction = ({ type: ENABLE_DEBUG_MODE });
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });

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

export const openOverlay = (overlay: Overlay): OpenOverlayAction => ({
    type: OPEN_OVERLAY,
    payload: {
        overlay
    }
});

export const closeOverlay = (): CloseOverlayAction => ({ type: CLOSE_OVERLAY });

export const updateAnnouncement = (main: string, sub?: string): AnnouncementUpdateAction => ({
    type: UPDATE_ANNOUNCEMENT,
    payload: {
        main, sub
    }
});

export const clearAnnouncement = (): AnnouncementClearAction => ({ type: CLEAR_ANNOUNCEMENT });

export const enableDebugMode = (): EnableDebugModeAction => ({ type: ENABLE_DEBUG_MODE });

export const updateConnectionStatus = (status: ConnectionStatus): UpdateConnectionStatusAction => ({
    type: UPDATE_CONNECTION_STATUS,
    payload: {
        status
    }
});
