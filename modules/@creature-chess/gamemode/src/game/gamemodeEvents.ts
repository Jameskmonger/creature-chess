import { GamePhase } from "@creature-chess/models";

import { TypedEventEmitter } from "../events/typedEventEmitter";
import {
	GameFinishEvent,
	GamePhaseStartedEvent,
	GamemodeEventByType,
	PlayerListChangedEvent,
	gameFinishEvent,
	gamePhaseStartedEvent,
	playerListChangedEvent,
} from "./events";

export type GamemodeEventsApi = {
	onPhaseStart(fn: (action: GamePhaseStartedEvent) => void): () => void;
	onPhaseStart(
		phase: GamePhase,
		fn: (action: GamePhaseStartedEvent) => void
	): () => void;
	onFinish(fn: (action: GameFinishEvent) => void): () => void;
	onPlayerListChange(
		fn: (action: PlayerListChangedEvent) => void
	): () => void;
};

export type GamemodeEventsEmitter = GamemodeEventsApi & {
	emitPhaseStart(payload: GamePhaseStartedEvent["payload"]): void;
	emitFinish(payload: GameFinishEvent["payload"]): void;
	emitPlayerListChange(payload: PlayerListChangedEvent["payload"]): void;
	dispose(): void;
};

export const createGamemodeEvents = (): GamemodeEventsEmitter => {
	const emitter = new TypedEventEmitter<GamemodeEventByType>();

	function onPhaseStart(
		fn: (action: GamePhaseStartedEvent) => void
	): () => void;
	function onPhaseStart(
		phase: GamePhase,
		fn: (action: GamePhaseStartedEvent) => void
	): () => void;
	function onPhaseStart(
		phaseOrFn: GamePhase | ((action: GamePhaseStartedEvent) => void),
		maybeFn?: (action: GamePhaseStartedEvent) => void
	): () => void {
		if (typeof phaseOrFn === "function") {
			return emitter.on("phaseStart", phaseOrFn);
		}
		return emitter.on("phaseStart", (action) => {
			if (action.payload.phase === phaseOrFn) {
				maybeFn!(action);
			}
		});
	}

	return {
		onPhaseStart,
		onFinish: (fn) => emitter.on("finish", fn),
		onPlayerListChange: (fn) => emitter.on("playerListChange", fn),
		emitPhaseStart: (payload) =>
			emitter.emit("phaseStart", gamePhaseStartedEvent(payload)),
		emitFinish: (payload) => emitter.emit("finish", gameFinishEvent(payload)),
		emitPlayerListChange: (payload) =>
			emitter.emit("playerListChange", playerListChangedEvent(payload)),
		dispose: () => emitter.removeAllListeners(),
	};
};
