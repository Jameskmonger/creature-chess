import { log } from "@creature-chess/shared";
import { Game, Player } from "@creature-chess/shared/game";
import { SocketPlayer } from "../player/socketPlayer";

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
        this.sessions[playerId] = { player, location: { type, id } };
    }

    public deregisterPlayer(playerId: string) {
        delete this.sessions[playerId];
    }

    public getPlayer(playerId: string) {
        return this.sessions[playerId] || null;
    }

    public registerGame(game: Game) {
        game.getPlayers()
            .filter(p => (p as SocketPlayer).isConnection)
            .forEach(p => {
                this.registerPlayer(p.id, p, "game", game.id);
            });

        game.onFinish((winner, gamePlayers) => {
            gamePlayers.forEach(p => {
                if (!p.isBot) {
                    this.deregisterPlayer(p.id);
                }
            });
        });

        game.onPlayerDeath(p => {
            if (!p.isBot) {
                this.deregisterPlayer(p.id);
            }
        });

        game.onPlayerQuit(p => {
            log(`Player '${p.name}' quit game ${game.id}`);

            if (!p.isBot) {
                this.deregisterPlayer(p.id);
            }
        });
    }
}
