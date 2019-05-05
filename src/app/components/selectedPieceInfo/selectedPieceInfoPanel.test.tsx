import * as React from "react";
import { TestFixture, Test, TestCase, SpyOn, Expect } from "alsatian";
import { shallow } from "enzyme";
import { SelectedPieceInfoPanel } from "./selectedPieceInfoPanel";
import { PokemonPiece } from "@common/pokemon-piece";
import * as Common from "@common";
import { CombinePiecesButton } from "./combinePiecesButton";

@TestFixture("SelectedPieceInfoPanel component")
export class SelectedPieceInfoPanelTests {
    @Test("should display combine button if has enough instances of Pokemon")
    @TestCase(3, 3, true)
    @TestCase(4, 3, true)
    @TestCase(3, 4, false)
    @TestCase(0, 3, false)
    @TestCase(53, null, false)
    @TestCase(53, undefined, false)
    public CombineDisplayedWhenAppropriate(numberOwned: number, numberRequired: number, shouldRenderCombineButton: boolean) {
        SpyOn(Common, "getRequiredQuantityToEvolve").andReturn(numberRequired);

        const sut = shallow(<SelectedPieceInfoPanel.WrappedComponent numberOwned={numberOwned} piece={testPiece} />);

        Expect(sut.find(CombinePiecesButton).length).toBe(shouldRenderCombineButton ? 1 : 0);
    }
}

const testPiece: PokemonPiece = {
    coolDown: 1000,
    currentHealth: 100,
    facingAway: true,
    id: "935176f3-c4d0-42ed-93bd-0e2091fa4884",
    ownerId: "267a057b-3a1b-4c9f-81ae-1045cba77086",
    maxHealth: 100,
    pokemonId: 32,
    position: { x: 3, y: 6 }
};
