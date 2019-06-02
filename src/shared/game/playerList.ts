import { PlayerListPlayer } from "../models";
import { Player } from "./player/player";
import { EventEmitter } from "events";

enum PlayerListEvents {
    UPDATE = "UPDATE"
}

export class PlayerList {
    private players: PlayerListPlayer[] = [];
    private deadPlayers: PlayerListPlayer[] = [];
    private events = new EventEmitter();

    public onUpdate(fn: (players: PlayerListPlayer[]) => void) {
        this.events.on(PlayerListEvents.UPDATE, fn);
    }

    public addPlayer(player: Player) {
        const playerListPlayer: PlayerListPlayer = {
            id: player.id,
            name: player.name,
            health: player.health,
            ready: player.ready
        };

        this.players.push(playerListPlayer);

        player.onHealthUpdate(this.updatePlayer(player));
        player.onReadyUpdate(this.updatePlayer(player));
    }

    private updatePlayer(player: Player) {
        return () => {
            const index = this.players.findIndex(p => p.id === player.id);

            if (index === -1) {
                return;
            }

            this.players.splice(index, 1);

            if (player.health === 0) {
                // don't re-add player to dead list
                if (this.deadPlayers.some(p => p.id === player.id)) {
                    return;
                }

                this.deadPlayers.unshift({
                    id: player.id,
                    name: player.name,
                    health: player.health,
                    ready: null
                });

                this.emitUpdate();

                return;
            }

            this.players.push({
                id: player.id,
                name: player.name,
                health: player.health,
                ready: player.ready
            });

            this.players.sort((a, b) => b.health - a.health);

            this.emitUpdate();
        };
    }

    private emitUpdate() {
        this.events.emit(PlayerListEvents.UPDATE, [ ...this.players, ...this.deadPlayers ]);
    }
}
