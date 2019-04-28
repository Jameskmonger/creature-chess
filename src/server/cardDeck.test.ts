import { Expect, Test, TestFixture } from "alsatian";
import { CardDeck } from "./cardDeck";
import { uniq } from "lodash";

const COST_1_POKEMON = 5;
const COST_2_POKEMON = 11;
const COST_3_POKEMON = 7;
const COST_4_POKEMON = 8;
const COST_5_POKEMON = 1;

@TestFixture("Card deck tests")
export class CardDeckTests {

    @Test("deck should have correct number of cards")
    public DeckCreatedCorrectly() {
        const cardDeck = new CardDeck();

        const totalPokemonCost = COST_1_POKEMON + COST_2_POKEMON + COST_3_POKEMON + COST_4_POKEMON + COST_5_POKEMON;

        Expect(cardDeck.deck.length).toBe(totalPokemonCost);
    }

    @Test("deck should have correct distinct types of pokemon")
    public CorrectPokemonInDeck() {
        const cardDeck = new CardDeck();
        const uniquePokemon = uniq(cardDeck.deck
            .map(d => d.name)
            .sort());

        Expect(uniquePokemon).toEqual([
            "Abra",
            "Aerodactyl",
            "Bellsprout",
            "Bulbasaur",
            "Caterpie",
            "Charmander",
            "Diglett",
            "Dratini",
            "Drowzee",
            "Electabuzz",
            "Geodude",
            "Grimer",
            "Hitmonchan",
            "Hitmonlee",
            "Jigglypuff",
            "Koffing",
            "Machop",
            "Magikarp",
            "Magnemite",
            "Oddish",
            "Pidgey",
            "Pikachu",
            "Poliwag",
            "Ponyta",
            "Sandshrew",
            "Scyther",
            "Spearow",
            "Squirtle",
            "Voltorb",
            "Vulpix",
            "Weedle",
            "Zubat"
        ]);
    }
}
