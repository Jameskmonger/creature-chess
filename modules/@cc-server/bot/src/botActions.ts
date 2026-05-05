import { Action } from "redux";

import { packPosition } from "@creature-chess/board";
import { PlayerActions } from "@creature-chess/gamemode";

const boardLocation = (x: number, y: number) => ({
	type: "board" as const,
	location: packPosition(x, y),
});
const benchLocation = (x: number) => ({
	type: "bench" as const,
	location: packPosition(x, 0),
});

/** Action builders for bot implementations. */
export const BotActions = {
	/**
	 * Buy a card from the shop at the specified index.
	 *
	 * @param index The index of the card in the shop to buy.
	 *
	 * @returns The action to perform the buy.
	 */
	buyCard: (index: number): Action =>
		PlayerActions.buyCardPlayerAction({ index }),

	/**
	 * Buy one set of XP.
	 *
	 * @returns The action to perform the XP purchase.
	 */
	buyXp: (): Action => PlayerActions.buyXpPlayerAction(),

	/**
	 * Reroll the shop cards.
	 *
	 * @returns The action to perform the reroll.
	 */
	rerollCards: (): Action => PlayerActions.rerollCardsPlayerAction(),

	/**
	 * Sell a piece from the board or bench.
	 *
	 * @param pieceId The ID of the piece to sell.
	 *
	 * @returns The action to perform the sell.
	 */
	sellPiece: (pieceId: string): Action =>
		PlayerActions.sellPiecePlayerAction({ pieceId }),

	/**
	 * Create an action to move a piece from one board location to another, optionally swapping with an existing piece.
	 *
	 * @param srcPieceId The ID of the piece to move.
	 * @param srcX The X coordinate of the source location.
	 * @param srcY The Y coordinate of the source location.
	 * @param destX The X coordinate of the destination location.
	 * @param destY The Y coordinate of the destination location.
	 * @param destPieceId The ID of the piece at the destination location, if any (for swapping).
	 *
	 * @returns The action to perform the move or swap.
	 */
	boardToBoard: (
		srcPieceId: string,
		srcX: number,
		srcY: number,
		destX: number,
		destY: number,
		destPieceId?: string
	): Action => {
		const from = boardLocation(srcX, srcY);
		const to = boardLocation(destX, destY);
		return destPieceId
			? PlayerActions.swapPiecePlayerAction({
					pieceAId: srcPieceId,
					pieceALocation: from,
					pieceBId: destPieceId,
					pieceBLocation: to,
				})
			: PlayerActions.dropPiecePlayerAction({
					pieceId: srcPieceId,
					from,
					to,
				});
	},

	/**
	 * Move a piece from the bench to the board, optionally swapping with an existing piece.
	 *
	 * @param srcPieceId The ID of the piece to move.
	 * @param srcX The X coordinate of the source location on the bench.
	 * @param destX The X coordinate of the destination location on the board.
	 * @param destY The Y coordinate of the destination location on the board.
	 * @param destPieceId The ID of the piece at the destination location, if any (for swapping).
	 *
	 * @returns The action to perform the move or swap.
	 */
	benchToBoard: (
		srcPieceId: string,
		srcX: number,
		destX: number,
		destY: number,
		destPieceId?: string
	): Action => {
		const from = benchLocation(srcX);
		const to = boardLocation(destX, destY);
		return destPieceId
			? PlayerActions.swapPiecePlayerAction({
					pieceAId: srcPieceId,
					pieceALocation: from,
					pieceBId: destPieceId,
					pieceBLocation: to,
				})
			: PlayerActions.dropPiecePlayerAction({
					pieceId: srcPieceId,
					from,
					to,
				});
	},

	/**
	 * Move a piece from the board to an empty spot on the bench.
	 *
	 * @param srcPieceId The ID of the piece to move.
	 * @param srcX The X coordinate of the source location on the board.
	 * @param srcY The Y coordinate of the source location on the board.
	 * @param benchX The X coordinate of the destination location on the bench.
	 *
	 * @returns The action to perform the move.
	 */
	boardToBench: (
		srcPieceId: string,
		srcX: number,
		srcY: number,
		benchX: number
	): Action =>
		PlayerActions.dropPiecePlayerAction({
			pieceId: srcPieceId,
			from: boardLocation(srcX, srcY),
			to: benchLocation(benchX),
		}),
};
