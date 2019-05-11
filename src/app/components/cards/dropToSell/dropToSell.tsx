import { MapDispatchToProps, connect } from "react-redux";
import { DropToSellDispatchProps, DropToSellProps } from "./dropToSellProps";
import { PokemonPiece } from "@common";
import { sellPiece } from "../../../actions/pieceActions";
import { dropToSellDropTarget } from "./dropToSellDragDrop";
import { compose } from "recompose";
import { DropToSellUnconnected } from "./dropToSellUnconnected";

const mapDispatchToProps: MapDispatchToProps<DropToSellDispatchProps, {}> = (dispatch) => ({
    onDropPiece: (piece: PokemonPiece) => dispatch(sellPiece(piece.id))
});

const DropToSell = compose<DropToSellProps, {}>(
    connect(null, mapDispatchToProps),
    dropToSellDropTarget
)(DropToSellUnconnected);

export {
    DropToSell
};
