import { Board } from "@creature-chess/board";
import { GameServerToClient } from "@creature-chess/networking";
import { PieceRegistry } from "@creature-chess/utils/piece";

export function updateBoardFromPacket(
	board: Board,
	pieceRegistry: PieceRegistry,
	packet: GameServerToClient.BoardUpdatePacket
) {
	board.clear();
	board.setPieces(
		Object.entries(packet.positions).map(([position, pieceId]) => {
			const [x, y] = position.split(",").map(Number);
			return { id: pieceId, x, y };
		})
	);

	for (const piece of packet.pieces) {
		pieceRegistry.registerPiece(piece);
	}
}
