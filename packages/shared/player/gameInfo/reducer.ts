import { MONEY_UPDATE, GAME_PHASE_UPDATE, SHOP_LOCK_UPDATED, GameAction } from "./actions";
import { GamePhase } from "@creature-chess/models";
import { STARTING_MONEY } from "@creature-chess/models/src/constants";

export interface GameInfoState {
    phase: GamePhase;
    shopLocked: boolean;
    money: number;
}

const initialState: GameInfoState = {
    phase: GamePhase.WAITING,
    shopLocked: false,
    money: STARTING_MONEY
};

export function gameInfo(state: GameInfoState = initialState, action: GameAction): GameInfoState {
    switch (action.type) {
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case GAME_PHASE_UPDATE:
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
        default:
            return state;
    }
}
