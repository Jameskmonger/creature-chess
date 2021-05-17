import { BoardState } from "../types";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

describe("rotatePiecesAboutCenter", () => {
	test("should rotate grid correctly - 2 pieces", () => {
		const input: BoardState = {
			id: "abc",
			size: { width: 7, height: 6 },
			pieces: {
				"d6572bec-8397-4310-a50f-be2a897ab6a5": {
					id: "d6572bec-8397-4310-a50f-be2a897ab6a5"
				},
				"8e9d8f8c-8777-452e-a0ec-a06f0e51d592": {
					id: "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
				}
			},
			piecePositions: {
				"0,5": "d6572bec-8397-4310-a50f-be2a897ab6a5",
				"5,5": "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
			},
			locked: false,
			pieceLimit: null
		};

		const expected: BoardState = {
			id: "abc",
			size: { width: 7, height: 6 },
			pieces: {
				"d6572bec-8397-4310-a50f-be2a897ab6a5": {
					id: "d6572bec-8397-4310-a50f-be2a897ab6a5"
				},
				"8e9d8f8c-8777-452e-a0ec-a06f0e51d592": {
					id: "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
				}
			},
			piecePositions: {
				"6,0": "d6572bec-8397-4310-a50f-be2a897ab6a5",
				"1,0": "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
			},
			locked: false,
			pieceLimit: null
		};

		const result = rotatePiecesAboutCenter(input);

		expect(result).toEqual(expected);
	});

	test("should rotate grid correctly", () => {
		const input: BoardState = {
			id: "abc",
			size: { width: 7, height: 6 },
			pieces: {
				"0e1341ec-b1ab-4e7e-8473-09852e79c2c1": {
					id: "0e1341ec-b1ab-4e7e-8473-09852e79c2c1"
				},
				"e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48": {
					id: "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48"
				},
				"d6572bec-8397-4310-a50f-be2a897ab6a5": {
					id: "d6572bec-8397-4310-a50f-be2a897ab6a5"
				},
				"8e9d8f8c-8777-452e-a0ec-a06f0e51d592": {
					id: "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
				}
			},
			piecePositions: {
				"3,4": "0e1341ec-b1ab-4e7e-8473-09852e79c2c1",
				"3,3": "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48",
				"3,2": "d6572bec-8397-4310-a50f-be2a897ab6a5",
				"4,2": "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
			},
			locked: false,
			pieceLimit: null
		};

		const expected: BoardState = {
			id: "abc",
			size: { width: 7, height: 6 },
			pieces: {
				"0e1341ec-b1ab-4e7e-8473-09852e79c2c1": {
					id: "0e1341ec-b1ab-4e7e-8473-09852e79c2c1"
				},
				"e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48": {
					id: "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48"
				},
				"d6572bec-8397-4310-a50f-be2a897ab6a5": {
					id: "d6572bec-8397-4310-a50f-be2a897ab6a5"
				},
				"8e9d8f8c-8777-452e-a0ec-a06f0e51d592": {
					id: "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
				}
			},
			piecePositions: {
				"3,1": "0e1341ec-b1ab-4e7e-8473-09852e79c2c1",
				"3,2": "e5ee61d6-0f0a-4aaf-b0bc-2e2541a7aa48",
				"3,3": "d6572bec-8397-4310-a50f-be2a897ab6a5",
				"2,3": "8e9d8f8c-8777-452e-a0ec-a06f0e51d592"
			},
			locked: false,
			pieceLimit: null
		};

		const result = rotatePiecesAboutCenter(input);

		expect(result).toEqual(expected);
	});
});
