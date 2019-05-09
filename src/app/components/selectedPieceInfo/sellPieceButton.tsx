import { connect, MapDispatchToProps } from "react-redux";
import { SellPieceButtonUnconnected } from "./sellPieceButtonUnconnected";
import { sellPiece } from "../../actions/pieceActions";
import { PokemonPiece } from "@common";

interface DispatchProps {
    onClick: () => void;
}

interface OwnProps {
    piece: PokemonPiece;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch, ownProps) => ({
    onClick: () => dispatch(sellPiece(ownProps.piece.id))
});

const SellPieceButton = connect(null, mapDispatchToProps)(SellPieceButtonUnconnected);

export { SellPieceButton };
