import { SELECT_PIECE } from "../actiontypes/boardActionTypes";

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { id: string } });

export const selectPiece = (id: string): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: {
        id
    }
});
