import { GameAction } from "../actions/gameActions";
import {
    JOIN_GAME, GAME_PHASE_UPDATE, MONEY_UPDATE,
    CREATE_GAME, JOIN_ERROR, ENABLE_DEBUG_MODE, FIND_GAME, UPDATE_ANNOUNCEMENT,
    CLEAR_ANNOUNCEMENT, SHOP_LOCK_UPDATED, UPDATE_CONNECTION_STATUS, FINISH_GAME, PHASE_START_SECONDS, CLEAR_SELECTED_PIECE
} from "../actiontypes/gameActionTypes";
import { GameState } from "../state";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { SELECT_PIECE } from "../actiontypes/boardActionTypes";
import { SelectPieceAction } from "../actions/boardActions";
import { ConnectionStatus } from "@common/networking";
import { GamePhase } from "@common/models";

export const initialState: GameState = {
    gameId: null,
    opponentId: null,
    loading: false,
    menuError: null,
    money: 0,
    phase: GamePhase.WAITING,
    phaseStartedAtSeconds: null,
    round: null,
    debug: false,
    mainAnnouncement: null,
    subAnnouncement: null,
    selectedPieceId: null,
    connectionStatus: ConnectionStatus.NOT_CONNECTED,
    shopLocked: false,
    winnerName: null
};

type GameReducerActionTypes = GameAction | SelectPieceAction;

export function game(state: GameState = initialState, action: GameReducerActionTypes): GameState {
    switch (action.type) {
        case UPDATE_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.payload.status
            };
        case FIND_GAME:
        case JOIN_GAME:
        case CREATE_GAME:
            return {
                ...state,
                loading: true
            };
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
                menuError: null,
                gameId: action.payload.gameId
            };
        case PHASE_START_SECONDS:
            return {
                ...state,
                phaseStartedAtSeconds: action.payload.time
            };
        case GAME_PHASE_UPDATE:
            // set opponent id when entering ready phase
            if (action.payload.phase === GamePhase.READY) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: action.payload.payload.opponentId
                };
            }

            // clear opponent id when entering preparing phase
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    round: action.payload.payload.round,
                    opponentId: null
                };
            }

            return {
                ...state,
                phase: action.payload.phase
            };
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case ENABLE_DEBUG_MODE: {
            return {
                ...state,
                debug: true
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
        case SELECT_PIECE: {
            const isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.piece.id;

            return {
                ...state,
                selectedPieceId: isSamePiece ? null : action.payload.piece.id
            };
        }
        case SHOP_LOCK_UPDATED: {
            return {
                ...state,
                shopLocked: action.payload.locked
            };
        }
        case FINISH_GAME: {
            return {
                ...state,
                winnerName: action.payload.winnerName
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
