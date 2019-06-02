import * as React from "react";
import { FaSyncAlt } from "react-icons/fa";
import { Models, Constants, GamePhase } from "@common";
import { Card } from "./card";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../store/store";
import { rerollCards, buyCard } from "./cardActions";
import { DropToSell } from "./dropToSell/dropToSell";

interface StateProps {
    cards: Models.Card[];
    money: number;
    canUseShop: boolean;
}

interface DispatchProps {
    onReroll: () => void;
    onBuyCard: (index: number) => void;
}

type Props = StateProps & DispatchProps;

const CardShopUnconnected: React.FunctionComponent<Props> = props => {
    const { cards, money, onReroll, onBuyCard, canUseShop } = props;

    const onCardClick = (index: number) => {
        return () => onBuyCard(index);
    };

    const createCard = (card: Models.Card, index: number) => {
        if (card === null) {
            return null;
        }

        return (
            <Card
                key={`${index}-${card.definitionId}`}
                definitionId={card.definitionId}
                cost={card.cost}
                name={card.name}
                buyable={money >= card.cost}
                onClick={onCardClick(index)}
            />
        );
    };

    if (canUseShop === false) {
        return null;
    }

    const rerollBuyable = money >= Constants.REROLL_COST;

    return (
        <div className="card-selector">
            <div className="balance">
                <span className="item">Balance</span>
                <span className="item">${money}</span>
                <span className="item">&nbsp;|&nbsp;</span>
                <span className="item">
                    <FaSyncAlt
                        onClick={rerollBuyable ? onReroll : undefined}
                        className={`reroll-icon${rerollBuyable ? "" : " not-buyable"}`}
                    />
                </span>
                <span className="item">(${Constants.REROLL_COST})</span>
            </div>
            <div className="cards">
                <div className="shop">
                    {cards.map(createCard)}
                </div>
                <DropToSell />
            </div>
        </div>
    );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    cards: state.cards,
    money: state.game.money,
    canUseShop: state.game.phase !== GamePhase.WAITING && state.game.phase !== GamePhase.DEAD
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onReroll: () => dispatch(rerollCards()),
    onBuyCard: (index: number) => dispatch(buyCard(index))
});

const CardShop = connect(mapStateToProps, mapDispatchToProps)(CardShopUnconnected);

export {
    CardShop
};
