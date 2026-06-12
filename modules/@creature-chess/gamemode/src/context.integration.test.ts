import { networkedAction } from "@cc-plugins/api";
import { z } from "zod";

import { GamemodeSettingsPresets } from "@creature-chess/models";

import {
	createDefaultGamemodeContext,
	resolveSettings,
} from "./coreBootstrap";
import { createTestPlayer } from "./entities/player/testUtils";
import { Gamemode } from "./game/gamemode";
import { definePlayerAction } from "./playerActions/registry";

describe("context integration", () => {
	test("a plugin-registered outbound creator passes the Player firehose filter", () => {
		const context = createDefaultGamemodeContext();
		const fakePluginEvent = networkedAction<{ note: string }>(
			"@me/plugin-event"
		);

		// Mod's onEnable equivalent - extend the context before the Gamemode runs.
		context.wire.addOutbound("playerEvents", fakePluginEvent, {
			plugin: "@me/p",
		});

		const player = createTestPlayer("p1");
		// Patch the player's gamemode-side wire reference to our context so
		// `acceptsOutbound` reads the same protocol the test extended.
		(player.gamemode as { wire: typeof context.wire }).wire = context.wire;

		const seen: string[] = [];
		player.events.onPlayerEvent((action) => {
			seen.push(action.type);
		});

		// The wire-protocol filter is the seam that decides whether the
		// firehose fires for a given type. Without the addOutbound above,
		// this would be filtered out.
		player.emitNetworkedEvent(fakePluginEvent({ note: "hello" }));
		expect(seen).toEqual(["@me/plugin-event"]);

		// A type the plugin did NOT register is filtered out.
		const unknownEvent = networkedAction("@me/unknown")();
		player.emitNetworkedEvent(unknownEvent);
		expect(seen).toEqual(["@me/plugin-event"]);
	});

	test("a plugin-registered PlayerActionDef dispatches via the registry", () => {
		const context = createDefaultGamemodeContext();

		const calls: { who: string; payload: { msg: string } }[] = [];
		const pluginActionCreator = networkedAction<{ msg: string }>(
			"@me/log-action",
			z.object({ msg: z.string() })
		);
		const pluginDef = definePlayerAction({
			creator: pluginActionCreator,
			handler: (target, payload) => {
				calls.push({ who: target.id, payload });
			},
		});

		context.playerActions.register(pluginDef);

		// The registry should have published the creator on the wire's
		// inbound channel since the registry was constructed with wire.
		expect(context.wire.acceptsInbound("@me/log-action")).toBe(true);

		const player = createTestPlayer("p1");
		const result = context.playerActions.dispatchIncoming(player, {
			type: "@me/log-action",
			payload: { msg: "hi" },
		});
		expect(result).toEqual({ ok: true });
		expect(calls).toEqual([{ who: "p1", payload: { msg: "hi" } }]);
	});

	test("dispatchIncoming rejects an invalid payload using the creator's schema", () => {
		const context = createDefaultGamemodeContext();
		const creator = networkedAction<{ count: number }>(
			"@me/typed-action",
			z.object({ count: z.number().int() })
		);
		context.playerActions.register(
			definePlayerAction({
				creator,
				handler: () => undefined,
			})
		);

		const player = createTestPlayer("p1");
		const result = context.playerActions.dispatchIncoming(player, {
			type: "@me/typed-action",
			payload: { count: "not a number" },
		});
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.reason).toMatch(/invalid payload for @me\/typed-action/);
		}
	});

	test("a plugin-patched define reaches a Gamemode resolveSettings call", () => {
		const context = createDefaultGamemodeContext();
		const scoped = context.defines.scopedTo({ plugin: "@me/cheap-cards" });
		scoped.patch("economy.buyXpCost", 1);

		expect(context.defines.get("economy.buyXpCost")).toBe(1);
		expect(context.defines.originOf("economy.buyXpCost")).toEqual({
			plugin: "@me/cheap-cards",
		});

		const resolved = resolveSettings(
			{ ...GamemodeSettingsPresets.default, buyXpCost: 5 },
			context.defines
		);
		expect(resolved.buyXpCost).toBe(1);
	});

	test("resolveSettings keeps a per-game setting when no plugin patched the define", () => {
		const context = createDefaultGamemodeContext();

		// The seed is core-origin, so a custom per-game value must survive.
		const resolved = resolveSettings(
			{ ...GamemodeSettingsPresets.default, buyXpCost: 8 },
			context.defines
		);
		expect(resolved.buyXpCost).toBe(8);
	});

	test("a plugin-set creature reaches the gamemode's creatures catalog", () => {
		const context = createDefaultGamemodeContext();
		const definition = {
			id: 9999,
			name: "TestMon",
			cost: 1,
			class: 0,
			stages: [{ hp: 1, attack: 1, defense: 1, attackSpeed: 1, attackType: 0 }],
			traits: [],
		};
		const scoped = context.creatures.scopedTo({ plugin: "@me/test-creatures" });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		scoped.set(9999, definition as any);

		const gamemode = new Gamemode({
			id: "g1",
			logger: { info: () => undefined, warn: () => undefined, error: () => undefined, debug: () => undefined },
			settings: context.defines.has("economy.buyXpCost")
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				  ({ buyXpCost: context.defines.get("economy.buyXpCost") } as any)
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
				  ({} as any),
			context,
		});

		expect(gamemode.creatures.get(9999)).toBe(definition);
		expect(gamemode.creatures.originOf(9999)).toEqual({
			plugin: "@me/test-creatures",
		});
	});

	test("non-scoped creature registry rejects writes", () => {
		const context = createDefaultGamemodeContext();
		expect(() =>
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			context.creatures.set(1, { id: 1, name: "Rogue" } as any)
		).toThrow(/plugin-owned/);
	});

	test("collision: a plugin re-registering a core type logs and drops", () => {
		const context = createDefaultGamemodeContext();
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		// Core already claimed "playerDeathEvent" on the playerEvents channel.
		const shadow = networkedAction("playerDeathEvent");
		context.wire.addOutbound("playerEvents", shadow, { plugin: "@me/bad" });
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(
				/outbound channel "playerEvents".*type "playerDeathEvent".*claimed by core.*plugin "@me\/bad"/
			)
		);
		errorSpy.mockRestore();
	});
});
