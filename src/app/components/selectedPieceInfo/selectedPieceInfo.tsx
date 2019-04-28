import * as React from "react";
import { getPokemonDefinition, getRequiredQuantityToEvolve } from "@common";
import { PokemonPiece } from "@common/pokemon-piece";
import { SelectedPieceDetail } from "./selectedPieceDetail";
import { PokemonImage } from "../pokemonImage";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "src/app/store/store";
import { CombinePiecesButton } from "./combinePiecesButton";

interface Props {
    piece: PokemonPiece;
    numberOwned: number;
}

const SelectedPieceInfoUnconnected: React.FunctionComponent<Props> = (props) => {
    const pokemonDefinition = getPokemonDefinition(props.piece.pokemonId);
    const { id, name, stats } = pokemonDefinition;
    const requiredQuantityToEvolve = getRequiredQuantityToEvolve(id);
    return (
        <>
            <PokemonImage pokemonId={id} />
            <SelectedPieceDetail label="Name" value={name} />
            <SelectedPieceDetail label="HP" value={stats.hp} />
            <SelectedPieceDetail label="Attack" value={stats.attack} />
            <SelectedPieceDetail label="Defence" value={stats.defense} />
            <SelectedPieceDetail label="Type" value={stats.type} />
            <SelectedPieceDetail label="Owned" value={props.numberOwned} />
            {requiredQuantityToEvolve && props.numberOwned >= requiredQuantityToEvolve && <CombinePiecesButton />}
        </>
    );
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => {
    const piece = state.pieces.find(p => p.selected);
    const numberOwned = state.pieces.filter(p => p.pokemonId === piece.pokemonId && p.ownerId === state.game.localPlayerId).length;
    return { piece, numberOwned };
};

const SelectedPieceInfo = connect(mapStateToProps)(SelectedPieceInfoUnconnected);

export { SelectedPieceInfo };
