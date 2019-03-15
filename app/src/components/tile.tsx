import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from "react-dnd";

import { PokemonPiece } from "../models/pokemon-piece";
import { Piece } from "./piece";

interface TileProps {
    dark: boolean;
    piece: PokemonPiece;
    friendly: boolean;
    movePiece: (piece: PokemonPiece) => void;
}

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}

const TileUnconnected: React.FunctionComponent<TileProps & DropTargetProps> = ({ dark, piece, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {piece && <Piece piece={piece} />}
    </div>
);

const boxTarget: DropTargetSpec<TileProps> = {
    drop(props: TileProps, monitor: DropTargetMonitor) {
        props.movePiece(monitor.getItem());
    },
    canDrop(props: TileProps, monitor: DropTargetMonitor) {
        return props.friendly;
    }
};

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

const Tile = DropTarget<TileProps>(typeof TileUnconnected, boxTarget, collect)(TileUnconnected);

export {
    TileUnconnected,
    Tile
};
