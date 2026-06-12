import { LeafPaths, ValueAtPath } from "./dotPaths";

/**
 * Patchable game-constant map. Plugins extend it via declaration merging:
 *
 * ```ts
 * declare module "@cc-engine/kernel" {
 *   interface Defines {
 *     economy: { buyXpCost: number; rerollCost: number };
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Defines {}

export type DefinesPath = LeafPaths<Defines>;

export type DefinesValueAt<P extends DefinesPath> = ValueAtPath<Defines, P>;

export type DefinesOrigin = "core" | { plugin: string };

type Slot = { value: unknown; origin: DefinesOrigin };

const formatOrigin = (origin: DefinesOrigin): string =>
	origin === "core" ? "core" : `plugin "${origin.plugin}"`;

const originsEqual = (a: DefinesOrigin, b: DefinesOrigin): boolean => {
	if (a === "core" && b === "core") {
		return true;
	}
	if (a === "core" || b === "core") {
		return false;
	}
	return a.plugin === b.plugin;
};

/**
 * Read/write gamemode tuning constants.
 *
 * @example
 * ```ts
 * ctx.defines.set("economy.buyXpCost", 5);
 * ctx.defines.patch("economy.buyXpCost", 1);
 * const cost = ctx.defines.get("economy.buyXpCost");
 * ```
 */
export class DefinesApi {
	private readonly values: Map<string, Slot>;
	private readonly defaultOrigin: DefinesOrigin;

	public constructor(values?: Map<string, Slot>, defaultOrigin: DefinesOrigin = "core") {
		this.values = values ?? new Map();
		this.defaultOrigin = defaultOrigin;
	}

	/** @throws If `path` hasn't been `set` - use `has` to probe. */
	public get<P extends DefinesPath>(path: P): DefinesValueAt<P>;
	public get<T = unknown>(path: string): T;
	public get(path: string): unknown {
		const slot = this.values.get(path);
		if (!slot) {
			throw new Error(`Defines: no value registered for path '${path}'`);
		}
		return slot.value;
	}

	public has(path: DefinesPath | string): boolean {
		return this.values.has(path);
	}

	/** Cross-origin overwrite logs a warning; the write still goes through. */
	public set<P extends DefinesPath>(path: P, value: DefinesValueAt<P>): void;
	public set<T>(path: string, value: T): void;
	public set(path: string, value: unknown): void {
		const existing = this.values.get(path);
		if (existing && !originsEqual(existing.origin, this.defaultOrigin)) {
			const claimedBy = formatOrigin(existing.origin);
			const newWriter = formatOrigin(this.defaultOrigin);
			// eslint-disable-next-line no-console
			console.warn(
				`[defines] '${path}' already set by ${claimedBy}; overwriting from ${newWriter}. ` +
					"Use 'patch' to acknowledge the prior value, or rename the path."
			);
		}
		this.values.set(path, { value, origin: this.defaultOrigin });
	}

	/** @throws If `path` hasn't been `set` - use `set` to introduce one. */
	public patch<P extends DefinesPath>(path: P, value: DefinesValueAt<P>): void;
	public patch<T>(path: string, value: T): void;
	public patch(path: string, value: unknown): void {
		if (!this.values.has(path)) {
			throw new Error(
				`Defines.patch: path '${path}' is not set. Use 'set' to introduce a new path, or check the spelling.`
			);
		}
		this.values.set(path, { value, origin: this.defaultOrigin });
	}

	public originOf(path: DefinesPath | string): DefinesOrigin | null {
		return this.values.get(path)?.origin ?? null;
	}

	/** Returns a view that shares values but stamps writes with `origin`. */
	public scopedTo(origin: DefinesOrigin): DefinesApi {
		return new DefinesApi(this.values, origin);
	}
}
