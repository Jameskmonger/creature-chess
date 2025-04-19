import { BoardState } from "@shoki/board";

import { getAllDefinitions } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { buildPieceModel } from "@creature-chess/models/src/builders";

export function getRandomBoardState(id: string) {
	const homePieces: PieceModel[] = [];
	const awayPieces: PieceModel[] = [];

	const homePieceCount = Math.ceil(Math.random() * 4) + 3;
	const awayPieceCount = Math.ceil(Math.random() * 4) + 3;

	const allDefinitions = getAllDefinitions();

	let pieceCount = 0;

	for (let i = 0; i < homePieceCount; i++) {
		const definition =
			allDefinitions[Math.floor(Math.random() * allDefinitions.length)];

		homePieces.push(
			buildPieceModel({
				id: `${id}-${++pieceCount}`,
				ownerId: "away",
				definitionId: definition.id,
				traits: definition.traits,
				maxHealth: definition.stages[0].hp,
				currentHealth:
					definition.stages[0].hp -
					Math.min(
						definition.stages[0].hp,
						Math.floor(Math.random() * (definition.stages[0].hp * 0.75))
					),
				facingAway: false,
			})
		);
	}

	for (let i = 0; i < awayPieceCount; i++) {
		const definition =
			allDefinitions[Math.floor(Math.random() * allDefinitions.length)];

		awayPieces.push(
			buildPieceModel({
				id: `${id}-${++pieceCount}`,
				ownerId: "home",
				definitionId: definition.id,
				traits: definition.traits,
				maxHealth: definition.stages[0].hp,
				currentHealth:
					definition.stages[0].hp -
					Math.min(
						definition.stages[0].hp,
						Math.floor(Math.random() * (definition.stages[0].hp * 0.75))
					),
				facingAway: true,
			})
		);
	}

	const piecePositions: Record<string, string> = {};

	// todo these positions arent very realistic
	for (const piece of [...homePieces, ...awayPieces]) {
		const x = Math.floor(Math.random() * 8);
		const y = Math.floor(Math.random() * 8);

		piecePositions[`${x},${y}`] = piece.id;
	}

	const state: BoardState<PieceModel> = {
		id,
		size: {
			width: 8,
			height: 8,
		},
		pieces: [...homePieces, ...awayPieces].reduce(
			(acc, piece) => {
				acc[piece.id] = piece;
				return acc;
			},
			{} as Record<string, PieceModel>
		),
		piecePositions,
		locked: true,
		pieceLimit: null,
	};

	return state;
}
