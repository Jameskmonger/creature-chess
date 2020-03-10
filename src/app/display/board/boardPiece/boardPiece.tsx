import { compose } from "recompose";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { AppState } from "../../../store/state";
import { localPlayerIdSelector } from "../../../store/gameSelector";
import { BoardPieceProps, BoardPieceStateProps, BoardPieceOwnProps, BoardPieceDispatchProps } from "./boardPieceProps";
import { boardPieceDragSource } from "./boardPieceDragDrop";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";
import { GamePhase } from "@common";
import { beginDragBoardPiece } from "../../../store/actions/boardActions";

const mapStateToProps: MapStateToProps<BoardPieceStateProps, {}, AppState> = state => ({
    canDrag: state.game.phase === GamePhase.PREPARING,
    showDamagePerTurn: state.game.phase === GamePhase.PREPARING,
    showHealthbar: state.game.phase === GamePhase.READY || state.game.phase === GamePhase.PLAYING,
    animate: state.game.debug === false,
    localPlayerId: localPlayerIdSelector(state)
});

const mapDispatchToProps: MapDispatchToProps<BoardPieceDispatchProps, {}> = (dispatch) => ({
    onBeginDrag: () => dispatch(beginDragBoardPiece())
});

const BoardPiece = compose<BoardPieceProps, BoardPieceOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    boardPieceDragSource
)(BoardPieceUnconnected);

export {
    BoardPiece
};
