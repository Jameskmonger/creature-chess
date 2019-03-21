import * as React from "react";
import { compose } from "recompose";
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from "react-dnd";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { PokemonPiece, PiecePosition } from "@common/pokemon-piece";
import { Piece } from "./piece";
import { pieceMoved } from "../actions/pieceActions";
import { AppState } from "../store/store";
import { pieceSelector } from "../selectors/pieceSelectors";

interface TileOwnProps {
    dark: boolean;
    friendly: boolean;
    position: PiecePosition;
}

interface TileStateProps {
    pieces: PokemonPiece[];
}

interface TileDispatchProps {
    onMovePiece: (piece: PokemonPiece) => void;
}

type TileProps = TileOwnProps & TileStateProps & TileDispatchProps;

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

const mapStateToProps: MapStateToProps<TileStateProps, TileOwnProps, AppState> = (state, ownProps) => ({
    pieces: pieceSelector(state, ownProps)
});

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, { position }) => ({
    onMovePiece: (piece: PokemonPiece) => dispatch(pieceMoved(piece, position))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    DropTarget<TileProps>(typeof TileUnconnected, boxTarget, collect)
)(TileUnconnected);

export {
    TileUnconnected,
    Tile
};
