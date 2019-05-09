import { Expect, Test, TestFixture } from "alsatian";
import { CardDeck } from "./cardDeck";
import { uniq } from "lodash";
import { PokemonDefinition, getAllDefinitions } from "@common/pokemon-stats";
import { PokemonType } from "@common/pokemon-type";

const makeDefinition = (cost: number): PokemonDefinition => {
    return {
        cost,

        id: 0,
        name: "",
        stats: {
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            specialAttack: 0,
            specialDefense: 0,
            type: PokemonType.Normal
        }
    };
};

@TestFixture("Card deck tests")
export class CardDeckTests {

    @Test("deck should have correct number of cards")
    public DeckCreatedCorrectly() {
        const cardDeck = new CardDeck([
            makeDefinition(1),
            makeDefinition(2),
            makeDefinition(3),
            makeDefinition(4),
            makeDefinition(5)
        ]);

        Expect(cardDeck.deck.length).toBe(45 + 30 + 25 + 15 + 10);
    }

    @Test("deck should have correct distinct types of pokemon")
    public CorrectPokemonInDeck() {
        const cardDeck = new CardDeck(getAllDefinitions());
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
