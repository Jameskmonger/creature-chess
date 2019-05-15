import { shuffle, flatten } from "lodash";
import { PokemonCard } from "@common/pokemon-card";
import { PokemonDefinition } from "@common/pokemon-stats";
import { PokemonPiece, getRequiredQuantityToEvolve } from "@common";

export class CardDeck {
    public deck: PokemonCard[];
    private definitions: PokemonDefinition[];

    constructor(definitions: PokemonDefinition[]) {
        this.definitions = definitions;

        const cardValues = [
            { cost: 1, quantity: 45 },
            { cost: 2, quantity: 30 },
            { cost: 3, quantity: 25 },
            { cost: 4, quantity: 15 },
            { cost: 5, quantity: 10 }
        ];

        this.deck = [];

        for (const value of cardValues) {
            const costPokemon = definitions.filter(p => p.cost !== null && p.cost === value.cost);

            for (const pokemon of costPokemon) {
                for (let count = 0; count < value.quantity; count++) {
                    this.addDefinition(pokemon);
                }
            }
        }

        this.deck = shuffle(this.deck);
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

    public addPiece(piece: PokemonPiece) {
        const definition = this.definitions.find(p => p.id === piece.pokemonId);
        const preEvolvedDefinitions = this.getDefinitionsUsedToEvolveToDefinition(definition);

        preEvolvedDefinitions.forEach(preEvolvedDefinition => this.addDefinition(preEvolvedDefinition));
    }

    public shuffle() {
        this.deck = shuffle(this.deck);
    }

    private addDefinition(pokemon: PokemonDefinition) {
        const card: PokemonCard = {
            id: pokemon.id,
            cost: pokemon.cost,
            name: pokemon.name
        };

        this.deck.push(card);
    }

    private getDefinitionsUsedToEvolveToDefinition(definition: PokemonDefinition): PokemonDefinition[] {
        const preEvolvedFormDefinition = this.definitions.find(p => p.evolvedFormId === definition.id);
        if (!!preEvolvedFormDefinition) {
            const preEvolvedDefinitions = Array(getRequiredQuantityToEvolve(preEvolvedFormDefinition.id)).fill(preEvolvedFormDefinition);
            return flatten(preEvolvedDefinitions.map(d => this.getDefinitionsUsedToEvolveToDefinition(d)));
        }

        return [definition];
    }
}
