import { PlayerProfile } from "./playerProfile";

export interface LobbyPlayer {
	id: string;
	name: string;
	profile: PlayerProfile;
}
