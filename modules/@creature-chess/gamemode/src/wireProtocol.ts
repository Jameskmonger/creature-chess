import {
	ValidatePayloadResult,
	WireActionCreator,
	WireOrigin,
	WireProtocolBase,
} from "@cc-plugins/api";

export type OutboundChannel =
	| "gameEvents"
	| "playerEvents"
	| "playerInfoUpdates";

type InboundChannel = "default";

const OUTBOUND_CHANNELS: readonly OutboundChannel[] = [
	"gameEvents",
	"playerEvents",
	"playerInfoUpdates",
];

export type { ValidatePayloadResult };

export class WireProtocol {
	private readonly base = new WireProtocolBase<InboundChannel, OutboundChannel>(
		["default"],
		OUTBOUND_CHANNELS
	);

	public acceptsOutbound(channel: OutboundChannel, type: string): boolean {
		return this.base.acceptsOutbound(channel, type);
	}

	public acceptsInbound(type: string): boolean {
		return this.base.acceptsInbound("default", type);
	}

	public validateInbound(
		type: string,
		payload: unknown
	): ValidatePayloadResult {
		return this.base.validateInbound("default", type, payload);
	}

	public addOutbound(
		channel: OutboundChannel,
		creator: WireActionCreator,
		origin: WireOrigin = "core"
	): void {
		this.base.claimOutbound(channel, creator, origin);
	}

	public addInbound(
		creator: WireActionCreator,
		origin: WireOrigin = "core"
	): void {
		this.base.claimInbound("default", creator, origin);
	}
}
