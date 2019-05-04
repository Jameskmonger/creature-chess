import { ConnectDropTarget } from "react-dnd";
import { PokemonPiece } from "@common";
import { TileCoordinates } from "@common/position";

export interface BoardTileOwnProps {
    dark: boolean;
    friendly: boolean;
    position: TileCoordinates;
}

export interface BoardTileStateProps {
    pieces: PokemonPiece[];
}

export interface BoardTileDispatchProps {
    onMovePiece: (piece: PokemonPiece) => void;
}

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}

export type BoardTileProps = BoardTileOwnProps & BoardTileStateProps & BoardTileDispatchProps;
