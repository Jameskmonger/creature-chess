import { compose, withHandlers } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { Models } from "@common";
import { BoardActions, canDropPiece } from "@common/board";
import { AppState } from "../../store/state";
import { tilePieceSelector, ownedPieceSelector } from "../../store/pieceSelectors";
import { tileDropTarget } from "./tileDragDrop";
import { TileProps, TileOwnProps, TileStateProps, TileDispatchProps, TileHandlerProps } from "./tileProps";
import { TileUnconnected } from "./tileUnconnected";
import { selectPiece } from 'src/app/store/actions/boardActions';
import { Piece } from '@common/models';

const mapStateToProps: MapStateToProps<TileStateProps, TileOwnProps, AppState> = (state, ownProps) => {
    const piece = tilePieceSelector(state, ownProps);

    return {
        piece,
        gamePhase: state.game.phase,
        belowPieceLimit: ownedPieceSelector(state).length < state.localPlayer.level,
        currentSelectedPiece: state.game.selectedPiece
    };
};

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, { type, position }) => ({
    onDropPiece: (piece: Models.Piece) => dispatch(BoardActions.pieceMoved(piece, position, type)),
    onSelectPiece: (piece: Models.Piece) => dispatch(selectPiece(piece))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers<TileProps, TileHandlerProps>({
        canDropPiece: props => {
            return (piece: Piece) => {
                return canDropPiece(
                    piece,
                    props.position,
                    props.piece === null,
                    props.gamePhase,
                    props.belowPieceLimit
                );
            }
        }
    }),
    tileDropTarget
)(TileUnconnected);

export {
    Tile
};
