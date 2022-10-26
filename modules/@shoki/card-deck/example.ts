import { CardDeck } from "./index";

type Card = {
	value: number;
	suit: string;
};

const deck = new CardDeck<Card>();

// Add a single card
deck.addCards({ value: 1, suit: "hearts" });

// Add a card without shuffling
deck.addCards({ value: 2, suit: "hearts" }, false);

// Add multiple cards
deck.addCards([
	{ value: 3, suit: "hearts" },
	{ value: 4, suit: "hearts" },
]);

// Take a single card
const card = deck.take();

// Take multiple cards
const cards = deck.take(2);

// Shuffle the deck
deck.shuffle();
