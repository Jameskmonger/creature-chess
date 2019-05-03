import * as React from "react";
import { compose } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { PokemonPiece } from "@common/pokemon-piece";
import { Piece } from "./piece";
import { pieceMoved } from "../../actions/pieceActions";
import { AppState } from "../../store/store";
import { pieceSelector } from "../../selectors/pieceSelectors";
import { TileCoordinates } from "@common/position";
import { dropTarget, DropTargetProps } from "./boardTileDragDrop";

interface BoardTileOwnProps {
    dark: boolean;
    friendly: boolean;
    position: TileCoordinates;
}

interface BoardTileStateProps {
    pieces: PokemonPiece[];
}

interface BoardTileDispatchProps {
    onMovePiece: (piece: PokemonPiece) => void;
}

type BoardTileProps = BoardTileOwnProps & BoardTileStateProps & BoardTileDispatchProps;

const BoardTileUnconnected: React.FunctionComponent<BoardTileProps & DropTargetProps> = ({ dark, pieces, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {pieces.map(piece => <Piece piece={piece} key={piece.id} />)}
    </div>
);

const mapStateToProps: MapStateToProps<BoardTileStateProps, BoardTileOwnProps, AppState> = (state, ownProps) => ({
    pieces: pieceSelector(state, ownProps)
});

const mapDispatchToProps: MapDispatchToProps<BoardTileDispatchProps, BoardTileOwnProps> = (dispatch, { position }) => ({
    onMovePiece: (piece: PokemonPiece) => dispatch(pieceMoved(piece, position))
});

const BoardTile = compose<BoardTileProps, BoardTileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    dropTarget
)(BoardTileUnconnected);

export {
    BoardTileProps,
    BoardTileUnconnected,
    BoardTile
};
