import * as React from "react";
import { DefinitionProvider } from "@creature-chess/shared";
import { CreatureImage } from "../../../ui/display";
import { TypeIndicator } from "../board/piece/components/TypeIndicator";

interface CardProps {
    definitionId: number;
    buyable: boolean;
    onClick?: () => void;

    fullWidth?: boolean;
}

const definitionProvider = new DefinitionProvider();

const Card: React.FunctionComponent<CardProps> = ({ definitionId, buyable, onClick, fullWidth = false }) => {
    const creature = definitionProvider.get(definitionId);

    const cardClassName = `card${fullWidth ? " full-width" : ""}`;

    return (
        <div className={cardClassName} onClick={(buyable && onClick) ? onClick : undefined}>
            <div className="card-content">
                <div className="card-content-group">
                    <CreatureImage definitionId={definitionId} />
                </div>
                {
                    !fullWidth
                    && (
                        <>
                            <h2 className="card-name">{creature.name}</h2>
                            <div className="card-meta">
                                <span className="card-class">{creature.class}</span>
                                <div className="divider" />
                                <TypeIndicator type={creature.type} /> <span className="card-type">{creature.type}</span>
                            </div>
                        </>
                    )
                }
                {
                    fullWidth
                    && (
                        <div className="card-content-group">
                            <h2 className="card-name">{creature.name}</h2>
                            <span className="card-class">{creature.class}</span>
                            <TypeIndicator type={creature.type} /> <span className="card-type">{creature.type}</span>
                        </div>
                    )
                }
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
