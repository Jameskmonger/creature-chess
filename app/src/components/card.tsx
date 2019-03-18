import * as React from "react";

interface CardProps {
    pokemonId: number;
    cost: number;
    name: string;
}

const Card: React.FunctionComponent<CardProps> = ({ pokemonId, cost, name }) => (
    <div>
        <img className="image" src={`/images/front/${pokemonId}.png`} />
        <div>{name}</div>
        <div>$ {cost}</div>
    </div>
);

export {
    Card
};
