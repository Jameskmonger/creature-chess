import { SubscribableBoard } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import {
	getAvailableCreatureIds,
	getCreatureDefinitionById,
} from "~/networking/creatureDefinitions";

const BOARD_SIZE = 8;

export type RandomBoardState = {
	board: SubscribableBoard;
	pieces: Record<string, PieceModel>;
};

export function getRandomBoardState(
	id: string,
	minPieces = 3
): RandomBoardState {
	const board = new SubscribableBoard(BOARD_SIZE, BOARD_SIZE);
	const pieces: Record<string, PieceModel> = {};

	const definitionIds = getAvailableCreatureIds();
	if (definitionIds.length === 0) {
		return { board, pieces };
	}

	const count = minPieces + Math.floor(Math.random() * 5);
	const placements: { id: string; x: number; y: number }[] = [];
	const used = new Set<string>();

	let guard = 0;
	while (placements.length < count && guard < count * 10) {
		guard++;

		const x = Math.floor(Math.random() * BOARD_SIZE);
		const y = Math.floor(Math.random() * BOARD_SIZE);
		const key = `${x},${y}`;
		if (used.has(key)) {
			continue;
		}

		const definitionId =
			definitionIds[Math.floor(Math.random() * definitionIds.length)];
		const definition = getCreatureDefinitionById(definitionId);
		if (!definition) {
			continue;
		}

		used.add(key);

		const pieceId = `${id}-${placements.length}`;
		pieces[pieceId] = {
			id: pieceId,
			// top half "away" (enemy), bottom half "home" (friendly)
			ownerId: y < BOARD_SIZE / 2 ? "away" : "home",
			definitionId,
			traits: definition.traits,
			stage: 0,
			maxHealth: definition.stages[0]?.hp ?? 1,
		};
		placements.push({ id: pieceId, x, y });
	}

	board.setPieces(placements);

	return { board, pieces };
}
