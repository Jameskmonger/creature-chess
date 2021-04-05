import { v4 as uuid } from "uuid";
import shuffle = require("lodash.shuffle");
import { CreatureDefinition, Card, PieceModel, PIECES_TO_EVOLVE } from "@creature-chess/models";

// CARD_COST_CHANCES[2][5] gives the chance (/100) to roll a level 3 piece at level 6
const CARD_COST_CHANCES = [
    [100,  70,  60,  50,  40,  33,  30,  24,  22,  19],
    [0,    30,  35,  35,  35,  30,  30,  30,  30,  25],
    [0,    0,   5,   15,  23,  30,  30,  30,  25,  25],
    [0,    0,   0,   2,   5,   9,   12,  16,  20,  25],
    [0,    0,   0,   0,   1,   3,   5,   7,   10,  14]
];

const CARD_LEVEL_QUANTITIES = [45, 30, 25, 15, 10];

const canTakeCardAtCost = (level: number, cost: number): boolean => {
    const chance = CARD_COST_CHANCES[cost - 1][level - 1];

    if (!chance) {
        return false;
    }

    const roll = Math.floor(Math.random() * 100);

    // roll is 0 - 100, but chance is out of 100
    // so if chance is 30, roll must be under 30 to score
    return roll <= chance;
};

export class CardDeck {
    public deck: Card[][];
    private definitions: CreatureDefinition[];

    constructor(definitions: CreatureDefinition[]) {
        this.definitions = definitions;

        this.deck = [
            [], [], [], [], []
        ];

        this.definitions.filter(d => d.cost).forEach(d => {
            for (let count = 0; count < CARD_LEVEL_QUANTITIES[d.cost - 1]; count++) {
                this.addDefinition(d);
            }
        });

        this.shuffle();
    }

    public reroll(input: Card[], level: number, count: number, excludeCards: number[] = []) {
        this.addCards(input);
        this.shuffle();

        return this.take(level, count, excludeCards);
    }

    public take(level: number, count: number, excludeCards: number[] = []) {
        const output: Card[] = [];

        for (let i = 0; i < count; i++) {
            output.push(this.takeCard(level, excludeCards));
        }

        return output;
    }

    public addCards(cards: Card[]) {
        const cardsToAdd = cards.filter(card => card !== null);

        for (const card of cardsToAdd) {
            this.getDeckForCost(card.cost).push(card);
        }

        this.shuffle();
    }

    public addPiece(piece: PieceModel) {
        const definition = this.definitions.find(p => p.id === piece.definitionId);

        const cardCount = (piece.stage + 1) * PIECES_TO_EVOLVE;

        for (let i = 0; i < cardCount; i++) {
            this.addDefinition(definition);
        }

        this.shuffle();
    }

    public addPieces(pieces: PieceModel[]) {
        for (const piece of pieces) {
            this.addPiece(piece);
        }
    }

    public shuffle() {
        for (let i = 0; i < this.deck.length; i++) {
            this.deck[i] = shuffle(this.deck[i]);
        }
    }

    private getDeckForCost(cost: number): Card[] {
        return this.deck[cost - 1];
    }

    private takeCard(level: number, excludeDefinitions: number[]) {
        // start at 5 and work downwards
        for (let cost = CARD_COST_CHANCES.length; cost >= 1; cost--) {
            const roll = canTakeCardAtCost(level, cost);

            if (!roll) {
                continue;
            }

            // try 3 times to get a non-excluded card
            // todo rethink this
            for (let i = 0; i < 3; i++) {
                const card = this.getDeckForCost(cost).pop();

                if (card) {
                    if (!excludeDefinitions.includes(card.definitionId)) {
                        return card;
                    }

                    this.addCards([ card ]);
                }
            }
        }

        // otherwise go back up and give them the first existing card
        for (let cost = 1; cost <= CARD_COST_CHANCES.length; cost++) {
            const card = this.getDeckForCost(cost).pop();

            if (card) {
                return card;
            }
        }

        return null;
    }

    private addDefinition(definition: CreatureDefinition) {
        const card: Card = {
            id: uuid(),
            definitionId: definition.id,
            cost: definition.cost,
            name: definition.name
        };

        this.getDeckForCost(definition.cost).push(card);
    }
}
