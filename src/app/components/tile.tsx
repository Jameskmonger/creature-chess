import * as React from "react";
import { compose } from "recompose";
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from "react-dnd";
import { MapDispatchToProps, connect } from "react-redux";

import { PokemonPiece, PiecePosition } from "@common/pokemon-piece";
import { Piece } from "./piece";
import { pieceMoved } from "../actions/pieceActions";

interface TileOwnProps {
    dark: boolean;
    pieces: PokemonPiece[];
    friendly: boolean;
    position: PiecePosition;
}

interface TileDispatchProps {
    onMovePiece: (piece: PokemonPiece) => void;
}

type TileProps = TileOwnProps & TileDispatchProps;

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}

const TileUnconnected: React.FunctionComponent<TileProps & DropTargetProps> = ({ dark, pieces, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {pieces.map(piece => <Piece piece={piece} key={piece.id} />)}
    </div>
);

const boxTarget: DropTargetSpec<TileProps> = {
    drop(props: TileProps, monitor: DropTargetMonitor) {
        props.onMovePiece(monitor.getItem());
    },
    canDrop(props: TileProps, monitor: DropTargetMonitor) {
        return props.friendly && props.pieces.length === 0;
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, { position }) => ({
    onMovePiece: (piece: PokemonPiece) => dispatch(pieceMoved(piece, position))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(null, mapDispatchToProps),
    DropTarget<TileProps>(typeof TileUnconnected, boxTarget, collect)
)(TileUnconnected);

export {
    TileUnconnected,
    Tile
};
