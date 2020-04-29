import { SELECT_PIECE } from "../actiontypes/boardActionTypes";
import { Piece } from "@common/models";

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { piece: Piece } });

export const selectPiece = (piece: Piece): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: {
        piece
    }
});
