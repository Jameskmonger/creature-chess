import { MapDispatchToProps, connect } from "react-redux";
import { DropToSellDispatchProps, DropToSellProps } from "./dropToSellProps";
import { Models } from "@common";
import { BoardActions } from "@common/board";
import { dropToSellDropTarget } from "./dropToSellDragDrop";
import { compose } from "recompose";
import { DropToSellUnconnected } from "./dropToSellUnconnected";

const mapDispatchToProps: MapDispatchToProps<DropToSellDispatchProps, {}> = (dispatch) => ({
    onDropPiece: (piece: Models.Piece) => dispatch(BoardActions.sellPiece(piece.id))
});

const DropToSell = compose<DropToSellProps, {}>(
    connect(null, mapDispatchToProps),
    dropToSellDropTarget
)(DropToSellUnconnected);

export {
    DropToSell
};
