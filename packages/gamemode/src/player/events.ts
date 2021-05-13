import { PieceModel } from "@creature-chess/models";
import { createAction } from "@reduxjs/toolkit";

export type AfterSellPieceEvent = ReturnType<typeof afterSellPieceEvent>;
export const afterSellPieceEvent = createAction<{ piece: PieceModel }, "afterSellPieceEvent">("afterSellPieceEvent");

export type AfterRerollCardsEvent = ReturnType<typeof afterRerollCardsEvent>;
export const afterRerollCardsEvent = createAction("afterRerollCardsEvent");

export const CLIENT_FINISH_MATCH_EVENT = "CLIENT_FINISH_MATCH_EVENT";
export type CLIENT_FINISH_MATCH_EVENT = typeof CLIENT_FINISH_MATCH_EVENT;
export type ClientFinishMatchEvent = ({ type: CLIENT_FINISH_MATCH_EVENT });
export const clientFinishMatchEvent = (): ClientFinishMatchEvent => ({ type: CLIENT_FINISH_MATCH_EVENT });

export type PlayerDeathEvent = ReturnType<typeof playerDeathEvent>;
export const playerDeathEvent = createAction("playerDeathEvent");

export const PLAYER_MATCH_REWARDS_EVENT = "PLAYER_MATCH_REWARDS_EVENT";
export type PLAYER_MATCH_REWARDS_EVENT = typeof PLAYER_MATCH_REWARDS_EVENT;
export type PlayerMatchRewardsEvent = ({
    type: PLAYER_MATCH_REWARDS_EVENT,
    payload: {
        damage: number;
        justDied: boolean;
        rewardMoney: { total: number, base: number, winBonus: number, streakBonus: number, interest: number };
    } | null
});
export const playerMatchRewardsEvent = (payload: {
    damage: number;
    justDied: boolean;
    rewardMoney: { total: number, base: number, winBonus: number, streakBonus: number, interest: number };
} | null): PlayerMatchRewardsEvent => ({
    type: PLAYER_MATCH_REWARDS_EVENT,
    payload
});

export type PlayerEvent =
    AfterSellPieceEvent
    | AfterRerollCardsEvent
    | ClientFinishMatchEvent
    | PlayerDeathEvent
    | PlayerMatchRewardsEvent;
