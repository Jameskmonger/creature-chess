import { BoardState } from "../types";
import { mergeBoards } from "./mergeBoards";

describe("mergeBoards", () => {
	test("should merge boards correctly - 1 piece each", () => {
		const inputHome: BoardState = {
			id: "",
			size: {
				width: 7,
				height: 3,
			},
			pieces: {
				"6d515794-bbc2-4563-9b76-433c2f19726a": {
					id: "6d515794-bbc2-4563-9b76-433c2f19726a",
				},
			},
			piecePositions: {
				"3,0": "6d515794-bbc2-4563-9b76-433c2f19726a",
			},
			locked: false,
			pieceLimit: 5,
		};
		const inputAway: BoardState = {
			id: "",
			size: {
				width: 7,
				height: 3,
			},
			pieces: {
				"42c205b1-c755-40d3-b0d6-522719d0a784": {
					id: "42c205b1-c755-40d3-b0d6-522719d0a784",
				},
			},
			piecePositions: {
				"3,0": "42c205b1-c755-40d3-b0d6-522719d0a784",
			},
			locked: false,
			pieceLimit: 5,
		};

		const expected: BoardState = {
			id: "abc",
			size: {
				width: 7,
				height: 6,
			},
			pieces: {
				"6d515794-bbc2-4563-9b76-433c2f19726a": {
					id: "6d515794-bbc2-4563-9b76-433c2f19726a",
				},
				"42c205b1-c755-40d3-b0d6-522719d0a784": {
					id: "42c205b1-c755-40d3-b0d6-522719d0a784",
				},
			},
			piecePositions: {
				"3,3": "6d515794-bbc2-4563-9b76-433c2f19726a",
				"3,2": "42c205b1-c755-40d3-b0d6-522719d0a784",
			},
			locked: true,
			pieceLimit: null,
		};

		const result = mergeBoards("abc", inputHome, inputAway);

		expect(result).toEqual(expected);
	});

	test("should merge boards correctly", () => {
		const inputHome: BoardState = {
			id: "",
			size: {
				width: 7,
				height: 3,
			},
			pieces: {
				"0e1341ec-b1ab-4e7e-8473-09852e79c2c1": {
					id: "0e1341ec-b1ab-4e7e-8473-09852e79c2c1",
				},
				"e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48": {
					id: "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48",
				},
			},
			piecePositions: {
				"3,1": "0e1341ec-b1ab-4e7e-8473-09852e79c2c1",
				"3,0": "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48",
			},
			locked: true,
			pieceLimit: 5,
		};
		const inputAway: BoardState = {
			id: "",
			size: {
				width: 7,
				height: 3,
			},
			pieces: {
				"d6572bec-8397-4310-a50f-be2a897ab6a5": {
					id: "d6572bec-8397-4310-a50f-be2a897ab6a5",
				},
				"8e9d8f8c-8777-452e-a0ec-a06f0e51d592": {
					id: "8e9d8f8c-8777-452e-a0ec-a06f0e51d592",
				},
			},
			piecePositions: {
				"0,2": "d6572bec-8397-4310-a50f-be2a897ab6a5",
				"5,2": "8e9d8f8c-8777-452e-a0ec-a06f0e51d592",
			},
			locked: false,
			pieceLimit: null,
		};

		const expected: BoardState = {
			id: "def",
			size: {
				width: 7,
				height: 6,
			},
			pieces: {
				"0e1341ec-b1ab-4e7e-8473-09852e79c2c1": {
					id: "0e1341ec-b1ab-4e7e-8473-09852e79c2c1",
				},
				"e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48": {
					id: "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48",
				},
				"d6572bec-8397-4310-a50f-be2a897ab6a5": {
					id: "d6572bec-8397-4310-a50f-be2a897ab6a5",
				},
				"8e9d8f8c-8777-452e-a0ec-a06f0e51d592": {
					id: "8e9d8f8c-8777-452e-a0ec-a06f0e51d592",
				},
			},
			piecePositions: {
				"3,4": "0e1341ec-b1ab-4e7e-8473-09852e79c2c1",
				"3,3": "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48",
				"6,0": "d6572bec-8397-4310-a50f-be2a897ab6a5",
				"1,0": "8e9d8f8c-8777-452e-a0ec-a06f0e51d592",
			},
			locked: true,
			pieceLimit: null,
		};

		const result = mergeBoards("def", inputHome, inputAway);

		expect(result).toEqual(expected);
	});
});
