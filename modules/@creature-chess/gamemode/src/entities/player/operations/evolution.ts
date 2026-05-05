import { Board, packPosition } from "@creature-chess/board";
import { getDefinitionById, PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { Player } from "../player";

export const pieceCanEvolve = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);
	if (!definition) {
		return false;
	}
	return piece.stage < definition.stages.length - 1;
};

const getPiecesForDefinition = (
	board: Board,
	pieceRegistry: PieceRegistry,
	definitionId: number
) =>
	board
		.getAllPieces()
		.map(({ id }) => pieceRegistry.getPieceById(id))
		.filter((p): p is NonNullable<typeof p> => p !== null)
		.filter((p) => p.definitionId === definitionId);

const getCombinablePieces = (pieces: PieceModel[], targetStage: number) =>
	pieces.filter((p) => p.stage === targetStage);

/**
 * If the player has at least PIECES_TO_EVOLVE pieces of the given definition
 * and stage across board+bench, combine them into one piece at the next stage.
 *
 * Caller is responsible for ensuring the board is unlocked — this routine
 * mutates the board.
 */
export const evolvePieces = (
	player: Player,
	definitionId: number,
	stage: number
): void => {
	const {
		board,
		bench,
		gamemode: { pieceRegistry },
	} = player;

	const matchingBoardPieces = getCombinablePieces(
		getPiecesForDefinition(board, pieceRegistry, definitionId),
		stage
	);
	const matchingBenchPieces = getCombinablePieces(
		getPiecesForDefinition(bench, pieceRegistry, definitionId),
		stage
	);

	const totalInstances =
		matchingBoardPieces.length + matchingBenchPieces.length;

	if (totalInstances < PIECES_TO_EVOLVE) {
		return;
	}

	if (matchingBoardPieces.length > 0) {
		// replace a board piece if one exists
		const boardPieceToReplace = matchingBoardPieces.pop()!;
		const piecePosition = board.getPiecePosition(boardPieceToReplace.id);
		if (!piecePosition) {
			return;
		}
		const [x, y] = piecePosition;

		const targetBoardPieceIds = [
			...matchingBoardPieces,
			boardPieceToReplace,
		].map((p) => p.id);
		player.removeBoardPieces({ pieceIds: targetBoardPieceIds });

		const targetBenchPieceIds = matchingBenchPieces.map((p) => p.id);
		player.removeBenchPieces({ pieceIds: targetBenchPieceIds });

		for (const pid of [...targetBoardPieceIds, ...targetBenchPieceIds]) {
			pieceRegistry.deregisterPiece(pid);
		}

		const evolved = { ...boardPieceToReplace, stage: stage + 1 };
		pieceRegistry.registerPiece(evolved);

		player.addBoardPiece({
			pieceId: evolved.id,
			position: packPosition(x, y),
		});
		return;
	}

	// otherwise replace one of the bench pieces
	const pieceToReplace = matchingBenchPieces.pop()!;
	const benchPiecePosition = bench.getPiecePosition(pieceToReplace.id);
	if (!benchPiecePosition) {
		return;
	}
	const [bx] = benchPiecePosition;

	const benchPieceIds = [...matchingBenchPieces, pieceToReplace].map(
		(p) => p.id
	);
	player.removeBenchPieces({ pieceIds: benchPieceIds });

	for (const id of benchPieceIds) {
		pieceRegistry.deregisterPiece(id);
	}

	const newPiece = { ...pieceToReplace, stage: stage + 1 };
	pieceRegistry.registerPiece(newPiece);

	player.addBenchPiece({
		pieceId: newPiece.id,
		position: { x: bx },
	});
};

export const queueEvolutionCheck = (
	player: Player,
	definitionId: number,
	stage: number
): void => {
	player.pendingEvolutionChecks.add(`${definitionId}:${stage}`);
};

/**
 * Run evolution checks queued during a locked phase. Called from
 * PhaseRules.onPreparingPhaseStart, after the board has unlocked.
 */
export const drainPendingEvolutionChecks = (player: Player): void => {
	for (const key of player.pendingEvolutionChecks) {
		const [definitionId, stage] = key.split(":").map(Number);
		evolvePieces(player, definitionId, stage);
	}
	player.pendingEvolutionChecks.clear();
};
