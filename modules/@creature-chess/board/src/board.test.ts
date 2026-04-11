import { Board } from "./board";

describe("board", () => {
	it("should retrieve a piece by position", () => {
		const board = new Board(8, 8);

		board.setPieces([
			{ id: "piece1", x: 2, y: 3 },
			{ id: "piece2", x: 5, y: 6 },
		]);

		expect(board.getPieceIdAtPosition(2, 3)).toBe("piece1");
		expect(board.getPieceIdAtPosition(5, 6)).toBe("piece2");
		expect(board.getPieceIdAtPosition(0, 0)).toBeNull();
	});

	describe("getPieceIdAtPosition", () => {
		it.each([
			[9, 1],
			[-1, 1],
			[1, 10],
			[1, -5],
		])("should throw error when position (%i, %i) is out of bounds", (x, y) => {
			const board = new Board(8, 8);

			expect(() => board.getPieceIdAtPosition(x, y)).toThrowError();
		});
	});

	describe("getPiecePosition", () => {
		it("should retrieve a piece's position by its ID", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			expect(board.getPiecePosition("piece1")).toEqual([2, 3]);
			expect(board.getPiecePosition("piece2")).toEqual([5, 6]);
		});

		it("should return null when piece ID does not exist", () => {
			const board = new Board(8, 8);

			expect(board.getPiecePosition("nonExistentPiece")).toBeNull();
		});
	});

	describe("getAllPieces", () => {
		it("should retrieve all pieces on the board", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			const allPieces = board.getAllPieces();

			expect(allPieces).toHaveLength(2);
			expect(allPieces).toContainEqual({ id: "piece1", x: 2, y: 3 });
			expect(allPieces).toContainEqual({ id: "piece2", x: 5, y: 6 });
		});
	});

	describe("containsPiece", () => {
		it("should return true if the piece exists on the board", () => {
			const board = new Board(8, 8);

			board.setPieces([{ id: "piece1", x: 2, y: 3 }]);

			expect(board.containsPiece("piece1")).toBe(true);
		});

		it("should return false if the piece does not exist on the board", () => {
			const board = new Board(8, 8);

			expect(board.containsPiece("nonExistentPiece")).toBe(false);
		});
	});

	describe("pieceCount", () => {
		it("should return the correct number of pieces on the board", () => {
			const board = new Board(8, 8);

			expect(board.pieceCount).toBe(0);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			expect(board.pieceCount).toBe(2);
		});
	});

	describe("clone", () => {
		it("should create a deep copy of the board", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			const clonedBoard = board.clone();

			expect(clonedBoard).not.toBe(board);
			expect(clonedBoard.width).toBe(board.width);
			expect(clonedBoard.height).toBe(board.height);
			expect(clonedBoard.getAllPieces()).toEqual(board.getAllPieces());

			// Modify the cloned board and ensure the original is unaffected
			clonedBoard.setPiece("piece3", 1, 1);

			expect(clonedBoard.pieceCount).toBe(3);
			expect(board.pieceCount).toBe(2);
		});
	});

	describe("setPieces", () => {
		it("should erase previous pieces when setting new ones", () => {
			const board = new Board(8, 8);

			board.setPieces([{ id: "piece1", x: 1, y: 1 }]);

			board.setPieces([{ id: "piece2", x: 2, y: 2 }]);

			expect(board.getPieceIdAtPosition(1, 1)).toBeNull();
			expect(board.getPieceIdAtPosition(2, 2)).toBe("piece2");
		});

		it.each([
			[9, 1],
			[-1, 1],
			[1, 10],
			[1, -5],
		])("should error when position (%i, %i) is out of bounds", (x, y) => {
			const board = new Board(8, 8);

			expect(() => board.setPieces([{ id: "piece1", x, y }])).toThrowError();
		});
	});

	describe("setPiece", () => {
		it("should set a piece at the given position", () => {
			const board = new Board(8, 8);

			board.setPiece("piece1", 4, 4);

			expect(board.getPieceIdAtPosition(4, 4)).toBe("piece1");
		});

		it("should move an existing piece to a new position", () => {
			const board = new Board(8, 8);

			board.setPiece("piece1", 2, 2);
			board.setPiece("piece1", 5, 5);

			expect(board.getPieceIdAtPosition(2, 2)).toBeNull();
			expect(board.getPieceIdAtPosition(5, 5)).toBe("piece1");
		});

		it("should error when position is already occupied", () => {
			const board = new Board(8, 8);

			board.setPiece("piece1", 3, 3);

			expect(() => board.setPiece("piece2", 3, 3)).toThrowError();
		});

		it.each([
			[9, 1],
			[-1, 1],
			[1, 10],
			[1, -5],
		])("should error when position (%i, %i) is out of bounds", (x, y) => {
			const board = new Board(8, 8);

			expect(() => board.setPiece("piece1", x, y)).toThrowError();
		});
	});

	describe("removePiece", () => {
		it("should remove a piece by its ID", () => {
			const board = new Board(8, 8);

			board.setPiece("piece1", 6, 6);
			board.removePiece("piece1");

			expect(board.getPieceIdAtPosition(6, 6)).toBeNull();
		});

		it("should not error when removing a non-existent piece", () => {
			const board = new Board(8, 8);

			expect(() => board.removePiece("nonExistentPiece")).not.toThrowError();
		});
	});

	describe("swapPieces", () => {
		it("should swap positions of two pieces", () => {
			const board = new Board(8, 8);

			board.setPiece("piece1", 1, 1);
			board.setPiece("piece2", 2, 2);

			board.swapPieces("piece1", "piece2");

			expect(board.getPieceIdAtPosition(1, 1)).toBe("piece2");
			expect(board.getPieceIdAtPosition(2, 2)).toBe("piece1");
		});

		it("should error when piece A does not exist", () => {
			const board = new Board(8, 8);

			board.setPiece("piece2", 2, 2);

			expect(() =>
				board.swapPieces("nonExistentPiece", "piece2")
			).toThrowError();
		});

		it("should error when piece B does not exist", () => {
			const board = new Board(8, 8);

			board.setPiece("piece1", 1, 1);

			expect(() =>
				board.swapPieces("piece1", "nonExistentPiece")
			).toThrowError();
		});
	});

	describe("clear", () => {
		it("should remove all pieces from the board", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			board.clear();

			expect(board.getAllPieces()).toHaveLength(0);
		});
	});

	describe("forEachPiece", () => {
		it("should iterate over all pieces on the board", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			const pieces: { id: string; x: number; y: number }[] = [];

			board.forEachPiece((id, x, y) => {
				pieces.push({ id, x, y });
			});

			expect(pieces).toHaveLength(2);
			expect(pieces).toContainEqual({ id: "piece1", x: 2, y: 3 });
			expect(pieces).toContainEqual({ id: "piece2", x: 5, y: 6 });
		});
	});

	describe("mapPieces", () => {
		it("should map over all pieces on the board", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			const pieceDescriptions = board.mapPieces(
				(id, x, y) => `Piece ${id} is at (${x}, ${y})`
			);

			expect(pieceDescriptions).toHaveLength(2);
			expect(pieceDescriptions).toContain("Piece piece1 is at (2, 3)");
			expect(pieceDescriptions).toContain("Piece piece2 is at (5, 6)");
		});
	});

	describe("reducePieces", () => {
		it("should reduce over all pieces on the board", () => {
			const board = new Board(8, 8);

			board.setPieces([
				{ id: "piece1", x: 2, y: 3 },
				{ id: "piece2", x: 5, y: 6 },
			]);

			const concatenatedIds = board.reducePieces(
				(accumulator, id) => accumulator + id + " ",
				""
			);

			expect(concatenatedIds.trim()).toBe("piece1 piece2");
		});
	});
});
