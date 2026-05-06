import { GamePhase } from "@creature-chess/models";

import {
	GameEvent,
	GameFinishEvent,
	GamePhaseStartedEvent,
	GamemodeEventByType,
	PlayerListChangedEvent,
	gameFinishEvent,
	gamePhaseStartedEvent,
	playerListChangedEvent,
} from "./events";

export type GamemodeEventsApi = {
	/** Firehose of every Game-level event in wire-shape order. */
	onAnyEvent(fn: (action: GameEvent) => void): () => void;

	/** Keyed by event-type. Internal subscribers wanting one specific event. */
	onAnyEvent<K extends keyof GamemodeEventByType>(
		type: K,
		fn: (action: GamemodeEventByType[K]) => void
	): () => void;

	/** Convenience: subscribe to phase-start events for one phase only. */
	onPhaseStart(
		phase: GamePhase,
		fn: (action: GamePhaseStartedEvent) => void
	): () => void;
};

export type GamemodeEventsEmitter = GamemodeEventsApi & {
	emitPhaseStart(payload: GamePhaseStartedEvent["payload"]): void;
	emitFinish(payload: GameFinishEvent["payload"]): void;
	emitPlayerListChange(payload: PlayerListChangedEvent["payload"]): void;
	dispose(): void;
};

export const createGamemodeEvents = (): GamemodeEventsEmitter => {
	const anyListeners = new Set<(action: GameEvent) => void>();
	const keyedListeners: {
		[K in keyof GamemodeEventByType]: Set<
			(action: GamemodeEventByType[K]) => void
		>;
	} = {
		phaseStart: new Set(),
		finish: new Set(),
		playerListChange: new Set(),
	};

	const emit = <K extends keyof GamemodeEventByType>(
		key: K,
		action: GamemodeEventByType[K]
	) => {
		for (const fn of anyListeners) {
			fn(action);
		}
		for (const fn of keyedListeners[key]) {
			fn(action);
		}
	};

	function onAnyEvent(fn: (action: GameEvent) => void): () => void;
	function onAnyEvent<K extends keyof GamemodeEventByType>(
		type: K,
		fn: (action: GamemodeEventByType[K]) => void
	): () => void;
	function onAnyEvent(
		typeOrFn:
			| keyof GamemodeEventByType
			| ((action: GameEvent) => void),
		maybeFn?: (action: any) => void
	): () => void {
		if (typeof typeOrFn === "function") {
			anyListeners.add(typeOrFn);
			return () => {
				anyListeners.delete(typeOrFn);
			};
		}
		const set = keyedListeners[typeOrFn] as Set<(action: any) => void>;
		set.add(maybeFn!);
		return () => {
			set.delete(maybeFn!);
		};
	}

	const onPhaseStart = (
		phase: GamePhase,
		fn: (action: GamePhaseStartedEvent) => void
	): (() => void) =>
		onAnyEvent("phaseStart", (action) => {
			if (action.payload.phase === phase) {
				fn(action);
			}
		});

	return {
		onAnyEvent,
		onPhaseStart,
		emitPhaseStart: (payload) =>
			emit("phaseStart", gamePhaseStartedEvent(payload)),
		emitFinish: (payload) => emit("finish", gameFinishEvent(payload)),
		emitPlayerListChange: (payload) =>
			emit("playerListChange", playerListChangedEvent(payload)),
		dispose: () => {
			anyListeners.clear();
			for (const set of Object.values(keyedListeners)) {
				set.clear();
			}
		},
	};
};
