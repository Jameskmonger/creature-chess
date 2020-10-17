import { canDropPiece } from "./can-drop-piece";
import { pieceUtils } from "../../utils";
import { DefinitionProvider } from "../definitions/definitionProvider";

const definitionProvider = new DefinitionProvider();

describe("canDropPiece", () => {
    describe("when piece is on the board", () => {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [0, 4]);

        describe("when target is the board", () => {
            const targetX = 1;
            const targetY = 4;

            describe("when tile is not empty", () => {
                const tileEmpty = false;

                test("should return false", () => {
                    const result = canDropPiece(movingPiece, targetX, targetY, tileEmpty, false, true);

                    expect(result).toEqual(false);
                });
            });

            describe("when tile is empty", () => {
                const tileEmpty = true;

                describe("when board is locked", () => {
                    const boardLocked = true;

                    test("should return false", () => {
                        const result = canDropPiece(movingPiece, targetX, targetY, tileEmpty, boardLocked, true);

                        expect(result).toEqual(false);
                    });
                });
            });
        });

        describe("when target is the bench", () => {
            const targetX = 1;
            const targetY = null;

            describe("when tile is empty", () => {
                const tileEmpty = true;

                describe("when board is locked", () => {
                    const boardLocked = true;

                    test("should return true", () => {
                        const result = canDropPiece(movingPiece, targetX, targetY, tileEmpty, boardLocked, true);

                        expect(result).toEqual(false);
                    });
                });
            });
        });

        describe.each([
            [0, 0],
            [7, 0],
            [0, 2],
            [7, 2]
        ])("when target is in opponents area (%i, %i)", (x, y) => {
            const result = canDropPiece(
                movingPiece,
                x,
                y,
                true,
                false,
                true
            );

            expect(result).toEqual(false);
        });
    });

    describe("when piece is on the bench", () => {
        const movingPiece = pieceUtils.createPiece(definitionProvider, null, 1, [0, null]);

        describe("when not below piece limit", () => {
            const belowPieceLimit = false;

            describe("when target is the board", () => {
                const targetX = 1;
                const targetY = 4;

                describe("when tile is empty", () => {
                    const tileEmpty = true;

                    describe("when board is not locked", () => {
                        const boardLocked = false;

                        test("should return false", () => {
                            const result = canDropPiece(movingPiece, targetX, targetY, tileEmpty, boardLocked, belowPieceLimit);

                            expect(result).toEqual(false);
                        });
                    });
                });
            });

            describe("when target is the bench", () => {
                const targetX = 1;
                const targetY = null;

                describe("when tile is empty", () => {
                    const tileEmpty = true;
                    const boardLocked = false;

                    test("should return true", () => {
                        const result = canDropPiece(movingPiece, targetX, targetY, tileEmpty, boardLocked, belowPieceLimit);

                        expect(result).toEqual(true);
                    });
                });
            });
        });
    });
});
