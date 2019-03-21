import * as React from "react";
import { PokemonPiece } from "@common/pokemon-piece";
import { getPokemonName } from "@common/pokemon-details";
import { connect, MapStateToProps } from "react-redux";
import { AppState } from "../store/store";

interface Props {
    piece: PokemonPiece;
}

const SelectedPieceInfoUnconnected: React.FunctionComponent<Props> = (props) => (
    <div>
        {props.piece && `Name: ${getPokemonName(props.piece.pokemonId)}`}
    </div>
);

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    piece: state.pieces.find(piece => piece.selected)
});

const SelectedPieceInfo = connect(mapStateToProps)(SelectedPieceInfoUnconnected);

export { SelectedPieceInfo };
