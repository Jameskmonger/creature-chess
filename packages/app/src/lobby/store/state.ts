import { LobbyPlayer } from "@creature-chess/models";

export interface LobbyState {
    localPlayerId: string;
    lobbyId: string;
    players: LobbyPlayer[];
    startingAtMs: number;
}
