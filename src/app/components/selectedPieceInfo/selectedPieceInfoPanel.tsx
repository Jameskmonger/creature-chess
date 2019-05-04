import * as React from "react";
import { BoardPokemonPiece } from "@common/pokemon-piece";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../../store/store";
import { SelectedPieceInfo } from "./selectedPieceInfo";
import { getPokemonStats } from "@common/pokemon-details";

interface Props {
    piece: BoardPokemonPiece;
}

const SelectedPieceInfoPanelUnconnected: React.FunctionComponent<Props> = (props) => {
    const { piece } = props;

    if (piece === undefined) {
        return null;
    }

    return (
        <div className={`selected-piece-info-panel card ${getPokemonStats(props.piece.pokemonId).type.toLowerCase()}`}>
            <SelectedPieceInfo />
        </div>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    piece: state.pieces.find(piece => piece.selected)
});

const SelectedPieceInfoPanel = connect(mapStateToProps)(SelectedPieceInfoPanelUnconnected);

export { SelectedPieceInfoPanel };
