import { getTargetAttackPositions } from "./getTargetAttackPositions";
import { packPosition } from "@creature-chess/board";

describe("getTargetAttackPositions", () => {
	const board = {
		size: {
			width: 7,
			height: 6,
		},
	};

	describe("when range is not provided", () => {
		test("should give adjacent positions", () => {
			const positions = getTargetAttackPositions(
				board.size,
				packPosition(3, 3)
			);

			expect(positions).toContainEqual(packPosition(2, 3));
			expect(positions).toContainEqual(packPosition(4, 3));
			expect(positions).toContainEqual(packPosition(3, 2));
			expect(positions).toContainEqual(packPosition(3, 4));
		});
	});

	describe("when range is 2", () => {
		test("should give all points in range 2", () => {
			const positions = getTargetAttackPositions(
				board.size,
				packPosition(3, 3),
				2
			);

			expect(positions).toContainEqual(packPosition(1, 3));
			expect(positions).toContainEqual(packPosition(2, 3));
			expect(positions).toContainEqual(packPosition(4, 3));
			expect(positions).toContainEqual(packPosition(5, 3));
			expect(positions).toContainEqual(packPosition(3, 1));
			expect(positions).toContainEqual(packPosition(3, 2));
			expect(positions).toContainEqual(packPosition(3, 4));
			expect(positions).toContainEqual(packPosition(3, 5));
		});
	});
});
