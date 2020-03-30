import { PLAYER_DROP_PIECE, PLAYER_SELL_PIECE } from "./actionTypes";
import { PlayerPieceLocation } from "@common/models";

export type PlayerDropPieceAction = {
  type: PLAYER_DROP_PIECE,
  payload: {
    pieceId: string,
    from: PlayerPieceLocation,
    to: PlayerPieceLocation
  }
};

export type PlayerSellPieceAction = {
  type: PLAYER_SELL_PIECE,
  payload: {
    pieceId: string
  }
};

export const playerDropPiece = (
  pieceId: string,
  from: PlayerPieceLocation,
  to: PlayerPieceLocation
): PlayerDropPieceAction => ({
  type: PLAYER_DROP_PIECE,
  payload: {
    pieceId, from, to
  }
});

export const playerSellPiece = (pieceId: string): PlayerSellPieceAction => ({
  type: PLAYER_SELL_PIECE,
  payload: {
    pieceId
  }
});
