import { compose } from "recompose";
import { connect, MapDispatchToProps } from "react-redux";
import { Props, BenchPieceDispatchProps, BenchPieceProps } from "./benchPieceProps";
import { benchPieceDragSource } from "./benchPieceDragDrop";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";
import { pieceSelectedAction } from "../../../actions/gameActions";

const mapDispatchToProps: MapDispatchToProps<BenchPieceDispatchProps, BenchPieceProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(pieceSelectedAction(ownProps.piece))
});

const BenchPiece = compose<Props, BenchPieceProps>(
    connect(null, mapDispatchToProps),
    benchPieceDragSource
)(BenchPieceUnconnected);

export {
    BenchPiece
};
