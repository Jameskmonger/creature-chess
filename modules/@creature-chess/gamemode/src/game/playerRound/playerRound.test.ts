import { GamePhase, PlayerStatus, StreakType } from "@creature-chess/models";

import { createTestPlayer } from "../../entities/player/testUtils";
import { playerRound } from ".";

describe("playerRound.settle", () => {
	test("home player loss: takes damage equal to enemy pieces remaining * healthLostPerPiece", () => {
		const player = createTestPlayer();
		const startingHealth = player.health;

		playerRound.settle(player, {
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

		playerRound.settle(player, {
			homeScore: 0,
			awayScore: 3,
			isHomePlayer: false,
		});

		expect(player.health).toBe(startingHealth);
	});

	test("damage that reduces health to zero marks the player dead", () => {
		const player = createTestPlayer();
		player.setHealth(1);

		playerRound.settle(player, {
			homeScore: 0,
			awayScore: 5,
			isHomePlayer: true,
		});

		expect(player.health).toBe(0);
		expect(player.status).toBe(PlayerStatus.DEAD);
	});

	test("consecutive wins increment WIN streak; loss resets to zero with type=LOSS", () => {
		const player = createTestPlayer();

		playerRound.settle(player, {
			homeScore: 1,
			awayScore: 0,
			isHomePlayer: true,
		});
		playerRound.settle(player, {
			homeScore: 1,
			awayScore: 0,
			isHomePlayer: true,
		});

		expect(player.streak.type).toBe(StreakType.WIN);
		expect(player.streak.amount).toBe(2);

		playerRound.settle(player, {
			homeScore: 0,
			awayScore: 1,
			isHomePlayer: true,
		});

		expect(player.streak.type).toBe(StreakType.LOSS);
		expect(player.streak.amount).toBe(0);
	});
});

describe("playerRound.prepare", () => {
	test("clears match rewards and opponent when match rewards are present", () => {
		const player = createTestPlayer();
		player.gamemode.setRoundInfo({ phase: GamePhase.PREPARING, startedAt: 0 });

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

		playerRound.prepare(player);

		expect(player.money).toBe(moneyBefore + 5);
		expect(player.opponentId).toBeNull();
		expect(player.matchRewards).toBeNull();
	});

	test("does nothing for a dead player", () => {
		const player = createTestPlayer();
		player.setHealth(0);
		player.setStatus(PlayerStatus.DEAD);
		const moneyBefore = player.money;

		playerRound.prepare(player);

		expect(player.money).toBe(moneyBefore);
	});
});
