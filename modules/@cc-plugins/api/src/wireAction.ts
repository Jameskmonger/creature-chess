/** A wire-action object: a `type` discriminator and a payload. */
export type WireAction<T extends string = string, P = unknown> = {
	type: T;
	payload: P;
};

export interface WireSchema<P = unknown> {
	safeParse(
		input: unknown
	):
		| { success: true; data: P }
		| { success: false; error: { message: string } };
}

/**
 * Minimum shape for a wire-action creator listed in `ClientPlugin.wire`.
 * The host reads `.type` for accept/forward sets and `.schema` for
 * inbound validation. A `networkedAction()` factory fits structurally.
 */
// `P = any` (not `unknown`) so a heterogeneous list of creators fits in
// one array - function parameters are contravariant.
export type WireActionCreator<
	T extends string = string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	P = any,
> = {
	readonly type: T;
	readonly schema?: WireSchema<P>;
} & ((payload: P) => WireAction<T, P>);
