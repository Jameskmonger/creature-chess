import {
	GamePhase,
	GamemodeSettings,
	GamemodeSettingsPresets,
	PlayerStatus,
} from "@creature-chess/models";

import { Player } from "../../entities/player/player";
import {
	createMockLogger,
	createTestPlayer,
} from "../../entities/player/testUtils";
import { GameContext } from "../gameContext";
import { Gamemode } from "../gamemode";
import { Match } from "../match";
import { PhaseRules } from "../phaseRules";
import { Round } from ".";

type Call =
	| { fn: "onPreparingPhaseStart"; playerId: string }
	| { fn: "onBeforeReadyPhaseStart"; playerId: string }
	| { fn: "onReadyPhaseStart"; playerId: string; opponentId: string }
	| {
			fn: "onMatchSettled";
			playerId: string;
			isHomePlayer: boolean;
			homeScore: number;
			awayScore: number;
	  };

const createRecordingPhaseRules = (): { rules: PhaseRules; calls: Call[] } => {
	const calls: Call[] = [];
	const rules: PhaseRules = {
		onPreparingPhaseStart: (player) => {
			calls.push({ fn: "onPreparingPhaseStart", playerId: player.id });
		},
		onBeforeReadyPhaseStart: (player) => {
			calls.push({ fn: "onBeforeReadyPhaseStart", playerId: player.id });
		},
		onReadyPhaseStart: (player, match) => {
			player.match = match;
			const opponent =
				match.home.id === player.id ? match.away : match.home;
			calls.push({
				fn: "onReadyPhaseStart",
				playerId: player.id,
				opponentId: opponent.id,
			});
		},
		onMatchSettled: (player, payload) => {
			player.match = null;
			calls.push({
				fn: "onMatchSettled",
				playerId: player.id,
				isHomePlayer: payload.isHomePlayer,
				homeScore: payload.homeScore,
				awayScore: payload.awayScore,
			});
		},
	};
	return { rules, calls };
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

const buildContext = (rules: PhaseRules) => {
	const settings = fastSettings();
	const logger = createMockLogger();
	const gamemode = new Gamemode("test-game", logger, settings);
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
		phaseRules: rules,
	};

	return { context, p1, p2, gamemode };
};

describe("Round", () => {
	test("drives PhaseRules in preparing → beforeReady → readyStart → matchSettled order", async () => {
		const { rules, calls } = createRecordingPhaseRules();
		const { context } = buildContext(rules);

		const round = new Round(1, context);
		await round.run();

		// First: both players get onPreparingPhaseStart
		expect(calls.slice(0, 2)).toEqual([
			{ fn: "onPreparingPhaseStart", playerId: "p1" },
			{ fn: "onPreparingPhaseStart", playerId: "p2" },
		]);

		// Then: both players get onBeforeReadyPhaseStart (all players, not just living)
		expect(calls.slice(2, 4)).toEqual([
			{ fn: "onBeforeReadyPhaseStart", playerId: "p1" },
			{ fn: "onBeforeReadyPhaseStart", playerId: "p2" },
		]);

		// Then: onReadyPhaseStart for both sides of the match (awayIsClone=false)
		expect(calls.slice(4, 6)).toEqual([
			{ fn: "onReadyPhaseStart", playerId: "p1", opponentId: "p2" },
			{ fn: "onReadyPhaseStart", playerId: "p2", opponentId: "p1" },
		]);

		// Last: both players get onMatchSettled after the battle resolves
		const settled = calls.slice(6);
		expect(settled).toHaveLength(2);
		expect(settled.map((c) => c.fn)).toEqual([
			"onMatchSettled",
			"onMatchSettled",
		]);
		expect(settled.map((c) => (c as { playerId: string }).playerId).sort()).toEqual([
			"p1",
			"p2",
		]);
	});

	test("broadcasts the round number as the round-info round during preparing phase", async () => {
		const { rules } = createRecordingPhaseRules();
		const { context, gamemode } = buildContext(rules);

		await new Round(7, context).run();

		expect(gamemode.roundInfo.round).toBe(7);
	});

	test("setRoundInfo broadcasts the right phase sequence to the gamemode", async () => {
		const { rules } = createRecordingPhaseRules();
		const { context, gamemode } = buildContext(rules);

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
		const { rules } = createRecordingPhaseRules();
		const { context, p1, p2 } = buildContext(rules);

		// Long timeout — the test must exit via the all-ready path.
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
		const { rules } = createRecordingPhaseRules();
		const { context, p1, p2 } = buildContext(rules);

		context.settings.preparingPhaseLengthMs = 60000;

		const startedAt = Date.now();
		const runPromise = new Round(1, context).run();

		await Promise.resolve();
		p1.setReady(true);
		p2.setStatus(PlayerStatus.QUIT);

		await runPromise;
		expect(Date.now() - startedAt).toBeLessThan(1000);
	});

	test("with awayIsClone=true, only the home player gets onReadyPhaseStart and onMatchSettled", async () => {
		const { rules, calls } = createRecordingPhaseRules();
		const { context, p1 } = buildContext(rules);
		context.getMatchups = () => [
			{ homeId: "p1", awayId: "p2", awayIsClone: true },
		];
		// In a clone matchup, p2 isn't actually playing this match (their data is
		// just being used as a fake opponent for p1). In a real game p2 would be
		// playing a different match elsewhere; here we model that by saying only
		// p1 is "living" for the purposes of this Round's playing-phase await.
		context.players.getLiving = () => [p1];

		await new Round(1, context).run();

		const readyCalls = calls.filter((c) => c.fn === "onReadyPhaseStart");
		expect(readyCalls).toHaveLength(1);
		expect(readyCalls[0]).toEqual({
			fn: "onReadyPhaseStart",
			playerId: "p1",
			opponentId: "p2",
		});

		// Only the home player gets onMatchSettled — Match.fight() doesn't fire
		// playerFinishMatchEvent on the cloned-away side.
		const settledCalls = calls.filter((c) => c.fn === "onMatchSettled");
		expect(settledCalls).toHaveLength(1);
		expect((settledCalls[0] as { playerId: string }).playerId).toBe("p1");
	});
});
