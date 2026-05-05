import { createTestPlayer } from "../entities/player/testUtils";
import { isPlayerShopLocked } from "../entities/player/state/selectors";
import { dispatchIncomingPlayerAction } from "./index";
import { toggleShopLockPlayerAction } from "./toggleShopLock";

describe("toggleShopLockPlayerAction", () => {
	test("toggles the shop lock state via the registry", () => {
		const player = createTestPlayer();
		expect(isPlayerShopLocked(player.select((s) => s))).toBe(false);

		dispatchIncomingPlayerAction(player, toggleShopLockPlayerAction());
		expect(isPlayerShopLocked(player.select((s) => s))).toBe(true);

		dispatchIncomingPlayerAction(player, toggleShopLockPlayerAction());
		expect(isPlayerShopLocked(player.select((s) => s))).toBe(false);
	});

	test("rejects payloads for void-payload actions", () => {
		const player = createTestPlayer();
		const result = dispatchIncomingPlayerAction(player, {
			type: toggleShopLockPlayerAction.type,
			payload: { malicious: true },
		});

		expect(result.ok).toBe(false);
		expect(isPlayerShopLocked(player.select((s) => s))).toBe(false);
	});

	test("rejects unknown action types", () => {
		const player = createTestPlayer();
		const result = dispatchIncomingPlayerAction(player, {
			type: "notAnAction",
			payload: undefined,
		});

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.reason).toMatch(/unknown action type/);
		}
	});
});
