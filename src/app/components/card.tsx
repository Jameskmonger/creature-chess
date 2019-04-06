import * as React from "react";
import { PokemonImage } from "./pokemonImage";
import { getPokemonStats } from "@common/pokemon-details";

interface CardProps {
    pokemonId: number;
    cost: number;
    name: string;
}

const Card: React.FunctionComponent<CardProps> = ({ pokemonId, cost, name }) => (
    <div className={`card ${getPokemonStats(pokemonId).type.toLowerCase()}`}>
        <PokemonImage pokemonId={pokemonId} />
        <div>{name}</div>
        <div>${cost}</div>
    </div>
);

interface RerollCardProps {
    onClick: () => void;
}

const RerollCard: React.FunctionComponent<RerollCardProps> = ({ onClick }) => (
    <div className="card reroll" onClick={onClick}>Reroll</div>
);

export {
    Card, RerollCard
};
