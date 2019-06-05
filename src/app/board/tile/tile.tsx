import { compose } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { Models } from "@common";
import { BoardActions } from "@common/board";
import { AppState } from "../../store/state";
import { tilePieceSelector, ownedPieceSelector } from "../../store/pieceSelectors";
import { tileDropTarget } from "./tileDragDrop";
import { TileProps, TileOwnProps, TileStateProps, TileDispatchProps } from "./tileProps";
import { TileUnconnected } from "./tileUnconnected";

const mapStateToProps: MapStateToProps<TileStateProps, TileOwnProps, AppState> = (state, ownProps) => ({
    pieces: tilePieceSelector(state, ownProps),
    gamePhase: state.game.phase,
    belowPieceLimit: ownedPieceSelector(state).length < state.localPlayer.level
});

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, { type, position }) => ({
    onMovePiece: (piece: Models.Piece) => dispatch(BoardActions.pieceMoved(piece, position, type))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    tileDropTarget
)(TileUnconnected);

export {
    Tile
};
