import { TestFixture, Test, Expect } from "alsatian";
import {
  initialiseBoard, removeBoardPiece, addBoardPiece, updateBoardPiece,
  updateBoardPieces, moveBoardPiece, removeBoardPieces
} from "../commands";
import { piecePositions, PiecePositionsState } from "./piecePositionsReducer";
import { pieceUtils } from "../../utils";
import { createTileCoordinates } from "@creature-chess/models";

@TestFixture()
export class PiecePositionsReducerTests {
  @Test()
  public initialiseBoardShouldSetPiecePositions() {
    const state: PiecePositionsState = {};

    const pieces = {
      123: {
        ...pieceUtils.createMockPiece("123"),
        position: createTileCoordinates(1, 2)
      },
      456: {
        ...pieceUtils.createMockPiece("456"),
        position: createTileCoordinates(4, 5)
      }
    };

    const command = initialiseBoard(pieces);

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "1,2": "123",
      "4,5": "456"
    });
  }

  @Test()
  public initialiseBoardShouldAddDeadPieces() {
    const state: PiecePositionsState = {};

    const pieces = {
      123: {
        ...pieceUtils.createMockPiece("123"),
        position: createTileCoordinates(1, 2),
        currentHealth: 100
      },
      456: {
        ...pieceUtils.createMockPiece("456"),
        position: createTileCoordinates(1, 3),
        currentHealth: 0
      },
      124: {
        ...pieceUtils.createMockPiece("124"),
        position: createTileCoordinates(3, 3),
        currentHealth: 0
      },
      789: {
        ...pieceUtils.createMockPiece("789"),
        position: createTileCoordinates(3, 4),
        currentHealth: 100
      }
    };

    const command = initialiseBoard(pieces);

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "1,2": "123",
      "1,3": "456",
      "3,3": "124",
      "3,4": "789"
    });
  }

  @Test()
  public removePieceShouldRemovePiece() {
    const state: PiecePositionsState = {
      "1,2": "123",
      "4,5": "456"
    };

    const command = removeBoardPiece("123");

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "4,5": "456"
    });
  }

  @Test()
  public removePiecesShouldRemovePieces() {
    const state: PiecePositionsState = {
      "1,2": "123",
      "1,3": "124",
      "4,5": "456"
    };

    const command = removeBoardPieces(["123", "124"]);

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "4,5": "456"
    });
  }

  @Test()
  public addPieceShouldAddPiece() {
    const state: PiecePositionsState = {
      "1,2": "123"
    };

    const addingPiece = pieceUtils.createMockPiece("456");
    const command = addBoardPiece(addingPiece, 7, 7);

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "1,2": "123",
      "7,7": "456"
    });
  }

  @Test()
  public updatePieceShouldUpdatePiecePosition() {
    const firstPiece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const state: PiecePositionsState = {
      "0,0": "123"
    };

    const command = updateBoardPiece({
      ...firstPiece,
      position: createTileCoordinates(0, 7)
    });

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "0,7": "123"
    });
  }

  @Test()
  public updatePiecesShouldUpdatePiecePositions() {
    const firstPiece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const secondPiece = {
      ...pieceUtils.createMockPiece("456"),
      position: createTileCoordinates(1, 0)
    };
    const state: PiecePositionsState = {
      "0,0": "123",
      "1,0": "456"
    };

    const command = updateBoardPieces([
      {
        ...firstPiece,
        position: createTileCoordinates(0, 1)
      },
      {
        ...secondPiece,
        position: createTileCoordinates(1, 1)
      }
    ]);

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "0,1": "123",
      "1,1": "456"
    });
  }

  @Test()
  public moveBoardPieceShouldUpdatePosition() {
    const piece = {
      ...pieceUtils.createMockPiece("123"),
      position: createTileCoordinates(0, 0)
    };
    const state: PiecePositionsState = {
      "0,0": "123"
    };

    const command = moveBoardPiece("123", { x: 0, y: 0 }, { x: 7, y: 3 });

    const result = piecePositions(state, command);

    Expect(result).toEqual({
      "0,0": null,
      "7,3": "123"
    });
  }
}
