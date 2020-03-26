import { TileType } from "@common/models/position";
import { Piece, GamePhase } from "@common/models";

export interface TileOwnProps {
    type: TileType;
    x: number;
    y: number;
    renderPiece: (piece: Piece) => JSX.Element;
}

export interface TileStateProps {
    piece: Piece;
    gamePhase: GamePhase;
    belowPieceLimit: boolean;
    selectedPiece: Piece;
}

export interface TileDispatchProps {
    onDropPiece: (piece: Piece) => void;
    onSelectPiece: (piece: Piece) => void;
}

export interface TileHandlerProps {
    canDropPiece: (piece: Piece) => boolean;
}

export type TileProps = TileOwnProps & TileStateProps & TileDispatchProps & TileHandlerProps;
