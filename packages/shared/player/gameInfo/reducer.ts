import { MONEY_UPDATE, GAME_PHASE_UPDATE, SHOP_LOCK_UPDATED, PHASE_START_SECONDS, GameAction } from "./actions";
import { GamePhase } from "@creature-chess/models";
import { STARTING_MONEY } from "@creature-chess/models/src/constants";
import { READY_UP } from "../actions";

export interface GameInfoState {
    phase: GamePhase;
    phaseStartedAtSeconds: number;
    opponentId: string;
    shopLocked: boolean;
    money: number;
    ready: boolean;
}

const initialState: GameInfoState = {
    phase: GamePhase.WAITING,
    phaseStartedAtSeconds: null,
    opponentId: null,
    shopLocked: false,
    money: STARTING_MONEY,
    ready: false
};

export function gameInfo(state: GameInfoState = initialState, action: GameAction): GameInfoState {
    switch (action.type) {
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case GAME_PHASE_UPDATE:
            // set ready to false, and set opponent id when entering ready phase
            if (action.payload.phase === GamePhase.READY) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: action.payload.payload.opponentId,
                    ready: false
                };
            }

            // clear opponent id when entering preparing phase
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: null
                };
            }

            return {
                ...state,
                phase: action.payload.phase
            };
        case SHOP_LOCK_UPDATED: {
            return {
                ...state,
                shopLocked: action.payload.locked
            };
        }
        case PHASE_START_SECONDS:
            return {
                ...state,
                phaseStartedAtSeconds: action.payload.time
            };
        case READY_UP:
            return {
                ...state,
                ready: true
            };
        default:
            return state;
    }
}
