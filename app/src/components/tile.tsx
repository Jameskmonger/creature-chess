import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from "react-dnd";

import { PokemonPiece } from '../models/pokemon-piece';
import { Piece } from './piece';

interface TileProps {
    dark: boolean,
    piece: PokemonPiece,
    movePiece: (piece: PokemonPiece) => void;
}

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}

export const TileUnconnected: React.FunctionComponent<TileProps & DropTargetProps> = ({ dark, piece, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {
            piece && <Piece piece={piece} />
        }
    </div>
);

const boxTarget: DropTargetSpec<TileProps> = {
    drop(props: TileProps, monitor: DropTargetMonitor) {
        props.movePiece(monitor.getItem());
    },
    canDrop(props: TileProps, monitor: DropTargetMonitor) {
        return true;
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

export const Tile = DropTarget<TileProps>(typeof TileUnconnected, boxTarget, collect)(TileUnconnected);