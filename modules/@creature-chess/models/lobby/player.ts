import { PlayerProfile } from "../player/profile";

export interface LobbyPlayer {
	id: string;
	name: string;
	profile: PlayerProfile;
}
