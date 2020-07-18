import { Player } from "@common/game";

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

    public getPlayer(playerId: string) {
        return this.sessions[playerId] || null;
    }
}
