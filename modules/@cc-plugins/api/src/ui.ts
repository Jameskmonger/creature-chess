import { ReactNode } from "react";

import { RegionContexts } from "./regionContexts";

/**
 * A named, transformable area of UI.
 */
export type RegionDescriptor = {
	/** Full hierarchical path, e.g. `ready-overlay/player.avatar`. */
	id: string;
	/** Semantic tags - the matcher targeting surface. */
	classes: readonly string[];
};

/** Predicate over a `RegionDescriptor`. */
export type RegionMatcher = (region: RegionDescriptor) => boolean;

const byClass =
	(cls: string): RegionMatcher =>
	(region) =>
		region.classes.includes(cls);

/**
 * Build a matcher to select one region by id.
 *
 * @param id The full region path to match.
 * @returns A matcher that returns true only for the exact path.
 */
export const byId =
	(id: string): RegionMatcher =>
	(region) =>
		region.id === id;

export type UiOperationCommon = {
	/** Stable id other ops can target via `dependsOn`. */
	id?: string;
	/** Op ids this one must run after, within its own phase. */
	dependsOn?: readonly string[];
};

/** Hides the region. Short-circuits every later phase. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RemoveOperation = UiOperationCommon & {
	kind: "remove";
	match: RegionMatcher;
};

/** Replaces the host's children. Only one `replace` wins per region. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReplaceOperation<Ctx = any> = UiOperationCommon & {
	kind: "replace";
	match: RegionMatcher;
	render: (ctx: Ctx, region: RegionDescriptor) => Exclude<ReactNode, undefined>;
};

/** Wraps the running node. Multiple wraps compose, later ones are outermost. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WrapOperation<Ctx = any> = UiOperationCommon & {
	kind: "wrap";
	match: RegionMatcher;
	render: (
		children: ReactNode,
		ctx: Ctx,
		region: RegionDescriptor
	) => Exclude<ReactNode, undefined>;
};

/** Adds content before or after the running node. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AugmentOperation<Ctx = any> = UiOperationCommon & {
	kind: "augment";
	match: RegionMatcher;
	slot: "before" | "after";
	render: (ctx: Ctx, region: RegionDescriptor) => Exclude<ReactNode, undefined>;
};

/** Arbitrary `(node, ctx) => node` op. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransformOperation<Ctx = any> = UiOperationCommon & {
	kind: "transform";
	match: RegionMatcher;
	render: (
		node: ReactNode,
		ctx: Ctx,
		region: RegionDescriptor
	) => Exclude<ReactNode, undefined>;
};

/** Any UI operation a `ClientPlugin` can contribute. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UiOperation<Ctx = any> =
	| RemoveOperation
	| ReplaceOperation<Ctx>
	| WrapOperation<Ctx>
	| AugmentOperation<Ctx>
	| TransformOperation<Ctx>;

type OperationOpts = { id?: string; dependsOn?: readonly string[] };

/**
 * Replaces the region's content with the rendered output. Last-registered
 * wins if multiple plugins replace the same region.
 *
 * @param cls Region class to target.
 * @param render Receives the typed ctx. Returns the replacement node.
 * @param opts Optional id and dependsOn.
 * @returns A `ReplaceOperation` to include in `ClientPlugin.ui`.
 *
 * @example
 * ```ts
 * replace("phase-timer", ({ phaseEndTimeSeconds }) => <TimerBar end={phaseEndTimeSeconds} />)
 * ```
 */
export const replace = <C extends keyof RegionContexts>(
	cls: C,
	render: (
		ctx: RegionContexts[C],
		region: RegionDescriptor
	) => Exclude<ReactNode, undefined>,
	opts?: OperationOpts
): ReplaceOperation<RegionContexts[C]> => ({
	kind: "replace",
	match: byClass(cls),
	render,
	...(opts?.id ? { id: opts.id } : {}),
	...(opts?.dependsOn ? { dependsOn: opts.dependsOn } : {}),
});

/**
 * Wraps the region's current content. Multiple wraps compose with the
 * later-registered as the outermost.
 *
 * @param cls Region class to target.
 * @param render Receives the running children and typed ctx. Returns the new node.
 * @param opts Optional id and dependsOn.
 * @returns A `WrapOperation` to include in `ClientPlugin.ui`.
 *
 * @example
 * ```ts
 * wrap("overlay-content", (children) => <Frame>{children}</Frame>)
 * ```
 */
export const wrap = <C extends keyof RegionContexts>(
	cls: C,
	render: (
		children: ReactNode,
		ctx: RegionContexts[C],
		region: RegionDescriptor
	) => Exclude<ReactNode, undefined>,
	opts?: OperationOpts
): WrapOperation<RegionContexts[C]> => ({
	kind: "wrap",
	match: byClass(cls),
	render,
	...(opts?.id ? { id: opts.id } : {}),
	...(opts?.dependsOn ? { dependsOn: opts.dependsOn } : {}),
});

/**
 * Adds content before or after the running node. Multiple augments in
 * the same slot compose in `dependsOn` then load order.
 *
 * @param cls Region class to target.
 * @param render Receives the typed ctx. Returns the node to insert.
 * @param opts Must include `slot` (`"before"` or `"after"`). May include id and dependsOn.
 * @returns An `AugmentOperation` to include in `ClientPlugin.ui`.
 *
 * @example
 * ```ts
 * augment("player-avatar", ({ playerId }) => <Badge playerId={playerId} />, { slot: "after" })
 * ```
 */
export const augment = <C extends keyof RegionContexts>(
	cls: C,
	render: (
		ctx: RegionContexts[C],
		region: RegionDescriptor
	) => Exclude<ReactNode, undefined>,
	opts: OperationOpts & { slot: "before" | "after" }
): AugmentOperation<RegionContexts[C]> => ({
	kind: "augment",
	match: byClass(cls),
	slot: opts.slot,
	render,
	...(opts.id ? { id: opts.id } : {}),
	...(opts.dependsOn ? { dependsOn: opts.dependsOn } : {}),
});

/**
 * Removes the region entirely. No subsequent op runs in any phase.
 *
 * @param cls Region class to target.
 * @param opts Optional id and dependsOn.
 * @returns A `RemoveOperation` to include in `ClientPlugin.ui`.
 */
export const remove = <C extends keyof RegionContexts>(
	cls: C,
	opts?: OperationOpts
): RemoveOperation => ({
	kind: "remove",
	match: byClass(cls),
	...(opts?.id ? { id: opts.id } : {}),
	...(opts?.dependsOn ? { dependsOn: opts.dependsOn } : {}),
});

/**
 * Escape hatch for cases the four verbs don't cover. Runs in its own
 * phase, after augment.
 *
 * @param cls Region class to target.
 * @param fn Receives the running node and typed ctx. Returns the next node (or `null` to remove).
 * @param opts Optional id and dependsOn.
 * @returns A `TransformOperation` to include in `ClientPlugin.ui`.
 *
 * @example
 * ```ts
 * transformForClass("phase-timer", (node, ctx) =>
 *   ctx.gameOver ? null : <Wrapper>{node}</Wrapper>
 * )
 * ```
 */
export const transformForClass = <C extends keyof RegionContexts>(
	cls: C,
	fn: (
		node: ReactNode,
		ctx: RegionContexts[C],
		region: RegionDescriptor
	) => Exclude<ReactNode, undefined>,
	opts?: OperationOpts
): TransformOperation<RegionContexts[C]> => ({
	kind: "transform",
	match: byClass(cls),
	render: fn,
	...(opts?.id ? { id: opts.id } : {}),
	...(opts?.dependsOn ? { dependsOn: opts.dependsOn } : {}),
});
