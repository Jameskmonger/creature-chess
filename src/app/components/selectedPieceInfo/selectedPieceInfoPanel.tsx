import * as React from "react";
import { getPokemonDefinition, getRequiredQuantityToEvolve } from "@common";
import { PokemonPiece } from "@common/pokemon-piece";
import { SelectedPieceDetail } from "./selectedPieceDetail";
import { PokemonImage } from "../pokemonImage";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "src/app/store/store";
import { CombinePiecesButton } from "./combinePiecesButton";
import { getPokemonStats } from "@common/pokemon-details";

interface Props {
    piece: PokemonPiece;
    numberOwned: number;
}

const SelectedPieceInfoPanelUnconnected: React.FunctionComponent<Props> = (props) => {
    if (props.piece === null) {
        return null;
    }

    const pokemonDefinition = getPokemonDefinition(props.piece.pokemonId);
    const { id, name, stats } = pokemonDefinition;
    const requiredQuantityToEvolve = getRequiredQuantityToEvolve(id);

    return (
        <div className={`selected-piece-info-panel card ${getPokemonStats(props.piece.pokemonId).type.toLowerCase()}`}>
            <PokemonImage pokemonId={id} />
            <SelectedPieceDetail label="Name" value={name} />
            <SelectedPieceDetail label="HP" value={stats.hp} />
            <SelectedPieceDetail label="Attack" value={stats.attack} />
            <SelectedPieceDetail label="Defence" value={stats.defense} />
            <SelectedPieceDetail label="Type" value={stats.type} />
            <SelectedPieceDetail label="Owned" value={props.numberOwned} />
            {requiredQuantityToEvolve && props.numberOwned >= requiredQuantityToEvolve && <CombinePiecesButton />}
        </div>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => {
    const piece = state.game.selectedPiece;

    if (piece === null) {
        return {
            piece,
            numberOwned: 0
        };
    }

    const numberOnBoard = state.pieces
        .filter(p => p.pokemonId === piece.pokemonId && p.ownerId === state.game.localPlayerId).length;

    const numberOnBench = state.benchPieces
        .filter(p => p.pokemonId === piece.pokemonId).length;

    return {
        piece,
        numberOwned: numberOnBoard + numberOnBench
    };
};

const SelectedPieceInfoPanel = connect(mapStateToProps)(SelectedPieceInfoPanelUnconnected);

export { SelectedPieceInfoPanelUnconnected, SelectedPieceInfoPanel };
