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
            <div className="header">
                <div>
                    <span className="price">${cost}</span>
                </div>
                <div>
                    <PokemonImage pokemonId={pokemonId} />
                </div>
            </div>

            <div>{name}</div>
        </div>
    );
};

export {
    Card
};
