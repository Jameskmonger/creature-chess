import { Player } from "@creature-chess/shared/game";

type PlayerLocation = {
    type: "lobby" | "game",
    id: string
};

export class PlayerSessionRegistry {
    private sessions: {
        [playerId: string]: {
            player: Player;
            location: PlayerLocation;
        }
    } = {};

    public registerPlayer(playerId: string, player: Player, type: "lobby" | "game", id: string) {
        this.sessions[playerId] = { player, location: { type, id }};
    }

    public deregisterPlayer(playerId: string) {
        delete this.sessions[playerId];
    }

    public getPlayer(playerId: string) {
        return this.sessions[playerId] || null;
    }
}
