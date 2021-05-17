import {
	OpenOverlayAction, CloseOverlayAction, OPEN_OVERLAY, CLOSE_OVERLAY,
	UpdateConnectionStatusAction, UPDATE_CONNECTION_STATUS,
	SelectPieceAction, ClearSelectedPieceAction, SELECT_PIECE, CLEAR_SELECTED_PIECE, setWinnerIdCommand, SetWinnerIdCommand
} from "./actions";
import { ConnectionStatus } from "../connection-status";
import { Overlay } from "./overlay";

export interface UiState {
	connectionStatus: ConnectionStatus;
	selectedPieceId: string | null;
	currentOverlay: Overlay | null;
	winnerId: string | null;
}

const initialState: UiState = {
	currentOverlay: null,
	selectedPieceId: null,
	winnerId: null,
	connectionStatus: ConnectionStatus.NOT_CONNECTED
};

type UIAction =
	OpenOverlayAction
	| CloseOverlayAction
	| SelectPieceAction
	| ClearSelectedPieceAction
	| UpdateConnectionStatusAction
	| SetWinnerIdCommand;

export const reducer = (state: UiState = initialState, action: UIAction) => {
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
	case "setWinnerIdCommand": {
		return {
			...state,
			winnerId: action.payload.winnerId
		};
	}
	default:
		return state;
	}
};
