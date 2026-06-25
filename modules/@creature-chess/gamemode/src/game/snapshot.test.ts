import { SubscribableBoard } from "@creature-chess/board";
import {
	GamePhase,
	GamemodeSettingsPresets,
	StreakType,
	buildCard,
	buildPieceModel,
} from "@creature-chess/models";

import { createDefaultGamemodeContext } from "../coreBootstrap";
import { createMockLogger } from "../entities/player/testUtils";
import { Gamemode } from "./gamemode";
import { GamemodeSnapshot, captureSnapshot } from "./snapshot";

const buildGamemode = (): Gamemode =>
	new Gamemode({
		id: "test",
		logger: createMockLogger(),
		settings: GamemodeSettingsPresets.default,
		context: createDefaultGamemodeContext(),
	});

const buildSnapshot = (): GamemodeSnapshot => ({
	round: 12,
	players: [
		{
			id: "alice",
			name: "Alice",
			health: 37,
			money: 8,
			level: 6,
			xp: 2,
			streak: { type: StreakType.WIN, amount: 3 },
			shop: {
				cards: [
					buildCard({ id: "c-1", definitionId: 5 }),
					null,
					buildCard({ id: "c-2", definitionId: 12 }),
					null,
					null,
				],
				locked: true,
			},
			board: [
				{
					piece: buildPieceModel({
						id: "p-board-1",
						ownerId: "alice",
						definitionId: 3,
						stage: 1,
					}),
					x: 1,
					y: 2,
				},
			],
			bench: [
				{
					piece: buildPieceModel({
						id: "p-bench-1",
						ownerId: "alice",
						definitionId: 7,
						stage: 0,
					}),
					x: 4,
				},
			],
		},
		{
			id: "bob",
			name: "Bob",
			health: 12,
			money: 50,
			level: 8,
			xp: 0,
			streak: { type: StreakType.LOSS, amount: 2 },
			shop: { cards: [] },
			board: [],
			bench: [],
		},
	],
});

describe("Gamemode snapshot round-trip", () => {
	test("hydrate then capture restores player info verbatim", () => {
		const gamemode = buildGamemode();
		const snapshot = buildSnapshot();

		const players = gamemode.hydrate(snapshot);
		const captured = captureSnapshot(gamemode, players);

		// hydrate stashes round - 1 (covered by its own test); capturing before
		// a preparing-phase increment reflects that stashed value.
		expect(captured.round).toBe(snapshot.round - 1);
		expect(captured.players).toHaveLength(2);

		const alice = captured.players.find((p) => p.id === "alice")!;
		expect(alice.name).toBe("Alice");
		expect(alice.health).toBe(37);
		expect(alice.money).toBe(8);
		expect(alice.level).toBe(6);
		expect(alice.xp).toBe(2);
		expect(alice.streak).toEqual({ type: StreakType.WIN, amount: 3 });
		expect(alice.shop.locked).toBe(true);
		expect(alice.shop.cards).toEqual(snapshot.players[0].shop.cards);
	});

	test("hydrate then capture restores board and bench pieces", () => {
		const gamemode = buildGamemode();
		const snapshot = buildSnapshot();

		const players = gamemode.hydrate(snapshot);
		const captured = captureSnapshot(gamemode, players);

		const alice = captured.players.find((p) => p.id === "alice")!;
		expect(alice.board).toEqual([
			{
				piece: expect.objectContaining({ id: "p-board-1", stage: 1 }),
				x: 1,
				y: 2,
			},
		]);
		expect(alice.bench).toEqual([
			{ piece: expect.objectContaining({ id: "p-bench-1" }), x: 4 },
		]);
	});

	test("hydrate stashes round at snapshot.round - 1 in preparing phase", () => {
		const gamemode = buildGamemode();
		gamemode.hydrate(buildSnapshot());

		expect(gamemode.getRoundInfo().round).toBe(11);
		expect(gamemode.getRoundInfo().phase).toBe(GamePhase.PREPARING);
	});

	test("preserves three-of-a-kind without evolving on hydrate", () => {
		const gamemode = buildGamemode();
		const threeOfAKind: GamemodeSnapshot = {
			round: 5,
			players: [
				{
					id: "alice",
					name: "Alice",
					health: 100,
					money: 0,
					level: 5,
					xp: 0,
					streak: { type: StreakType.WIN, amount: 0 },
					shop: { cards: [] },
					board: [0, 1, 2].map((x) => ({
						piece: buildPieceModel({
							id: `p-${x}`,
							ownerId: "alice",
							definitionId: 9,
							stage: 0,
						}),
						x,
						y: 0,
					})),
					bench: [],
				},
			],
		};

		const [alice] = gamemode.hydrate(threeOfAKind);

		expect(alice.board.getAllPieces()).toHaveLength(3);
	});
});
