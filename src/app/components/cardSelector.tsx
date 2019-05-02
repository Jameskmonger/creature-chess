import * as React from "react";
import { PokemonCard, Constants } from "@common";
import { Card, RerollCard } from "./card";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../store/store";
import { rerollCards, purchaseCard } from "../actions/cardActions";

interface StateProps {
    cards: PokemonCard[];
    money: number;
}

interface DispatchProps {
    onReroll: () => void;
    onPurchaseCard: (index: number) => void;
}

type Props = StateProps & DispatchProps;

const CardSelectorUnconnected: React.FunctionComponent<Props> = props => {
    const { cards, money, onReroll, onPurchaseCard } = props;

    const onCardClick = (index: number) => {
        return () => onPurchaseCard(index);
    };

    const createCard = (card: PokemonCard, index: number) => {
        if (card === null) {
            return null;
        }

        return (
            <Card
                key={`${index}-${card.id}`}
                pokemonId={card.id}
                cost={card.cost}
                name={card.name}
                buyable={money >= card.cost}
                onClick={onCardClick(index)}
            />
        );
    };

    return (
        <div className="card-selector">
            <div className="balance">Balance: ${money}</div>
            <div className="cards">
                {cards.map(createCard)}

                <RerollCard onClick={onReroll} buyable={money >= Constants.REROLL_COST} />
            </div>
        </div>
    );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    cards: state.cards,
    money: state.game.money
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onReroll: () => dispatch(rerollCards()),
    onPurchaseCard: (index: number) => dispatch(purchaseCard(index))
});

const CardSelector = connect(mapStateToProps, mapDispatchToProps)(CardSelectorUnconnected);

export {
    CardSelector
};
