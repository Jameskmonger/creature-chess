import { compose } from "recompose";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../../store/store";
import { localPlayerIdSelector } from "../../../selectors/gameSelector";
import { BoardPieceProps, BoardPieceStateProps, BoardPieceOwnProps } from "../boardPiece/boardPieceProps";
import { boardPieceDragSource } from "./boardPieceDragDrop";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";
import { GamePhase } from "@common";

const mapStateToProps: MapStateToProps<BoardPieceStateProps, {}, AppState> = state => ({
    canDrag: state.game.phase === GamePhase.PREPARING,
    localPlayerId: localPlayerIdSelector(state)
});

const BoardPiece = compose<BoardPieceProps, BoardPieceOwnProps>(
    connect(mapStateToProps),
    boardPieceDragSource
)(BoardPieceUnconnected);

export {
    BoardPiece
};
