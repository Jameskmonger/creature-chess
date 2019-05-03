import * as React from "react";
import { PokemonImage } from "../pokemonImage";
import { getPokemonStats } from "@common/pokemon-details";

interface CardProps {
    pokemonId: number;
    cost: number;
    name: string;
    buyable: boolean;
    onClick: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ pokemonId, cost, name, buyable, onClick }) => {
    const className = `card ${getPokemonStats(pokemonId).type.toLowerCase()}${buyable ? "" : " not-buyable"}`;

    return (
        <div className={className} onClick={buyable ? onClick : undefined}>
            <PokemonImage pokemonId={pokemonId} />
            <div>{name}</div>
            <div>${cost}</div>
        </div>
    );
};

export {
    Card
};
