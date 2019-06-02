import { Models } from "@common";
import { PIECE_MOVED_TO_BOARD, PIECES_UPDATED, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "./boardActionTypes";
import { TileCoordinates, TileType } from "@common/position";

type PieceMovedToBoardAction = ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: Models.Piece, position: TileCoordinates } });
type PieceMovedToBenchAction = ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: Models.Piece, slot: number } });
type SellPieceAction = ({ type: SELL_PIECE, payload: { pieceId: string } });

export type PiecesUpdatedAction = ({ type: PIECES_UPDATED, payload: { pieces: Models.Piece[] } });

export type BoardAction =
    PiecesUpdatedAction
    | PieceMovedToBoardAction
    | PieceMovedToBenchAction
    | SellPieceAction;

export const pieceMoved = (piece: Models.Piece, position: TileCoordinates, tileType: TileType): PieceMovedToBoardAction | PieceMovedToBenchAction => {
    if (tileType === TileType.BOARD) {
        return {
            type: PIECE_MOVED_TO_BOARD,
            payload: {
                piece,
                position
            }
        };
    }

    return {
        type: PIECE_MOVED_TO_BENCH,
        payload: {
            piece,
            slot: position.x
        }
    };
};

export const piecesUpdated = (pieces: Models.Piece[]): PiecesUpdatedAction => ({
    type: PIECES_UPDATED,
    payload: {
        pieces
    }
});

export const sellPiece = (pieceId: string): SellPieceAction => ({
    type: SELL_PIECE,
    payload: {
        pieceId
    }
});
