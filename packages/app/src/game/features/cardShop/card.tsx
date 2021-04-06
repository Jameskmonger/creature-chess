import * as React from "react";
import { DefinitionProvider } from "@creature-chess/shared";
import { CreatureImage } from "../../../ui/display";
import { TypeIndicator } from "../board/piece/components/TypeIndicator";

interface CardProps {
    definitionId: number;
    buyable: boolean;
    selected: boolean;
    definitionProvider: DefinitionProvider;
    onClick?: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ definitionProvider, definitionId, buyable, onClick, selected }) => {
    const creature = definitionProvider.get(definitionId);

    const cardClassName = `card${selected ? " selected" : ""}`;

    return (
        <div className={cardClassName} onClick={(buyable && onClick) ? onClick : undefined}>
            <div className="card-content">
                <div className="card-content-group">
                    <div className="half">
                        <TypeIndicator type={creature.type} />
                    </div>
                    <div className="half">
                        <span>${creature.cost}</span>
                    </div>
                </div>
                <div className="card-content-group">
                    <CreatureImage definitionId={definitionId} />
                </div>
                <h2 className="card-name">{creature.name}</h2>
                <div className="card-meta">
                    <div className="card-details">
                        <span className="card-class">{creature.class}</span>
                        <span className="card-type">{creature.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    Card
};
