import type { WireSchema } from "./wireAction";

/** A wire-action object produced by a `NetworkedActionFactory`. */
export type NetworkedAction<T extends string, P = void> = {
	type: T;
	payload: P;
};

/**
 * Callable factory for a typed wire action.
 */
export type NetworkedActionFactory<T extends string, P = void> = ((
	payload: P
) => NetworkedAction<T, P>) & {
	type: T;
	schema?: WireSchema<P>;
	toString(): T;
	match(action: { type: string }): action is NetworkedAction<T, P>;
};

/**
 * Builds a typed wire-action factory.
 *
 * @param type The action type discriminator.
 * @param schema Optional payload validator for inbound use.
 * @returns A factory `(payload) => { type, payload: { type, schema, toString, match } }`.
 *
 * @example
 * ```ts
 * const quickChat = networkedAction<{ text: string }>(
 *   "quickChat",
 *   z.object({ text: z.string() })
 * );
 * ```
 */
export const networkedAction = <P = void, T extends string = string>(
	type: T,
	schema?: WireSchema<P>
): NetworkedActionFactory<T, P> => {
	const factory = ((payload: P) => ({
		type,
		payload,
	})) as NetworkedActionFactory<T, P>;
	factory.type = type;
	factory.schema = schema;
	factory.toString = () => type;
	factory.match = (a): a is NetworkedAction<T, P> => a.type === type;
	return factory;
};
