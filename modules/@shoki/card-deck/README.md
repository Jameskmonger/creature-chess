# card-deck

A TypeScript card deck implementation, with shuffling using the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

## Installation

```
npm i @shoki/card-deck
```

or

```
yarn add @shoki/card-deck
```

## Usage

### Creating a deck

When creating a deck, you must provide a generic parameter `TCard`. This indicates the type of card within the deck.

```ts
import { CardDeck } from "@shoki/card-deck";

type Card = {
	value: number;
	suit: string;
};

const deck = new CardDeck<Card>();
```

### Adding cards

You can add a card, or cards, to the deck with the `addCards` function.

There is an optional boolean parameter `shouldShuffle` (which defaults to `true`) to indicate whether the deck should be shuffled (with the `shuffle` function described below) immediately after the addition.

```ts
// Add a single card
deck.addCards({ value: 1, suit: "hearts" });

// Add a card without shuffling
deck.addCards({ value: 2, suit: "hearts" }, false);

// Add multiple cards
deck.addCards([
	{ value: 3, suit: "hearts" },
	{ value: 4, suit: "hearts" },
]);

// Add multiple cards without shuffling
deck.addCards(
	[
		{ value: 3, suit: "hearts" },
		{ value: 4, suit: "hearts" },
	],
	false
);
```

### Taking cards

You can take a card, or multiple cards, from the deck with the `take` function.

```ts
// Take a single card
const card = deck.take();

// Take multiple cards
const cards = deck.take(2);
```

### Shuffling the deck

This uses the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) through [`lodash.shuffle`](https://www.npmjs.com/package/lodash.shuffle).

```ts
// Shuffle the deck
deck.shuffle();
```
