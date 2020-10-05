import { UiState } from "../state";
import {
    OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY,
    AnnouncementClearAction, AnnouncementUpdateAction, CLEAR_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT,
    EnableDebugModeAction, UpdateConnectionStatusAction, UPDATE_CONNECTION_STATUS, ENABLE_DEBUG_MODE
} from "../actions/uiActions";
import { SelectPieceAction, ClearSelectedPieceAction, SELECT_PIECE, CLEAR_SELECTED_PIECE } from "../../game/features/board/actions";
import {
    FindGameAction, FIND_GAME, FinishGameAction, FINISH_GAME, JoinCompleteAction, JoinErrorAction,
    JOIN_COMPLETE, JOIN_ERROR
} from "../../game/store/actions";
import { ConnectionStatus } from "@creature-chess/shared/networking";

const initialState: UiState = {
    loading: false,
    currentOverlay: null,
    selectedPieceId: null,
    winnerName: null,
    mainAnnouncement: null,
    subAnnouncement: null,
    menuError: null,
    debug: false,
    connectionStatus: ConnectionStatus.NOT_CONNECTED
};

type UIAction =
    OpenOverlayAction
    | CloseOverlayAction
    | SelectPieceAction
    | ClearSelectedPieceAction
    | FinishGameAction
    | AnnouncementUpdateAction
    | AnnouncementClearAction
    | JoinErrorAction
    | JoinCompleteAction
    | FindGameAction
    | EnableDebugModeAction
    | UpdateConnectionStatusAction;

export function ui(state: UiState = initialState, action: UIAction) {
    switch (action.type) {
        case FIND_GAME:
            return {
                ...state,
                loading: true
            };
        case UPDATE_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.payload.status
            };
        case ENABLE_DEBUG_MODE: {
            return {
                ...state,
                debug: true
            };
        }
        case OPEN_OVERLAY: {
            return {
                ...state,
                currentOverlay: action.payload.overlay
            };
        }
        case CLOSE_OVERLAY: {
            return {
                ...state,
                currentOverlay: null
            };
        }
        case SELECT_PIECE: {
            const isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.id;

            return {
                ...state,
                selectedPieceId: isSamePiece ? null : action.payload.id
            };
        }
        case CLEAR_SELECTED_PIECE: {
            return {
                ...state,
                selectedPieceId: null
            };
        }
        case FINISH_GAME: {
            return {
                ...state,
                winnerName: action.payload.winnerName
            };
        }
        case UPDATE_ANNOUNCEMENT: {
            return {
                ...state,
                mainAnnouncement: action.payload.main,
                subAnnouncement: action.payload.sub
            };
        }
        case CLEAR_ANNOUNCEMENT: {
            return {
                ...state,
                mainAnnouncement: null,
                subAnnouncement: null
            };
        }
        case JOIN_ERROR:
            return {
                ...state,
                loading: false,
                menuError: action.payload.error
            };
        case JOIN_COMPLETE:
            return {
                ...state,
                loading: false,
                menuError: null
            };
        default:
            return state;
    }
}
