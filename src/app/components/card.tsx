import * as React from "react";
import { PokemonImage } from "./pokemonImage";
import { getPokemonStats } from "@common/pokemon-details";
import { Constants } from "@common";

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

interface RerollCardProps {
    buyable: boolean;
    onClick: () => void;
}

const RerollCard: React.FunctionComponent<RerollCardProps> = ({ buyable, onClick }) => (
    <div
        className={`card reroll${buyable ? "" : " not-buyable"}`}
        onClick={buyable ? onClick : undefined}
    >
        Reroll (${Constants.REROLL_COST})
    </div>
);

export {
    Card, RerollCard
};
