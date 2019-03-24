import * as React from "react";

interface Props {
    pokemonId: number;
    facing?: "front" | "back";
}

const PokemonImage: React.FunctionComponent<Props> = (props) => (
    <img className="image" src={`/images/${props.facing || "front"}/${props.pokemonId}.png`} />
);

export { PokemonImage };
