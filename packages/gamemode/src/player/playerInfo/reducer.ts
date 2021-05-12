import { STARTING_HEALTH, STARTING_LEVEL, STARTING_MONEY, StreakType, PlayerBattle, PlayerStatus } from "@creature-chess/models";
import {
    UPDATE_MONEY_COMMAND, PlayerInfoCommand, UPDATE_OPPONENT_COMMAND, CLEAR_OPPONENT_COMMAND,
    UPDATE_LEVEL_COMMAND, UPDATE_HEALTH_COMMAND, UPDATE_ROUND_DIED_AT_COMMAND, UPDATE_STREAK_COMMAND, UPDATE_STATUS_COMMAND, UPDATE_BATTLE_COMMAND
} from "./commands";
import { PlayerEvent, PLAYER_MATCH_REWARDS_EVENT } from "../events";
import { readyUpPlayerAction } from "../playerGameActions";

export interface PlayerStreak {
    type: StreakType;
    amount: number;
}

export type HasPlayerInfo = { playerInfo: PlayerInfoState };

export type PlayerMatchRewards = {
    damage: number;
    justDied: boolean;
    rewardMoney: {
        total: number,
        base: number,
        winBonus: number,
        streakBonus: number,
        interest: number
    };
};

export interface PlayerInfoState {
    status: PlayerStatus;
    health: number;
    streak: PlayerStreak;
    battle: PlayerBattle | null;
    matchRewards: PlayerMatchRewards | null;

    roundDiedAt: number | null;

    opponentId: string | null;
    money: number;
    ready: boolean;
    level: number;
    xp: number;
}

const initialState: PlayerInfoState = {
    status: PlayerStatus.CONNECTED,
    health: STARTING_HEALTH,
    roundDiedAt: null,
    streak: {
        type: StreakType.WIN,
        amount: 0
    },
    battle: null,
    matchRewards: null,
    opponentId: null,
    money: STARTING_MONEY,
    ready: false,
    level: STARTING_LEVEL,
    xp: 0
};

export function playerInfoReducer(state: PlayerInfoState = initialState, command: PlayerInfoCommand | PlayerEvent): PlayerInfoState {
    switch (command.type) {
        case PLAYER_MATCH_REWARDS_EVENT:
            return {
                ...state,
                matchRewards: command.payload
            };
        case UPDATE_STATUS_COMMAND:
            return {
                ...state,
                status: command.payload.status
            };
        case UPDATE_BATTLE_COMMAND:
            return {
                ...state,
                battle: command.payload.battle
            };
        case UPDATE_HEALTH_COMMAND:
            return {
                ...state,
                health: command.payload.health
            };
        case UPDATE_STREAK_COMMAND:
            return {
                ...state,
                streak: {
                    amount: command.payload.amount,
                    type: command.payload.type
                }
            };
        case UPDATE_ROUND_DIED_AT_COMMAND:
            return {
                ...state,
                roundDiedAt: command.payload.roundDiedAt
            };
        case UPDATE_LEVEL_COMMAND:
            return {
                ...state,
                level: command.payload.level,
                xp: command.payload.xp
            };
        case UPDATE_MONEY_COMMAND:
            return {
                ...state,
                money: command.payload.money
            };
        case UPDATE_OPPONENT_COMMAND:
            return {
                ...state,
                opponentId: command.payload.opponentId,
                ready: false
            };
        case CLEAR_OPPONENT_COMMAND:
            return {
                ...state,
                opponentId: null
            };
        case readyUpPlayerAction.toString():
            return {
                ...state,
                ready: true
            };
        default:
            return state;
    }
}
