import { Expect, Test, TestFixture } from "alsatian";
import { CardDeck } from "./cardDeck";
import { pokemonStats } from "../shared/pokemon-stats";
import { uniq } from "lodash";

@TestFixture("Card deck tests")
export class CardDeckTests {

    @Test("deck should have correct number of cards")
    public DeckCreatedCorrectly() {
        const cardDeck = new CardDeck();

        const cost1Cards = pokemonStats.filter(p => p.cost === 1).length * 45;
        const cost2Cards = pokemonStats.filter(p => p.cost === 2).length * 30;
        const cost3Cards = pokemonStats.filter(p => p.cost === 3).length * 25;
        const cost4Cards = pokemonStats.filter(p => p.cost === 4).length * 15;
        const cost5Cards = pokemonStats.filter(p => p.cost === 5).length * 10;

        Expect(cardDeck.deck.length).toBe(cost1Cards + cost2Cards + cost3Cards + cost4Cards + cost5Cards);
    }

    @Test("deck should have correct distinct types of pokemon")
    public CorrectPokemonInDeck() {
        const cardDeck = new CardDeck();
        const uniquePokemon = uniq(cardDeck.deck
            .map(d => d.name));

        Expect(uniquePokemon).toEqual(["Weedle", "Bulbasaur", "Bellsprout", "Squirtle", "Charmander", "Poliwag"]);
    }
}
