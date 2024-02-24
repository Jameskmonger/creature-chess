import { PlayerProfile } from "../player/profile";

export interface LobbyPlayer {
	type: "player" | "guest" | "bot";
	id: string;
	name: string;
	profile: PlayerProfile;
}
