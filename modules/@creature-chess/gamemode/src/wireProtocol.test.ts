import { networkedAction } from "@cc-plugins/api";

import { WireProtocol } from "./wireProtocol";

const stringSchema = {
	safeParse(input: unknown) {
		return typeof input === "string"
			? ({ success: true as const, data: input } as const)
			: ({
					success: false as const,
					error: { message: "expected string" },
				} as const);
	},
};

describe("WireProtocol (server)", () => {
	test("outbound is channel-scoped", () => {
		const wire = new WireProtocol();
		wire.addOutbound("gameEvents", networkedAction("foo"));
		expect(wire.acceptsOutbound("gameEvents", "foo")).toBe(true);
		expect(wire.acceptsOutbound("playerEvents", "foo")).toBe(false);
	});

	test("inbound is flat (single client->server channel)", () => {
		const wire = new WireProtocol();
		wire.addInbound(networkedAction("action"));
		expect(wire.acceptsInbound("action")).toBe(true);
		expect(wire.acceptsInbound("missing")).toBe(false);
	});

	test("validateInbound runs the schema and surfaces the reason", () => {
		const wire = new WireProtocol();
		wire.addInbound(networkedAction<string>("typed", stringSchema));
		const ok = wire.validateInbound("typed", "hi");
		expect(ok.ok).toBe(true);
		const bad = wire.validateInbound("typed", 42);
		expect(bad.ok).toBe(false);
		if (!bad.ok) {
			expect(bad.reason).toMatch(/expected string/);
		}
	});

	test("plugin colliding on a core type is rejected; core stays", () => {
		const wire = new WireProtocol();
		wire.addOutbound("playerEvents", networkedAction<string>("dup", stringSchema));

		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		wire.addOutbound("playerEvents", networkedAction("dup"), { plugin: "@me/p" });

		// Core's typed schema still gates payloads.
		expect(wire.acceptsOutbound("playerEvents", "dup")).toBe(true);
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(
				/outbound channel "playerEvents".*type "dup".*claimed by core.*plugin "@me\/p"/
			)
		);
		errorSpy.mockRestore();
	});

	test("unknown outbound channel logs an error", () => {
		const wire = new WireProtocol();
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		wire.addOutbound("bogus" as any, networkedAction("foo"));
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(/unknown outbound channel: bogus/)
		);
		errorSpy.mockRestore();
	});
});
