import { packPosition } from "@creature-chess/board";

import { createTestPlayer } from "../entities/player/testUtils";
import {
	buyCardPlayerAction,
	dispatchIncomingPlayerAction,
	dropPiecePlayerAction,
	quickChatPlayerAction,
	sellPiecePlayerAction,
	spectatePlayerAction,
	swapPiecePlayerAction,
} from "./index";

describe("PlayerAction registry — payload validation", () => {
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

	describe("quickChatPlayerAction", () => {
		test("accepts a valid chat option", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: quickChatPlayerAction.type,
				payload: { sendingPlayerId: "p1", chatValue: "GL" },
			});
			expect(result.ok).toBe(true);
		});

		test("rejects unknown chat option", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: quickChatPlayerAction.type,
				payload: { sendingPlayerId: "p1", chatValue: "haxx" },
			});
			expect(result.ok).toBe(false);
		});

		test("rejects missing chatValue", () => {
			const player = createTestPlayer();
			const result = dispatchIncomingPlayerAction(player, {
				type: quickChatPlayerAction.type,
				payload: { sendingPlayerId: "p1" },
			});
			expect(result.ok).toBe(false);
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
