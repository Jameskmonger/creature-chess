import { ConnectionStatus } from "@creature-chess/shared/networking";
import { Overlay } from "../../game/overlay";

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

export type OpenOverlayAction = { type: OPEN_OVERLAY, payload: { overlay: Overlay } };
export type CloseOverlayAction = { type: CLOSE_OVERLAY };
export type AnnouncementUpdateAction = ({ type: UPDATE_ANNOUNCEMENT, payload: { main: string, sub?: string } });
export type AnnouncementClearAction = ({ type: CLEAR_ANNOUNCEMENT });
export type EnableDebugModeAction = ({ type: ENABLE_DEBUG_MODE });
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });

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
