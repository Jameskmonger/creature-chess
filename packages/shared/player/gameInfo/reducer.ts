import { MONEY_UPDATE, SHOP_LOCK_UPDATED, GameAction, SET_OPPONENT, CLEAR_OPPONENT, LEVEL_UPDATE } from "./actions";
import { STARTING_LEVEL, STARTING_MONEY } from "@creature-chess/models/src/constants";
import { READY_UP } from "../actions";

export interface GameInfoState {
    opponentId: string;
    shopLocked: boolean;
    money: number;
    ready: boolean;
    level: number;
    xp: number;
}

const initialState: GameInfoState = {
    opponentId: null,
    shopLocked: false,
    money: STARTING_MONEY,
    ready: false,
    level: STARTING_LEVEL,
    xp: 0
};

export function gameInfo(state: GameInfoState = initialState, action: GameAction): GameInfoState {
    switch (action.type) {
        case LEVEL_UPDATE:
            return {
                ...state,
                level: action.payload.level,
                xp: action.payload.xp
            };
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case SET_OPPONENT:
            return {
                ...state,
                opponentId: action.payload.opponentId,
                ready: false
            };
        case CLEAR_OPPONENT:
            return {
                ...state,
                opponentId: null
            };
        case SHOP_LOCK_UPDATED: {
            return {
                ...state,
                shopLocked: action.payload.locked
            };
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
