import { ReadyQuickChatOptions } from "@creature-chess/models";

import { quickChatDef } from "./quickChat";

describe("quickChat payload validation", () => {
	test("accepts a valid chat option", () => {
		const result = quickChatDef.creator.schema!.safeParse({
			sendingPlayerId: "p1",
			chatValue: "GL",
		});
		expect(result.success).toBe(true);
	});

	test("rejects unknown chat option", () => {
		const result = quickChatDef.creator.schema!.safeParse({
			sendingPlayerId: "p1",
			chatValue: "haxx",
		});
		expect(result.success).toBe(false);
	});

	test("rejects missing chatValue", () => {
		const result = quickChatDef.creator.schema!.safeParse({ sendingPlayerId: "p1" });
		expect(result.success).toBe(false);
	});
});

describe("quickChat handler routing", () => {
	const makePlayer = (id: string) => ({
		id,
		emitNetworkedEvent: jest.fn(),
	});

	test("mirrors the emote to both opponent and sender", () => {
		const sender = makePlayer("p1");
		const opponent = makePlayer("p2");
		const acting = {
			opponentId: "p2",
			gamemode: {
				getPlayerById: (pid: string) =>
					pid === "p1" ? sender : pid === "p2" ? opponent : null,
			},
		};

		quickChatDef.handler(acting as never, {
			sendingPlayerId: "p1",
			chatValue: ReadyQuickChatOptions.GL,
		});

		expect(opponent.emitNetworkedEvent).toHaveBeenCalledTimes(1);
		expect(sender.emitNetworkedEvent).toHaveBeenCalledTimes(1);
		const event = opponent.emitNetworkedEvent.mock.calls[0][0];
		expect(event).toEqual({
			type: "playerReceiveQuickChatEvent",
			payload: { sendingPlayerId: "p1", chatValue: "GL" },
		});
	});

	test("drops a null sender", () => {
		const acting = {
			opponentId: "p2",
			gamemode: { getPlayerById: () => null },
		};
		expect(() =>
			quickChatDef.handler(acting as never, {
				sendingPlayerId: null,
				chatValue: ReadyQuickChatOptions.GL,
			})
		).not.toThrow();
	});
});
