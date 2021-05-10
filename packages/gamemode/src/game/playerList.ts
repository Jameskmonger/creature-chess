import { EventEmitter } from "events";
import { PlayerListPlayer, PlayerStatus } from "@creature-chess/models";
import { Player } from "../player/player";
import { listenForPropertyUpdates } from "./playerPropertyUpdates";

const debounce = (func: () => void, wait: number) => {
    let timeout: any;

    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;

            func();
        }, wait);
    };
};

enum PlayerListEvents {
    UPDATE = "UPDATE"
}

type SortablePlayerValues = {
    health: number,
    hasQuit: boolean
};

type SortablePlayer = {
    id: string,
    position: number,
    sortValues: SortablePlayerValues
};

const sortPlayers = (a: SortablePlayer, b: SortablePlayer) => {
    const SORT_A_FIRST = -1;
    const SORT_A_SECOND = 1;

    if (a.sortValues.health > b.sortValues.health) {
        return SORT_A_FIRST;
    }

    if (a.sortValues.health < b.sortValues.health) {
        return SORT_A_SECOND;
    }

    if (!a.sortValues.hasQuit && b.sortValues.hasQuit) {
        return SORT_A_FIRST;
    }

    if (a.sortValues.hasQuit && !b.sortValues.hasQuit) {
        return SORT_A_SECOND;
    }

    // if A is coming from a higher position than B, it should come first
    if (a.position < b.position) {
        return SORT_A_FIRST;
    }

    if (a.position > b.position) {
        return SORT_A_SECOND;
    }

    return 0;
};

export class PlayerList {
    private players: SortablePlayer[] = [];
    private gamePlayers: { [playerId: string]: Player } = {};
    private events = new EventEmitter();

    private emitUpdate = debounce(() => {
        // incase the debounce lands after deconstructor is called
        // todo cancel this manually
        if (!this.events) {
            return;
        }

        this.events.emit(PlayerListEvents.UPDATE, this.getValue());
    }, 500);

    public deconstructor() {
        this.events.removeAllListeners();
        this.events = null;
    }

    public onUpdate(fn: (players: PlayerListPlayer[]) => void) {
        this.events.on(PlayerListEvents.UPDATE, fn);
    }

    public getValue = (): PlayerListPlayer[] => {
        return this.players.map(({ id }) => {
            const player = this.gamePlayers[id];

            const streak = player.getStreak();
            return {
                id: player.id,
                name: player.name,
                health: player.getHealth(),
                ready: player.getReady(),
                level: player.getLevel(),
                money: player.getMoney(),
                streakType: streak.type,
                streakAmount: streak.amount,
                battle: player.getBattle(),
                roundDiedAt: player.getRoundDiedAt(),
                status: player.getStatus(),
                profile: player.profile
            };
        });
    }

    public addPlayer(player: Player) {
        this.players.push({
            id: player.id,
            position: null,
            sortValues: {
                health: player.getHealth(),
                hasQuit: player.getStatus() === PlayerStatus.QUIT
            }
        });

        this.gamePlayers[player.id] = player;

        listenForPropertyUpdates(
            player,
            {
                health: health => this.updateSortedValue(player.id, { health }),
                status: status => this.updateSortedValue(player.id, { hasQuit: status === PlayerStatus.QUIT }),
                streak: this.emitUpdate,
                battle: this.emitUpdate,
                ready: this.emitUpdate,
            }
        );
    }

    private updateSortedValue(id: string, patch: Partial<SortablePlayerValues>) {
        const index = this.players.findIndex(p => p.id === id);

        if (index === -1) {
            return;
        }

        this.players[index] = {
            ...this.players[index],
            sortValues: {
                ...this.players[index].sortValues,
                ...patch
            }
        };

        const newPlayers = [...this.players];
        newPlayers.sort(sortPlayers);

        this.players = newPlayers.reduce((acc, cur, i) => {
            if (cur.position === i + 1) {
                return [ ...acc, cur ];
            }

            return [
                ...acc,
                {
                    ...cur,
                    position: i + 1
                }
            ];
        }, []);

        this.emitUpdate();
    }
}
