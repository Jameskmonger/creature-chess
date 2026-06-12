import {
	GamePhase,
	GamemodeSettings,
	GamemodeSettingsPresets,
	PlayerStatus,
} from "@creature-chess/models";

import { Round } from ".";
import { createDefaultGamemodeContext } from "../../coreBootstrap";
import {
	createMockLogger,
	createTestPlayer,
} from "../../entities/player/testUtils";
import { GameContext } from "../gameContext";
import { Gamemode } from "../gamemode";
import { PlayerRound } from "../playerRound";

type Call =
	| { fn: "prepare"; playerId: string }
	| { fn: "deploy"; playerId: string }
	| { fn: "engage"; playerId: string; opponentId: string }
	| {
			fn: "settle";
			playerId: string;
			isHomePlayer: boolean;
			homeScore: number;
			awayScore: number;
	  };

const createRecordingPlayerRound = (): {
	playerRound: PlayerRound;
	calls: Call[];
} => {
	const calls: Call[] = [];
	const playerRound: PlayerRound = {
		prepare: (player) => {
			calls.push({ fn: "prepare", playerId: player.id });
		},
		deploy: (player) => {
			calls.push({ fn: "deploy", playerId: player.id });
		},
		engage: (player, match) => {
			player.match = match;
			const opponent = match.home.id === player.id ? match.away : match.home;
			calls.push({
				fn: "engage",
				playerId: player.id,
				opponentId: opponent.id,
			});
		},
		settle: (player, payload) => {
			player.match = null;
			calls.push({
				fn: "settle",
				playerId: player.id,
				isHomePlayer: payload.isHomePlayer,
				homeScore: payload.homeScore,
				awayScore: payload.awayScore,
			});
		},
	};
	return { playerRound, calls };
};

const fastSettings = (): GamemodeSettings => ({
	...GamemodeSettingsPresets.default,
	gameStartSettleMs: 0,
	preparingPhaseLengthMs: 50,
	readyPhaseSettleMs: 0,
	readyPhaseLengthMs: 0,
	playingPhaseMaxLengthMs: 0,
	playingPhaseEndDelayMs: 0,
	postMatchSettleMs: 0,
	postBattleSettleMs: 0,
});

const buildContext = (playerRound: PlayerRound) => {
	const settings = fastSettings();
	const logger = createMockLogger();
	const gamemode = new Gamemode({
		id: "test-game",
		logger,
		settings,
		context: createDefaultGamemodeContext(),
	});
	const p1 = createTestPlayer("p1", { settings, gamemode });
	const p2 = createTestPlayer("p2", { settings, gamemode });

	const context: GameContext = {
		gamemode,
		getMatchups: () => [{ homeId: "p1", awayId: "p2", awayIsClone: false }],
		players: {
			getAll: () => [p1, p2],
			getLiving: () => [p1, p2],
			getById: (id) => (id === "p1" ? p1 : id === "p2" ? p2 : null),
		},
		logger,
		settings,
		playerRound,
	};

	return { context, p1, p2, gamemode };
};

describe("Round", () => {
	test("drives PlayerRound in prepare -> deploy -> engage -> settle order", async () => {
		const { playerRound, calls } = createRecordingPlayerRound();
		const { context } = buildContext(playerRound);

		const round = new Round(1, context);
		await round.run();

		// First: both players get prepare
		expect(calls.slice(0, 2)).toEqual([
			{ fn: "prepare", playerId: "p1" },
			{ fn: "prepare", playerId: "p2" },
		]);

		// Then: both players get deploy (all players, not just living)
		expect(calls.slice(2, 4)).toEqual([
			{ fn: "deploy", playerId: "p1" },
			{ fn: "deploy", playerId: "p2" },
		]);

		// Then: engage for both sides of the match (awayIsClone=false)
		expect(calls.slice(4, 6)).toEqual([
			{ fn: "engage", playerId: "p1", opponentId: "p2" },
			{ fn: "engage", playerId: "p2", opponentId: "p1" },
		]);

		// Last: both players get settle after the battle resolves
		const settled = calls.slice(6);
		expect(settled).toHaveLength(2);
		expect(settled.map((c) => c.fn)).toEqual(["settle", "settle"]);
		expect(
			settled.map((c) => (c as { playerId: string }).playerId).sort()
		).toEqual(["p1", "p2"]);
	});

	test("broadcasts the round number as the round-info round during preparing phase", async () => {
		const { playerRound } = createRecordingPlayerRound();
		const { context, gamemode } = buildContext(playerRound);

		await new Round(7, context).run();

		expect(gamemode.roundInfo.round).toBe(7);
	});

	test("setRoundInfo broadcasts the right phase sequence to the gamemode", async () => {
		const { playerRound } = createRecordingPlayerRound();
		const { context, gamemode } = buildContext(playerRound);

		const phasesSeen: GamePhase[] = [];
		const originalSetRoundInfo = gamemode.setRoundInfo.bind(gamemode);
		gamemode.setRoundInfo = (payload) => {
			phasesSeen.push(payload.phase);
			originalSetRoundInfo(payload);
		};

		await new Round(1, context).run();

		expect(phasesSeen).toEqual([
			GamePhase.PREPARING,
			GamePhase.READY,
			GamePhase.PLAYING,
		]);
	});

	test("preparing phase exits early when all living players ready up", async () => {
		const { playerRound } = createRecordingPlayerRound();
		const { context, p1, p2 } = buildContext(playerRound);

		// Long timeout - the test must exit via the all-ready path.
		context.settings.preparingPhaseLengthMs = 60000;

		const startedAt = Date.now();
		const runPromise = new Round(1, context).run();

		// Yield once so Round registers its ready/quit listeners.
		await Promise.resolve();
		p1.setReady(true);
		p2.setReady(true);

		await runPromise;
		expect(Date.now() - startedAt).toBeLessThan(1000);
	});

	test("preparing phase exits early when a living player quits if all other living players are ready", async () => {
		const { playerRound } = createRecordingPlayerRound();
		const { context, p1, p2 } = buildContext(playerRound);

		context.settings.preparingPhaseLengthMs = 60000;

		const startedAt = Date.now();
		const runPromise = new Round(1, context).run();

		await Promise.resolve();
		p1.setReady(true);
		p2.setStatus(PlayerStatus.QUIT);

		await runPromise;
		expect(Date.now() - startedAt).toBeLessThan(1000);
	});

	test("with awayIsClone=true, only the home player gets engage and settle", async () => {
		const { playerRound, calls } = createRecordingPlayerRound();
		const { context, p1 } = buildContext(playerRound);
		context.getMatchups = () => [
			{ homeId: "p1", awayId: "p2", awayIsClone: true },
		];
		// In a clone matchup, p2 isn't actually playing this match (their data is
		// just being used as a fake opponent for p1). In a real game p2 would be
		// playing a different match elsewhere; here we model that by saying only
		// p1 is "living" for the purposes of this Round's playing-phase await.
		context.players.getLiving = () => [p1];

		await new Round(1, context).run();

		const engageCalls = calls.filter((c) => c.fn === "engage");
		expect(engageCalls).toHaveLength(1);
		expect(engageCalls[0]).toEqual({
			fn: "engage",
			playerId: "p1",
			opponentId: "p2",
		});

		// Only the home player gets settle - Match.fight() doesn't fire
		// playerFinishMatchEvent on the cloned-away side.
		const settleCalls = calls.filter((c) => c.fn === "settle");
		expect(settleCalls).toHaveLength(1);
		expect((settleCalls[0] as { playerId: string }).playerId).toBe("p1");
	});
});
