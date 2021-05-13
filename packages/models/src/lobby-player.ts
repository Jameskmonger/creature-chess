import { PlayerProfile } from "./playerProfile";

export interface LobbyPlayer {
	id: string;
	name: string;
	isBot: boolean;
	profile: PlayerProfile | null;
}
