export type PositionKey = `${number},${number}`;
export type Position = [number, number];
export type PieceId = string;

export class Board {
	public readonly width: number;
	public readonly height: number;

	private positionToPieceId: Map<PositionKey, PieceId> = new Map();
	private pieceIdToPosition: Map<PieceId, Position> = new Map();

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

		for (const [pieceId, position] of this.pieceIdToPosition.entries()) {
			newBoard.setPiece(pieceId, position[0], position[1]);
		}

		return newBoard;
	}

	public containsPiece(pieceId: PieceId): boolean {
		return this.pieceIdToPosition.has(pieceId);
	}

	public getPiecePosition(pieceId: PieceId): Position | null {
		return this.pieceIdToPosition.get(pieceId) ?? null;
	}

	public getPieceIdAtPosition(x: number, y: number): PieceId | null {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			throw new Error(
				`Position out of bounds: (${x}, ${y}) on board size (${this.width}, ${this.height})`
			);
		}

		const key: PositionKey = `${x},${y}`;

		return this.positionToPieceId.get(key) || null;
	}

	public getAllPieces(): { id: PieceId; x: number; y: number }[] {
		const pieces: { id: PieceId; x: number; y: number }[] = [];

		for (const [pieceId, position] of this.pieceIdToPosition.entries()) {
			pieces.push({ id: pieceId, x: position[0], y: position[1] });
		}

		return pieces;
	}

	public forEachPiece(callback: (id: PieceId, x: number, y: number) => void) {
		for (const [pieceId, position] of this.pieceIdToPosition.entries()) {
			callback(pieceId, position[0], position[1]);
		}
	}

	public mapPieces<T>(callback: (id: PieceId, x: number, y: number) => T): T[] {
		const results: T[] = [];

		for (const [pieceId, position] of this.pieceIdToPosition.entries()) {
			results.push(callback(pieceId, position[0], position[1]));
		}

		return results;
	}

	public reducePieces<T>(
		callback: (accumulator: T, id: PieceId, x: number, y: number) => T,
		initialValue: T
	): T {
		let accumulator = initialValue;

		for (const [pieceId, position] of this.pieceIdToPosition.entries()) {
			accumulator = callback(accumulator, pieceId, position[0], position[1]);
		}

		return accumulator;
	}

	public setPieces(pieces: { id: PieceId; x: number; y: number }[]) {
		this.positionToPieceId.clear();
		this.pieceIdToPosition.clear();

		for (const piece of pieces) {
			if (piece.x < 0 || piece.x >= this.width || piece.y < 0 || piece.y >= this.height) {
				throw new Error(
					`Position out of bounds: (${piece.x}, ${piece.y}) on board size (${this.width}, ${this.height})`
				);
			}

			const key: PositionKey = `${piece.x},${piece.y}`;
			this.positionToPieceId.set(key, piece.id);
			this.pieceIdToPosition.set(piece.id, [piece.x, piece.y]);
		}
	}

	public setPiece(pieceId: PieceId, x: number, y: number) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
			throw new Error(
				`Position out of bounds: (${x}, ${y}) on board size (${this.width}, ${this.height})`
			);
		}

		if (this.positionToPieceId.has(`${x},${y}`)) {
			throw new Error(`Position (${x}, ${y}) is already occupied`);
		}

		const previousPosition = this.pieceIdToPosition.get(pieceId);
		if (previousPosition) {
			this.positionToPieceId.delete(`${previousPosition[0]},${previousPosition[1]}`);
		}

		const key: PositionKey = `${x},${y}`;
		this.positionToPieceId.set(key, pieceId);
		this.pieceIdToPosition.set(pieceId, [x, y]);
	}

	public removePiece(pieceId: PieceId) {
		if (this.pieceIdToPosition.has(pieceId)) {
			const position = this.pieceIdToPosition.get(pieceId)!;
			this.pieceIdToPosition.delete(pieceId);
			this.positionToPieceId.delete(`${position[0]},${position[1]}`);
		} else {
			// todo do nothing for now to preserve legacy behavior, but ideally this should probably be an error
		}
	}

	public swapPieces(pieceIdA: PieceId, pieceIdB: PieceId) {
		const positionA = this.pieceIdToPosition.get(pieceIdA);
		const positionB = this.pieceIdToPosition.get(pieceIdB);

		if (!positionA) {
			throw new Error(`Piece with ID ${pieceIdA} does not exist on the board`);
		}

		if (!positionB) {
			throw new Error(`Piece with ID ${pieceIdB} does not exist on the board`);
		}

		this.pieceIdToPosition.set(pieceIdA, positionB);
		this.pieceIdToPosition.set(pieceIdB, positionA);

		this.positionToPieceId.set(
			`${positionA[0]},${positionA[1]}`,
			pieceIdB
		);
		this.positionToPieceId.set(
			`${positionB[0]},${positionB[1]}`,
			pieceIdA
		);
	}
}
