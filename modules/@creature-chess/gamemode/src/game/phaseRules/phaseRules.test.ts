import { packPosition } from "@creature-chess/board";
import {
	GamePhase,
	PlayerStatus,
	StreakType,
} from "@creature-chess/models";

import { Player } from "../../entities/player/player";
import {
	getOpponentId,
	getPlayerHealth,
	getPlayerStreak,
	getPlayerStatus,
	getPlayerMoney,
} from "../../entities/player/state/selectors";
import { phaseRules } from ".";
import { playerInfoCommands } from "../../entities/player/state/commands";
import { drainPendingEvolutionChecks } from "../../entities/player/operations/evolution";
import { createTestPlayer } from "../../entities/player/testUtils";
import { gamePhaseStartedEvent } from "../events";

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

		// the 3rd add triggered evolution; the bench now has 1 piece at stage+1
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

		// while locked, no evolution happens
		expect(player.bench.getAllPieces()).toHaveLength(3);
		expect(player.pendingEvolutionChecks.has(`${definitionId}:0`)).toBe(true);

		// unlock and drain (what onPreparingPhaseStart does)
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

		// 2 on board, 1 on bench
		player.addBoardPiece({ pieceId: "a", position: packPosition(0, 0) });
		player.addBoardPiece({ pieceId: "b", position: packPosition(1, 0) });
		player.addBenchPiece({ pieceId: "c", position: { x: 0 } });

		// the 3rd add (bench) triggered evolution; should evolve onto the board
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
		const startingHealth = getPlayerHealth(player.select((s) => s));

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 4,
			isHomePlayer: true,
		});

		const expected = startingHealth - 4 * player.settings.healthLostPerPiece;
		expect(getPlayerHealth(player.select((s) => s))).toBe(expected);
	});

	test("away player win: home took damage but this player did not", () => {
		const player = createTestPlayer();
		const startingHealth = getPlayerHealth(player.select((s) => s));

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 3,
			isHomePlayer: false,
		});

		// no enemy pieces remained for this (away) player; home took damage instead
		expect(getPlayerHealth(player.select((s) => s))).toBe(startingHealth);
	});

	test("damage that reduces health to zero marks the player dead", () => {
		const player = createTestPlayer();
		// drop health to 1 so a single enemy piece kills
		player.put(playerInfoCommands.updateHealthCommand(1));

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 5,
			isHomePlayer: true,
		});

		expect(getPlayerHealth(player.select((s) => s))).toBe(0);
		expect(getPlayerStatus(player.select((s) => s))).toBe(PlayerStatus.DEAD);
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

		const streakAfterTwoWins = getPlayerStreak(player.select((s) => s));
		expect(streakAfterTwoWins.type).toBe(StreakType.WIN);
		expect(streakAfterTwoWins.amount).toBe(2);

		phaseRules.onMatchSettled(player, {
			homeScore: 0,
			awayScore: 1,
			isHomePlayer: true,
		});

		const streakAfterLoss = getPlayerStreak(player.select((s) => s));
		expect(streakAfterLoss.type).toBe(StreakType.LOSS);
		expect(streakAfterLoss.amount).toBe(0);
	});
});

describe("PhaseRules — onPreparingPhaseStart", () => {
	test("clears match rewards and opponent when match rewards are present", () => {
		const player = createTestPlayer();
		unlockBoard(player);

		// simulate post-match state
		player.put(
			playerInfoCommands.playerMatchRewardsEvent({
				damage: 0,
				justDied: false,
				rewardMoney: {
					total: 5,
					base: 3,
					winBonus: 1,
					streakBonus: 0,
					interest: 1,
				},
			})
		);
		player.put(
			playerInfoCommands.updateOpponentCommand({
				id: "opponent-id",
				isClone: false,
			})
		);
		const moneyBefore = getPlayerMoney(player.select((s) => s));

		phaseRules.onPreparingPhaseStart(player);

		expect(getPlayerMoney(player.select((s) => s))).toBe(moneyBefore + 5);
		expect(getOpponentId(player.select((s) => s))).toBeNull();
		expect(player.select((s) => s.playerInfo.matchRewards)).toBeNull();
	});

	test("does nothing for a dead player", () => {
		const player = createTestPlayer();
		player.put(playerInfoCommands.updateHealthCommand(0));
		player.put(playerInfoCommands.updateStatusCommand(PlayerStatus.DEAD));
		const moneyBefore = getPlayerMoney(player.select((s) => s));

		phaseRules.onPreparingPhaseStart(player);

		expect(getPlayerMoney(player.select((s) => s))).toBe(moneyBefore);
	});
});
