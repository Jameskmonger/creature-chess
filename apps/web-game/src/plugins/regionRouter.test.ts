import * as React from "react";

import {
	RegionDescriptor,
	augment,
	remove,
	replace,
	transformForClass,
	wrap,
} from "@cc-plugins/api";

// Side-effect: brings the gamemode's `RegionContexts` augmentation into
// scope so `"phase-timer"` typechecks as a known class.
import "@creature-chess/gamemode/client";

import { RegionRouter, composeRegion } from "./regionRouter";
import { createClientPluginRegistry } from "./registry";

const phaseRegion: RegionDescriptor = {
	id: "r1",
	classes: ["phase-timer"],
};

const phaseCtx = {
	phaseEndTimeSeconds: 0,
	phaseDurationSeconds: null,
	gameOver: false,
};


const text = (node: React.ReactNode): string => {
	if (node === null || node === undefined) {
		return "";
	}
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}
	if (Array.isArray(node)) {
		return node.map(text).join("");
	}
	if (React.isValidElement(node)) {
		const children = (node.props as { children?: React.ReactNode }).children;
		return text(children);
	}
	return "";
};

describe("RegionRouter.resolveRegion phase ordering", () => {
	test("phases compose in remove -> replace -> wrap -> augment -> transform order", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/p",
			ui: [
				wrap("phase-timer", (children) =>
					React.createElement("div", { id: "wrap" }, children)
				),
				augment("phase-timer", () => React.createElement("span", null, "before"), {
					slot: "before",
				}),
				augment("phase-timer", () => React.createElement("span", null, "after"), {
					slot: "after",
				}),
			],
		});
		const router = new RegionRouter(registry);
		const ops = router.resolveRegion(phaseRegion);
		const composed = composeRegion(
			ops,
			React.createElement("p", null, "core"),
			phaseCtx,
			phaseRegion
		);
		expect(text(composed)).toBe("beforecoreafter");
	});

	test("a remove op short-circuits every other phase", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/p",
			ui: [
				remove("phase-timer"),
				replace("phase-timer", () => React.createElement("span", null, "nope")),
			],
		});
		const router = new RegionRouter(registry);
		const ops = router.resolveRegion(phaseRegion);
		const composed = composeRegion(
			ops,
			React.createElement("p", null, "core"),
			phaseCtx,
			phaseRegion
		);
		expect(composed).toBeNull();
	});

	test("multiple replaces: last-registered wins and the others are warned", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/a",
			ui: [replace("phase-timer", () => React.createElement("span", null, "A"))],
		});
		registry.register({
			id: "@me/b",
			ui: [replace("phase-timer", () => React.createElement("span", null, "B"))],
		});

		const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
		const router = new RegionRouter(registry);
		const ops = router.resolveRegion(phaseRegion);
		const composed = composeRegion(
			ops,
			React.createElement("p", null, "core"),
			phaseCtx,
			phaseRegion
		);
		expect(text(composed)).toBe("B");
		expect(warn).toHaveBeenCalledWith(
			expect.stringMatching(/multiple replaces.*"@me\/b" wins.*ignored: @me\/a/)
		);
		warn.mockRestore();
	});

	test("wraps compose outermost-last (later-registered wraps the earlier)", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/inner",
			ui: [
				wrap("phase-timer", (children) =>
					React.createElement("inner", null, children)
				),
			],
		});
		registry.register({
			id: "@me/outer",
			ui: [
				wrap("phase-timer", (children) =>
					React.createElement("outer", null, children)
				),
			],
		});
		const router = new RegionRouter(registry);
		const ops = router.resolveRegion(phaseRegion);
		const composed = composeRegion(
			ops,
			"core",
			phaseCtx,
			phaseRegion
		) as React.ReactElement;
		expect(composed.type).toBe("outer");
		const innerChild = (composed.props as { children: React.ReactElement })
			.children;
		expect(innerChild.type).toBe("inner");
	});

	test("transform runs after augment", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/p",
			ui: [
				augment("phase-timer", () => React.createElement("span", null, "B"), {
					slot: "before",
				}),
				transformForClass("phase-timer", (node) =>
					React.createElement("box", null, node)
				),
			],
		});
		const router = new RegionRouter(registry);
		const ops = router.resolveRegion(phaseRegion);
		const composed = composeRegion(
			ops,
			"core",
			phaseCtx,
			phaseRegion
		) as React.ReactElement;
		expect(composed.type).toBe("box");
		expect(text(composed)).toBe("Bcore");
	});

	test("topo-sorts wraps by dependsOn within phase", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/p",
			ui: [
				wrap(
					"phase-timer",
					(children) => React.createElement("late", null, children),
					{ id: "late", dependsOn: ["early"] }
				),
				wrap(
					"phase-timer",
					(children) => React.createElement("early", null, children),
					{ id: "early" }
				),
			],
		});
		const router = new RegionRouter(registry);
		const ops = router.resolveRegion(phaseRegion);
		// `late` dependsOn `early` -> topo-sort puts `early` first in the
		// array, then `late`. composeRegion reverses (outermost = last) so
		// `late` ends up the outer wrap.
		const composed = composeRegion(
			ops,
			"core",
			phaseCtx,
			phaseRegion
		) as React.ReactElement;
		expect(composed.type).toBe("late");
	});

	test("cache invalidates when registry changes", () => {
		const registry = createClientPluginRegistry();
		const router = new RegionRouter(registry);
		expect(router.hasUiOps).toBe(false);
		registry.register({
			id: "@me/p",
			ui: [
				wrap("phase-timer", (children) =>
					React.createElement("w", null, children)
				),
			],
		});
		expect(router.hasUiOps).toBe(true);
		const ops = router.resolveRegion(phaseRegion);
		expect(ops.wraps.length).toBe(1);
	});
});
