import { attackTypes, PieceModel } from "@creature-chess/models";
import { buildPieceModel } from "@creature-chess/models/src/builders";

import { getNextPiecePosition, Pathfinder } from "./pathfinding";
import { Board, packPosition, rotateBoard, rotateGridPosition, unpackX, unpackY } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

function getOpponentsForPiece(pieces: PieceModel[], pieceId: string) {
	const piece = pieces.find((p) => p.id === pieceId)!;

	return pieces
		.filter((p) => p.ownerId !== piece.ownerId)
		.map((p) => p.id);
}

/**
 * When the board is rotated, pieces also need to have their
 * facing direction flipped. This is to mimic the actual game behavior.
 */
function rotateTestBoard(board: Board, pieceRegistry: PieceRegistry) {
	rotateBoard(board);

	board.getAllPieces().forEach((piece) => {
		const p = pieceRegistry.getPieceById(piece.id);

		p!.facingAway = !p!.facingAway;
	});
}

describe("pathfinding", () => {
	describe("when board is rotated", () => {
		const b = {
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

		let pieceRegistry: PieceRegistry;
		let board: Board;
		let rotatedPieceRegistry: PieceRegistry;
		let rotated: Board;
		let pathfinder: Pathfinder;

		beforeEach(() => {
			pieceRegistry = new PieceRegistry();
			rotatedPieceRegistry = new PieceRegistry();
			board = new Board(7, 6);

			Object.values(b.pieces).forEach((p) => pieceRegistry.registerPiece({ ...p }));

			Object.values(b.pieces).forEach((p) => rotatedPieceRegistry.registerPiece({ ...p }));

			Object.entries(b.piecePositions)
				.map(([pos, id]) => {
					const [xStr, yStr] = pos.split(",");
					const x = parseInt(xStr, 10);
					const y = parseInt(yStr, 10);

					return { id, x, y };
				})
				.forEach(({ id, x, y }) => {
					board.setPiece(id, x, y);
				});

			rotated = board.clone();
			rotateTestBoard(rotated, rotatedPieceRegistry);

			pathfinder = new Pathfinder({ width: board.width, height: board.height });
		});

		test.each(
			// test each piece against each opponent
			Object.values(b.pieces).flatMap(({ id: pieceId }) => {
				const opponents = getOpponentsForPiece(Object.values(b.pieces), pieceId);
				return opponents.map((targetId) => [pieceId, targetId]);
			})
		)(
			"it should move pieces to the correct positions (%s -> %s)",
			(pieceId, targetId) => {
				const homePosA = board.getPiecePosition(pieceId)!;
				const homePosB = board.getPiecePosition(targetId)!;

				const homePosition = getNextPiecePosition(
					pathfinder,
					{ x: homePosA[0], y: homePosA[1] },
					pieceRegistry.getPieceById(pieceId)!.facingAway,
					{
						attackType: attackTypes.basic,
						hp: 1,
						attack: 1,
						defense: 1,
						speed: 1,
					},
					{ x: homePosB[0], y: homePosB[1] },
					board
				);

				const awayPosA = rotated.getPiecePosition(pieceId)!;
				const awayPosB = rotated.getPiecePosition(targetId)!;

				const awayPosition = getNextPiecePosition(
					pathfinder,
					{ x: awayPosA[0], y: awayPosA[1] },
					rotatedPieceRegistry.getPieceById(pieceId)!.facingAway,
					{
						attackType: attackTypes.basic,
						hp: 1,
						attack: 1,
						defense: 1,
						speed: 1,
					},
					{ x: awayPosB[0], y: awayPosB[1] },
					rotated
				);

				const awayPositionCorrected = rotateGridPosition(
					{ width: board.width, height: board.height },
					packPosition(awayPosition!.x, awayPosition!.y),
				);

				expect({
					x: unpackX(awayPositionCorrected),
					y: unpackY(awayPositionCorrected),
				}).toEqual({
					x: homePosition!.x,
					y: homePosition!.y,
				});
			}
		);
	});
});
