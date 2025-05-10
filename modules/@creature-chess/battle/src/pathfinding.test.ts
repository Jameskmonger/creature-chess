import { BoardSelectors, BoardState } from "@shoki/board";
import { rotateGridPosition } from "@shoki/board/src/utils/rotateGridPosition";

import { PieceModel, attackTypes } from "@creature-chess/models";
import { buildPieceModel } from "@creature-chess/models/src/builders";
import { rotateBoard } from "@creature-chess/utils/board";

import { getNextPiecePosition, Pathfinder } from "./pathfinding";

function getOpponentsForPiece(board: BoardState<PieceModel>, pieceId: string) {
	const piece = board.pieces[pieceId];

	return Object.values(board.pieces)
		.filter((p) => p.ownerId !== piece.ownerId)
		.map((p) => p.id);
}

describe("pathfinding", () => {
	describe("when board is rotated", () => {
		const board: BoardState<PieceModel> = {
			id: "away",
			pieces: {
				"18cc443d-807f-467e-a4b4-d554da2329fe": buildPieceModel({
					id: "18cc443d-807f-467e-a4b4-d554da2329fe",
					ownerId: "A",
					definitionId: 47,
					definition: null as any,
					stage: 1,
					facingAway: false,
					maxHealth: 130,
					currentHealth: 130,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"90c0ee33-aeae-4ebe-a985-23207f9facc0": buildPieceModel({
					id: "90c0ee33-aeae-4ebe-a985-23207f9facc0",
					ownerId: "A",
					definitionId: 14,
					definition: null as any,
					stage: 2,
					facingAway: false,
					maxHealth: 262,
					currentHealth: 262,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"913d506f-3524-4481-904d-2106be40e825": buildPieceModel({
					id: "913d506f-3524-4481-904d-2106be40e825",
					ownerId: "B",
					definitionId: 13,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 34,
					currentHealth: 34,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"9d4b15d9-03b6-4906-8af8-5a215e0d0792": buildPieceModel({
					id: "9d4b15d9-03b6-4906-8af8-5a215e0d0792",
					ownerId: "B",
					definitionId: 17,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 46,
					currentHealth: 46,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"4374fce7-8be7-433a-87d9-7568deb0dddc": buildPieceModel({
					id: "4374fce7-8be7-433a-87d9-7568deb0dddc",
					ownerId: "B",
					definitionId: 37,
					definition: null as any,
					stage: 2,
					facingAway: true,
					maxHealth: 640,
					currentHealth: 640,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"7977b429-db02-4b5a-a576-5f9916497a24": buildPieceModel({
					id: "7977b429-db02-4b5a-a576-5f9916497a24",
					ownerId: "B",
					definitionId: 8,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 34,
					currentHealth: 34,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"5196ed28-794e-4db4-8653-8fd3340f5990": buildPieceModel({
					id: "5196ed28-794e-4db4-8653-8fd3340f5990",
					ownerId: "B",
					definitionId: 46,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 70,
					currentHealth: 70,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"6434e4f9-5905-47b9-9840-d8364e2deb62": buildPieceModel({
					id: "6434e4f9-5905-47b9-9840-d8364e2deb62",
					ownerId: "B",
					definitionId: 20,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 154,
					currentHealth: 154,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"b3a0546c-4c1e-462f-99cd-6ae308819830": buildPieceModel({
					id: "b3a0546c-4c1e-462f-99cd-6ae308819830",
					ownerId: "B",
					definitionId: 14,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 106,
					currentHealth: 106,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
				"e297fa3c-5cbc-4003-bcc2-66ba521acd4d": buildPieceModel({
					id: "e297fa3c-5cbc-4003-bcc2-66ba521acd4d",
					ownerId: "B",
					definitionId: 42,
					definition: null as any,
					stage: 1,
					facingAway: true,
					maxHealth: 70,
					currentHealth: 70,
					attacking: null,
					hit: null,
					lastBattleStats: null,
				}),
			},
			piecePositions: {
				"5,5": "7977b429-db02-4b5a-a576-5f9916497a24",
				"2,3": "4374fce7-8be7-433a-87d9-7568deb0dddc",
				"5,4": "5196ed28-794e-4db4-8653-8fd3340f5990",
				"4,2": "e297fa3c-5cbc-4003-bcc2-66ba521acd4d",
				"5,1": "18cc443d-807f-467e-a4b4-d554da2329fe",
				"5,2": "9d4b15d9-03b6-4906-8af8-5a215e0d0792",
				"2,1": "90c0ee33-aeae-4ebe-a985-23207f9facc0",
				"1,3": "913d506f-3524-4481-904d-2106be40e825",
				"1,4": "6434e4f9-5905-47b9-9840-d8364e2deb62",
				"3,2": "b3a0546c-4c1e-462f-99cd-6ae308819830",
			},
			locked: true,
			pieceLimit: null,
			size: {
				width: 7,
				height: 6,
			},
		};

		const rotated = rotateBoard({
			...board,
			pieces: Object.fromEntries(
				Object.entries(board.pieces).map(([key, piece]) => [
					key,
					{
						...piece,
					},
				])
			),
		});

		const pathfinder = new Pathfinder(board.size);

		test.each(
			// test each piece against each opponent
			Object.keys(board.pieces).flatMap((pieceId) => {
				const opponents = getOpponentsForPiece(board, pieceId);
				return opponents.map((targetId) => [pieceId, targetId]);
			})
		)(
			"it should move pieces to the correct positions (%s -> %s)",
			(pieceId, targetId) => {
				const homePosition = getNextPiecePosition(
					pathfinder,
					BoardSelectors.getPiecePosition(board, pieceId)!,
					BoardSelectors.getPiece(board, pieceId)!.facingAway,
					{
						attackType: attackTypes.basic,
						hp: 1,
						attack: 1,
						defense: 1,
						speed: 1,
					},
					BoardSelectors.getPiecePosition(board, targetId)!,
					board
				);

				const awayPosition = getNextPiecePosition(
					pathfinder,
					BoardSelectors.getPiecePosition(rotated, pieceId)!,
					BoardSelectors.getPiece(rotated, pieceId)!.facingAway,
					{
						attackType: attackTypes.basic,
						hp: 1,
						attack: 1,
						defense: 1,
						speed: 1,
					},
					BoardSelectors.getPiecePosition(rotated, targetId)!,
					rotated
				);

				const awayPositionCorrected = rotateGridPosition(
					rotated.size,
					awayPosition!
				);

				expect(awayPositionCorrected!.x).toBe(homePosition!.x);
				expect(awayPositionCorrected!.y).toBe(homePosition!.y);
			}
		);
	});
});
