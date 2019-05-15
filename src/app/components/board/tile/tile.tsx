import { compose } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { PokemonPiece } from "@common/pokemon-piece";
import { BoardActions } from "@common/board";
import { AppState } from "../../../store/store";
import { tilePieceSelector, ownedPieceSelector } from "../../../selectors/pieceSelectors";
import { tileDropTarget } from "./tileDragDrop";
import { TileProps, TileOwnProps, TileStateProps, TileDispatchProps } from "./tileProps";
import { TileUnconnected } from "./tileUnconnected";

const mapStateToProps: MapStateToProps<TileStateProps, TileOwnProps, AppState> = (state, ownProps) => ({
    pieces: tilePieceSelector(state, ownProps),
    gamePhase: state.game.phase,
    belowPieceLimit: ownedPieceSelector(state).length < state.localPlayer.level
});

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, { type, position }) => ({
    onMovePiece: (piece: PokemonPiece) => dispatch(BoardActions.pieceMoved(piece, position, type))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    tileDropTarget
)(TileUnconnected);

export {
    Tile
};
