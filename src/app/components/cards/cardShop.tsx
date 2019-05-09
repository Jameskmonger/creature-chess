import * as React from "react";
import { PokemonCard, Constants, GamePhase } from "@common";
import { Card } from "./card";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../../store/store";
import { rerollCards, purchaseCard } from "../../actions/cardActions";
import { RerollCard } from "./rerollCard";

interface StateProps {
    cards: PokemonCard[];
    money: number;
    canUseShop: boolean;
}

interface DispatchProps {
    onReroll: () => void;
    onPurchaseCard: (index: number) => void;
}

type Props = StateProps & DispatchProps;

const CardShopUnconnected: React.FunctionComponent<Props> = props => {
    const { cards, money, onReroll, onPurchaseCard, canUseShop } = props;

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

    if (canUseShop === false) {
        return null;
    }

    return (
        <div className="card-selector">
            <div className="balance">Balance: ${money}</div>
            <div className="cards">
                <RerollCard onClick={onReroll} buyable={money >= Constants.REROLL_COST} />

                {cards.map(createCard)}
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
    onPurchaseCard: (index: number) => dispatch(purchaseCard(index))
});

const CardShop = connect(mapStateToProps, mapDispatchToProps)(CardShopUnconnected);

export {
    CardShop
};
