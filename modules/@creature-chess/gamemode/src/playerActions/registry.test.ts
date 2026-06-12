import { packPosition } from "@creature-chess/board";

import { Player } from "../entities/player/player";
import { createTestPlayer } from "../entities/player/testUtils";
import {
	buyCardPlayerAction,
	dropPiecePlayerAction,
	sellPiecePlayerAction,
	spectatePlayerAction,
	swapPiecePlayerAction,
} from "./index";

const dispatchIncomingPlayerAction = (
	player: Player,
	raw: { type?: unknown; payload?: unknown }
) => player.gamemode.playerActions.dispatchIncoming(player, raw);

describe("PlayerAction registry - payload validation", () => {
	describe("buyCardPlayerAction", () => {
		test("accepts a non-negative integer index", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: buyCardPlayerAction.type,
				payload: { index: 0 },
			});
			expect(result.ok).toBe(true);
		});

		test("rejects missing index", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: buyCardPlayerAction.type,
				payload: {},
			});
			expect(result.ok).toBe(false);
		});

		test("rejects negative index", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: buyCardPlayerAction.type,
				payload: { index: -1 },
			});
			expect(result.ok).toBe(false);
		});

		test("rejects non-numeric index", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: buyCardPlayerAction.type,
				payload: { index: "0" },
			});
			expect(result.ok).toBe(false);
		});

		test("rejects whole-string payload", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: buyCardPlayerAction.type,
				payload: "lol",
			});
			expect(result.ok).toBe(false);
		});
	});

	describe("sellPiecePlayerAction", () => {
		test("accepts a string pieceId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(
				player,
				sellPiecePlayerAction({ pieceId: "abc" })
			);
			expect(result.ok).toBe(true);
		});

		test("rejects missing pieceId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: sellPiecePlayerAction.type,
				payload: {},
			});
			expect(result.ok).toBe(false);
		});

		test("rejects non-string pieceId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: sellPiecePlayerAction.type,
				payload: { pieceId: 42 },
			});
			expect(result.ok).toBe(false);
		});
	});

	describe("spectatePlayerAction", () => {
		test("accepts null playerId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(
				player,
				spectatePlayerAction({ playerId: null })
			);
			expect(result.ok).toBe(true);
		});

		test("accepts string playerId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(
				player,
				spectatePlayerAction({ playerId: "some-id" })
			);
			expect(result.ok).toBe(true);
		});

		test("rejects missing playerId field", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: spectatePlayerAction.type,
				payload: {},
			});
			expect(result.ok).toBe(false);
		});

		test("rejects numeric playerId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: spectatePlayerAction.type,
				payload: { playerId: 42 },
			});
			expect(result.ok).toBe(false);
		});
	});

	describe("dropPiecePlayerAction", () => {
		const validPayload = {
			pieceId: "p1",
			to: { type: "board" as const, location: packPosition(0, 0) },
		};

		test("accepts a well-formed payload", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(
				player,
				dropPiecePlayerAction(validPayload)
			);
			expect(result.ok).toBe(true);
		});

		test("rejects missing to", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: dropPiecePlayerAction.type,
				payload: { pieceId: "p1" },
			});
			expect(result.ok).toBe(false);
		});

		test("rejects unknown location type", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: dropPiecePlayerAction.type,
				payload: {
					...validPayload,
					to: { type: "elsewhere", location: 0 },
				},
			});
			expect(result.ok).toBe(false);
		});

		test("rejects non-numeric location", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: dropPiecePlayerAction.type,
				payload: {
					...validPayload,
					to: { type: "board", location: "1,2" },
				},
			});
			expect(result.ok).toBe(false);
		});

		test("rejects string payload", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: dropPiecePlayerAction.type,
				payload: "lol",
			});
			expect(result.ok).toBe(false);
		});
	});

	describe("swapPiecePlayerAction", () => {
		const validPayload = {
			pieceAId: "a",
			pieceBId: "b",
		};

		test("accepts a well-formed payload", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(
				player,
				swapPiecePlayerAction(validPayload)
			);
			expect(result.ok).toBe(true);
		});

		test("rejects missing pieceBId", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: swapPiecePlayerAction.type,
				payload: { pieceAId: "a" },
			});
			expect(result.ok).toBe(false);
		});
	});

	describe("wrap", () => {
		test("composes wrappers around the core handler, earliest outermost", () => {
			const player = createTestPlayer();
			const calls: string[] = [];
			const { playerActions } = player.gamemode;

			playerActions.wrap(sellPiecePlayerAction.type, (next) => {
				calls.push("outer-before");
				next();
				calls.push("outer-after");
			});
			playerActions.wrap(sellPiecePlayerAction.type, (next) => {
				calls.push("inner-before");
				next();
				calls.push("inner-after");
			});

			dispatchIncomingPlayerAction(
				player,
				sellPiecePlayerAction({ pieceId: "abc" })
			);

			expect(calls).toEqual([
				"outer-before",
				"inner-before",
				"inner-after",
				"outer-after",
			]);
		});

		test("a wrapper that skips next() vetoes inner wrappers and the handler", () => {
			const player = createTestPlayer();
			const calls: string[] = [];
			const { playerActions } = player.gamemode;

			playerActions.wrap(sellPiecePlayerAction.type, () => {
				calls.push("veto");
			});
			playerActions.wrap(sellPiecePlayerAction.type, (next) => {
				calls.push("inner");
				next();
			});

			dispatchIncomingPlayerAction(
				player,
				sellPiecePlayerAction({ pieceId: "abc" })
			);

			expect(calls).toEqual(["veto"]);
		});
	});

	describe("malformed envelope", () => {
		test("rejects non-string action type", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: 42 as unknown as string,
				payload: undefined,
			});
			expect(result.ok).toBe(false);
		});

		test("rejects empty object", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(
				player,
				{} as { type: string; payload?: unknown }
			);
			expect(result.ok).toBe(false);
		});
	});
});
