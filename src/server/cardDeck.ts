import { shuffle } from "lodash";
import { PokemonCard } from "../shared/pokemon-card";
import { PokemonDefinition } from "../shared/pokemon-stats";

export class CardDeck {
    public deck: PokemonCard[];

    constructor(definitions: PokemonDefinition[]) {
        const cardValues = [
            { cost: 1, quantity: 45 },
            { cost: 2, quantity: 30 },
            { cost: 3, quantity: 25 },
            { cost: 4, quantity: 15 },
            { cost: 5, quantity: 10 }
        ];

        const cards: PokemonCard[] = [];

        for (const value of cardValues) {
            const costPokemon = definitions.filter(p => p.cost !== null && p.cost === value.cost);

            for (const pokemon of costPokemon) {
                for (let count = 0; count < value.quantity; count++) {
                    const card: PokemonCard = {
                        id: pokemon.id,
                        cost: value.cost,
                        name: pokemon.name
                    };

                    cards.push(card);
                }
            }
        }

        this.deck = shuffle(cards);
    }

    public take(count: number) {
        const output: PokemonCard[] = [];

        for (let i = 0; i < count; i++) {
            const popped = this.deck.pop();

            output.push(popped || null);
        }

        return output;
    }

    public add(cards: PokemonCard[]) {
        const cardsToAdd = cards.filter(card => card !== null);

        for (const card of cardsToAdd) {
            this.deck.push(card);
        }

        this.deck = shuffle(this.deck);
    }

    public shuffle() {
        this.deck = shuffle(this.deck);
    }
}
