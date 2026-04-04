import { updateBoardFromPacket } from "./updateBoardFromPacket";

describe("updateBoardFromPacket", () => {
	let board: { clear: jest.Mock; setPieces: jest.Mock };
	let pieceRegistry: { registerPiece: jest.Mock };

	beforeEach(() => {
		board = { clear: jest.fn(), setPieces: jest.fn() };
		pieceRegistry = { registerPiece: jest.fn() };
	});

	it("should clear the board before setting pieces", () => {
		updateBoardFromPacket(board as any, pieceRegistry as any, {
			positions: {},
			pieces: [],
		});

		expect(board.clear).toHaveBeenCalled();
		expect(board.setPieces).toHaveBeenCalled();

		const clearOrder = board.clear.mock.invocationCallOrder[0];
		const setPiecesOrder = board.setPieces.mock.invocationCallOrder[0];
		expect(clearOrder).toBeLessThan(setPiecesOrder);
	});

	it("should parse position strings into x,y coordinates", () => {
		updateBoardFromPacket(board as any, pieceRegistry as any, {
			positions: { "2,3": "piece1", "5,6": "piece2" },
			pieces: [],
		});

		expect(board.setPieces).toHaveBeenCalledWith([
			{ id: "piece1", x: 2, y: 3 },
			{ id: "piece2", x: 5, y: 6 },
		]);
	});

	it("should register all pieces in the piece registry", () => {
		const pieces = [
			{ id: "piece1", name: "Dragon" },
			{ id: "piece2", name: "Knight" },
		];

		updateBoardFromPacket(board as any, pieceRegistry as any, {
			positions: {},
			pieces: pieces as any,
		});

		expect(pieceRegistry.registerPiece).toHaveBeenCalledTimes(2);
		expect(pieceRegistry.registerPiece).toHaveBeenCalledWith(pieces[0]);
		expect(pieceRegistry.registerPiece).toHaveBeenCalledWith(pieces[1]);
	});

	it("should handle an empty packet", () => {
		updateBoardFromPacket(board as any, pieceRegistry as any, {
			positions: {},
			pieces: [],
		});

		expect(board.clear).toHaveBeenCalled();
		expect(board.setPieces).toHaveBeenCalledWith([]);
		expect(pieceRegistry.registerPiece).not.toHaveBeenCalled();
	});
});
