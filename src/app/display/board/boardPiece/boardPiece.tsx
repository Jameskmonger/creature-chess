import { compose } from "recompose";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { AppState } from "@app/store";
import { localPlayerIdSelector } from "../../../store/gameSelector";
import { BoardPieceProps, BoardPieceStateProps, BoardPieceOwnProps, BoardPieceDispatchProps } from "./boardPieceProps";
import { boardPieceDragSource } from "./boardPieceDragDrop";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";
import { beginDragBoardPiece } from "../../../store/actions/boardActions";
import { GamePhase } from "@common/models";

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
