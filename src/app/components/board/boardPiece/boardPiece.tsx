import { compose } from "recompose";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { pieceSelected } from "../../../actions/pieceActions";
import { AppState } from "../../../store/store";
import { localPlayerIdSelector } from "../../../selectors/gameSelector";
import { BoardPieceProps, BoardPieceStateProps, BoardPieceDispatchProps, BoardPieceOwnProps } from "../boardPiece/boardPieceProps";
import { dragSource } from "./boardPieceDragDrop";
import { BoardPieceUnconnected } from "./boardPieceUnconnected";

const mapStateToProps: MapStateToProps<BoardPieceStateProps, {}, AppState> = state => ({
    localPlayerId: localPlayerIdSelector(state)
});

const mapDispatchToProps: MapDispatchToProps<BoardPieceDispatchProps, BoardPieceOwnProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(pieceSelected(ownProps.piece))
});

const BoardPiece = compose<BoardPieceProps, BoardPieceOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    dragSource
)(BoardPieceUnconnected);

export {
    BoardPiece
};
