import { PlayerProfile } from "../player/profile";

export interface LobbyPlayer {
	/**
	 * Identity-provider kind (e.g. "guest", "player") or "bot".
	 */
	type: string;
	id: string;
	name: string;
	profile: PlayerProfile;
}
