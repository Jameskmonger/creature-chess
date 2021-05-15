import { EventEmitter } from "events";
import { PlayerListPlayer, PlayerStatus } from "@creature-chess/models";
import { listenForPropertyUpdates } from "./playerPropertyUpdates";
import { PlayerSelectors } from "../player";
import { PlayerEntity } from "../entities";

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
	position: number | null,
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

	if (b.position === null) {
		return SORT_A_FIRST;
	}

	if (a.position === null) {
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
	private gamePlayers: { [playerId: string]: PlayerEntity } = {};
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

		// todo this is ugly
		(this.events as unknown as null) = null;
	}

	public onUpdate(fn: (players: PlayerListPlayer[]) => void) {
		this.events.on(PlayerListEvents.UPDATE, fn);
	}

	public getValue = (): PlayerListPlayer[] => {
		return this.players.map(({ id }) => {
			const player = this.gamePlayers[id];

			const streak = player.select(PlayerSelectors.getPlayerStreak);
			return {
				id: player.id,
				name: player.getVariable(variables => variables.name),
				health: player.select(PlayerSelectors.getPlayerHealth),
				ready: player.select(PlayerSelectors.isPlayerReady),
				level: player.select(PlayerSelectors.getPlayerLevel),
				money: player.select(PlayerSelectors.getPlayerMoney),
				streakType: streak.type,
				streakAmount: streak.amount,
				battle: player.select(PlayerSelectors.getPlayerBattle),
				status: player.select(PlayerSelectors.getPlayerStatus),
				profile: player.getVariable(variables => variables.profile),
			};
		});
	}

	public addPlayer(player: PlayerEntity) {
		this.players.push({
			id: player.id,
			position: null,
			sortValues: {
				health: player.select(PlayerSelectors.getPlayerHealth),
				hasQuit: player.select(PlayerSelectors.getPlayerStatus) === PlayerStatus.QUIT
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

		this.players = newPlayers.reduce<SortablePlayer[]>((acc, cur, i) => {
			if (cur.position === i + 1) {
				return [...acc, cur];
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
