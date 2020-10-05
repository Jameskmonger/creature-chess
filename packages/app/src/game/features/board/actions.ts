export const SELECT_PIECE = "SELECT_PIECE";
export type SELECT_PIECE = typeof SELECT_PIECE;

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { id: string } });

export const selectPiece = (id: string): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: {
        id
    }
});
