import { TestFixture, Test, Expect, TestCase } from "alsatian";
import { canDropPiece } from "./can-drop-piece";
import { pieceUtils } from "@common/utils";
import { DefinitionProvider } from "../game/definitionProvider";

const definitionProvider = new DefinitionProvider();

@TestFixture()
export class CanDropPieceTests {

    @Test()
    public cantDropOnOccupiedTile() {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);
        const tilePiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 1, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            1,
            4,
            false,
            false,
            true
        );

        Expect(result).toBe(false);
    }

    @Test()
    public cantDropOnBoardIfBoardLocked() {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            1,
            4,
            true,
            true,
            true
        );

        Expect(result).toBe(false);
    }

    public canDropOnBenchIfBoardLocked() {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, null ], 0);

        const result = canDropPiece(
            movingPiece,
            1,
            null,
            true,
            true,
            true
        );

        Expect(result).toBe(true);
    }

    @Test()
    public cantDropOnBoardFromBenchIfNotBelowPieceLimit() {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, null ], 0);

        const result = canDropPiece(
            movingPiece,
            1,
            4,
            true,
            false,
            false
        );

        Expect(result).toBe(false);
    }

    @Test()
    public canDropOnBoardFromBoardIfNotBelowPieceLimit() {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            1,
            4,
            true,
            false,
            false
        );

        Expect(result).toBe(true);
    }

    @TestCase(0, 0)
    @TestCase(7, 0)
    @TestCase(0, 3)
    @TestCase(7, 3)
    public cantDropInOpponentArea(x: number, y: number) {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            x,
            y,
            true,
            false,
            true
        );

        Expect(result).toBe(false);
    }

}
