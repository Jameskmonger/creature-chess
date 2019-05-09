import { compose } from "recompose";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AppState } from "../../../store/store";
import { localPlayerIdSelector } from "../../../selectors/gameSelector";
import { BoardPieceProps, BoardPieceStateProps, BoardPieceDispatchProps, BoardPieceOwnProps } from "../boardPiece/boardPieceProps";
import { boardPieceDragSource } from "./boardPieceDragDrop";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";
import { pieceSelectedAction } from "../../../actions/gameActions";
import { GamePhase } from "@common";

const mapStateToProps: MapStateToProps<BoardPieceStateProps, {}, AppState> = state => ({
    canDrag: state.game.phase === GamePhase.PREPARING,
    localPlayerId: localPlayerIdSelector(state)
});

const mapDispatchToProps: MapDispatchToProps<BoardPieceDispatchProps, BoardPieceOwnProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(pieceSelectedAction(ownProps.piece))
});

const BoardPiece = compose<BoardPieceProps, BoardPieceOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    boardPieceDragSource
)(BoardPieceUnconnected);

export {
    BoardPiece
};
