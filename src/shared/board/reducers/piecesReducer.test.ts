import { TestFixture, Test, Expect } from "alsatian";
import { PiecesState, pieces } from "./piecesReducer";
import { removeBoardPiece, initialiseBoard, addBoardPiece, updateBoardPiece, updateBoardPieces, moveBoardPiece, removeBoardPieces } from "../actions/boardActions";
import { createMockPiece } from "@testing/utils";
import { createTileCoordinates } from "@common/models/position";

@TestFixture()
export class PiecesReducerTests {
  @Test()
  public initialiseBoardShouldSetPieces() {
    const state: PiecesState = {};

    const pieceA = createMockPiece("123");
    const pieceB = createMockPiece("456");

    const action = initialiseBoard({
      ["123"]: pieceA,
      ["456"]: pieceB
    });

    const result = pieces(state, action);

    Expect(result).toEqual({
      ["123"]: pieceA,
      ["456"]: pieceB
    });
  }

  @Test()
  public removePieceShouldRemovePiece() {
    const removingPiece = createMockPiece("123");
    const keepingPiece = createMockPiece("456");
    const state: PiecesState = {
      [removingPiece.id]: removingPiece,
      [keepingPiece.id]: keepingPiece
    };

    const result = pieces(state, removeBoardPiece("123"));

    Expect(result).toEqual({
      [keepingPiece.id]: keepingPiece
    });
  }

  @Test()
  public removePiecesShouldRemovePieces() {
    const removingPieceA = createMockPiece("123");
    const removingPieceB = createMockPiece("124");
    const keepingPiece = createMockPiece("456");
    const state: PiecesState = {
      [removingPieceA.id]: removingPieceA,
      [removingPieceB.id]: removingPieceB,
      [keepingPiece.id]: keepingPiece
    };

    const result = pieces(state, removeBoardPieces([ "123", "124" ]));

    Expect(result).toEqual({
      [keepingPiece.id]: keepingPiece
    });
  }

  @Test()
  public addBoardPieceShouldAddPiece() {
    const firstPiece = createMockPiece("123");
    const state: PiecesState = {
      [firstPiece.id]: firstPiece
    };

    const addingPiece = {
      ...createMockPiece("456"),
      position: createTileCoordinates(3, null)
    };
    const action = addBoardPiece(addingPiece, 1, 2);

    const expectedPiece = {
      ...addingPiece,
      position: createTileCoordinates(1, 2)
    };

    const result = pieces(state, action);

    Expect(result).toEqual({
      [firstPiece.id]: firstPiece,
      [addingPiece.id]: expectedPiece
    });
  }

  @Test()
  public addBoardPieceShouldSetFacingAwayTrue() {
    const piece = {
      ...createMockPiece("123"),
      position: createTileCoordinates(0, null),
      facingAway: false
    };

    const state: PiecesState = {
      [piece.id]: piece
    };

    const action = addBoardPiece(piece, 1, 2);

    const expectedPiece = {
      ...piece,
      position: createTileCoordinates(1, 2),
      facingAway: true
    };

    const result = pieces(state, action);

    Expect(result[piece.id]).toEqual(expectedPiece);
  }

  @Test()
  public updatePieceShouldReplacePiece() {
    const firstPiece = {
      ...createMockPiece("123"),
      currentHealth: 100
    };
    const state: PiecesState = {
      [firstPiece.id]: firstPiece
    };

    const action = updateBoardPiece({
      ...firstPiece,
      currentHealth: 50
    });

    const result = pieces(state, action);

    Expect(result[firstPiece.id].currentHealth).toEqual(50);
  }

  @Test()
  public updatePiecesShouldReplacePieces() {
    const firstPiece = {
      ...createMockPiece("123"),
      currentHealth: 100
    };
    const secondPiece = {
      ...createMockPiece("456"),
      currentHealth: 100
    };
    const state: PiecesState = {
      [firstPiece.id]: firstPiece,
      [secondPiece.id]: secondPiece
    };

    const action = updateBoardPieces([
      {
        ...firstPiece,
        currentHealth: 50
      },
      {
        ...secondPiece,
        currentHealth: 40
      }
    ]);

    const result = pieces(state, action);

    Expect(result[firstPiece.id].currentHealth).toEqual(50);
    Expect(result[secondPiece.id].currentHealth).toEqual(40);
  }

  @Test()
  public moveBoardPieceShouldUpdatePiecePosition() {
    const piece = {
      ...createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const state: PiecesState = {
      [piece.id]: piece
    };

    const action = moveBoardPiece(piece.id, { x: 0, y: 0 }, { x: 7, y: 3 });

    const result = pieces(state, action);

    Expect(result[piece.id].position).toEqual({ x: 7, y: 3 });
  }
}
