import { UiState } from "../state";
import {
    OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY,
    AnnouncementClearAction, AnnouncementUpdateAction, CLEAR_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT
} from "../actions/uiActions";
import { SelectPieceAction, ClearSelectedPieceAction, SELECT_PIECE, CLEAR_SELECTED_PIECE } from "../../game/features/board/actions";
import { FINISH_GAME } from "../actiontypes/gameActionTypes";
import { FinishGameAction } from "../actions/gameActions";

const initialState: UiState = {
    currentOverlay: null,
    selectedPieceId: null,
    winnerName: null,
    mainAnnouncement: null,
    subAnnouncement: null,
};

type UIAction =
    OpenOverlayAction
    | CloseOverlayAction
    | SelectPieceAction
    | ClearSelectedPieceAction
    | FinishGameAction
    | AnnouncementUpdateAction
    | AnnouncementClearAction;

export function ui(state: UiState = initialState, action: UIAction) {
    switch (action.type) {
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
        default:
            return state;
    }
}
