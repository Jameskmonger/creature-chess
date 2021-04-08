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
export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export type UPDATE_CONNECTION_STATUS = typeof UPDATE_CONNECTION_STATUS;
export const JOIN_ERROR = "JOIN_ERROR";
export type JOIN_ERROR = typeof JOIN_ERROR;
export const FINISH_GAME = "FINISH_GAME";
export type FINISH_GAME = typeof FINISH_GAME;
export const PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
export type PLAYERS_RESURRECTED = typeof PLAYERS_RESURRECTED;

export type FindGameAction = ({ type: FIND_GAME, payload: { serverIP: string } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string } });
export type OpenOverlayAction = { type: OPEN_OVERLAY, payload: { overlay: Overlay } };
export type CloseOverlayAction = { type: CLOSE_OVERLAY };
export type AnnouncementUpdateAction = ({ type: UPDATE_ANNOUNCEMENT, payload: { main: string, sub?: string } });
export type AnnouncementClearAction = ({ type: CLEAR_ANNOUNCEMENT });
export type UpdateConnectionStatusAction = ({ type: UPDATE_CONNECTION_STATUS, payload: { status: ConnectionStatus } });
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string } });
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] } });

export const SELECT_PIECE = "SELECT_PIECE";
export type SELECT_PIECE = typeof SELECT_PIECE;
export const CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
export type CLEAR_SELECTED_PIECE = typeof CLEAR_SELECTED_PIECE;

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { id: string } });
export type ClearSelectedPieceAction = ({ type: CLEAR_SELECTED_PIECE });

export const selectPiece = (id: string): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: {
        id
    }
});

export const clearSelectedPiece = (): ClearSelectedPieceAction => ({ type: CLEAR_SELECTED_PIECE });


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

export const playersResurrected = (playerIds: string[]): PlayersResurrectedAction => ({
    type: PLAYERS_RESURRECTED,
    payload: {
        playerIds
    }
});
