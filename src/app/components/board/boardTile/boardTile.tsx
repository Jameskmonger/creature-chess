import { compose } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { BoardPokemonPiece } from "@common/pokemon-piece";
import { pieceMoved } from "../../../actions/pieceActions";
import { AppState } from "../../../store/store";
import { pieceSelector } from "../../../selectors/pieceSelectors";
import { dropTarget } from "./boardTileDragDrop";
import { BoardTileProps, BoardTileOwnProps, BoardTileStateProps, BoardTileDispatchProps } from "./boardTileProps";
import { BoardTileUnconnected } from "./boardTileUnconnected";

const mapStateToProps: MapStateToProps<BoardTileStateProps, BoardTileOwnProps, AppState> = (state, ownProps) => ({
    pieces: pieceSelector(state, ownProps)
});

const mapDispatchToProps: MapDispatchToProps<BoardTileDispatchProps, BoardTileOwnProps> = (dispatch, { position }) => ({
    onMovePiece: (piece: BoardPokemonPiece) => dispatch(pieceMoved(piece, position))
});

const BoardTile = compose<BoardTileProps, BoardTileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    dropTarget
)(BoardTileUnconnected);

export {
    BoardTile
};
