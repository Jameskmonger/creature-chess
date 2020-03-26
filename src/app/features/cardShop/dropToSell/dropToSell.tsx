import { MapDispatchToProps, connect } from "react-redux";
import { DropToSellDispatchProps, DropToSellProps } from "./dropToSellProps";
import { BoardActions } from "@common/board";
import { dropToSellDropTarget } from "./dropToSellDragDrop";
import { compose } from "recompose";
import { DropToSellUnconnected } from "./dropToSellUnconnected";
import { Piece } from "@common/models";

const mapDispatchToProps: MapDispatchToProps<DropToSellDispatchProps, {}> = (dispatch) => ({
    onDropPiece: (piece: Piece) => dispatch(BoardActions.removeBoardPiece(piece.id))
});

const DropToSell = compose<DropToSellProps, {}>(
    connect(null, mapDispatchToProps),
    dropToSellDropTarget
)(DropToSellUnconnected);

export {
    DropToSell
};
