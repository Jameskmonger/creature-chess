import { Board, PositionKey } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";
import { BoardUpdatePacket } from "../server-to-client/server-to-client-game";
import { PieceModel } from "@creature-chess/models";

export function serialiseBoard(
	board: Board,
	pieceRegistry: PieceRegistry,
	isHomePlayer: boolean = true
): BoardUpdatePacket {
	const positions: Record<PositionKey, PieceModel["id"]> = {};
	const pieces: PieceModel[] = [];

	for (const { id, x, y } of board.getAllPieces()) {
		const piece = pieceRegistry.getPieceById(id);

		if (!piece) {
			continue;
		}

		if (isHomePlayer) {
			pieces.push(piece);
		} else {
			pieces.push({
				...piece,
				facingAway: !piece.facingAway,
			});
		}

		positions[`${x},${y}`] = id;
	}

	return {
		positions,
		pieces,
	};
}
