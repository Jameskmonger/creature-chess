import { Models, GamePhase } from "@common";
import { TileCoordinates, TileType } from "@common/position";

export interface TileOwnProps {
    type: TileType;
    position: TileCoordinates;
    renderPiece: (piece: Models.Piece) => JSX.Element;
}

export interface TileStateProps {
    pieces: Models.Piece[];
    gamePhase: GamePhase;
    belowPieceLimit: boolean;
    selectedPieceId: string;
}

export interface TileDispatchProps {
    onMovePiece: (piece: Models.Piece) => void;
}

export type TileProps = TileOwnProps & TileStateProps & TileDispatchProps;
