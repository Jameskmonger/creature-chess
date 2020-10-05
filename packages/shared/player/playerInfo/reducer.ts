import { MONEY_UPDATE, SHOP_LOCK_UPDATED, GameAction, SET_OPPONENT, CLEAR_OPPONENT, LEVEL_UPDATE, CARDS_UPDATED, HEALTH_UPDATED, ROUND_DIED_AT_UPDATED, STREAK_UPDATED } from "./actions";
import { STARTING_HEALTH, STARTING_LEVEL, STARTING_MONEY } from "@creature-chess/models/src/constants";
import { READY_UP } from "../actions";
import { Card, StreakType } from "@creature-chess/models";

export interface PlayerStreak {
    type: StreakType;
    amount: number;
}

export type HasPlayerInfo = { playerInfo: PlayerInfoState };

export interface PlayerInfoState {
    health: number;
    roundDiedAt: number | null;
    streak: PlayerStreak;

    opponentId: string;
    shopLocked: boolean;
    money: number;
    ready: boolean;
    level: number;
    xp: number;
    cards: Card[];
}

const initialState: PlayerInfoState = {
    health: STARTING_HEALTH,
    roundDiedAt: null,
    streak: {
        type: StreakType.WIN,
        amount: 0
    },
    opponentId: null,
    shopLocked: false,
    money: STARTING_MONEY,
    ready: false,
    level: STARTING_LEVEL,
    xp: 0,
    cards: []
};

export function playerInfoReducer(state: PlayerInfoState = initialState, action: GameAction): PlayerInfoState {
    switch (action.type) {
        case HEALTH_UPDATED: {
            return {
                ...state,
                health: action.payload.health
            };
        }
        case STREAK_UPDATED: {
            return {
                ...state,
                streak: {
                    amount: action.payload.amount,
                    type: action.payload.type
                }
            };
        }
        case ROUND_DIED_AT_UPDATED: {
            return {
                ...state,
                roundDiedAt: action.payload.roundDiedAt
            };
        }
        case CARDS_UPDATED:
            return {
                ...state,
                cards: action.payload.cards
            };
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
