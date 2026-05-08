import { Board, packPosition } from "@creature-chess/board";
import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";

import { resolvePiecePlacement } from "./resolvePiecePlacement";

const fakeBoard = (pieces: Record<string, string>): Board =>
	({
		getPieceIdAtPosition: (x: number, y: number): string | null =>
			pieces[`${x},${y}`] ?? null,
	}) as unknown as Board;

const at = (
	type: "board" | "bench",
	x: number,
	y: number
): PlayerPieceLocation => ({ type, location: packPosition(x, y) });

describe("resolvePiecePlacement", () => {
	it("returns drop when target tile is empty", () => {
		const result = resolvePiecePlacement(
			"piece1",
			at("board", 2, 3),
			fakeBoard({}),
			fakeBoard({})
		);

		expect(result.kind).toBe("drop");
		if (result.kind === "drop") {
			expect(result.action.type).toBe(
				PlayerActions.dropPiecePlayerAction.type
			);
			expect(result.action.payload).toEqual({
				pieceId: "piece1",
				to: at("board", 2, 3),
			});
		}
	});

	it("returns swap when target tile holds a different piece", () => {
		const result = resolvePiecePlacement(
			"piece1",
			at("board", 2, 3),
			fakeBoard({ "2,3": "piece2" }),
			fakeBoard({})
		);

		expect(result.kind).toBe("swap");
		if (result.kind === "swap") {
			expect(result.action.type).toBe(
				PlayerActions.swapPiecePlayerAction.type
			);
			expect(result.action.payload).toEqual({
				pieceAId: "piece1",
				pieceBId: "piece2",
			});
		}
	});

	it("returns noop when target tile already holds the source piece", () => {
		const result = resolvePiecePlacement(
			"piece1",
			at("board", 2, 3),
			fakeBoard({ "2,3": "piece1" }),
			fakeBoard({})
		);

		expect(result.kind).toBe("noop");
	});

	it("reads the bench when target is a bench tile", () => {
		const result = resolvePiecePlacement(
			"piece1",
			at("bench", 4, 0),
			fakeBoard({ "4,0": "piece-on-board-only" }),
			fakeBoard({ "4,0": "piece-on-bench" })
		);

		expect(result.kind).toBe("swap");
		if (result.kind === "swap") {
			expect(result.action.payload.pieceBId).toBe("piece-on-bench");
		}
	});
});
