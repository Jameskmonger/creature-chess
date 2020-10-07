import { TestFixture, Test, Expect } from "alsatian";
import { PiecesState, pieces } from "./piecesReducer";
import { removeBoardPiece, initialiseBoard, addBoardPiece, updateBoardPiece, updateBoardPieces, moveBoardPiece, removeBoardPieces } from "../commands";
import { pieceUtils } from "../../utils";
import { createTileCoordinates } from "@creature-chess/models";

@TestFixture()
export class PiecesReducerTests {
  @Test()
  public initialiseBoardShouldSetPieces() {
    const state: PiecesState = {};

    const pieceA = pieceUtils.createMockPiece("123");
    const pieceB = pieceUtils.createMockPiece("456");

    const command = initialiseBoard({
      ["123"]: pieceA,
      ["456"]: pieceB
    });

    const result = pieces(state, command);

    Expect(result).toEqual({
      ["123"]: pieceA,
      ["456"]: pieceB
    });
  }

  @Test()
  public removePieceShouldRemovePiece() {
    const removingPiece = pieceUtils.createMockPiece("123");
    const keepingPiece = pieceUtils.createMockPiece("456");
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
    const removingPieceA = pieceUtils.createMockPiece("123");
    const removingPieceB = pieceUtils.createMockPiece("124");
    const keepingPiece = pieceUtils.createMockPiece("456");
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
    const firstPiece = pieceUtils.createMockPiece("123");
    const state: PiecesState = {
      [firstPiece.id]: firstPiece
    };

    const addingPiece = {
      ...pieceUtils.createMockPiece("456"),
      position: createTileCoordinates(3, null)
    };
    const command = addBoardPiece(addingPiece, 1, 2);

    const expectedPiece = {
      ...addingPiece,
      position: createTileCoordinates(1, 2)
    };

    const result = pieces(state, command);

    Expect(result).toEqual({
      [firstPiece.id]: firstPiece,
      [addingPiece.id]: expectedPiece
    });
  }

  @Test()
  public addBoardPieceShouldSetFacingAwayTrue() {
    const piece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(0, null),
      facingAway: false
    };

    const state: PiecesState = {
      [piece.id]: piece
    };

    const command = addBoardPiece(piece, 1, 2);

    const expectedPiece = {
      ...piece,
      position: createTileCoordinates(1, 2),
      facingAway: true
    };

    const result = pieces(state, command);

    Expect(result[piece.id]).toEqual(expectedPiece);
  }

  @Test()
  public updatePieceShouldReplacePiece() {
    const firstPiece = {
      ...pieceUtils.createMockPiece("123"),
      currentHealth: 100
    };
    const state: PiecesState = {
      [firstPiece.id]: firstPiece
    };

    const command = updateBoardPiece({
      ...firstPiece,
      currentHealth: 50
    });

    const result = pieces(state, command);

    Expect(result[firstPiece.id].currentHealth).toEqual(50);
  }

  @Test()
  public updatePiecesShouldReplacePieces() {
    const firstPiece = {
      ...pieceUtils.createMockPiece("123"),
      currentHealth: 100
    };
    const secondPiece = {
      ...pieceUtils.createMockPiece("456"),
      currentHealth: 100
    };
    const state: PiecesState = {
      [firstPiece.id]: firstPiece,
      [secondPiece.id]: secondPiece
    };

    const command = updateBoardPieces([
      {
        ...firstPiece,
        currentHealth: 50
      },
      {
        ...secondPiece,
        currentHealth: 40
      }
    ]);

    const result = pieces(state, command);

    Expect(result[firstPiece.id].currentHealth).toEqual(50);
    Expect(result[secondPiece.id].currentHealth).toEqual(40);
  }

  @Test()
  public moveBoardPieceShouldUpdatePiecePosition() {
    const piece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const state: PiecesState = {
      [piece.id]: piece
    };

    const command = moveBoardPiece(piece.id, { x: 0, y: 0 }, { x: 7, y: 3 });

    const result = pieces(state, command);

    Expect(result[piece.id].position).toEqual({ x: 7, y: 3 });
  }
}
