import { TestFixture, Test, Expect, TestCase } from "alsatian";
import { initialiseBoard, removeBoardPiece, addBoardPiece, updateBoardPiece, updateBoardPieces, moveBoardPiece } from "../actions/boardActions";
import { piecePositions, PiecePositionsState } from "./piecePositionsReducer";
import { createMockPiece } from "@testing/utils";
import { createTileCoordinates } from "@common/models/position";
import { PiecesState } from "./piecesReducer";

@TestFixture()
export class PiecePositionsReducerTests {
  @Test()
  public initialiseBoardShouldSetPiecePositions() {
    const state: PiecePositionsState = {};

    const pieces = {
      123: {
        ...createMockPiece("123"),
        position: createTileCoordinates(1, 2)
      },
      456: {
        ...createMockPiece("456"),
        position: createTileCoordinates(4, 5)
      }
    };

    const action = initialiseBoard(pieces);

    const result = piecePositions(state, action);

    Expect(result).toEqual({
      "1,2": "123",
      "4,5": "456"
    });
  }
  @Test()
  public removePieceShouldRemovePiece() {
    const state: PiecePositionsState = {
      "1,2": "123",
      "4,5": "456"
    };

    const action = removeBoardPiece("123");

    const result = piecePositions(state, action);

    Expect(result).toEqual({
      "4,5": "456"
    });
  }

  @Test()
  public addPieceShouldAddPiece() {
    const state: PiecePositionsState = {
      "1,2": "123"
    };

    const addingPiece = createMockPiece("456");
    const action = addBoardPiece(addingPiece, 7, 7);

    const result = piecePositions(state, action);

    Expect(result).toEqual({
      "1,2": "123",
      "7,7": "456"
    });
  }

  @Test()
  public updatePieceShouldUpdatePiecePosition() {
    const firstPiece = {
      ...createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const state: PiecePositionsState = {
      "0,0": "123"
    };

    const action = updateBoardPiece({
      ...firstPiece,
      position: createTileCoordinates(0, 7)
    });

    const result = piecePositions(state, action);

    Expect(result).toEqual({
      "0,7": "123"
    });
  }

  @Test()
  public updatePiecesShouldUpdatePiecePositions() {
    const firstPiece = {
      ...createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const secondPiece = {
      ...createMockPiece("456"),
      position: createTileCoordinates(1, 0)
    };
    const state: PiecePositionsState = {
      "0,0": "123",
      "1,0": "456"
    };

    const action = updateBoardPieces([
      {
        ...firstPiece,
        position: createTileCoordinates(0, 1)
      },
      {
        ...secondPiece,
        position: createTileCoordinates(1, 1)
      }
    ]);

    const result = piecePositions(state, action);

    Expect(result).toEqual({
      "0,1": "123",
      "1,1": "456"
    });
  }

  @Test()
  public moveBoardPieceShouldUpdatePosition() {
    const piece = {
      ...createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const state: PiecePositionsState = {
      "0,0": "123"
    };

    const action = moveBoardPiece("123", { x: 0, y: 0 }, { x: 7, y: 3 });

    const result = piecePositions(state, action);

    Expect(result).toEqual({
      "0,0": null,
      "7,3": "123"
    });
  }
}
