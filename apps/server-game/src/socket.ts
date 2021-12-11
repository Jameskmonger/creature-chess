import { PlayerProfile } from "@creature-chess/models";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type AuthenticatedSocketData = {
	id: string;
	nickname: string | null;
	profile: PlayerProfile | null;
};
export type AuthenticatedSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, AuthenticatedSocketData>;
