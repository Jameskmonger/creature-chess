import { compose } from "recompose";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";
import { localPlayerIdSelector } from "../../store/gameSelector";
import { BoardPieceProps, BoardPieceStateProps, BoardPieceOwnProps } from "./boardPieceProps";
import { boardPieceDragSource } from "./boardPieceDragDrop";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";
import { GamePhase } from "@common";

const mapStateToProps: MapStateToProps<BoardPieceStateProps, {}, AppState> = state => ({
    canDrag: state.game.phase === GamePhase.PREPARING,
    showDamagePerTurn: state.game.phase === GamePhase.PREPARING,
    showHealthbar: state.game.phase === GamePhase.READY || state.game.phase === GamePhase.PLAYING,
    localPlayerId: localPlayerIdSelector(state)
});

const BoardPiece = compose<BoardPieceProps, BoardPieceOwnProps>(
    connect(mapStateToProps),
    boardPieceDragSource
)(BoardPieceUnconnected);

export {
    BoardPiece
};
