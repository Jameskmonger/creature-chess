import { PLAYER_DROP_PIECE } from "./actionTypes";
import { PlayerPieceLocation } from "@common/models";

export type PlayerDropPieceAction = {
  type: PLAYER_DROP_PIECE,
  payload: {
    pieceId: string,
    from: PlayerPieceLocation,
    to: PlayerPieceLocation
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
