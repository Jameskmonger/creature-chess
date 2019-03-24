import * as React from "react";
import { PokemonPiece } from "@common/pokemon-piece";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";
import { SelectedPieceInfo } from "./selectedPieceInfo";

interface Props {
    piece: PokemonPiece;
}

const SelectedPieceInfoPanelUnconnected: React.FunctionComponent<Props> = (props) => (
    <div>
        {props.piece && <SelectedPieceInfo />}
    </div>
);

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    piece: state.pieces.find(piece => piece.selected)
});

const SelectedPieceInfoPanel = connect(mapStateToProps)(SelectedPieceInfoPanelUnconnected);

export { SelectedPieceInfoPanel };
