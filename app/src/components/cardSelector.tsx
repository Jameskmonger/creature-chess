import * as React from "react";
import { PokemonCard } from "../models/cardDeck";
import { take } from "lodash";
import { Card } from "./card";

interface CardSelectorProps {
    cards: PokemonCard[];
    shuffle: (cards: PokemonCard[]) => void;
}

class CardSelector extends React.Component<CardSelectorProps> {

    public render() {
        const { cards } = this.props;
        const topCards = take(cards, 5);

        return (
            <div className="card-select">
                {topCards.map((card, index) => <Card key={index} pokemonId={card.id} cost={card.cost} name={card.name} />)}

                <button onClick={this.shuffle}>Roll</button>
            </div>
        );
    }

    private shuffle = () => {
        this.props.shuffle(this.props.cards);
    }
}

export {
    CardSelector
};
