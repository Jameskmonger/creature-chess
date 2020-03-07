import * as React from "react";
import { CreatureImage } from "../components/creatureImage";
import { DefinitionProvider } from "@common/game/definitionProvider";

interface CardProps {
    definitionId: number;
    cost: number;
    name: string;
    buyable: boolean;
    onClick: () => void;
}

const definitionProvider = new DefinitionProvider();

const Card: React.FunctionComponent<CardProps> = ({ definitionId, cost, name, buyable, onClick }) => {
    const className = `card ${definitionProvider.get(definitionId).type.toLowerCase()}${buyable ? "" : " not-buyable"}`;

    return (
        <div className={className} onClick={buyable ? onClick : undefined}>
            <div className="header">
                <div>
                    <span className="price">${cost}</span>
                </div>
                <div>
                    <CreatureImage definitionId={definitionId} />
                </div>
            </div>

            <div>{name}</div>
        </div>
    );
};

export {
    Card
};
