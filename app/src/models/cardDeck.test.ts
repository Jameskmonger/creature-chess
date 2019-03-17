import { Expect, Test, TestFixture } from "alsatian";
import { CardDeck } from "./cardDeck";

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
};

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
        const distinctPokemon = cardDeck.deck
            .map(d => d.name)
            .filter(distinct);

        Expect(distinctPokemon).toEqual(["Bulbasaur", "Charmander"]);
    }
}
