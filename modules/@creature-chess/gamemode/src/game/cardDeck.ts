import { v4 as uuid } from "uuid";
import { Logger } from "winston";

import { CardDeck as ShokiCardDeck } from "@shoki/card-deck";

import { CreatureDefinition, Card, PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models/config";

import { getAllDefinitions, getDefinitionById } from "../definitions";

// CARD_COST_CHANCES[2][5] gives the chance (/100) to roll a level 3 piece at level 6
const CARD_COST_CHANCES = [
	[100, 70, 60, 50, 40, 33, 30, 24, 22, 19],
	[0, 30, 35, 35, 35, 30, 30, 30, 30, 25],
	[0, 0, 5, 15, 23, 30, 30, 30, 25, 25],
	[0, 0, 0, 2, 5, 9, 12, 16, 20, 25],
	[0, 0, 0, 0, 1, 3, 5, 7, 10, 14],
];

const CARD_LEVEL_QUANTITIES = [45, 30, 25, 15, 10];

const canTakeCardAtCost = (
	level: number,
	cost: number,
	multiplier: number
): boolean => {
	const chance = CARD_COST_CHANCES[cost - 1][level - 1];

	if (!chance) {
		return false;
	}

	const roll = Math.floor(Math.random() * 100) * (multiplier / 100);

	// roll is 0 - 100, but chance is out of 100
	// so if chance is 30, roll must be under 30 to score
	return roll <= chance;
};

export class CardDeck {
	public decks: ShokiCardDeck<Card>[];

	public constructor(private logger: Logger) {
		// TODO (James) customisable number of decks
		this.decks = [
			new ShokiCardDeck<Card>(),
			new ShokiCardDeck<Card>(),
			new ShokiCardDeck<Card>(),
			new ShokiCardDeck<Card>(),
			new ShokiCardDeck<Card>(),
		];

		getAllDefinitions()
			.filter((d) => d.cost)
			.forEach((d) => {
				for (
					let count = 0;
					count < CARD_LEVEL_QUANTITIES[d.cost - 1];
					count++
				) {
					this.addDefinition(d);
				}
			});

		this.shuffleAllDecks();
	}

	public reroll(
		input: Card[],
		count: number,
		level: number,
		multiplier: number,
		excludeCards: number[] = []
	) {
		this.addCards(input);
		this.shuffleAllDecks();

		return this.take(count, level, multiplier, excludeCards);
	}

	public addCards(cards: Card[]) {
		const cardsToAdd = cards.filter((card) => card !== null);

		for (const card of cardsToAdd) {
			this.getDeckForCost(card.cost).addCards(card, false);
		}

		this.shuffleAllDecks();
	}

	public addPiece(piece: PieceModel) {
		const definition = getDefinitionById(piece.definitionId);

		if (!definition) {
			return;
		}

		const cardCount = (piece.stage + 1) * PIECES_TO_EVOLVE;

		for (let i = 0; i < cardCount; i++) {
			this.addDefinition(definition);
		}

		this.shuffleAllDecks();
	}

	public addPieces(pieces: PieceModel[]) {
		for (const piece of pieces) {
			this.addPiece(piece);
		}
	}

	public shuffleAllDecks() {
		for (const deck of this.decks) {
			deck.shuffle();
		}
	}

	private getDeckForCost(cost: number) {
		return this.decks[cost - 1];
	}

	private take(
		count: number,
		level: number,
		multiplier: number,
		excludeCards: number[] = []
	) {
		const output: Card[] = [];

		for (let i = 0; i < count; i++) {
			const takenCard = this.takeCard(level, excludeCards, multiplier);

			if (!takenCard) {
				continue;
			}

			output.push(takenCard);
		}

		return output;
	}

	private takeCard(
		level: number,
		excludeDefinitions: number[],
		multiplier: number
	) {
		// start at 5 and work downwards
		for (let cost = CARD_COST_CHANCES.length; cost >= 1; cost--) {
			const roll = canTakeCardAtCost(level, cost, multiplier);

			if (!roll) {
				continue;
			}

			// try 3 times to get a non-excluded card
			// todo rethink this as below
			for (let i = 0; i < 3; i++) {
				const card = this.getDeckForCost(cost).take();

				if (card) {
					if (!excludeDefinitions.includes(card.definitionId)) {
						return card;
					}

					this.addCards([card]);
				}
			}
		}

		// otherwise go back up and give them the first existing card
		for (let cost = 1; cost <= CARD_COST_CHANCES.length; cost++) {
			// try 3 times to get a non-excluded card
			// todo rethink this as above
			for (let i = 0; i < 3; i++) {
				const card = this.getDeckForCost(cost).take();

				if (card) {
					if (!excludeDefinitions.includes(card.definitionId)) {
						return card;
					}

					this.addCards([card]);
				}
			}
		}

		this.logger.error("No card found at all");

		return null;
	}

	private addDefinition(definition: CreatureDefinition) {
		const card: Card = {
			id: uuid(),
			definitionId: definition.id,
			cost: definition.cost,
			name: definition.name,
			type: definition.type,
			class: definition.class,
		};

		this.getDeckForCost(definition.cost).addCards(card, false);
	}
}
