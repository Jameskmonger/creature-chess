import { WireActionCreator, WireSchema } from "./wireAction";

export type WireOrigin = "core" | { plugin: string };

export type ValidatePayloadResult =
	| { ok: true; payload: unknown }
	| { ok: false; reason: string };

type Slot = { creator: WireActionCreator; origin: WireOrigin };

export const formatWireOrigin = (origin: WireOrigin): string =>
	origin === "core" ? "core" : `plugin "${origin.plugin}"`;

export class WireProtocolBase<
	InCh extends string,
	OutCh extends string,
> {
	private readonly inbound = new Map<InCh, Map<string, Slot>>();
	private readonly outbound = new Map<OutCh, Map<string, Slot>>();

	public constructor(
		inboundChannels: readonly InCh[],
		outboundChannels: readonly OutCh[]
	) {
		for (const channel of inboundChannels) {
			this.inbound.set(channel, new Map());
		}
		for (const channel of outboundChannels) {
			this.outbound.set(channel, new Map());
		}
	}

	public claimInbound(
		channel: InCh,
		creator: WireActionCreator,
		origin: WireOrigin
	): void {
		this.claim("inbound", this.inbound, channel, creator, origin);
	}

	public claimOutbound(
		channel: OutCh,
		creator: WireActionCreator,
		origin: WireOrigin
	): void {
		this.claim("outbound", this.outbound, channel, creator, origin);
	}

	public acceptsInbound(channel: InCh, type: string): boolean {
		return this.inbound.get(channel)?.has(type) ?? false;
	}

	public acceptsOutbound(channel: OutCh, type: string): boolean {
		return this.outbound.get(channel)?.has(type) ?? false;
	}

	public validateInbound(
		channel: InCh,
		type: string,
		payload: unknown
	): ValidatePayloadResult {
		return this.validate("inbound", this.inbound, channel, type, payload);
	}

	/** Drop every claim. Used when a registry changes and the protocol rebuilds. */
	public clear(): void {
		for (const map of this.inbound.values()) {
			map.clear();
		}
		for (const map of this.outbound.values()) {
			map.clear();
		}
	}

	private claim<Ch extends string>(
		direction: "inbound" | "outbound",
		store: Map<Ch, Map<string, Slot>>,
		channel: Ch,
		creator: WireActionCreator,
		origin: WireOrigin
	): void {
		const channelMap = store.get(channel);
		if (!channelMap) {
			// eslint-disable-next-line no-console
			console.error(
				`[wire-protocol] unknown ${direction} channel: ${String(channel)}`
			);
			return;
		}
		const existing = channelMap.get(creator.type);
		if (existing) {
			const claimedBy = formatWireOrigin(existing.origin);
			const duplicateFrom = formatWireOrigin(origin);
			const ch = String(channel);
			// eslint-disable-next-line no-console
			console.error(
				`[wire-protocol] ${direction} channel "${ch}" type "${creator.type}" ` +
					`already claimed by ${claimedBy}; ignoring duplicate from ${duplicateFrom}`
			);
			return;
		}
		channelMap.set(creator.type, { creator, origin });
	}

	private validate<Ch extends string>(
		direction: "inbound" | "outbound",
		store: Map<Ch, Map<string, Slot>>,
		channel: Ch,
		type: string,
		payload: unknown
	): ValidatePayloadResult {
		const slot = store.get(channel)?.get(type);
		if (!slot) {
			return {
				ok: false,
				reason: `unknown ${direction} type on channel "${String(channel)}": ${type}`,
			};
		}
		return validateAgainstSchema(slot.creator.schema, payload);
	}
}

const validateAgainstSchema = (
	schema: WireSchema<unknown> | undefined,
	payload: unknown
): ValidatePayloadResult => {
	if (!schema) {
		return { ok: true, payload };
	}
	const result = schema.safeParse(payload);
	if (result.success) {
		return { ok: true, payload: result.data };
	}
	return { ok: false, reason: result.error.message };
};
