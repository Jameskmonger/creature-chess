import { compose } from "recompose";
import { connect, MapDispatchToProps } from "react-redux";
import { benchPieceSelected } from "../../../actions/benchPieceActions";
import { Props, BenchPieceDispatchProps, BenchPieceProps } from "./benchPieceProps";
import { benchPieceDragSource } from "./benchPieceDragDrop";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";

const mapDispatchToProps: MapDispatchToProps<BenchPieceDispatchProps, BenchPieceProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(benchPieceSelected(ownProps.piece))
});

const BenchPiece = compose<Props, BenchPieceProps>(
    connect(null, mapDispatchToProps),
    benchPieceDragSource
)(BenchPieceUnconnected);

export {
    BenchPiece
};
