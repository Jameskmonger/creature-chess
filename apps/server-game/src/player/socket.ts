import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { PlayerProfile } from "@creature-chess/models";

type GuestSocketData = {
	type: "guest";
	id: string;
	nickname: string;
	profile: PlayerProfile;
};

type PlayerSocketData = {
	type: "player";
	id: string;
	nickname: string | null;
	profile: PlayerProfile | null;
};

type AuthenticatedSocketData = GuestSocketData | PlayerSocketData;

export type AuthenticatedSocket = Socket<
	DefaultEventsMap,
	DefaultEventsMap,
	DefaultEventsMap,
	AuthenticatedSocketData
> & { data: Required<AuthenticatedSocketData> };
