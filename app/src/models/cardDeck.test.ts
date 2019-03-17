import { Expect, Test, TestFixture } from "alsatian";
import { CardDeck } from "./cardDeck";
import { uniq } from "lodash";

@TestFixture("Card deck tests")
export class SubjectTests {

    @Test("deck should have correct number of cards")
    public DeckCreatedCorrectly() {
        const cardDeck = new CardDeck();

        Expect(cardDeck.deck.length).toBe(90);
    }

    @Test("deck should have correct distinct types of pokemon")
    public CorrectPokemonInDeck() {
        const cardDeck = new CardDeck();
        const uniquePokemon = uniq(cardDeck.deck
            .map(d => d.name));

        Expect(uniquePokemon).toEqual(["Bulbasaur", "Charmander"]);
    }
}
