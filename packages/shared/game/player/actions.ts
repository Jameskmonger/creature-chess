import { PieceModel } from "@creature-chess/models";

export const PLAYER_FINISH_MATCH = "PLAYER_FINISH_MATCH";
export type PLAYER_FINISH_MATCH = typeof PLAYER_FINISH_MATCH;
export type PlayerFinishMatchAction = ({ type: PLAYER_FINISH_MATCH, payload: { homeScore: number, awayScore: number } });
export const playerFinishMatch = (homeScore: number, awayScore: number): PlayerFinishMatchAction => ({
    type: PLAYER_FINISH_MATCH,
    payload: { homeScore, awayScore }
});

export const AFTER_SELL_PIECE = "AFTER_SELL_PIECE";
export type AFTER_SELL_PIECE = typeof AFTER_SELL_PIECE;
export type AfterSellPieceAction = ({ type: AFTER_SELL_PIECE, payload: { piece: PieceModel } });
export const afterSellPiece = (piece: PieceModel): AfterSellPieceAction => ({ type: AFTER_SELL_PIECE, payload: { piece } });
