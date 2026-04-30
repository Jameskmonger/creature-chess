import { Rng, shuffleInPlace } from "@shoki/random";

/**
 * A deck of cards using an optional RNG provider (defaults to Math.random if not provided)
 *
 * @template TCard The type of card
 *
 * @author jameskmonger
 */
export class CardDeck<TCard> {
	private deck: TCard[];
	private rng: Rng;

	public constructor(deck?: TCard[], rng: Rng = Math.random) {
		this.deck = deck || [];
		this.rng = rng;
	}

	/**
	 * Take a number of cards from the top of the deck
	 *
	 * @param count The number of cards to take (default 1)
	 * @returns The cards taken
	 */
	public take(count?: 1): TCard;
	public take(count: number): TCard[];
	public take(count: number = 1): TCard | TCard[] {
		const results = this.deck.splice(this.deck.length - count, count);

		if (count === 1) {
			return results[0];
		}

		return results;
	}

	/**
	 * Add a number of cards to the top of the deck
	 *
	 * Shuffles the deck after adding by default (see `shouldShuffle` parameter)
	 *
	 * @param cards The cards to add
	 * @param shouldShuffle Whether to shuffle the deck after adding
	 */
	public addCards(cards: TCard | TCard[], shouldShuffle: boolean = true) {
		// TODO null check?
		if (Array.isArray(cards)) {
			this.deck.push(...cards);
		} else {
			this.deck.push(cards);
		}

		if (shouldShuffle) {
			this.shuffle();
		}
	}

	/**
	 * Shuffle the deck.
	 */
	public shuffle() {
		shuffleInPlace(this.deck, this.rng);
	}
}
