import * as React from "react";
import { CreatureImage } from "../creatureImage";
import { getStats } from "@common/models/creatureDefinition";

interface CardProps {
    definitionId: number;
    cost: number;
    name: string;
    buyable: boolean;
    onClick: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ definitionId, cost, name, buyable, onClick }) => {
    const className = `card ${getStats(definitionId).type.toLowerCase()}${buyable ? "" : " not-buyable"}`;

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
