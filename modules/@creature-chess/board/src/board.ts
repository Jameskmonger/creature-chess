import { PackedPosition, packPosition, unpackX, unpackY } from "./position";

export type PositionKey = `${number},${number}`;
export type Position = [number, number];
export type PieceId = string;

export class Board {
	public readonly width: number;
	public readonly height: number;

	private positionToPieceId: Map<PackedPosition, PieceId> = new Map();
	private pieceIdToPosition: Map<PieceId, PackedPosition> = new Map();

	public constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	public get pieceCount(): number {
		return this.pieceIdToPosition.size;
	}

	public clear() {
		this.positionToPieceId.clear();
		this.pieceIdToPosition.clear();
	}

	public clone() {
		const newBoard = new Board(this.width, this.height);

		for (const [pieceId, packed] of this.pieceIdToPosition.entries()) {
			newBoard.setPiece(pieceId, unpackX(packed), unpackY(packed));
		}

		return newBoard;
	}

	public containsPiece(pieceId: PieceId): boolean {
		return this.pieceIdToPosition.has(pieceId);
	}

	public getPiecePosition(pieceId: PieceId): Position | null {
		const packed = this.pieceIdToPosition.get(pieceId);
		return packed === undefined ? null : [unpackX(packed), unpackY(packed)];
	}

	public getPieceIdAtPosition(x: number, y: number): PieceId | null {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			throw new Error(
				`Position out of bounds: (${x}, ${y}) on board size (${this.width}, ${this.height})`
			);
		}
		return this.positionToPieceId.get(packPosition(x, y)) || null;
	}

	public getAllPieces(): { id: PieceId; x: number; y: number }[] {
		const pieces: { id: PieceId; x: number; y: number }[] = [];

		for (const [pieceId, packed] of this.pieceIdToPosition.entries()) {
			pieces.push({ id: pieceId, x: unpackX(packed), y: unpackY(packed) });
		}

		return pieces;
	}

	public forEachPiece(callback: (id: PieceId, x: number, y: number) => void) {
		for (const [pieceId, packed] of this.pieceIdToPosition.entries()) {
			callback(pieceId, unpackX(packed), unpackY(packed));
		}
	}

	public mapPieces<T>(callback: (id: PieceId, x: number, y: number) => T): T[] {
		const results: T[] = [];

		for (const [pieceId, packed] of this.pieceIdToPosition.entries()) {
			results.push(callback(pieceId, unpackX(packed), unpackY(packed)));
		}

		return results;
	}

	public reducePieces<T>(
		callback: (accumulator: T, id: PieceId, x: number, y: number) => T,
		initialValue: T
	): T {
		let accumulator = initialValue;

		for (const [pieceId, packed] of this.pieceIdToPosition.entries()) {
			accumulator = callback(accumulator, pieceId, unpackX(packed), unpackY(packed));
		}

		return accumulator;
	}

	public setPieces(pieces: { id: PieceId; x: number; y: number }[]) {
		this.positionToPieceId.clear();
		this.pieceIdToPosition.clear();

		for (const piece of pieces) {
			if (
				piece.x < 0 ||
				piece.x >= this.width ||
				piece.y < 0 ||
				piece.y >= this.height
			) {
				throw new Error(
					`Position out of bounds: (${piece.x}, ${piece.y}) on board size (${this.width}, ${this.height})`
				);
			}

			const key = packPosition(piece.x, piece.y);
			this.positionToPieceId.set(key, piece.id);
			this.pieceIdToPosition.set(piece.id, key);
		}
	}

	public setPiece(pieceId: PieceId, x: number, y: number) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			throw new Error(
				`Position out of bounds: (${x}, ${y}) on board size (${this.width}, ${this.height})`
			);
		}

		const key = packPosition(x, y);

		if (this.positionToPieceId.has(key)) {
			throw new Error(`Position (${x}, ${y}) is already occupied`);
		}

		const previousKey = this.pieceIdToPosition.get(pieceId);
		if (previousKey !== undefined) {
			this.positionToPieceId.delete(previousKey);
		}

		this.positionToPieceId.set(key, pieceId);
		this.pieceIdToPosition.set(pieceId, key);
	}

	public removePiece(pieceId: PieceId) {
		const key = this.pieceIdToPosition.get(pieceId);
		if (key !== undefined) {
			this.pieceIdToPosition.delete(pieceId);
			this.positionToPieceId.delete(key);
		}
	}

	public swapPieces(pieceIdA: PieceId, pieceIdB: PieceId) {
		const keyA = this.pieceIdToPosition.get(pieceIdA);
		const keyB = this.pieceIdToPosition.get(pieceIdB);

		if (keyA === undefined) {
			throw new Error(`Piece with ID ${pieceIdA} does not exist on the board`);
		}

		if (keyB === undefined) {
			throw new Error(`Piece with ID ${pieceIdB} does not exist on the board`);
		}

		this.pieceIdToPosition.set(pieceIdA, keyB);
		this.pieceIdToPosition.set(pieceIdB, keyA);

		this.positionToPieceId.set(keyA, pieceIdB);
		this.positionToPieceId.set(keyB, pieceIdA);
	}
}
