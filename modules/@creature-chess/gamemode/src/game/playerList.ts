import { EventEmitter } from "events";

import { PlayerStatus, PlayerListPlayer } from "@creature-chess/models";

import { Player } from "../entities/player/player";

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
	UPDATE = "UPDATE",
}

type SortablePlayerValues = {
	health: number;
	hasQuit: boolean;
};

type SortablePlayer = {
	id: string;
	position: number | null;
	sortValues: SortablePlayerValues;
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

		// todo this is ugly
		(this.events as unknown as null) = null;
	}

	public onUpdate(fn: (players: PlayerListPlayer[]) => void) {
		this.events.on(PlayerListEvents.UPDATE, fn);
	}

	public getValue = (): PlayerListPlayer[] =>
		this.players.map(({ id }) => {
			const player = this.gamePlayers[id];
			return {
				id: player.id,
				name: player.name,
				health: player.health,
				ready: player.ready,
				level: player.level,
				money: player.money,
				streakType: player.streak.type,
				streakAmount: player.streak.amount,
				battle: player.battle,
				status: player.status,
				profile: player.profile,
			};
		});

	public addPlayer(player: Player) {
		this.players.push({
			id: player.id,
			position: null,
			sortValues: {
				health: player.health,
				hasQuit: player.status === PlayerStatus.QUIT,
			},
		});

		this.gamePlayers[player.id] = player;

		player.events.onInfoUpdate("health", (health) =>
			this.updateSortedValue(player.id, { health })
		);
		player.events.onInfoUpdate("status", (status) =>
			this.updateSortedValue(player.id, {
				hasQuit: status === PlayerStatus.QUIT,
			})
		);
		player.events.onInfoUpdate("streak", this.emitUpdate);
		player.events.onInfoUpdate("battle", this.emitUpdate);
		player.events.onInfoUpdate("ready", this.emitUpdate);
	}

	private updateSortedValue(id: string, patch: Partial<SortablePlayerValues>) {
		const index = this.players.findIndex((p) => p.id === id);

		if (index === -1) {
			return;
		}

		this.players[index] = {
			...this.players[index],
			sortValues: {
				...this.players[index].sortValues,
				...patch,
			},
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
					position: i + 1,
				},
			];
		}, []);

		this.emitUpdate();
	}
}
