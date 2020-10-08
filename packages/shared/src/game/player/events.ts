import { PieceModel } from "@creature-chess/models";

export const PLAYER_FINISH_MATCH_EVENT = "PLAYER_FINISH_MATCH_EVENT";
export type PLAYER_FINISH_MATCH_EVENT = typeof PLAYER_FINISH_MATCH_EVENT;
export type PlayerFinishMatchEvent = ({ type: PLAYER_FINISH_MATCH_EVENT, payload: { homeScore: number, awayScore: number } });
export const playerFinishMatchEvent = (homeScore: number, awayScore: number): PlayerFinishMatchEvent => ({
    type: PLAYER_FINISH_MATCH_EVENT,
    payload: { homeScore, awayScore }
});

export const AFTER_SELL_PIECE_EVENT = "AFTER_SELL_PIECE_EVENT";
export type AFTER_SELL_PIECE_EVENT = typeof AFTER_SELL_PIECE_EVENT;
export type AfterSellPieceEvent = ({ type: AFTER_SELL_PIECE_EVENT, payload: { piece: PieceModel } });
export const afterSellPieceEvent = (piece: PieceModel): AfterSellPieceEvent => ({ type: AFTER_SELL_PIECE_EVENT, payload: { piece } });

export const AFTER_REROLL_CARDS_EVENT = "AFTER_REROLL_CARDS_EVENT";
export type AFTER_REROLL_CARDS_EVENT = typeof AFTER_REROLL_CARDS_EVENT;
export type AfterRerollCardsEvent = ({ type: AFTER_REROLL_CARDS_EVENT });
export const afterRerollCardsEvent = (): AfterRerollCardsEvent => ({ type: AFTER_REROLL_CARDS_EVENT });

export const CLIENT_FINISH_MATCH_EVENT = "CLIENT_FINISH_MATCH_EVENT";
export type CLIENT_FINISH_MATCH_EVENT = typeof CLIENT_FINISH_MATCH_EVENT;
export type ClientFinishMatchEvent = ({ type: CLIENT_FINISH_MATCH_EVENT });
export const clientFinishMatchEvent = (): ClientFinishMatchEvent => ({ type: CLIENT_FINISH_MATCH_EVENT });

export const PLAYER_DEATH_EVENT = "PLAYER_DEATH_EVENT";
export type PLAYER_DEATH_EVENT = typeof PLAYER_DEATH_EVENT;
export type PlayerDeathEvent = ({ type: PLAYER_DEATH_EVENT });
export const playerDeathEvent = (): PlayerDeathEvent => ({ type: PLAYER_DEATH_EVENT });

export type PlayerEvent =
    PlayerFinishMatchEvent
    | AfterSellPieceEvent
    | AfterRerollCardsEvent
    | ClientFinishMatchEvent
    | PlayerDeathEvent;
