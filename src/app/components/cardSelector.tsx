import * as React from "react";
import { PokemonCard } from "@common";
import { take } from "lodash";
import { Card, RerollCard } from "./card";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../store/store";
import { ClientToServerPacketOpcodes } from "../../shared/packet-opcodes";
import { sendPacket } from "../actions/networkActions";
import { refreshCards, purchaseCard } from "../actions/cardActions";

interface StateProps {
    cards: PokemonCard[];
    money: number;
}

interface DispatchProps {
    onShuffle: () => void;
    onPurchaseCard: (index: number) => void;
}

type Props = StateProps & DispatchProps;

const CardSelectorUnconnected: React.FunctionComponent<Props> = props => {
    const { cards, money, onShuffle, onPurchaseCard } = props;

    const onCardClick = (card: PokemonCard, index: number) => {
        return () => {
            // not enough money
            if (money < card.cost) {
                return;
            }

            onPurchaseCard(index);
        };
    };

    const createCard = (card: PokemonCard, index: number) => (
        <Card
            key={`${index}-${card.id}`}
            pokemonId={card.id}
            cost={card.cost}
            name={card.name}
            onClick={onCardClick(card, index)}
        />
    );

    return (
        <div className="card-selector">
            <div className="balance">Balance: ${money}</div>
            <div className="cards">
                {cards.map(createCard)}

                <RerollCard onClick={onShuffle} />
            </div>
        </div>
    );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    cards: state.cards,
    money: state.game.money
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onShuffle: () => dispatch(refreshCards()),
    onPurchaseCard: (index: number) => dispatch(purchaseCard(index))
});

const CardSelector = connect(mapStateToProps, mapDispatchToProps)(CardSelectorUnconnected);

export {
    CardSelector
};
