import * as React from "react";
import { TestFixture, Test, TestCase, SpyOn, Expect } from "alsatian";
import { shallow } from "enzyme";
import { SelectedPieceInfo } from "./selectedPieceInfo";
import { PokemonPiece } from "@common/pokemon-piece";
import * as PokemonDetails from "@common/pokemon-details";
import { CombinePiecesButton } from "./combinePiecesButton";

@TestFixture("SelectedPieceInfo component")
export class SelectedPieceInfoTests {
    @Test("should display combine button if has enough instances of Pokemon")
    @TestCase(3, 3, true)
    @TestCase(4, 3, true)
    @TestCase(3, 4, false)
    @TestCase(0, 3, false)
    @TestCase(53, null, false)
    @TestCase(53, undefined, false)
    public CombineDisplayedWhenAppropriate(numberOwned: number, numberRequired: number, shouldRenderCombineButton: boolean) {
        SpyOn(PokemonDetails, "getRequiredQuantityToEvolve").andReturn(numberRequired);

        const sut = shallow(<SelectedPieceInfo.WrappedComponent numberOwned={numberOwned} piece={testPiece} />);

        Expect(sut.find(CombinePiecesButton).length).toBe(shouldRenderCombineButton ? 1 : 0);
    }
}

const testPiece: PokemonPiece = {
    coolDown: 1000,
    currentHealth: 100,
    facingAway: true,
    friendly: true,
    id: 12,
    maxHealth: 100,
    pokemonId: 32,
    position: [3, 6]
};
