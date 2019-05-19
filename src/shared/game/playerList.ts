import { PlayerListPlayer } from "../models";
import { Player } from "./player";
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
            health: player.health
        };

        this.players.push(playerListPlayer);

        player.onHealthUpdate(this.updatePlayerHealth(player));
    }

    private updatePlayerHealth(player: Player) {
        return (health: number) => {
            const index = this.players.findIndex(p => p.id === player.id);

            if (index === -1) {
                return;
            }

            this.players.splice(index, 1);

            if (health === 0) {
                this.deadPlayers.unshift({
                    id: player.id,
                    name: player.name,
                    health
                });

                this.emitUpdate();

                return;
            }

            this.players.push({
                id: player.id,
                name: player.name,
                health
            });

            this.players.sort((a, b) => b.health - a.health);

            this.emitUpdate();
        };
    }

    private emitUpdate() {
        this.events.emit(PlayerListEvents.UPDATE, [ ...this.players, ...this.deadPlayers ]);
    }
}
