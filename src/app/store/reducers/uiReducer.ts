import { UiState } from "../state";
import { OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY } from "../actions/uiActions";

const initialState: UiState = {
    currentOverlay: null
};

export function ui(state: UiState = initialState, action: OpenOverlayAction | CloseOverlayAction) {
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
        default:
            return state;
    }
}
