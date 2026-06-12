import { networkedAction } from "./networkedAction";
import { WireProtocolBase } from "./wireProtocolBase";

type In = "alpha" | "beta";
type Out = "left" | "right";

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

const makeBase = () => new WireProtocolBase<In, Out>(["alpha", "beta"], ["left", "right"]);

describe("WireProtocolBase", () => {
	test("claim then accept on the same channel", () => {
		const base = makeBase();
		base.claimInbound("alpha", networkedAction("foo"), "core");
		expect(base.acceptsInbound("alpha", "foo")).toBe(true);
		expect(base.acceptsInbound("beta", "foo")).toBe(false);
	});

	test("validateInbound runs the creator's schema when present", () => {
		const base = makeBase();
		base.claimInbound(
			"alpha",
			networkedAction<string>("typed", stringSchema),
			"core"
		);
		const ok = base.validateInbound("alpha", "typed", "hello");
		expect(ok.ok).toBe(true);
		const bad = base.validateInbound("alpha", "typed", 42);
		expect(bad.ok).toBe(false);
		if (!bad.ok) {
			expect(bad.reason).toMatch(/expected string/);
		}
	});

	test("validateInbound returns unknown-type when no slot exists", () => {
		const base = makeBase();
		const result = base.validateInbound("alpha", "missing", null);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.reason).toMatch(/unknown inbound type on channel "alpha"/);
		}
	});

	test("collision: first-claimed wins, error logged with both origins", () => {
		const base = makeBase();
		base.claimOutbound("left", networkedAction("dup"), "core");
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		base.claimOutbound("left", networkedAction("dup"), { plugin: "@me/p" });
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(
				/outbound channel "left".*type "dup".*claimed by core.*plugin "@me\/p"/
			)
		);
		errorSpy.mockRestore();
	});

	test("unknown channel logs an error and drops the claim", () => {
		const base = makeBase();
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		base.claimInbound("nope" as any, networkedAction("x"), "core");
		expect(errorSpy).toHaveBeenCalledWith(
			expect.stringMatching(/unknown inbound channel: nope/)
		);
		errorSpy.mockRestore();
	});

	test("clear drops every claim across all channels", () => {
		const base = makeBase();
		base.claimInbound("alpha", networkedAction("a"), "core");
		base.claimOutbound("left", networkedAction("b"), "core");
		base.clear();
		expect(base.acceptsInbound("alpha", "a")).toBe(false);
		expect(base.acceptsOutbound("left", "b")).toBe(false);
	});
});
