import { GameAction } from "../actions/gameActions";
import { JOIN_GAME, GAME_PHASE_UPDATE, MONEY_UPDATE, PHASE_TIMER_UPDATED, CREATE_GAME, JOIN_ERROR, ENABLE_DEBUG_MODE, FIND_GAME, UPDATE_ANNOUNCEMENT, CLEAR_ANNOUNCEMENT, SERVER_DISCONNECTED } from "../actiontypes/gameActionTypes";
import { GameState } from "../state";
import { GamePhase } from "@common";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { BEGIN_DRAG_BENCH_PIECE, BEGIN_DRAG_BOARD_PIECE, SELECT_PIECE } from '../actiontypes/boardActionTypes';
import { BeginDragPieceAction, SelectPieceAction } from '../actions/boardActions';
import { PieceMovedAction } from '@common/board/actions/boardActions';
import { PIECE_MOVED_TO_BOARD, PIECE_MOVED_TO_BENCH } from '@common/board/actions/boardActionTypes';
import { inBench } from '@common/position';

const initialState: GameState = {
    gameId: null,
    opponentId: null,
    loading: false,
    menuError: null,
    money: 0,
    phase: GamePhase.WAITING,
    phaseTimer: null,
    round: null,
    debug: false,
    mainAnnouncement: null,
    subAnnouncement: null,
    selectedPiece: null,
    isDisconnected: false
};

type GameReducerActionTypes = GameAction | BeginDragPieceAction | SelectPieceAction | PieceMovedAction;

export function game(state: GameState = initialState, action: GameReducerActionTypes) {
    switch (action.type) {
        case SERVER_DISCONNECTED:
            return {
                ...state,
                isDisconnected: true
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
        case GAME_PHASE_UPDATE:
            // set opponent id when entering ready phase
            if (action.payload.phase === GamePhase.READY) {
                const shouldClearSelected = state.selectedPiece && !inBench(state.selectedPiece.position);

                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: action.payload.payload.opponentId,
                    selectedPiece: shouldClearSelected ? null : state.selectedPiece
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
        case PHASE_TIMER_UPDATED:
            return {
                ...state,
                phaseTimer: action.payload.time
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
        case BEGIN_DRAG_BENCH_PIECE:
        case BEGIN_DRAG_BOARD_PIECE:
        case PIECE_MOVED_TO_BENCH:
        case PIECE_MOVED_TO_BOARD: {
            return {
                ...state,
                selectedPiece: null
            };
        }
        case SELECT_PIECE: {
            const isSamePiece = state.selectedPiece && state.selectedPiece.id === action.payload.piece.id;

            return {
                ...state,
                selectedPiece: isSamePiece ? null : action.payload.piece
            };
        }
        default:
            return state;
    }
}
