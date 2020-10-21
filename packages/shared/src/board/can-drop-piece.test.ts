import { TestFixture, Test, Expect, TestCase } from "alsatian";
import { canDropPiece } from "./can-drop-piece";
import { pieceUtils } from "../utils";
import { DefinitionProvider } from "../game/definitions/definitionProvider";

const definitionProvider = new DefinitionProvider();

@TestFixture()
export class CanDropPieceTests {

    @Test()
    public cantDropOnOccupiedTile() {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ]);
        const tilePiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 1, 4 ]);

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
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ]);

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
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, null ]);

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
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, null ]);

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
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ]);

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
    @TestCase(0, 2)
    @TestCase(7, 2)
    public cantDropInOpponentArea(x: number, y: number) {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [ 0, 4 ]);

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
