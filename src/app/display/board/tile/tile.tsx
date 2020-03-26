import { compose, withHandlers } from "recompose";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";

import { canDropPiece } from "@common/board";
import { AppState } from "@app/store";
import { benchTilePieceSelector, ownedPieceSelector, boardTilePieceSelector } from "../../../store/pieceSelectors";
import { tileDropTarget } from "./tileDragDrop";
import { TileProps, TileOwnProps, TileStateProps, TileDispatchProps, TileHandlerProps } from "./tileProps";
import { TileUnconnected } from "./tileUnconnected";
import { selectPiece } from "src/app/store/actions/boardActions";
import { Piece, PlayerPieceLocation, GamePhase } from "@common/models";
import { TileType } from "@common/models/position";
import { playerDropPiece } from "@common/player/actions";
import { getPiece } from "@common/player/pieceSelectors";
import { clearSelectedPiece } from "@app/store/actions/gameActions";

const canDropPieceOnTile = (props: TileProps) => {
    return (piece: Piece) => {
        const tileEmpty = props.piece === null;
        const boardLocked = props.gamePhase !== GamePhase.PREPARING;

        return canDropPiece(
            piece,
            props.x,
            props.y,
            tileEmpty,
            boardLocked,
            props.belowPieceLimit
        );
    };
};

const mapStateToProps: MapStateToProps<TileStateProps, TileOwnProps, AppState> = (state, ownProps) => {
    const piece = (
        ownProps.type === TileType.BOARD
            ? boardTilePieceSelector(state, ownProps)
            : benchTilePieceSelector(state, ownProps)
    );

    // todo make a reselect selector for this
    const selectedPiece = getPiece(state, state.game.selectedPieceId);

    return {
        piece,
        gamePhase: state.game.phase,
        belowPieceLimit: ownedPieceSelector(state).length < state.localPlayer.level,
        selectedPiece
    };
};

const mapDispatchToProps: MapDispatchToProps<TileDispatchProps, TileOwnProps> = (dispatch, ownProps) => ({
    onDropPiece: (piece: Piece) => {
        const from: PlayerPieceLocation = (
            piece.position.y !== null
                ? ({
                    type: "board",
                    location: { x: piece.position.x, y: piece.position.y }
                })
                : ({
                    type: "bench",
                    location: { slot: piece.position.x }
                })
        );

        const to: PlayerPieceLocation = (
            ownProps.type === TileType.BOARD
                ? ({
                    type: "board",
                    location: { x: ownProps.x, y: ownProps.y }
                })
                : ({
                    type: "bench",
                    location: { slot: ownProps.x }
                })
        );

        dispatch(playerDropPiece(piece.id, from, to));
        dispatch(clearSelectedPiece());
    },
    onSelectPiece: (piece: Piece) => dispatch(selectPiece(piece))
});

const Tile = compose<TileProps, TileOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers<TileProps, TileHandlerProps>({
        canDropPiece: canDropPieceOnTile
    }),
    tileDropTarget
)(TileUnconnected);

export {
    Tile
};
