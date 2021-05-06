import { PlayerTitle } from "./titles";

export interface LobbyPlayer {
    id: string;
    name: string;
    isBot: boolean;
    title: PlayerTitle | null;
}
