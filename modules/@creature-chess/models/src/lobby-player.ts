import { PlayerProfile } from "./playerProfile";

export interface LobbyPlayer {
	id: number;
	name: string;
	profile: PlayerProfile;
}
