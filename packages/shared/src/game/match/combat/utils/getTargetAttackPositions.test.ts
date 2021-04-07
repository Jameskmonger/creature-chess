import { createTileCoordinates } from "@creature-chess/models";
import { getTargetAttackPositions } from "./getTargetAttackPositions";

describe("getTargetAttackPositions", () => {
    describe("when range is not provided", () => {
        test("should give adjacent positions", () => {
            const positions = getTargetAttackPositions(createTileCoordinates(3, 3));

            expect(positions).toContainEqual(createTileCoordinates(2, 3));
            expect(positions).toContainEqual(createTileCoordinates(4, 3));
            expect(positions).toContainEqual(createTileCoordinates(3, 2));
            expect(positions).toContainEqual(createTileCoordinates(3, 4));
        });
    });

    describe("when range is 2", () => {
        test("should give all points in range 2", () => {
            const positions = getTargetAttackPositions(createTileCoordinates(3, 3), 2);

            expect(positions).toContainEqual(createTileCoordinates(1, 3));
            expect(positions).toContainEqual(createTileCoordinates(2, 3));
            expect(positions).toContainEqual(createTileCoordinates(4, 3));
            expect(positions).toContainEqual(createTileCoordinates(5, 3));
            expect(positions).toContainEqual(createTileCoordinates(3, 1));
            expect(positions).toContainEqual(createTileCoordinates(3, 2));
            expect(positions).toContainEqual(createTileCoordinates(3, 4));
            expect(positions).toContainEqual(createTileCoordinates(3, 5));
        });
    });
});
