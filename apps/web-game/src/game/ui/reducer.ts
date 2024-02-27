import { ConnectionStatus } from "../connection-status";
import {
	OpenOverlayAction,
	CloseOverlayAction,
	OPEN_OVERLAY,
	CLOSE_OVERLAY,
	UpdateConnectionStatusAction,
	UPDATE_CONNECTION_STATUS,
	SelectPieceAction,
	ClearSelectedPieceAction,
	SELECT_PIECE,
	CLEAR_SELECTED_PIECE,
	setWinnerIdCommand,
	SetWinnerIdCommand,
	SetInGameCommand,
} from "./actions";
import { Overlay } from "./overlay";

export interface UiState {
	inGame: boolean;
	connectionStatus: ConnectionStatus;
	selectedPieceId: string | null;
	currentOverlay: Overlay | null;
	winnerId: string | null;
}

const initialState: UiState = {
	inGame: false,
	currentOverlay: null,
	selectedPieceId: null,
	winnerId: null,
	connectionStatus: ConnectionStatus.NOT_CONNECTED,
};

type UIAction =
	| OpenOverlayAction
	| CloseOverlayAction
	| SelectPieceAction
	| ClearSelectedPieceAction
	| UpdateConnectionStatusAction
	| SetWinnerIdCommand
	| SetInGameCommand;

// TODO convert to redux toolkit
export const reducer = (state: UiState = initialState, action: UIAction) => {
	switch (action.type) {
		case UPDATE_CONNECTION_STATUS:
			return {
				...state,
				connectionStatus: action.payload.status,
			};
		case OPEN_OVERLAY: {
			return {
				...state,
				currentOverlay: action.payload.overlay,
			};
		}
		case CLOSE_OVERLAY: {
			return {
				...state,
				currentOverlay: null,
			};
		}
		case SELECT_PIECE: {
			const isSamePiece =
				state.selectedPieceId && state.selectedPieceId === action.payload.id;

			return {
				...state,
				selectedPieceId: isSamePiece ? null : action.payload.id,
			};
		}
		case CLEAR_SELECTED_PIECE: {
			return {
				...state,
				selectedPieceId: null,
			};
		}
		case "setWinnerIdCommand": {
			return {
				...state,
				winnerId: action.payload.winnerId,
			};
		}
		case "setInGameCommand": {
			return {
				...state,
				inGame: true,
			};
		}
		default:
			return state;
	}
};
