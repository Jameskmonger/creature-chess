import { TestFixture, Test, Expect, TestCase } from "alsatian";
import { canDropPiece } from "./can-drop-piece";
import { createPiece } from "../piece-utils";
import { createTileCoordinates } from "../position";
import { GamePhase } from "../game-phase";
import { DefinitionProvider } from "../game/definitionProvider";

const definitionProvider = new DefinitionProvider();

@TestFixture()
export class CanDropPieceTests {

    @Test()
    public cantDropOnOccupiedTile() {
        const movingPiece = createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);
        const tilePiece = createPiece(definitionProvider, null, 1, [ 1, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            createTileCoordinates(1, 4),
            [ tilePiece ],
            GamePhase.PREPARING,
            true
        );

        Expect(result).toBe(false);
    }

    @TestCase(GamePhase.WAITING)
    @TestCase(GamePhase.READY)
    @TestCase(GamePhase.PLAYING)
    @TestCase(GamePhase.DEAD)
    public cantDropOnBoardUnlessPreparingPhase(phase: GamePhase) {
        const movingPiece = createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            createTileCoordinates(1, 4),
            [ ],
            phase,
            true
        );

        Expect(result).toBe(false);
    }

    @TestCase(GamePhase.READY)
    @TestCase(GamePhase.PLAYING)
    public canDropOnBenchOutsidePreparingPhase(phase: GamePhase) {
        const movingPiece = createPiece(definitionProvider, null, 1, [ 0, null ], 0);

        const result = canDropPiece(
            movingPiece,
            createTileCoordinates(1, null),
            [ ],
            phase,
            true
        );

        Expect(result).toBe(true);
    }

    @Test()
    public cantDropOnBoardFromBenchIfNotBelowPieceLimit() {
        const movingPiece = createPiece(definitionProvider, null, 1, [ 0, null ], 0);

        const result = canDropPiece(
            movingPiece,
            createTileCoordinates(1, 4),
            [ ],
            GamePhase.PREPARING,
            false
        );

        Expect(result).toBe(false);
    }

    @Test()
    public canDropOnBoardFromBoardIfNotBelowPieceLimit() {
        const movingPiece = createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            createTileCoordinates(1, 4),
            [ ],
            GamePhase.PREPARING,
            false
        );

        Expect(result).toBe(true);
    }

    @TestCase(0, 0)
    @TestCase(7, 0)
    @TestCase(0, 3)
    @TestCase(7, 3)
    public cantDropInOpponentArea(x: number, y: number) {
        const movingPiece = createPiece(definitionProvider, null, 1, [ 0, 4 ], 0);

        const result = canDropPiece(
            movingPiece,
            createTileCoordinates(x, y),
            [ ],
            GamePhase.PREPARING,
            true
        );

        Expect(result).toBe(false);
    }

}
