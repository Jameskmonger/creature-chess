import { UiState } from "../store/state";
import {
    OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY,
    AnnouncementClearAction, AnnouncementUpdateAction, CLEAR_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT,
    UpdateConnectionStatusAction, UPDATE_CONNECTION_STATUS, JoinErrorAction,
    FindGameAction, FIND_GAME, JOIN_ERROR, FINISH_GAME, FinishGameAction
} from "./actions";
import { SelectPieceAction, ClearSelectedPieceAction, SELECT_PIECE, CLEAR_SELECTED_PIECE } from "../game/features/board/actions";
import { ConnectionStatus, GameEvents } from "@creature-chess/shared";

const initialState: UiState = {
    loading: false,
    currentOverlay: null,
    selectedPieceId: null,
    winnerName: null,
    mainAnnouncement: null,
    subAnnouncement: null,
    menuError: null,
    connectionStatus: ConnectionStatus.NOT_CONNECTED
};

type UIAction =
    OpenOverlayAction
    | CloseOverlayAction
    | SelectPieceAction
    | ClearSelectedPieceAction
    | AnnouncementUpdateAction
    | AnnouncementClearAction
    | JoinErrorAction
    | FindGameAction
    | UpdateConnectionStatusAction
    | FinishGameAction;

export function reducer(state: UiState = initialState, action: UIAction | GameEvents.GamePhaseStartedEvent) {
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
        case GameEvents.GAME_PHASE_STARTED_EVENT:
            return {
                ...state,
                loading: false,
                menuError: null
            };
        default:
            return state;
    }
}
