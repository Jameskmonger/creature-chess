import { Logger } from "@cc-engine/kernel";
import { v4 as uuid } from "uuid";

import { CardDeck as ShokiCardDeck } from "@shoki/card-deck";
import { Rng } from "@shoki/random";

import {
	CreatureDefinition,
	Card,
	PieceModel,
	PIECES_TO_EVOLVE,
	getPiecesForStage,
} from "@creature-chess/models";

import { CreatureRegistry } from "../factory";

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
	rng: Rng,
	level: number,
	cost: number,
	multiplier: number
): boolean => {
	const chance = CARD_COST_CHANCES[cost - 1][level - 1];

	if (!chance) {
		return false;
	}

	const roll = Math.floor(rng() * 100) * (multiplier / 100);

	// roll is 0 - 100, but chance is out of 100
	// so if chance is 30, roll must be under 30 to score
	return roll <= chance;
};

export class CardDeck {
	public decks: ShokiCardDeck<Card>[];
	private rng: Rng;

	public constructor(
		private logger: Logger,
		private creatures: CreatureRegistry,
		rng: Rng = Math.random
	) {
		this.rng = rng;
		// TODO (James) customisable number of decks
		this.decks = [
			new ShokiCardDeck<Card>([], rng),
			new ShokiCardDeck<Card>([], rng),
			new ShokiCardDeck<Card>([], rng),
			new ShokiCardDeck<Card>([], rng),
			new ShokiCardDeck<Card>([], rng),
		];

		for (const definition of this.creatures.values()) {
			if (!definition.cost) {
				continue;
			}
			for (
				let count = 0;
				count < CARD_LEVEL_QUANTITIES[definition.cost - 1];
				count++
			) {
				this.addDefinition(definition);
			}
		}

		this.shuffleAllDecks();
	}

	public reroll(
		input: Card[],
		count: number,
		level: number,
		multiplier: number,
		excludeCards: number[] = []
	) {
		// addCards shuffles affected decks, so no need to explicitly shuffle
		this.addCards(input);

		return this.take(count, level, multiplier, excludeCards);
	}

	public addCards(cards: Card[]) {
		const affected = new Set<number>();

		for (const card of cards) {
			if (card === null) {
				continue;
			}

			this.getDeckForCost(card.cost).addCards(card, false);
			affected.add(card.cost - 1);
		}

		for (const idx of affected) {
			this.decks[idx].shuffle();
		}
	}

	public addPieces(pieces: PieceModel[]) {
		const affected = new Set<number>();

		for (const piece of pieces) {
			const definition = this.creatures.get(piece.definitionId);

			if (!definition) {
				continue;
			}

			const cardCount = getPiecesForStage(piece.stage, PIECES_TO_EVOLVE);

			for (let i = 0; i < cardCount; i++) {
				this.addDefinition(definition);
			}

			affected.add(definition.cost - 1);
		}

		for (const idx of affected) {
			this.decks[idx].shuffle();
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

	private returnExcludedCard(card: Card) {
		this.getDeckForCost(card.cost).addCards(card, false);
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
			const roll = canTakeCardAtCost(this.rng, level, cost, multiplier);

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

					this.returnExcludedCard(card);
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

					this.returnExcludedCard(card);
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
			traits: definition.traits,
		};

		this.getDeckForCost(definition.cost).addCards(card, false);
	}
}
