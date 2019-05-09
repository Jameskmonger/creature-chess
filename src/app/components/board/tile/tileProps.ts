import { PokemonPiece, GamePhase } from "@common";
import { TileCoordinates, TileType } from "@common/position";

export interface TileOwnProps {
    type: TileType;
    position: TileCoordinates;
    renderPiece: (piece: PokemonPiece) => JSX.Element;
}

export interface TileStateProps {
    pieces: PokemonPiece[];
    gamePhase: GamePhase;
    belowPieceLimit: boolean;
}

export interface TileDispatchProps {
    onMovePiece: (piece: PokemonPiece) => void;
}

export type TileProps = TileOwnProps & TileStateProps & TileDispatchProps;
