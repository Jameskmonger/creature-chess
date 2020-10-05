export const SELECT_PIECE = "SELECT_PIECE";
export type SELECT_PIECE = typeof SELECT_PIECE;

export const CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
export type CLEAR_SELECTED_PIECE = typeof CLEAR_SELECTED_PIECE;

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { id: string } });
export type ClearSelectedPieceAction = ({ type: CLEAR_SELECTED_PIECE });

export const selectPiece = (id: string): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: {
        id
    }
});

export const clearSelectedPiece = (): ClearSelectedPieceAction => ({ type: CLEAR_SELECTED_PIECE });
