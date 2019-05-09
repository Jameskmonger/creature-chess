import { TestFixture, Test, Expect, TestCase } from "alsatian";
import { canDropPiece } from "./can-drop-piece";
import { createPokemon } from "../pokemon-piece";
import { createTileCoordinates } from "../position";
import { GamePhase } from "../game-phase";

@TestFixture()
export class CanDropPieceTests {

    @Test()
    public cantDropOnOccupiedTile() {
        const movingPiece = createPokemon(null, 1, [ 0, 4 ]);
        const tilePiece = createPokemon(null, 1, [ 1, 4 ]);

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
        const movingPiece = createPokemon(null, 1, [ 0, 4 ]);

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
        const movingPiece = createPokemon(null, 1, [ 0, null ]);

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
        const movingPiece = createPokemon(null, 1, [ 0, null ]);

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
        const movingPiece = createPokemon(null, 1, [ 0, 4 ]);

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
        const movingPiece = createPokemon(null, 1, [ 0, 4 ]);

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
