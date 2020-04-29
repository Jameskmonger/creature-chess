import { compose } from "recompose";
import { AppState } from "@app/store";
import { connect, MapStateToProps } from "react-redux";
import { Props, BenchPieceProps, BenchPieceStateProps } from "./benchPieceProps";
import { benchPieceDragSource } from "./benchPieceDragDrop";
import { BenchPieceUnconnected } from "./benchPieceUnconnected";

const mapStateToProps: MapStateToProps<BenchPieceStateProps, {}, AppState> = (state) => ({
    canDrag: true
});

const BenchPiece = compose<Props, BenchPieceProps>(
    connect(mapStateToProps),
    benchPieceDragSource
)(BenchPieceUnconnected);

export {
    BenchPiece
};
