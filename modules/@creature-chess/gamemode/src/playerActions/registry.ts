import { WireActionCreator } from "@cc-plugins/api";

import { Player } from "../entities/player/player";
import { WireProtocol } from "../wireProtocol";

/** Server-side dispatch for a wire action - the creator carries type + schema. */
export type PlayerActionDef<P> = {
	creator: WireActionCreator<string, P>;
	handler: (player: Player, payload: P) => void;
};

export const definePlayerAction = <P>(def: {
	creator: WireActionCreator<string, P>;
	handler: (player: Player, payload: P) => void;
}): PlayerActionDef<P> => def;

export type DispatchResult = { ok: true } | { ok: false; reason: string };

export type PlayerActionWrapper = (
	next: () => void,
	player: Player,
	payload: unknown
) => void;

export interface PlayerActionRegistry {
	readonly types: string[];
	register(def: PlayerActionDef<any>): void;
	wrap(type: string, wrapper: PlayerActionWrapper): void;
	dispatchIncoming(
		player: Player,
		raw: { type?: unknown; payload?: unknown }
	): DispatchResult;
	dispatchTrusted(
		player: Player,
		action: { type: string; payload?: unknown }
	): void;
}

export const createPlayerActionRegistry = (
	wire?: WireProtocol
): PlayerActionRegistry => {
	const byType = new Map<string, PlayerActionDef<any>>();
	const wrappers = new Map<string, PlayerActionWrapper[]>();

	const run = (def: PlayerActionDef<any>, player: Player, payload: unknown) => {
		const chain = wrappers.get(def.creator.type);
		let invoke = () => def.handler(player, payload);
		if (chain) {
			for (let i = chain.length - 1; i >= 0; i--) {
				const wrapper = chain[i];
				const inner = invoke;
				invoke = () => wrapper(inner, player, payload);
			}
		}
		invoke();
	};

	return {
		get types() {
			return [...byType.keys()];
		},

		register(def) {
			const type = def.creator.type;
			if (byType.has(type)) {
				throw new Error(`duplicate PlayerAction type: ${type}`);
			}
			byType.set(type, def);
			wire?.addInbound(def.creator);
		},

		wrap(type, wrapper) {
			const chain = wrappers.get(type);
			if (chain) {
				chain.push(wrapper);
			} else {
				wrappers.set(type, [wrapper]);
			}
		},

		dispatchIncoming(player, raw) {
			if (typeof raw?.type !== "string") {
				return { ok: false, reason: "missing or non-string action type" };
			}
			const def = byType.get(raw.type);
			if (!def) {
				return { ok: false, reason: `unknown action type: ${raw.type}` };
			}
			const schema = def.creator.schema;
			if (schema) {
				const parsed = schema.safeParse(raw.payload);
				if (!parsed.success) {
					return {
						ok: false,
						reason: `invalid payload for ${raw.type}: ${parsed.error.message}`,
					};
				}
				run(def, player, parsed.data);
			} else {
				run(def, player, raw.payload);
			}
			return { ok: true };
		},

		// Skips schema validation - for server-internal callers (bots, scripted scenarios).
		dispatchTrusted(player, action) {
			const def = byType.get(action.type);
			if (!def) {
				throw new Error(`unknown PlayerAction type: ${action.type}`);
			}
			run(def, player, action.payload);
		},
	};
};
