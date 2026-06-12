import {
	ValidatePayloadResult,
	WireActionCreator,
	WireOrigin,
	WireProtocolBase,
} from "@cc-plugins/api";

import {
	gameEventCreators,
	playerActionCreators,
	playerInfoUpdateCreators,
	wirePlayerEventCreators,
} from "@creature-chess/models";

import { ClientPluginRegistry, pluginRegistry } from "./registry";

export type InboundChannel =
	| "gameEvents"
	| "playerEvents"
	| "playerInfoUpdates";

type OutboundChannel = "default";

const INBOUND_CHANNELS: readonly InboundChannel[] = [
	"gameEvents",
	"playerEvents",
	"playerInfoUpdates",
];

export type { ValidatePayloadResult };

export class WireProtocol {
	private readonly base = new WireProtocolBase<InboundChannel, OutboundChannel>(
		INBOUND_CHANNELS,
		["default"]
	);
	private dirty = true;

	public constructor(
		private readonly coreInbound: Readonly<
			Record<InboundChannel, readonly WireActionCreator[]>
		>,
		private readonly coreOutbound: readonly WireActionCreator[],
		private readonly registry: ClientPluginRegistry
	) {
		this.registry.onChange(() => {
			this.dirty = true;
		});
	}

	public acceptsInbound(channel: InboundChannel, type: string): boolean {
		this.refresh();
		return this.base.acceptsInbound(channel, type);
	}

	public acceptsOutbound(type: string): boolean {
		this.refresh();
		return this.base.acceptsOutbound("default", type);
	}

	public validateInbound(
		channel: InboundChannel,
		type: string,
		payload: unknown
	): ValidatePayloadResult {
		this.refresh();
		return this.base.validateInbound(channel, type, payload);
	}

	private refresh(): void {
		if (!this.dirty) {
			return;
		}
		this.base.clear();
		for (const channel of INBOUND_CHANNELS) {
			for (const creator of this.coreInbound[channel]) {
				this.base.claimInbound(channel, creator, "core");
			}
		}
		for (const creator of this.coreOutbound) {
			this.base.claimOutbound("default", creator, "core");
		}
		for (const plugin of this.registry.list()) {
			const origin: WireOrigin = { plugin: plugin.id };

			// The server may emit plugin outbound on any of the three inbound
			// channels, so claim plugin inbound on all of them.
			for (const creator of plugin.wire?.inbound ?? []) {
				for (const channel of INBOUND_CHANNELS) {
					this.base.claimInbound(channel, creator, origin);
				}
			}

			for (const creator of plugin.wire?.outbound ?? []) {
				this.base.claimOutbound("default", creator, origin);
			}
		}
		this.dirty = false;
	}
}

export const wireProtocol = new WireProtocol(
	{
		gameEvents: gameEventCreators,
		playerEvents: wirePlayerEventCreators,
		playerInfoUpdates: playerInfoUpdateCreators,
	},
	playerActionCreators,
	pluginRegistry
);
