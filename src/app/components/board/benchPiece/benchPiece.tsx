import { compose } from "recompose";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Props, BenchPieceDispatchProps, BenchPieceProps, BenchPieceStateProps } from "./benchPieceProps";
import { benchPieceDragSource } from "./benchPieceDragDrop";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";
import { pieceSelectedAction } from "../../../actions/gameActions";
import { AppState } from "../../../store/store";

const mapStateToProps: MapStateToProps<BenchPieceStateProps, {}, AppState> = (state) => ({
    canDrag: true
});

const mapDispatchToProps: MapDispatchToProps<BenchPieceDispatchProps, BenchPieceProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(pieceSelectedAction(ownProps.piece))
});

const BenchPiece = compose<Props, BenchPieceProps>(
    connect(mapStateToProps, mapDispatchToProps),
    benchPieceDragSource
)(BenchPieceUnconnected);

export {
    BenchPiece
};
