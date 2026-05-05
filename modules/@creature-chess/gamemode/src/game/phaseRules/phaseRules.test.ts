import { packPosition } from "@creature-chess/board";
import { GamePhase, PlayerStatus, StreakType } from "@creature-chess/models";

import { drainPendingEvolutionChecks } from "../../entities/player/operations/evolution";
import { Player } from "../../entities/player/player";
import { createTestPlayer } from "../../entities/player/testUtils";
import { gamePhaseStartedEvent } from "../events";
import { phaseRules } from ".";

const lockBoard = (player: Player) => {
	player.put(
		gamePhaseStartedEvent({ phase: GamePhase.PLAYING, startedAt: 0 })
	);
};

const unlockBoard = (player: Player) => {
	player.put(
		gamePhaseStartedEvent({ phase: GamePhase.PREPARING, startedAt: 0 })
	);
};

const definitionId = 1; // Budaye, has 3 stages
const makePiece = (id: string, stage: number) => ({
	id,
	ownerId: "p1",
	definitionId,
	stage,
	traits: [],
	maxHealth: 100,
});

describe("PhaseRules — evolution invariant", () => {
	test("adding 3 pieces of same definition+stage while unlocked auto-combines into stage+1", () => {
		const player = createTestPlayer();
		unlockBoard(player);

		const { pieceRegistry } = player.gamemode;
		const pieces = ["a", "b", "c"].map((pid) => makePiece(pid, 0));
		pieces.forEach((p) => pieceRegistry.registerPiece(p));

		player.addBenchPiece({ pieceId: "a", position: { x: 0 } });
		player.addBenchPiece({ pieceId: "b", position: { x: 1 } });
		player.addBenchPiece({ pieceId: "c", position: { x: 2 } });

		const benchPieces = player.bench.getAllPieces();
		expect(benchPieces).toHaveLength(1);

		const evolved = pieceRegistry.getPieceById(benchPieces[0].id)!;
		expect(evolved.definitionId).toBe(definitionId);
		expect(evolved.stage).toBe(1);
	});

	test("adding pieces while board locked defers — drain on preparing-phase start combines them", () => {
		const player = createTestPlayer();
		lockBoard(player);

		const { pieceRegistry } = player.gamemode;
		["a", "b", "c"].forEach((pid) =>
			pieceRegistry.registerPiece(makePiece(pid, 0))
		);

		player.addBenchPiece({ pieceId: "a", position: { x: 0 } });
		player.addBenchPiece({ pieceId: "b", position: { x: 1 } });
		player.addBenchPiece({ pieceId: "c", position: { x: 2 } });

		expect(player.bench.getAllPieces()).toHaveLength(3);
		expect(player.pendingEvolutionChecks.has(`${definitionId}:0`)).toBe(true);

		unlockBoard(player);
		drainPendingEvolutionChecks(player);

		expect(player.bench.getAllPieces()).toHaveLength(1);
		expect(player.pendingEvolutionChecks.size).toBe(0);
	});

	test("evolution combines pieces split across board+bench when sufficient total", () => {
		const player = createTestPlayer();
		unlockBoard(player);

		const { pieceRegistry } = player.gamemode;
		["a", "b", "c"].forEach((pid) =>
			pieceRegistry.registerPiece(makePiece(pid, 0))
		);

		player.addBoardPiece({ pieceId: "a", position: packPosition(0, 0) });
		player.addBoardPiece({ pieceId: "b", position: packPosition(1, 0) });
		player.addBenchPiece({ pieceId: "c", position: { x: 0 } });

		expect(player.board.getAllPieces()).toHaveLength(1);
		expect(player.bench.getAllPieces()).toHaveLength(0);

		const evolved = pieceRegistry.getPieceById(
			player.board.getAllPieces()[0].id
		)!;
		expect(evolved.stage).toBe(1);
	});
});

describe("PhaseRules — onMatchSettled", () => {
	test("home player loss: takes damage equal to enemy pieces remaining * healthLostPerPiece", () => {
		const player = createTestPlayer();
		const startingHealth = player.health;

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 4,
			isHomePlayer: true,
		});

		const expected = startingHealth - 4 * player.settings.healthLostPerPiece;
		expect(player.health).toBe(expected);
	});

	test("away player win: home took damage but this player did not", () => {
		const player = createTestPlayer();
		const startingHealth = player.health;

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 3,
			isHomePlayer: false,
		});

		expect(player.health).toBe(startingHealth);
	});

	test("damage that reduces health to zero marks the player dead", () => {
		const player = createTestPlayer();
		player.setHealth(1);

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 5,
			isHomePlayer: true,
		});

		expect(player.health).toBe(0);
		expect(player.status).toBe(PlayerStatus.DEAD);
	});

	test("consecutive wins increment WIN streak; loss resets to zero with type=LOSS", () => {
		const player = createTestPlayer();

		phaseRules.onMatchSettled(player, {
			homeScore: 1,
			awayScore: 0,
			isHomePlayer: true,
		});
		phaseRules.onMatchSettled(player, {
			homeScore: 1,
			awayScore: 0,
			isHomePlayer: true,
		});

		expect(player.streak.type).toBe(StreakType.WIN);
		expect(player.streak.amount).toBe(2);

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 1,
			isHomePlayer: true,
		});

		expect(player.streak.type).toBe(StreakType.LOSS);
		expect(player.streak.amount).toBe(0);
	});
});

describe("PhaseRules — onPreparingPhaseStart", () => {
	test("clears match rewards and opponent when match rewards are present", () => {
		const player = createTestPlayer();
		unlockBoard(player);

		player.setMatchRewards({
			damage: 0,
			justDied: false,
			rewardMoney: {
				total: 5,
				base: 3,
				winBonus: 1,
				streakBonus: 0,
				interest: 1,
			},
		});
		player.setOpponent({ id: "opponent-id", isClone: false });
		const moneyBefore = player.money;

		phaseRules.onPreparingPhaseStart(player);

		expect(player.money).toBe(moneyBefore + 5);
		expect(player.opponentId).toBeNull();
		expect(player.matchRewards).toBeNull();
	});

	test("does nothing for a dead player", () => {
		const player = createTestPlayer();
		player.setHealth(0);
		player.setStatus(PlayerStatus.DEAD);
		const moneyBefore = player.money;

		phaseRules.onPreparingPhaseStart(player);

		expect(player.money).toBe(moneyBefore);
	});
});
