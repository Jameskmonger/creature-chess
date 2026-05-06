import { Action } from "redux";

import { Board } from "@creature-chess/board";
import { getDefinitionById } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BotActions, PreparingPhaseContext } from "@cc-server/bot";

/** Fill empty board slots from bench, then upgrade weakest-board with strongest-bench. */
export const nextPlacementAction = (
	ctx: PreparingPhaseContext
): Action | null => {
	const { board, bench, pieceRegistry, player } = ctx;
	const level = player.level;

	const benchPieces = bench.getAllPieces();
	const boardPieces = board.getAllPieces();

	if (benchPieces.length === 0) {
		return null;
	}

	if (boardPieces.length < level) {
		const leftmost = benchPieces[0];
		const benchSlot = bench.getPiecePosition(leftmost.id);
		const emptySlot = findFirstEmptyBoardSlot(board);
		if (benchSlot && emptySlot) {
			return BotActions.benchToBoard(
				leftmost.id,
				benchSlot[0],
				emptySlot.x,
				emptySlot.y
			);
		}
	}

	const strongestBench = strongestPiece(benchPieces, pieceRegistry);
	const weakestBoard = weakestPiece(boardPieces, pieceRegistry);
	if (
		strongestBench &&
		weakestBoard &&
		strength(strongestBench.id, pieceRegistry) >
			strength(weakestBoard.id, pieceRegistry)
	) {
		const benchSlot = bench.getPiecePosition(strongestBench.id);
		const boardSlot = board.getPiecePosition(weakestBoard.id);
		if (benchSlot && boardSlot) {
			return BotActions.benchToBoard(
				strongestBench.id,
				benchSlot[0],
				boardSlot[0],
				boardSlot[1],
				weakestBoard.id
			);
		}
	}

	return null;
};

const findFirstEmptyBoardSlot = (
	board: Board
): { x: number; y: number } | null => {
	for (let y = 0; y < board.height; y += 1) {
		for (let x = 0; x < board.width; x += 1) {
			if (!board.getPieceIdAtPosition(x, y)) {
				return { x, y };
			}
		}
	}
	return null;
};

// stage * 10 + cost: a 2★ piece always outranks any 1★, cost breaks ties within a stage.
const strength = (pieceId: string, pieceRegistry: PieceRegistry): number => {
	const piece = pieceRegistry.getPieceById(pieceId);
	if (!piece) {
		return 0;
	}
	const def = getDefinitionById(piece.definitionId);
	return piece.stage * 10 + (def?.cost ?? 0);
};

const strongestPiece = <T extends { id: string }>(
	pieces: readonly T[],
	pieceRegistry: PieceRegistry
): T | null =>
	pieces.reduce<T | null>((best, p) => {
		if (!best) {
			return p;
		}
		return strength(p.id, pieceRegistry) > strength(best.id, pieceRegistry)
			? p
			: best;
	}, null);

const weakestPiece = <T extends { id: string }>(
	pieces: readonly T[],
	pieceRegistry: PieceRegistry
): T | null =>
	pieces.reduce<T | null>((worst, p) => {
		if (!worst) {
			return p;
		}
		return strength(p.id, pieceRegistry) < strength(worst.id, pieceRegistry)
			? p
			: worst;
	}, null);
