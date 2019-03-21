import * as React from "react";
import { PokemonPiece, PiecePosition } from "@common/pokemon-piece";
import { Piece } from "../piece";
import { DropTargetSpec, DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from "react-dnd";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { AppState } from "src/app/store/store";
import { compose } from "recompose";
import { pieceMoved } from "src/app/actions/pieceActions";
import { benchPieceSelector } from "src/app/selectors/pieceSelectors";

interface BenchTileOwnProps {
    position: PiecePosition;
}

interface BenchTileStateProps {
    piece: PokemonPiece;
}

interface BenchTileDispatchProps {
    onMovePiece: (piece: PokemonPiece) => void;
}

type BenchTileProps = BenchTileOwnProps & BenchTileStateProps & BenchTileDispatchProps;

export interface DropTargetProps {
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    canDrop: boolean;
}

const BenchTileUnconnected: React.FunctionComponent<BenchTileProps & DropTargetProps> = ({ piece, connectDropTarget }) => connectDropTarget(
    <div className={`tile bench`}>
        {piece && <Piece piece={piece} />}
    </div>
);

const boxTarget: DropTargetSpec<BenchTileProps> = {
    drop(props, monitor) {
        props.onMovePiece(monitor.getItem());
    },
    canDrop(props, monitor) {
        return !props.piece;
    }
};

const collect = (connector: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

const mapStateToProps: MapStateToProps<BenchTileStateProps, BenchTileOwnProps, AppState> = (state, ownProps) => ({
    piece: benchPieceSelector(state, ownProps)[0]
});

const mapDispatchToProps: MapDispatchToProps<BenchTileDispatchProps, BenchTileOwnProps> = (dispatch, { position }) => ({
    onMovePiece: (piece: PokemonPiece) => dispatch(pieceMoved(piece, position, true))
});

const BenchTile = compose<BenchTileProps, BenchTileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    DropTarget<BenchTileProps>(typeof BenchTileUnconnected, boxTarget, collect)
)(BenchTileUnconnected);

export {
    BenchTile
};
