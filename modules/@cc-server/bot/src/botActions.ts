import { PlayerActions } from "@creature-chess/models";

import { packPosition } from "@creature-chess/board";

import { BotAction } from "./types";

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
	buyCard: (index: number): BotAction =>
		PlayerActions.buyCardPlayerAction({ index }),

	/**
	 * Buy one set of XP.
	 *
	 * @returns The action to perform the XP purchase.
	 */
	buyXp: (): BotAction => PlayerActions.buyXpPlayerAction(),

	/**
	 * Reroll the shop cards.
	 *
	 * @returns The action to perform the reroll.
	 */
	rerollCards: (): BotAction => PlayerActions.rerollCardsPlayerAction(),

	/**
	 * Sell a piece from the board or bench.
	 *
	 * @param pieceId The ID of the piece to sell.
	 *
	 * @returns The action to perform the sell.
	 */
	sellPiece: (pieceId: string): BotAction =>
		PlayerActions.sellPiecePlayerAction({ pieceId }),

	/**
	 * Create an action to move a piece from one board location to another, optionally swapping with an existing piece.
	 *
	 * @param srcPieceId The ID of the piece to move.
	 * @param destX The X coordinate of the destination location.
	 * @param destY The Y coordinate of the destination location.
	 * @param destPieceId The ID of the piece at the destination location, if any (for swapping).
	 *
	 * @returns The action to perform the move or swap.
	 */
	boardToBoard: (
		srcPieceId: string,
		destX: number,
		destY: number,
		destPieceId?: string
	): BotAction =>
		destPieceId
			? PlayerActions.swapPiecePlayerAction({
					pieceAId: srcPieceId,
					pieceBId: destPieceId,
				})
			: PlayerActions.dropPiecePlayerAction({
					pieceId: srcPieceId,
					to: boardLocation(destX, destY),
				}),

	/**
	 * Move a piece from the bench to the board, optionally swapping with an existing piece.
	 *
	 * @param srcPieceId The ID of the piece to move.
	 * @param destX The X coordinate of the destination location on the board.
	 * @param destY The Y coordinate of the destination location on the board.
	 * @param destPieceId The ID of the piece at the destination location, if any (for swapping).
	 *
	 * @returns The action to perform the move or swap.
	 */
	benchToBoard: (
		srcPieceId: string,
		destX: number,
		destY: number,
		destPieceId?: string
	): BotAction =>
		destPieceId
			? PlayerActions.swapPiecePlayerAction({
					pieceAId: srcPieceId,
					pieceBId: destPieceId,
				})
			: PlayerActions.dropPiecePlayerAction({
					pieceId: srcPieceId,
					to: boardLocation(destX, destY),
				}),

	/**
	 * Move a piece from the board to an empty spot on the bench.
	 *
	 * @param srcPieceId The ID of the piece to move.
	 * @param benchX The X coordinate of the destination location on the bench.
	 *
	 * @returns The action to perform the move.
	 */
	boardToBench: (srcPieceId: string, benchX: number): BotAction =>
		PlayerActions.dropPiecePlayerAction({
			pieceId: srcPieceId,
			to: benchLocation(benchX),
		}),
};
