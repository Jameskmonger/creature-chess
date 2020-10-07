import { TestFixture, Test, Expect } from "alsatian";
import { pieceUtils } from "../../utils";
import { mergeBoards } from "./mergeBoards";
import { createTileCoordinates } from "@creature-chess/models";

@TestFixture()
export class MergeBoardsTests {
    @Test()
    public shouldMergeBoardsCorrectly() {
        const homePieceA = {
            ...pieceUtils.createMockPiece("123"),
            position: createTileCoordinates(0, 7)
        };
        const homePieceB = {
            ...pieceUtils.createMockPiece("124"),
            position: createTileCoordinates(2, 5)
        };
        const awayPieceA = {
            ...pieceUtils.createMockPiece("456"),
            position: createTileCoordinates(0, 7)
        };
        const awayPieceB = {
            ...pieceUtils.createMockPiece("457"),
            position: createTileCoordinates(2, 5)
        };

        const home = {
            ["123"]: homePieceA,
            ["124"]: homePieceB,
        };

        const away = {
            ["456"]: awayPieceA,
            ["457"]: awayPieceB
        };

        const result = mergeBoards({ width: 8, height: 8 }, home, away);

        Expect(result).toEqual({
            ["123"]: {
                ...homePieceA,
                facingAway: true,
                position: createTileCoordinates(0, 7)
            },
            ["124"]: {
                ...homePieceB,
                facingAway: true,
                position: createTileCoordinates(2, 5)
            },
            ["456"]: {
                ...awayPieceA,
                facingAway: false,
                position: createTileCoordinates(7, 0)
            },
            ["457"]: {
                ...awayPieceB,
                facingAway: false,
                position: createTileCoordinates(5, 2)
            }
        });
    }
}
