import { Board, rotateBoard } from "@creature-chess/board";
import { CreatureDefinition, PieceModel } from "@creature-chess/models";
import { buildPieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { PieceCombatState, PieceInfoStore, pieceInfoStore } from "../../state";
import { StandardTargetProvider } from "./StandardTargetProvider";

const makeInitialCombatState = (
	overrides: Partial<PieceCombatState> = {}
): PieceCombatState => ({
	state: { type: "wandering" },
	canMoveAtTurn: 0,
	canBeAttackedAtTurn: 0,
	canAttackAtTurn: 0,
	currentHealth: 100,
	facingAway: false,
	battleStats: { damageDealt: 0, damageTaken: 0, turnsSurvived: 0 },
	...overrides,
});

function seedPieces(
	combatStore: PieceInfoStore<PieceCombatState>,
	pieces: PieceModel[],
	overrides: Record<string, Partial<PieceCombatState>> = {}
) {
	for (const piece of pieces) {
		combatStore.seedPiece(
			piece.id,
			makeInitialCombatState(overrides[piece.id])
		);
	}
}

/**
 * When the board is rotated, pieces also need to have their
 * facing direction flipped. This is to mimic the actual game behavior.
 */
function rotateTestBoard(
	board: Board,
	pieceRegistry: PieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>
) {
	rotateBoard(board);

	board.getAllPieces().forEach((piece) => {
		const existing = combatStore.getPiece(piece.id);
		combatStore.updatePiecePartial(piece.id, {
			facingAway: !existing.facingAway,
		});
	});
}

describe("StandardTargetProvider", () => {
	const subject = new StandardTargetProvider();

	let pieceRegistry: PieceRegistry;
	let combatStore: PieceInfoStore<PieceCombatState>;
	let board: Board;
	let attacker: PieceModel;
	let northEnemy: PieceModel;
	let southEnemy: PieceModel;

	beforeEach(() => {
		attacker = buildPieceModel({
			id: "attacker",
			ownerId: "attacker",
		});
		northEnemy = buildPieceModel({
			id: "northEnemy",
			ownerId: "enemy",
		});
		southEnemy = buildPieceModel({
			id: "southEnemy",
			ownerId: "enemy",
		});

		board = new Board(7, 6);

		board.setPiece(attacker.id, 1, 3);
		board.setPiece(northEnemy.id, 1, 2);
		board.setPiece(southEnemy.id, 1, 4);

		pieceRegistry = new PieceRegistry();

		pieceRegistry.registerPiece(attacker);
		pieceRegistry.registerPiece(northEnemy);
		pieceRegistry.registerPiece(southEnemy);

		combatStore = pieceInfoStore<PieceCombatState>();
		seedPieces(combatStore, [attacker, northEnemy, southEnemy]);

		attacker.definition.stages[attacker.stage] = {
			hp: 0,
			attack: 0,
			defense: 0,
			speed: 0,
			attackType: {
				name: "test-melee",
				range: 1,
			},
		};
	});

	describe("when piece facing north", () => {
		beforeEach(() => {
			combatStore.updatePiecePartial(attacker.id, { facingAway: true });
		});

		it("returns the id of the enemy to the north", () => {
			const targetId = subject.getTarget(
				board,
				pieceRegistry,
				combatStore,
				attacker.id
			);

			expect(targetId).toBe(northEnemy.id);
		});

		describe("when the board is rotated", () => {
			beforeEach(() => {
				rotateTestBoard(board, pieceRegistry, combatStore);
			});

			it("returns the id of the enemy to the north", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(northEnemy.id);
			});
		});

		describe("when there are two enemies in range", () => {
			const attackRange = 2;

			let northEnemyFar: PieceModel;
			beforeEach(() => {
				northEnemyFar = buildPieceModel({
					id: "northEnemyFar",
					ownerId: "enemy",
				});

				pieceRegistry.registerPiece(northEnemyFar);
				seedPieces(combatStore, [northEnemyFar]);
				board.setPiece(northEnemyFar.id, 1, 1);

				attacker.definition.stages[attacker.stage].attackType = {
					name: "test-ranged",
					range: attackRange,
				};
			});

			it("returns the closest enemy to the attacker", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(northEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the closest enemy to the attacker", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(northEnemy.id);
				});
			});
		});

		describe("when the south enemy has a higher cost", () => {
			beforeEach(() => {
				southEnemy.definition.cost = 5;
			});

			it("returns the id of the south enemy", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(southEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the id of the south enemy", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(southEnemy.id);
				});
			});
		});
	});

	describe("when piece facing south", () => {
		beforeEach(() => {
			combatStore.updatePiecePartial(attacker.id, { facingAway: false });
		});

		it("returns the id of the enemy to the south", () => {
			const targetId = subject.getTarget(
				board,
				pieceRegistry,
				combatStore,
				attacker.id
			);

			expect(targetId).toBe(southEnemy.id);
		});

		describe("when the board is rotated", () => {
			beforeEach(() => {
				rotateTestBoard(board, pieceRegistry, combatStore);
			});

			it("returns the id of the blocker to the south", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(southEnemy.id);
			});
		});

		describe("when there are two enemies in range", () => {
			const attackRange = 2;

			let southEnemyFar: PieceModel;
			beforeEach(() => {
				southEnemyFar = buildPieceModel({
					id: "southEnemyFar",
					ownerId: "enemy",
				});

				pieceRegistry.registerPiece(southEnemyFar);
				seedPieces(combatStore, [southEnemyFar]);
				board.setPiece(southEnemyFar.id, 1, 5);

				attacker.definition.stages[attacker.stage].attackType = {
					name: "test-ranged",
					range: attackRange,
				};
			});

			it("returns the closest enemy to the attacker", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(southEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the closest enemy to the attacker", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(southEnemy.id);
				});
			});
		});

		describe("when the north enemy has a higher cost", () => {
			beforeEach(() => {
				northEnemy.definition.cost = 5;
			});

			it("returns the id of the north enemy", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(northEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the id of the north enemy", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(northEnemy.id);
				});
			});
		});
	});

	describe("when multiple enemies have identical priority", () => {
		let eastEnemy: PieceModel;
		let westEnemy: PieceModel;

		const attackRange = 2;

		beforeEach(() => {
			// Setup two enemies at equal distance in the same facing direction
			// with same cost but different IDs
			eastEnemy = buildPieceModel({
				id: "eastEnemy",
				ownerId: "enemy",
				definition: { cost: 3 } as CreatureDefinition,
			});
			westEnemy = buildPieceModel({
				id: "westEnemy",
				ownerId: "enemy",
				definition: { cost: 3 } as CreatureDefinition,
			});

			board = new Board(7, 6);

			board.setPiece(attacker.id, 1, 3);
			board.setPiece(eastEnemy.id, 2, 2);
			board.setPiece(westEnemy.id, 0, 2);

			pieceRegistry = new PieceRegistry();

			pieceRegistry.registerPiece(attacker);
			pieceRegistry.registerPiece(eastEnemy);
			pieceRegistry.registerPiece(westEnemy);

			combatStore = pieceInfoStore<PieceCombatState>();
			seedPieces(combatStore, [attacker, eastEnemy, westEnemy]);

			attacker.definition.stages[attacker.stage].attackType = {
				name: "test-ranged",
				range: attackRange,
			};
		});

		it("chooses deterministically by ID when all else is equal", () => {
			const targetId = subject.getTarget(
				board,
				pieceRegistry,
				combatStore,
				attacker.id
			);

			expect(targetId).toBe(eastEnemy.id);
		});

		describe("when the board is rotated", () => {
			beforeEach(() => {
				rotateTestBoard(board, pieceRegistry, combatStore);
			});

			it("chooses deterministically by ID when all else is equal", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(eastEnemy.id);
			});
		});

		describe("when IDs are reversed", () => {
			beforeEach(() => {
				pieceRegistry.deregisterPiece(eastEnemy.id);
				pieceRegistry.deregisterPiece(westEnemy.id);
				board.removePiece(eastEnemy.id);
				board.removePiece(westEnemy.id);

				eastEnemy.id = "z_eastEnemy";
				westEnemy.id = "a_westEnemy";

				pieceRegistry.registerPiece(eastEnemy);
				pieceRegistry.registerPiece(westEnemy);
				seedPieces(combatStore, [eastEnemy, westEnemy]);

				board.setPiece(eastEnemy.id, 2, 3);
				board.setPiece(westEnemy.id, 0, 3);
			});

			it("respects ID ordering", () => {
				expect(
					subject.getTarget(board, pieceRegistry, combatStore, attacker.id)
				).toBe(westEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("respects ID ordering", () => {
					expect(
						subject.getTarget(board, pieceRegistry, combatStore, attacker.id)
					).toBe(westEnemy.id);
				});
			});
		});
	});

	describe("when one piece is blocked", () => {
		let blockedEnemy: PieceModel;
		let unblockedEnemy: PieceModel;

		beforeEach(() => {
			/**
			 * There is an enemy in front of the attacker (blockedEnemy)
			 * and one behind (unblockedEnemy).
			 *
			 * The attacker is facing south, so the blocked enemy is
			 * "closer" to the attacker.
			 *
			 * However, there are friendlies in front of the attacker,
			 * so the tile where the attacker can hit the blocked enemy
			 * is further away than the tile where the attacker can hit
			 * the unblocked enemy.
			 */

			blockedEnemy = buildPieceModel({
				id: "blockedEnemy",
				ownerId: "enemy",
			});
			unblockedEnemy = buildPieceModel({
				id: "unblockedEnemy",
				ownerId: "enemy",
			});

			const blocker1 = buildPieceModel({
				id: "blocker1",
				ownerId: "attacker",
			});
			const blocker2 = buildPieceModel({
				id: "blocker2",
				ownerId: "attacker",
			});
			const blocker3 = buildPieceModel({
				id: "blocker3",
				ownerId: "attacker",
			});

			board = new Board(7, 6);

			board.setPiece(attacker.id, 3, 3);
			board.setPiece(blockedEnemy.id, 3, 1);
			board.setPiece(unblockedEnemy.id, 3, 5);
			board.setPiece(blocker1.id, 2, 1);
			board.setPiece(blocker2.id, 3, 2);
			board.setPiece(blocker3.id, 4, 1);

			pieceRegistry = new PieceRegistry();

			pieceRegistry.registerPiece(attacker);
			pieceRegistry.registerPiece(blockedEnemy);
			pieceRegistry.registerPiece(unblockedEnemy);
			pieceRegistry.registerPiece(blocker1);
			pieceRegistry.registerPiece(blocker2);
			pieceRegistry.registerPiece(blocker3);

			combatStore = pieceInfoStore<PieceCombatState>();
			seedPieces(combatStore, [
				attacker,
				blockedEnemy,
				unblockedEnemy,
				blocker1,
				blocker2,
				blocker3,
			]);
		});

		describe("when the attacker is facing south", () => {
			beforeEach(() => {
				combatStore.updatePiecePartial(attacker.id, { facingAway: false });
			});

			it("returns the id of the unblocked enemy", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(unblockedEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the id of the unblocked enemy", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(unblockedEnemy.id);
				});
			});
		});

		describe("when the attacker is facing north", () => {
			beforeEach(() => {
				combatStore.updatePiecePartial(attacker.id, { facingAway: true });
			});

			it("returns the id of the unblocked enemy", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(unblockedEnemy.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the id of the unblocked enemy", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(unblockedEnemy.id);
				});
			});
		});
	});

	/**
	 * This test covers the case where there is a piece on the board that has
	 * no attackable tiles - this is to cover a bug.
	 */
	describe("when one piece is surrounded", () => {
		let surroundedEnemy: PieceModel;
		let blocker1: PieceModel;
		let blocker2: PieceModel;
		let blocker3: PieceModel;
		let blocker4: PieceModel;

		beforeEach(() => {
			surroundedEnemy = buildPieceModel({
				id: "surroundedEnemy",
				ownerId: "enemy",
			});
			blocker1 = buildPieceModel({
				id: "blocker1",
				ownerId: "enemy",
			});
			blocker2 = buildPieceModel({
				id: "blocker2",
				ownerId: "enemy",
			});
			blocker3 = buildPieceModel({
				id: "blocker3",
				ownerId: "enemy",
			});
			blocker4 = buildPieceModel({
				id: "blocker4",
				ownerId: "enemy",
			});

			board = new Board(7, 6);

			board.setPiece(attacker.id, 2, 3);
			board.setPiece(surroundedEnemy.id, 3, 2);
			board.setPiece(blocker3.id, 3, 1);
			board.setPiece(blocker1.id, 2, 2);
			board.setPiece(blocker2.id, 4, 2);
			board.setPiece(blocker4.id, 3, 3);

			pieceRegistry = new PieceRegistry();

			pieceRegistry.registerPiece(attacker);
			pieceRegistry.registerPiece(surroundedEnemy);
			pieceRegistry.registerPiece(blocker1);
			pieceRegistry.registerPiece(blocker2);
			pieceRegistry.registerPiece(blocker3);
			pieceRegistry.registerPiece(blocker4);

			combatStore = pieceInfoStore<PieceCombatState>();
			seedPieces(combatStore, [
				attacker,
				surroundedEnemy,
				blocker1,
				blocker2,
				blocker3,
				blocker4,
			]);
		});

		describe("when the attacker is facing south", () => {
			beforeEach(() => {
				combatStore.updatePiecePartial(attacker.id, { facingAway: false });
			});

			it("returns the id of the blocker to the north", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(blocker1.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the id of the blocker to the north", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(blocker1.id);
				});
			});
		});

		describe("when the attacker is facing north", () => {
			beforeEach(() => {
				combatStore.updatePiecePartial(attacker.id, { facingAway: true });
			});

			it("returns the id of the blocker to the north", () => {
				const targetId = subject.getTarget(
					board,
					pieceRegistry,
					combatStore,
					attacker.id
				);

				expect(targetId).toBe(blocker1.id);
			});

			describe("when the board is rotated", () => {
				beforeEach(() => {
					rotateTestBoard(board, pieceRegistry, combatStore);
				});

				it("returns the id of the blocker to the north", () => {
					const targetId = subject.getTarget(
						board,
						pieceRegistry,
						combatStore,
						attacker.id
					);

					expect(targetId).toBe(blocker1.id);
				});
			});
		});
	});
});
