import { Models, GamePhase } from "@common";
import { TileCoordinates, TileType } from "@common/position";

export interface TileOwnProps {
    type: TileType;
    position: TileCoordinates;
    renderPiece: (piece: Models.Piece) => JSX.Element;
}

export interface TileStateProps {
    piece: Models.Piece;
    gamePhase: GamePhase;
    belowPieceLimit: boolean;
    currentSelectedPiece: Models.Piece;
}

export interface TileDispatchProps {
    onDropPiece: (piece: Models.Piece) => void;
    onSelectPiece: (piece: Models.Piece) => void;
}

export interface TileHandlerProps {
    canDropPiece: (piece: Models.Piece) => boolean;
}

export type TileProps = TileOwnProps & TileStateProps & TileDispatchProps & TileHandlerProps;
