import { PlayerListPlayer } from "../models";
import { Player } from "./player/player";
import { EventEmitter } from "events";
import { debounce } from "@common/utils";

enum PlayerListEvents {
    UPDATE = "UPDATE"
}

export class PlayerList {
    private players: PlayerListPlayer[] = [];
    private deadPlayers: PlayerListPlayer[] = [];
    private events = new EventEmitter();

    private emitUpdate = debounce(() => {
        this.events.emit(PlayerListEvents.UPDATE, [...this.players, ...this.deadPlayers]);
    }, 500);

    public onUpdate(fn: (players: PlayerListPlayer[]) => void) {
        this.events.on(PlayerListEvents.UPDATE, fn);
    }

    public addPlayer(player: Player) {
        const playerListPlayer: PlayerListPlayer = {
            id: player.id,
            name: player.name,
            health: player.health,
            ready: player.ready,
            streakType: player.streak.type,
            streakAmount: player.streak.amount,
            battle: null
        };

        this.players.push(playerListPlayer);

        const update = this.updatePlayer(player);

        player.onHealthUpdate(update);
        player.onReadyUpdate(update);
        player.onStreakUpdate(update);
        player.onBattleUpdate(update);
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
                    ready: null,
                    streakType: null,
                    streakAmount: null,
                    battle: player.battle
                });

                this.emitUpdate();

                return;
            }

            this.players.push({
                id: player.id,
                name: player.name,
                health: player.health,
                ready: player.ready,
                streakType: player.streak.type,
                streakAmount: player.streak.amount,
                battle: player.battle
            });

            this.players.sort((a, b) => b.health - a.health);

            this.emitUpdate();
        };
    }
}
