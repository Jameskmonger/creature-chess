import * as React from "react";
import { PokemonCard } from "@common";
import { take } from "lodash";
import { Card, RerollCard } from "./card";

interface CardSelectorProps {
    cards: PokemonCard[];
    onShuffle: () => void;
}

class CardSelector extends React.Component<CardSelectorProps> {

    public render() {
        const { cards, onShuffle } = this.props;
        const topCards = take(cards, 5);

        return (
            <div className="card-selector">
                <div className="cards">
                    {topCards.map((card, index) => <Card key={`${index}-${card.id}`} pokemonId={card.id} cost={card.cost} name={card.name} />)}

                    <RerollCard onClick={onShuffle} />
                </div>
            </div>
        );
    }
}

export {
    CardSelector
};
