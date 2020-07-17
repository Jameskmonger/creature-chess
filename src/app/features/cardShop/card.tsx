import * as React from "react";
import { CreatureImage } from "@app/display";
import { DefinitionProvider } from "@common/game/definitionProvider";

interface CardProps {
    definitionId: number;
    buyable: boolean;
    onClick: () => void;
}

const definitionProvider = new DefinitionProvider();

const Card: React.FunctionComponent<CardProps> = ({ definitionId, buyable, onClick }) => {
    const creature = definitionProvider.get(definitionId);

    return (
        <div className="card" onClick={buyable ? onClick : undefined}>
            <div className="card-content">
                <div>
                    <CreatureImage definitionId={definitionId} />
                </div>
                <h2 className="card-name">{creature.name}</h2>
                <div className="card-meta">
                    <span className="card-class">{creature.class}</span>
                    <div className="divider" />
                    <span className="card-type">{creature.type}</span>
                </div>
            </div>
            <div className="price">
                <div>${creature.cost}</div>
            </div>
        </div>
    );
};

export {
    Card
};
