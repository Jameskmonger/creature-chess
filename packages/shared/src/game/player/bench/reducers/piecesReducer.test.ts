import { TestFixture, Test, Expect } from "alsatian";
import { createTileCoordinates } from "@creature-chess/models";
import { PiecesState, pieces } from "./piecesReducer";
import { removeBenchPiece, initialiseBench, addBenchPiece, moveBenchPiece, removeBenchPieces } from "../actions";
import { pieceUtils } from "../../../../utils";

@TestFixture()
export class PiecesReducerTests {
  @Test()
  public initialiseBenchShouldSetPieces() {
    const pieceA = pieceUtils.createMockPiece("123");
    const pieceB = pieceUtils.createMockPiece("456");

    const piecesState = [
      null, null, null, null,
      pieceA, null, null, pieceB
    ];

    const action = initialiseBench({
      pieces: piecesState,
      locked: false
    });

    const result = pieces([], action);

    Expect(result).toEqual(piecesState);
  }

  @Test()
  public removePieceShouldRemovePiece() {
    const removingPiece = pieceUtils.createMockPiece("123");
    const keepingPiece = pieceUtils.createMockPiece("456");
    const state: PiecesState = [
      null, null, removingPiece, null,
      keepingPiece, null, null, null
    ];

    const result = pieces(state, removeBenchPiece("123"));

    Expect(result).toEqual([
      null, null, null, null,
      keepingPiece, null, null, null
    ]);
  }

  @Test()
  public removePiecesShouldRemovePieces() {
    const removingPieceA = pieceUtils.createMockPiece("123");
    const removingPieceB = pieceUtils.createMockPiece("124");
    const keepingPiece = pieceUtils.createMockPiece("456");
    const state: PiecesState = [
      null, removingPieceB, removingPieceA, null,
      keepingPiece, null, null, null
    ];

    const result = pieces(state, removeBenchPieces([ "123", "124" ]));

    Expect(result).toEqual([
      null, null, null, null,
      keepingPiece, null, null, null
    ]);
  }

  @Test()
  public addPieceShouldAddPieceInFirstSlot() {
    const firstPiece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(3, null),
      facingAway: true
    };
    const state: PiecesState = [
      firstPiece, null, null, null,
      null, null, null, null
    ];

    const addingPiece = {
      ...pieceUtils.createMockPiece("456"),
      position: createTileCoordinates(3, 4)
    };
    const action = addBenchPiece(addingPiece, null);

    const expectedPiece = {
      ...addingPiece,
      position: createTileCoordinates(1, null),
      facingAway: false
    };

    const result = pieces(state, action);

    Expect(result).toEqual([
      firstPiece, expectedPiece, null, null,
      null, null, null, null
    ]);
  }

  @Test()
  public addPieceShouldAddPieceInSlotIfProvided() {
    const firstPiece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(3, null),
      facingAway: true
    };
    const state: PiecesState = [
      firstPiece, null, null, null,
      null, null, null, null
    ];

    const addingPiece = {
      ...pieceUtils.createMockPiece("456"),
      position: createTileCoordinates(3, 4)
    };
    const action = addBenchPiece(addingPiece, 5);

    const expectedPiece = {
      ...addingPiece,
      position: createTileCoordinates(5, null),
      facingAway: false
    };

    const result = pieces(state, action);

    Expect(result).toEqual([
      firstPiece, null, null, null,
      null, expectedPiece, null, null
    ]);
  }

  @Test()
  public moveBenchPieceShouldMovePiece() {
    const piece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(3, null)
    };
    const state: PiecesState = [
      null, null, null, piece,
      null, null, null, null
    ];

    const action = moveBenchPiece("123", { slot: 3 }, { slot: 7 });

    const result = pieces(state, action);

    const expectedPiece = {
      ...piece,
      position: createTileCoordinates(7, null)
    };

    Expect(result).toEqual([
      null, null, null, null,
      null, null, null, expectedPiece
    ]);
  }
}
