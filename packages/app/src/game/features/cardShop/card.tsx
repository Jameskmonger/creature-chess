import * as React from "react";
import { Card } from "@creature-chess/models";
import { CreatureImage } from "../../../display";
import { TypeIndicator } from "../board/piece/components/TypeIndicator";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { getPlayerMoney } from "@creature-chess/gamemode";

interface CardProps {
    card: Card;
    selected: boolean;
    onClick?: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ card, onClick, selected }) => {
    const money = useSelector<AppState, number>(state => getPlayerMoney(state.game));
    const buyable = money >= card.cost;

    const cardClassName = `card${selected ? " selected" : ""}`;

    return (
        <div className={cardClassName} onClick={(buyable && onClick) ? onClick : undefined}>
            <div className="card-content">
                <div className="card-content-group">
                    <div className="half">
                        <TypeIndicator type={card.type} />
                    </div>
                    <div className="half">
                        <span>${card.cost}</span>
                    </div>
                </div>
                <div className="card-content-group">
                    <CreatureImage definitionId={card.definitionId} />
                </div>
                <h2 className="card-name">{card.name}</h2>
                <div className="card-meta">
                    <div className="card-details">
                        <span className="card-class">{card.class}</span>
                        <span className="card-type">{card.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    Card
};
