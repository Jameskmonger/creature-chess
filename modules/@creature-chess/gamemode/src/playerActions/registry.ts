import { z } from "zod";

import { Player } from "../entities/player/player";

/** A PlayerAction definition: type + payload schema + handler. */
export type PlayerActionDef<P> = {
	type: string;
	schema: z.ZodType<P>;
	handler: (player: Player, payload: P) => void;
};

export const definePlayerAction = <S extends z.ZodTypeAny>(def: {
	type: string;
	schema: S;
	handler: (player: Player, payload: z.infer<S>) => void;
}): PlayerActionDef<z.infer<S>> => def as PlayerActionDef<z.infer<S>>;

export type DispatchResult = { ok: true } | { ok: false; reason: string };

export const buildPlayerActionRegistry = (
	defs: readonly PlayerActionDef<any>[]
) => {
	const byType = new Map<string, PlayerActionDef<any>>();
	for (const def of defs) {
		if (byType.has(def.type)) {
			throw new Error(`duplicate PlayerAction type: ${def.type}`);
		}
		byType.set(def.type, def);
	}

	const types = defs.map((d) => d.type);

	const dispatchIncoming = (
		player: Player,
		raw: { type?: unknown; payload?: unknown }
	): DispatchResult => {
		if (typeof raw?.type !== "string") {
			return { ok: false, reason: "missing or non-string action type" };
		}
		const def = byType.get(raw.type);
		if (!def) {
			return { ok: false, reason: `unknown action type: ${raw.type}` };
		}
		const parsed = def.schema.safeParse(raw.payload);
		if (!parsed.success) {
			return {
				ok: false,
				reason: `invalid payload for ${raw.type}: ${parsed.error.message}`,
			};
		}
		def.handler(player, parsed.data);
		return { ok: true };
	};

	/**
	 * Run a player action without schema validation. For server-internal
	 * callers (bots, scripted scenarios) where the action object is already
	 * typed and trusted; skip the per-call zod parse on the hot path.
	 */
	const dispatchTrusted = (
		player: Player,
		action: { type: string; payload?: unknown }
	): void => {
		const def = byType.get(action.type);
		if (!def) {
			throw new Error(`unknown PlayerAction type: ${action.type}`);
		}
		def.handler(player, action.payload);
	};

	return { types, dispatchIncoming, dispatchTrusted };
};
