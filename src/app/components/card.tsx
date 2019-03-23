import * as React from "react";
import { PokemonImage } from "./pokemonImage";

interface CardProps {
    pokemonId: number;
    cost: number;
    name: string;
}

const Card: React.FunctionComponent<CardProps> = ({ pokemonId, cost, name }) => (
    <div>
        <PokemonImage pokemonId={pokemonId} />
        <div>{name}</div>
        <div>$ {cost}</div>
    </div>
);

export {
    Card
};
