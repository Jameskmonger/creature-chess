import { Board } from "./board";
import { mergeBoards } from "./mergeBoards";

describe("mergeBoards", () => {
	test("should merge boards correctly - 1 piece each", () => {
		const home = new Board(7, 3);
		home.setPiece("6d515794-bbc2-4563-9b76-433c2f19726a", 3, 0);

		const away = new Board(7, 3);
		away.setPiece("42c205b1-c755-40d3-b0d6-522719d0a784", 3, 0);

		const result = mergeBoards("abc", home, away);

		expect(result.width).toBe(7);
		expect(result.height).toBe(6);

		expect(
			result.getPiecePosition("6d515794-bbc2-4563-9b76-433c2f19726a")
		).toEqual([3, 3]);
		expect(
			result.getPiecePosition("42c205b1-c755-40d3-b0d6-522719d0a784")
		).toEqual([3, 2]);
	});

	test("should merge boards correctly", () => {
		const home = new Board(7, 3);
		home.setPiece("0e1341ec-b1ab-4e7e-8473-09852e79c2c1", 3, 1);
		home.setPiece("e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48", 3, 0);

		const away = new Board(7, 3);
		away.setPiece("d6572bec-8397-4310-a50f-be2a897ab6a5", 0, 2);
		away.setPiece("8e9d8f8c-8777-452e-a0ec-a06f0e51d592", 5, 2);

		const result = mergeBoards("def", home, away);

		expect(result.width).toBe(7);
		expect(result.height).toBe(6);

		expect(
			result.getPiecePosition("0e1341ec-b1ab-4e7e-8473-09852e79c2c1")
		).toEqual([3, 4]);
		expect(
			result.getPiecePosition("e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48")
		).toEqual([3, 3]);
		expect(
			result.getPiecePosition("d6572bec-8397-4310-a50f-be2a897ab6a5")
		).toEqual([6, 0]);
		expect(
			result.getPiecePosition("8e9d8f8c-8777-452e-a0ec-a06f0e51d592")
		).toEqual([1, 0]);
	});
});
