import { UiState } from "../store/state";
import {
    OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY,
    UpdateConnectionStatusAction, UPDATE_CONNECTION_STATUS, FINISH_GAME, FinishGameAction,
    SelectPieceAction, ClearSelectedPieceAction, SELECT_PIECE, CLEAR_SELECTED_PIECE
} from "./actions";
import { MenuActions } from "../menu";
import { ConnectionStatus } from "../game/connection-status";

const initialState: UiState = {
    currentOverlay: null,
    selectedPieceId: null,
    winnerName: null,
    connectionStatus: ConnectionStatus.NOT_CONNECTED
};

type UIAction =
    OpenOverlayAction
    | CloseOverlayAction
    | SelectPieceAction
    | ClearSelectedPieceAction
    | MenuActions.FindGameAction
    | UpdateConnectionStatusAction
    | FinishGameAction;

export function reducer(state: UiState = initialState, action: UIAction) {
    switch (action.type) {
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
        default:
            return state;
    }
}
