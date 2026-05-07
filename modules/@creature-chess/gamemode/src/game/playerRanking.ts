import { PlayerStatus } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { TypedEventEmitter } from "../events/typedEventEmitter";

type Entry = {
	id: string;
	position: number | null;
	health: number;
	hasQuit: boolean;
};

const compareEntries = (a: Entry, b: Entry): number => {
	if (a.health !== b.health) {
		return b.health - a.health;
	}
	if (a.hasQuit !== b.hasQuit) {
		return a.hasQuit ? 1 : -1;
	}
	if (a.position === null && b.position === null) {
		return 0;
	}
	if (a.position === null) {
		return 1;
	}
	if (b.position === null) {
		return -1;
	}
	return a.position - b.position;
};

const reposition = (entries: Entry[]): Entry[] => {
	const sorted = [...entries].sort(compareEntries);
	return sorted.map((entry, index) =>
		entry.position === index + 1 ? entry : { ...entry, position: index + 1 }
	);
};

type Events = { change: void };

/**
 * Tracks each Player's leaderboard position. Re-sorts on health/status
 * changes; emits `change` when the ordering changes.
 */
export class PlayerRanking {
	private entries: Entry[] = [];
	private events = new TypedEventEmitter<Events>();
	private cleanups: (() => void)[] = [];

	public addPlayer(player: Player): void {
		this.entries.push({
			id: player.id,
			position: null,
			health: player.health,
			hasQuit: player.status === PlayerStatus.QUIT,
		});

		this.cleanups.push(
			player.events.onInfoUpdate("health", (health) =>
				this.update(player.id, { health })
			)
		);
		this.cleanups.push(
			player.events.onInfoUpdate("status", (status) =>
				this.update(player.id, { hasQuit: status === PlayerStatus.QUIT })
			)
		);
	}

	public getOrdering(): { id: string; position: number | null }[] {
		return this.entries.map(({ id, position }) => ({ id, position }));
	}

	public onChange(fn: () => void): () => void {
		return this.events.on("change", fn);
	}

	public dispose(): void {
		this.cleanups.forEach((fn) => fn());
		this.cleanups = [];
		this.events.removeAllListeners();
		this.entries = [];
	}

	private update(id: string, patch: Partial<Pick<Entry, "health" | "hasQuit">>) {
		const index = this.entries.findIndex((e) => e.id === id);
		if (index === -1) {
			return;
		}

		this.entries[index] = { ...this.entries[index], ...patch };
		this.entries = reposition(this.entries);
		this.events.emit("change");
	}
}
