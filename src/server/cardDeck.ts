import uuid = require("uuid/v4");
import { shuffle, flatten } from "lodash";
import { CreatureDefinition, getRequiredQuantityToEvolve } from "@common/models/creatureDefinition";
import { Models } from "@common";

export class CardDeck {
    public deck: Models.Card[];
    private definitions: CreatureDefinition[];

    constructor(definitions: CreatureDefinition[]) {
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
            const costDefinitions = definitions.filter(p => p.cost !== null && p.cost === value.cost);

            for (const definition of costDefinitions) {
                for (let count = 0; count < value.quantity; count++) {
                    this.addDefinition(definition);
                }
            }
        }

        this.deck = shuffle(this.deck);
    }

    public take(count: number) {
        const output: Models.Card[] = [];

        for (let i = 0; i < count; i++) {
            const popped = this.deck.pop();

            output.push(popped || null);
        }

        return output;
    }

    public add(cards: Models.Card[]) {
        const cardsToAdd = cards.filter(card => card !== null);

        for (const card of cardsToAdd) {
            this.deck.push(card);
        }

        this.deck = shuffle(this.deck);
    }

    public addPiece(piece: Models.Piece) {
        const definition = this.definitions.find(p => p.id === piece.definitionId);
        const preEvolvedDefinitions = this.getDefinitionsUsedToEvolveToDefinition(definition);

        preEvolvedDefinitions.forEach(preEvolvedDefinition => this.addDefinition(preEvolvedDefinition));
    }

    public shuffle() {
        this.deck = shuffle(this.deck);
    }

    private addDefinition(definition: CreatureDefinition) {
        const card: Models.Card = {
            id: uuid(),
            definitionId: definition.id,
            cost: definition.cost,
            name: definition.name
        };

        this.deck.push(card);
    }

    private getDefinitionsUsedToEvolveToDefinition(definition: CreatureDefinition): CreatureDefinition[] {
        const preEvolvedFormDefinition = this.definitions.find(p => p.evolvedFormId === definition.id);
        if (!!preEvolvedFormDefinition) {
            const preEvolvedDefinitions = Array(getRequiredQuantityToEvolve(preEvolvedFormDefinition.id)).fill(preEvolvedFormDefinition);
            return flatten(preEvolvedDefinitions.map(d => this.getDefinitionsUsedToEvolveToDefinition(d)));
        }

        return [definition];
    }
}
