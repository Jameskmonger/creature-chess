import { Logger } from "winston";
import { v4 as uuid } from "uuid";
import shuffle = require("lodash.shuffle");
import { CreatureDefinition, Card, PieceModel, PIECES_TO_EVOLVE } from "@creature-chess/models";
import { getAllDefinitions, getDefinitionById } from "../definitions";

// CARD_COST_CHANCES[2][5] gives the chance (/100) to roll a level 3 piece at level 6
const CARD_COST_CHANCES = [
    [100, 70, 60, 50, 40, 33, 30, 24, 22, 19],
    [0, 30, 35, 35, 35, 30, 30, 30, 30, 25],
    [0, 0, 5, 15, 23, 30, 30, 30, 25, 25],
    [0, 0, 0, 2, 5, 9, 12, 16, 20, 25],
    [0, 0, 0, 0, 1, 3, 5, 7, 10, 14]
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

const BLESSED_HAND_CHANCE = [0, 0.1, 0.2, 0.15, 0.15, 0.23, 0.23, 0.1, 0.1, 0.1]
const isHandBlessed = (level: number) => (Math.floor(Math.random() * 100) * 0.01) <= BLESSED_HAND_CHANCE[level - 1];

export class CardDeck {
    public deck: Card[][];

    constructor(private logger: Logger) {
        this.deck = [
            [], [], [], [], []
        ];

        getAllDefinitions().filter(d => d.cost).forEach(d => {
            for (let count = 0; count < CARD_LEVEL_QUANTITIES[d.cost - 1]; count++) {
                this.addDefinition(d);
            }
        });

        this.shuffle();
    }

    public reroll(input: Card[], count: number, level: number, blessCandidates: number[], excludeCards: number[] = []) {
        this.addCards(input);
        this.shuffle();

        return this.take(count, level, blessCandidates, excludeCards);
    }

    public addCards(cards: Card[]) {
        const cardsToAdd = cards.filter(card => card !== null);

        for (const card of cardsToAdd) {
            this.getDeckForCost(card.cost).push(card);
        }

        this.shuffle();
    }

    public addPiece(piece: PieceModel) {
        const definition = getDefinitionById(piece.definitionId);

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

    private take(count: number, level: number, blessCandidates: number[], excludeCards: number[] = []) {
        const output: Card[] = [];

        let blessedHand = isHandBlessed(level);

        if (blessedHand) {
            this.logger.info(`Hand is blessed!`);
        }

        for (let i = 0; i < count; i++) {
            const { card, blessed } = this.takeCard(level, blessedHand, blessCandidates, excludeCards);

            output.push(card);

            // clear blessed if it was used
            if (blessed) {
                blessedHand = false;
            }
        }

        return output;
    }

    private takeCard(level: number, isBlessed: boolean, blessCandidates: number[], excludeDefinitions: number[]) {
        if (isBlessed && blessCandidates.length > 0) {
            for (const candidate of shuffle(blessCandidates)) {
                const definition = getDefinitionById(candidate);
                const deck = this.getDeckForCost(definition.cost);

                const index = deck.findIndex(c => c.definitionId === candidate);

                if (!index) {
                    continue;
                }

                const [card] = deck.splice(index, 1);

                if (card.definitionId !== candidate) {
                    deck.push(card);

                    this.logger.warn(`- Definition ${card.definitionId} mismatch, pulled for bless candidate ${candidate}`);

                    continue;
                }

                this.logger.info(`- Bless pulled ${definition.name}, worth $${definition.cost}!`);

                return { card, blessed: true };
            }

            this.logger.warn(`- No card pulled for bless`);
        }

        // start at 5 and work downwards
        for (let cost = CARD_COST_CHANCES.length; cost >= 1; cost--) {
            const roll = canTakeCardAtCost(level, cost);

            if (!roll) {
                continue;
            }

            // try 3 times to get a non-excluded card
            // todo rethink this as below
            for (let i = 0; i < 3; i++) {
                const card = this.getDeckForCost(cost).pop();

                if (card) {
                    if (!excludeDefinitions.includes(card.definitionId)) {
                        return { card, blessed: false };
                    }

                    this.addCards([card]);
                }
            }
        }

        this.logger.warn(`Falling back for second pass to find card`);

        // otherwise go back up and give them the first existing card
        for (let cost = 1; cost <= CARD_COST_CHANCES.length; cost++) {
            // try 3 times to get a non-excluded card
            // todo rethink this as above
            for (let i = 0; i < 3; i++) {
                const card = this.getDeckForCost(cost).pop();

                if (card) {
                    if (!excludeDefinitions.includes(card.definitionId)) {
                        return { card, blessed: false };
                    }

                    this.addCards([card]);
                }
            }
        }

        this.logger.error(`No card found at all`);

        return null;
    }

    private addDefinition(definition: CreatureDefinition) {
        const card: Card = {
            id: uuid(),
            definitionId: definition.id,
            cost: definition.cost,
            name: definition.name,
            type: definition.type,
            class: definition.class
        };

        this.getDeckForCost(definition.cost).push(card);
    }
}
