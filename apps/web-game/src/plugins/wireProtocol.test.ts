import { networkedAction } from "@cc-plugins/api";

import { createClientPluginRegistry } from "./registry";
import { WireProtocol } from "./wireProtocol";

const stringPayloadSchema = {
	safeParse(input: unknown) {
		return typeof input === "string"
			? ({ success: true as const, data: input } as const)
			: ({
					success: false as const,
					error: { message: "expected string" },
				} as const);
	},
};

const gameEvent = networkedAction("game-event");
const playerEvent = networkedAction("player-event");
const infoUpdate = networkedAction("info-update");
const coreAction = networkedAction("core-action");
const validatedEvent = networkedAction<string>(
	"validated-event",
	stringPayloadSchema
);

const emptyChannels = {
	gameEvents: [],
	playerEvents: [],
	playerInfoUpdates: [],
} as const;

describe("WireProtocol", () => {
	test("a creator declared on one channel is rejected on another", () => {
		const protocol = new WireProtocol(
			{
				gameEvents: [gameEvent],
				playerEvents: [],
				playerInfoUpdates: [],
			},
			[],
			createClientPluginRegistry()
		);
		expect(protocol.acceptsInbound("gameEvents", "game-event")).toBe(true);
		expect(protocol.acceptsInbound("playerEvents", "game-event")).toBe(false);
		expect(protocol.acceptsInbound("playerInfoUpdates", "game-event")).toBe(
			false
		);
	});

	test("acceptsOutbound is true for a core outbound type", () => {
		const protocol = new WireProtocol(
			emptyChannels,
			[coreAction],
			createClientPluginRegistry()
		);
		expect(protocol.acceptsOutbound("core-action")).toBe(true);
		expect(protocol.acceptsOutbound("unknown")).toBe(false);
	});

	test("validateInbound passes through when no schema declared", () => {
		const protocol = new WireProtocol(
			{
				gameEvents: [],
				playerEvents: [playerEvent],
				playerInfoUpdates: [],
			},
			[],
			createClientPluginRegistry()
		);
		const result = protocol.validateInbound(
			"playerEvents",
			"player-event",
			{ anything: true }
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.payload).toEqual({ anything: true });
		}
	});

	test("validateInbound runs the schema on a typed channel", () => {
		const protocol = new WireProtocol(
			{
				gameEvents: [],
				playerEvents: [validatedEvent],
				playerInfoUpdates: [],
			},
			[],
			createClientPluginRegistry()
		);
		const ok = protocol.validateInbound("playerEvents", "validated-event", "hi");
		expect(ok.ok).toBe(true);
		const bad = protocol.validateInbound("playerEvents", "validated-event", 42);
		expect(bad.ok).toBe(false);
		if (!bad.ok) {
			expect(bad.reason).toMatch(/expected string/);
		}
	});

	test("plugin-contributed inbound lands on every server-emittable channel", () => {
		const registry = createClientPluginRegistry();
		const protocol = new WireProtocol(emptyChannels, [], registry);
		expect(protocol.acceptsInbound("playerEvents", "plugin-event")).toBe(false);
		registry.register({
			id: "@me/p",
			wire: { inbound: [networkedAction("plugin-event")] },
		});
		// The server may emit a plugin event on any of the three channels.
		expect(protocol.acceptsInbound("playerEvents", "plugin-event")).toBe(true);
		expect(protocol.acceptsInbound("gameEvents", "plugin-event")).toBe(true);
		expect(protocol.acceptsInbound("playerInfoUpdates", "plugin-event")).toBe(
			true
		);
	});

	test("plugin-contributed inbound validates on gameEvents", () => {
		const registry = createClientPluginRegistry();
		const protocol = new WireProtocol(emptyChannels, [], registry);
		registry.register({
			id: "@me/p",
			wire: {
				inbound: [networkedAction<string>("plugin-event", stringPayloadSchema)],
			},
		});
		const ok = protocol.validateInbound("gameEvents", "plugin-event", "hi");
		expect(ok.ok).toBe(true);
		const bad = protocol.validateInbound(
			"playerInfoUpdates",
			"plugin-event",
			42
		);
		expect(bad.ok).toBe(false);
	});

	test("plugin-contributed outbound creators are accepted after registration", () => {
		const registry = createClientPluginRegistry();
		const protocol = new WireProtocol(emptyChannels, [], registry);
		registry.register({
			id: "@me/p",
			wire: { outbound: [networkedAction("plugin-action")] },
		});
		expect(protocol.acceptsOutbound("plugin-action")).toBe(true);
	});

	test("unknown inbound type returns ok:false with the channel in the reason", () => {
		const protocol = new WireProtocol(
			emptyChannels,
			[],
			createClientPluginRegistry()
		);
		const result = protocol.validateInbound("gameEvents", "nope", null);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.reason).toMatch(/unknown inbound type on channel "gameEvents"/);
		}
	});

	test("plugin colliding on a core inbound type is rejected; core stays", () => {
		const registry = createClientPluginRegistry();
		const protocol = new WireProtocol(
			{
				gameEvents: [],
				playerEvents: [networkedAction<string>("collide", stringPayloadSchema)],
				playerInfoUpdates: [],
			},
			[],
			registry
		);

		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		registry.register({
			id: "@me/dup",
			wire: { inbound: [networkedAction("collide")] },
		});

		const bad = protocol.validateInbound("playerEvents", "collide", 42);
		expect(bad.ok).toBe(false);
		if (!bad.ok) {
			expect(bad.reason).toMatch(/expected string/);
		}
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(/inbound channel "playerEvents".*already claimed by core.*plugin "@me\/dup"/)
		);
		errorSpy.mockRestore();
	});

	test("two plugins colliding on outbound: first-registered wins", () => {
		const registry = createClientPluginRegistry();
		const protocol = new WireProtocol(emptyChannels, [], registry);

		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		registry.register({
			id: "@me/first",
			wire: { outbound: [networkedAction("shared")] },
		});
		registry.register({
			id: "@me/second",
			wire: { outbound: [networkedAction("shared")] },
		});

		expect(protocol.acceptsOutbound("shared")).toBe(true);
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(
				/outbound channel "default".*type "shared".*claimed by plugin "@me\/first".*plugin "@me\/second"/
			)
		);
		errorSpy.mockRestore();
	});

	test("info-update on game channel is rejected even when valid on its own channel", () => {
		const protocol = new WireProtocol(
			{
				gameEvents: [],
				playerEvents: [],
				playerInfoUpdates: [infoUpdate],
			},
			[],
			createClientPluginRegistry()
		);
		const result = protocol.validateInbound("gameEvents", "info-update", {});
		expect(result.ok).toBe(false);
	});
});
