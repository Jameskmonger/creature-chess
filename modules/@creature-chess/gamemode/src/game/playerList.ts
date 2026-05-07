import { PlayerListPlayer } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { TypedEventEmitter } from "../events/typedEventEmitter";
import { PlayerRanking } from "./playerRanking";

const EMIT_DEBOUNCE_MS = 500;

const toWireShape = (player: Player): PlayerListPlayer => ({
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
});

type Events = { update: PlayerListPlayer[] };

export class PlayerList {
	private players = new Map<string, Player>();
	private ranking = new PlayerRanking();
	private events = new TypedEventEmitter<Events>();
	private debounceTimer: ReturnType<typeof setTimeout> | null = null;
	private cleanups: (() => void)[] = [];

	public constructor() {
		this.cleanups.push(this.ranking.onChange(() => this.scheduleEmit()));
	}

	public addPlayer(player: Player): void {
		this.players.set(player.id, player);
		this.ranking.addPlayer(player);

		// Wire-shape fields that don't affect ranking but should still trigger
		// a leaderboard refresh on every connected client.
		this.cleanups.push(
			player.events.onInfoUpdate("streak", () => this.scheduleEmit())
		);
		this.cleanups.push(
			player.events.onInfoUpdate("battle", () => this.scheduleEmit())
		);
		this.cleanups.push(
			player.events.onInfoUpdate("ready", () => this.scheduleEmit())
		);
	}

	public getValue(): PlayerListPlayer[] {
		return this.ranking
			.getOrdering()
			.map(({ id }) => this.players.get(id))
			.filter((p): p is Player => p !== undefined)
			.map(toWireShape);
	}

	public onUpdate(fn: (players: PlayerListPlayer[]) => void): () => void {
		return this.events.on("update", fn);
	}

	public dispose(): void {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
			this.debounceTimer = null;
		}
		this.cleanups.forEach((fn) => fn());
		this.cleanups = [];
		this.events.removeAllListeners();
		this.ranking.dispose();
		this.players.clear();
	}

	private scheduleEmit(): void {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}
		this.debounceTimer = setTimeout(() => {
			this.debounceTimer = null;
			this.events.emit("update", this.getValue());
		}, EMIT_DEBOUNCE_MS);
	}
}
