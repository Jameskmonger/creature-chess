import { Board, packPosition } from "@creature-chess/board";
import {
	PIECES_TO_EVOLVE,
	PieceModel,
	getDefinitionById,
} from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import type { Player } from "../player";

const pieceCanEvolve = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);
	if (!definition) {
		return false;
	}
	return piece.stage < definition.stages.length - 1;
};

const getRegisteredPieces = (board: Board, registry: PieceRegistry) =>
	board
		.getAllPieces()
		.map(({ id }) => registry.getPieceById(id))
		.filter((p): p is NonNullable<typeof p> => p !== null);

type EvolvableGroup = { definitionId: number; stage: number };

const findEvolvableGroup = (pieces: PieceModel[]): EvolvableGroup | null => {
	const counts = new Map<string, number>();
	for (const piece of pieces) {
		if (!pieceCanEvolve(piece)) {
			continue;
		}
		const key = `${piece.definitionId}:${piece.stage}`;
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
	for (const [key, count] of counts) {
		if (count >= PIECES_TO_EVOLVE) {
			const [definitionId, stage] = key.split(":").map(Number);
			return { definitionId, stage };
		}
	}
	return null;
};

const applyEvolution = (player: Player, group: EvolvableGroup): void => {
	const {
		board,
		bench,
		gamemode: { pieceRegistry },
	} = player;

	const matchesGroup = (p: PieceModel) =>
		p.definitionId === group.definitionId && p.stage === group.stage;

	const matchingBoard = getRegisteredPieces(board, pieceRegistry).filter(
		matchesGroup
	);
	const matchingBench = getRegisteredPieces(bench, pieceRegistry).filter(
		matchesGroup
	);

	if (matchingBoard.length > 0) {
		const target = matchingBoard.pop()!;
		const piecePosition = board.getPiecePosition(target.id);
		if (!piecePosition) {
			return;
		}
		const [x, y] = piecePosition;

		const consumedIds = [...matchingBoard, target, ...matchingBench].map(
			(p) => p.id
		);
		// Don't return to the deck as we are evolving them into a new piece.
		player.removePieces(consumedIds, { returnToDeck: false });

		player.addPiece(
			{ ...target, stage: group.stage + 1 },
			{ type: "board", location: packPosition(x, y) }
		);
	} else {
		const target = matchingBench.pop()!;
		const benchPosition = bench.getPiecePosition(target.id);
		if (!benchPosition) {
			return;
		}
		const [x] = benchPosition;

		const consumedIds = [...matchingBench, target].map((p) => p.id);
		player.removePieces(consumedIds, { returnToDeck: false });

		player.addPiece(
			{ ...target, stage: group.stage + 1 },
			{ type: "bench", location: packPosition(x, 0) }
		);
	}
};

// Handles one group per call; chain evolutions cascade via the addBoardPiece /
// addBenchPiece mutators re-entering on the placed evolved piece.
export const runEvolutions = (player: Player): void => {
	if (player.boardLocked) {
		return;
	}
	const {
		board,
		bench,
		gamemode: { pieceRegistry },
	} = player;
	const allPieces = [
		...getRegisteredPieces(board, pieceRegistry),
		...getRegisteredPieces(bench, pieceRegistry),
	];
	const group = findEvolvableGroup(allPieces);
	if (!group) {
		return;
	}
	applyEvolution(player, group);
};
