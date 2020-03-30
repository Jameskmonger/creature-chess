import { MapDispatchToProps, connect } from "react-redux";
import { DropToSellDispatchProps, DropToSellProps } from "./dropToSellProps";
import { dropToSellDropTarget } from "./dropToSellDragDrop";
import { compose } from "recompose";
import { DropToSellUnconnected } from "./dropToSellUnconnected";
import { Piece } from "@common/models";
import { playerSellPiece } from "@common/player/actions";

const mapDispatchToProps: MapDispatchToProps<DropToSellDispatchProps, {}> = (dispatch) => ({
    onDropPiece: (piece: Piece) => dispatch(playerSellPiece(piece.id))
});

const DropToSell = compose<DropToSellProps, {}>(
    connect(null, mapDispatchToProps),
    dropToSellDropTarget
)(DropToSellUnconnected);

export {
    DropToSell
};
