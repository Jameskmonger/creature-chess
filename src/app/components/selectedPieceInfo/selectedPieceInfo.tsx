import * as React from "react";
import { getPokemonName, getPokemonStats, getPokemonDefinition } from "@common/pokemon-details";
import { PokemonPiece } from "@common/pokemon-piece";
import { SelectedPieceDetail } from "./selectedPieceDetail";
import { PokemonImage } from "../pokemonImage";

interface Props {
    piece: PokemonPiece;
}

const SelectedPieceInfo: React.FunctionComponent<Props> = (props) => {
    const pokemonDefinition = getPokemonDefinition(props.piece.pokemonId);
    const { id, name, stats } = pokemonDefinition;
    return (
        <>
            <PokemonImage pokemonId={id} />
            <SelectedPieceDetail label="Name" value={name} />
            <SelectedPieceDetail label="HP" value={stats.hp} />
            <SelectedPieceDetail label="Attack" value={stats.attack} />
            <SelectedPieceDetail label="Defence" value={stats.defense} />
            <SelectedPieceDetail label="Type" value={stats.type} />
        </>
    );
};

export { SelectedPieceInfo };
