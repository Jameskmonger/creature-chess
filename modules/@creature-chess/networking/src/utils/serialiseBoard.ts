import { Board, PositionKey } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { BoardUpdatePacket } from "../server-to-client/server-to-client-game";

export function serialiseBoard(
	board: Board,
	pieceRegistry: ReadablePieceRegistry
): BoardUpdatePacket {
	const positions: Record<PositionKey, PieceModel["id"]> = {};
	const pieces: PieceModel[] = [];

	for (const { id, x, y } of board.getAllPieces()) {
		const piece = pieceRegistry.getPieceById(id);

		if (!piece) {
			continue;
		}

		pieces.push(piece);

		positions[`${x},${y}`] = id;
	}

	return {
		positions,
		pieces,
	};
}
