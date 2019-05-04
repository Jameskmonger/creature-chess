import { compose } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { PokemonPiece } from "@common/pokemon-piece";
import { AppState } from "../../store/store";
import { tilePieceSelector } from "../../selectors/pieceSelectors";
import { tileDropTarget } from "./tileDragDrop";
import { TileProps, TileOwnProps, TileStateProps, TileDispatchProps } from "./tileProps";
import { TileUnconnected } from "./tileUnconnected";
import { pieceMoved } from "../../actions/pieceActions";

const mapStateToProps: MapStateToProps<TileStateProps, TileOwnProps, AppState> = (state, ownProps) => ({
    pieces: tilePieceSelector(state, ownProps)
});

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, { type, position }) => ({
    onMovePiece: (piece: PokemonPiece) => dispatch(pieceMoved(piece, position, type))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    tileDropTarget
)(TileUnconnected);

export {
    Tile
};
