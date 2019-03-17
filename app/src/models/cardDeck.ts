import { pokemonStats } from "./pokemon-stats";

interface PokemonCard {
    id: number;
    cost: number;
    name: string;
}

export class CardDeck {
    public deck: PokemonCard[];

    constructor() {
        this.deck = [];

        const cardValues = [
            { cost: 1, quantity: 45 },
            { cost: 2, quantity: 30 },
            { cost: 3, quantity: 25 },
            { cost: 4, quantity: 15 },
            { cost: 5, quantity: 10 }
        ];

        for (const value of cardValues) {

            const costPokemon = pokemonStats.filter(p => p.cost !== null && p.cost === value.cost);

            for (const pokemon of costPokemon) {
                for (let count = 0; count < value.quantity; count++) {
                    const card: PokemonCard = {
                        id: pokemon.id,
                        cost: value.cost,
                        name: pokemon.name
                    };

                    this.deck.push(card);
                }
            }
        }
    }

    public shuffle() {
        let currentIndex = this.deck.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }

        return this.deck;
    }
}
