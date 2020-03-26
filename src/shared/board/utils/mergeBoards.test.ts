import { TestFixture, Test, Expect } from "alsatian";
import { BoardState } from "../state";
import { createMockPiece } from "@testing/utils";
import { mergeBoards } from "./mergeBoards";
import { createTileCoordinates } from "@common/models/position";

@TestFixture()
export class MergeBoardsTests {
    @Test()
    public shouldMergeBoardsCorrectly() {
        const homePieceA = {
            ...createMockPiece("123"),
            position: createTileCoordinates(0, 7)
        };
        const homePieceB = {
            ...createMockPiece("124"),
            position: createTileCoordinates(2, 5)
        };
        const awayPieceA = {
            ...createMockPiece("456"),
            position: createTileCoordinates(0, 7)
        };
        const awayPieceB = {
            ...createMockPiece("457"),
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

        const result = mergeBoards(home, away);

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
