import { compose } from "recompose";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props, BenchPieceProps, BenchPieceStateProps, BenchPieceDispatchProps } from "./benchPieceProps";
import { benchPieceDragSource } from "./benchPieceDragDrop";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";
import { AppState } from "../../../store/state";
import { beginDragBenchPiece } from "../../../store/actions/boardActions";

const mapStateToProps: MapStateToProps<BenchPieceStateProps, {}, AppState> = (state) => ({
    canDrag: true
});

const mapDispatchToProps: MapDispatchToProps<BenchPieceDispatchProps, {}> = (dispatch) => ({
    onBeginDrag: () => dispatch(beginDragBenchPiece())
});

const BenchPiece = compose<Props, BenchPieceProps>(
    connect(mapStateToProps, mapDispatchToProps),
    benchPieceDragSource
)(BenchPieceUnconnected);

export {
    BenchPiece
};
