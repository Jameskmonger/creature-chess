import { PlayerListPlayer, PlayerStatus } from "@creature-chess/models";
import { Player } from "./player/player";
import { EventEmitter } from "events";
import { debounce } from "../utils";

enum PlayerListEvents {
    UPDATE = "UPDATE"
}

const sortPlayers = (a: PlayerListPlayer, b: PlayerListPlayer) => {
    const SORT_A_FIRST = -1;
    const SORT_A_SECOND = 1;

    if (a.status !== PlayerStatus.QUIT && b.status === PlayerStatus.QUIT) {
        return SORT_A_FIRST;
    }

    if (a.status === PlayerStatus.QUIT && b.status !== PlayerStatus.QUIT) {
        return SORT_A_SECOND;
    }

    if (a.health > b.health) {
        return SORT_A_FIRST;
    }

    if (a.health < b.health) {
        return SORT_A_SECOND;
    }

    if (a.roundDiedAt > b.roundDiedAt) {
        return SORT_A_FIRST;
    }

    if (a.roundDiedAt < b.roundDiedAt) {
        return SORT_A_SECOND;
    }

    return 0;
};

export class PlayerList {
    private players: PlayerListPlayer[] = [];
    private events = new EventEmitter();

    private emitUpdate = debounce(() => {
        // incase the debounce lands after deconstructor is called
        // todo cancel this manually
        if (!this.events) {
            return;
        }

        this.events.emit(PlayerListEvents.UPDATE, this.players);
    }, 500);

    public deconstructor() {
        this.events.removeAllListeners();
        this.events = null;
    }

    public onUpdate(fn: (players: PlayerListPlayer[]) => void) {
        this.events.on(PlayerListEvents.UPDATE, fn);
    }

    public getValue(): PlayerListPlayer[] {
        return this.players;
    }

    public addPlayer(player: Player) {
        const playerListPlayer: PlayerListPlayer = {
            id: player.id,
            name: player.name,
            health: player.getHealth(),
            ready: player.ready,
            level: player.getLevel(),
            money: player.getMoney(),
            streakType: player.streak.type,
            streakAmount: player.streak.amount,
            battle: null,
            roundDiedAt: player.getRoundDiedAt(),
            status: player.getStatus()
        };

        this.players.push(playerListPlayer);

        const update = this.updatePlayer(player);

        player.onReadyUpdate(update);
        player.onStreakUpdate(update);
        player.onBattleUpdate(update);
        player.onStatusUpdate(update);
    }

    private updatePlayer(player: Player) {
        return () => {
            const index = this.players.findIndex(p => p.id === player.id);

            if (index === -1) {
                return;
            }

            this.players.splice(index, 1);

            this.players.push({
                id: player.id,
                name: player.name,
                health: player.getHealth(),
                ready: player.ready,
                level: player.getLevel(),
                money: player.getMoney(),
                streakType: player.streak.type,
                streakAmount: player.streak.amount,
                battle: player.battle,
                roundDiedAt: player.getRoundDiedAt(),
                status: player.getStatus()
            });

            this.players.sort(sortPlayers);

            this.emitUpdate();
        };
    }
}
