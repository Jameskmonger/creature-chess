import { createTestPlayer } from "../entities/player/testUtils";
import { toggleShopLockPlayerAction } from "./creators";

describe("toggleShopLockPlayerAction", () => {
	test("toggles the shop lock state via the registry", () => {
		const player = createTestPlayer();
		expect(player.shopLocked).toBe(false);

		player.gamemode.playerActions.dispatchIncoming(player, toggleShopLockPlayerAction());
		expect(player.shopLocked).toBe(true);

		player.gamemode.playerActions.dispatchIncoming(player, toggleShopLockPlayerAction());
		expect(player.shopLocked).toBe(false);
	});

	test("rejects payloads for void-payload actions", () => {
		const player = createTestPlayer();
		const result = player.gamemode.playerActions.dispatchIncoming(player, {
			type: toggleShopLockPlayerAction.type,
			payload: { malicious: true },
		});

		expect(result.ok).toBe(false);
		expect(player.shopLocked).toBe(false);
	});

	test("rejects unknown action types", () => {
		const player = createTestPlayer();
		const result = player.gamemode.playerActions.dispatchIncoming(player, {
			type: "notAnAction",
			payload: undefined,
		});

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.reason).toMatch(/unknown action type/);
		}
	});
});
