import { GamemodeSettings } from "@creature-chess/models";

import { EmptyPacket } from "./empty-packet";

export type Events = {
	startNow: (payload: EmptyPacket) => void;
	updateSetting: (payload: {
		key: keyof GamemodeSettings;
		value: string;
	}) => void;
};
