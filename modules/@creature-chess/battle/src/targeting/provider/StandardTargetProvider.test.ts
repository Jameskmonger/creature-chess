import { BoardState } from "@shoki/board";

import { CreatureDefinition, PieceModel } from "@creature-chess/models";
import { buildPieceModel } from "@creature-chess/models/src/builders";

import { StandardTargetProvider } from "./StandardTargetProvider";

describe("StandardTargetProvider", () => {
	const subject = new StandardTargetProvider();

	let board: BoardState<PieceModel>;
	let attacker: PieceModel;
	let northEnemy: PieceModel;
	let southEnemy: PieceModel;

	beforeEach(() => {
		attacker = buildPieceModel({
			id: "attacker",
			ownerId: "attacker",
			currentHealth: 100,
		});
		northEnemy = buildPieceModel({
			id: "northEnemy",
			ownerId: "enemy",
			currentHealth: 100,
		});
		southEnemy = buildPieceModel({
			id: "southEnemy",
			ownerId: "enemy",
			currentHealth: 100,
		});

		board = {
			id: "board",
			pieces: {
				attacker,
				northEnemy,
				southEnemy,
			},
			piecePositions: {
				["1,3"]: attacker.id,
				["1,2"]: northEnemy.id,
				["1,4"]: southEnemy.id,
			},
			pieceLimit: null,
			locked: false,
			size: {
				width: 7,
				height: 6,
			},
		};

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
			attacker.facingAway = true;
		});

		it("returns the id of the enemy to the north", () => {
			const targetId = subject.getTarget(attacker, board);

			expect(targetId).toBe(northEnemy.id);
		});

		describe("when there are two enemies in range", () => {
			const attackRange = 2;

			let northEnemyFar: PieceModel;
			beforeEach(() => {
				northEnemyFar = buildPieceModel({
					id: "northEnemyFar",
					ownerId: "enemy",
					currentHealth: 100,
				});

				board.pieces[northEnemyFar.id] = northEnemyFar;
				board.piecePositions["1,1"] = northEnemyFar.id;

				attacker.definition.stages[attacker.stage].attackType = {
					name: "test-ranged",
					range: attackRange,
				};
			});

			it("returns the closest enemy to the attacker", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(northEnemy.id);
			});
		});

		describe("when the south enemy has a higher cost", () => {
			beforeEach(() => {
				southEnemy.definition.cost = 5;
			});

			it("returns the id of the south enemy", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(southEnemy.id);
			});
		});
	});

	describe("when piece facing south", () => {
		beforeEach(() => {
			attacker.facingAway = false;
		});

		it("returns the id of the enemy to the south", () => {
			const targetId = subject.getTarget(attacker, board);

			expect(targetId).toBe(southEnemy.id);
		});

		describe("when there are two enemies in range", () => {
			const attackRange = 2;

			let southEnemyFar: PieceModel;
			beforeEach(() => {
				southEnemyFar = buildPieceModel({
					id: "southEnemyFar",
					ownerId: "enemy",
					currentHealth: 100,
				});

				board.pieces[southEnemyFar.id] = southEnemyFar;
				board.piecePositions["1,5"] = southEnemyFar.id;

				attacker.definition.stages[attacker.stage].attackType = {
					name: "test-ranged",
					range: attackRange,
				};
			});

			it("returns the closest enemy to the attacker", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(southEnemy.id);
			});
		});

		describe("when the north enemy has a higher cost", () => {
			beforeEach(() => {
				northEnemy.definition.cost = 5;
			});

			it("returns the id of the north enemy", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(northEnemy.id);
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
				currentHealth: 100,
				definition: { cost: 3 } as CreatureDefinition,
			});
			westEnemy = buildPieceModel({
				id: "westEnemy",
				ownerId: "enemy",
				currentHealth: 100,
				definition: { cost: 3 } as CreatureDefinition,
			});

			board = {
				id: "board",
				pieces: {
					attacker,
					eastEnemy,
					westEnemy,
				},
				piecePositions: {
					["1,3"]: attacker.id,
					["2,2"]: eastEnemy.id,
					["0,2"]: westEnemy.id,
				},
				pieceLimit: null,
				locked: false,
				size: {
					width: 7,
					height: 6,
				},
			};

			attacker.definition.stages[attacker.stage].attackType = {
				name: "test-ranged",
				range: attackRange,
			};
		});

		it("chooses deterministically by ID when all else is equal", () => {
			const targetId = subject.getTarget(attacker, board);

			expect(targetId).toBe(eastEnemy.id);

			for (let i = 0; i < 10; i++) {
				expect(subject.getTarget(attacker, board)).toBe(eastEnemy.id);
			}
		});

		describe("when IDs are reversed", () => {
			beforeEach(() => {
				delete board.pieces[eastEnemy.id];
				delete board.pieces[westEnemy.id];

				eastEnemy.id = "z_eastEnemy";
				westEnemy.id = "a_westEnemy";

				board.pieces[eastEnemy.id] = eastEnemy;
				board.pieces[westEnemy.id] = westEnemy;
				board.piecePositions["2,3"] = eastEnemy.id;
				board.piecePositions["0,3"] = westEnemy.id;
			});

			it("respects ID ordering", () => {
				expect(subject.getTarget(attacker, board)).toBe(westEnemy.id);
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
				currentHealth: 100,
			});
			unblockedEnemy = buildPieceModel({
				id: "unblockedEnemy",
				ownerId: "enemy",
				currentHealth: 100,
			});

			const blocker1 = buildPieceModel({
				id: "blocker1",
				ownerId: "attacker",
				currentHealth: 100,
			});
			const blocker2 = buildPieceModel({
				id: "blocker2",
				ownerId: "attacker",
				currentHealth: 100,
			});
			const blocker3 = buildPieceModel({
				id: "blocker3",
				ownerId: "attacker",
				currentHealth: 100,
			});

			board = {
				id: "board",
				pieces: {
					attacker,
					blockedEnemy,
					unblockedEnemy,
					blocker1,
					blocker2,
					blocker3,
				},
				piecePositions: {
					["3,3"]: attacker.id,
					["3,1"]: blockedEnemy.id,
					["3,5"]: unblockedEnemy.id,
					["2,1"]: blocker1.id,
					["3,2"]: blocker2.id,
					["4,1"]: blocker3.id,
				},
				pieceLimit: null,
				locked: false,
				size: {
					width: 7,
					height: 6,
				},
			};
		});

		describe("when the attacker is facing south", () => {
			beforeEach(() => {
				attacker.facingAway = false;
			});

			it("returns the id of the unblocked enemy", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(unblockedEnemy.id);
			});
		});

		describe("when the attacker is facing north", () => {
			beforeEach(() => {
				attacker.facingAway = true;
			});

			it("returns the id of the unblocked enemy", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(unblockedEnemy.id);
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
				currentHealth: 100,
			});
			blocker1 = buildPieceModel({
				id: "blocker1",
				ownerId: "enemy",
				currentHealth: 100,
			});
			blocker2 = buildPieceModel({
				id: "blocker2",
				ownerId: "enemy",
				currentHealth: 100,
			});
			blocker3 = buildPieceModel({
				id: "blocker3",
				ownerId: "enemy",
				currentHealth: 100,
			});
			blocker4 = buildPieceModel({
				id: "blocker4",
				ownerId: "enemy",
				currentHealth: 100,
			});

			board.pieces = {
				attacker,
				surroundedEnemy,
				blocker1,
				blocker2,
				blocker3,
			};
			board.piecePositions = {
				["2,3"]: attacker.id,

				["3,2"]: surroundedEnemy.id,
				["3,1"]: blocker3.id,
				["2,2"]: blocker1.id,
				["4,2"]: blocker2.id,
				["3,3"]: blocker4.id,
			};
		});

		describe("when the attacker is facing south", () => {
			beforeEach(() => {
				attacker.facingAway = false;
			});

			it("returns the id of the blocker to the north", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(blocker1.id);
			});
		});

		describe("when the attacker is facing north", () => {
			beforeEach(() => {
				attacker.facingAway = true;
			});

			it("returns the id of the blocker to the north", () => {
				const targetId = subject.getTarget(attacker, board);

				expect(targetId).toBe(blocker1.id);
			});
		});
	});
});
