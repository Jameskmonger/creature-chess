import { UiState } from "../state";
import { OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY } from "../actions/uiActions";
import { SelectPieceAction, ClearSelectedPieceAction, SELECT_PIECE, CLEAR_SELECTED_PIECE } from "../../game/features/board/actions";

const initialState: UiState = {
    currentOverlay: null,
    selectedPieceId: null
};

type UIAction = OpenOverlayAction | CloseOverlayAction | SelectPieceAction | ClearSelectedPieceAction;

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
        default:
            return state;
    }
}
