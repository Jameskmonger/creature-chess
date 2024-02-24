import { protocol as shokiProtocol } from "@shoki/networking";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { EmptyPacket } from "./empty-packet";

export type PacketSet = {
	startNow: {
		payload: EmptyPacket;
		ack: never;
	};
	updateSetting: {
		payload: {
			key: keyof GamemodeSettings;
			value: string;
		};
		ack: never;
	};
};

export const { incoming, outgoing } = shokiProtocol<PacketSet>();
