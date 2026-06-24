import { TypedEventEmitter } from "@cc-engine/kernel";

import { GamePhase } from "@creature-chess/models";

import {
	GameFinishEvent,
	GamePhaseStartedEvent,
	GamemodeEventByType,
	PieceUpgradedEvent,
	PlayerEliminatedEvent,
	PlayerLevelUpEvent,
	PlayerListChangedEvent,
	PlayerStreakEvent,
	gameFinishEvent,
	gamePhaseStartedEvent,
	pieceUpgradedEvent,
	playerEliminatedEvent,
	playerLevelUpEvent,
	playerListChangedEvent,
	playerStreakEvent,
} from "./events";

export type GamemodeEventsApi = {
	onPhaseStart(fn: (action: GamePhaseStartedEvent) => void): () => void;
	onPhaseStart(
		phase: GamePhase,
		fn: (action: GamePhaseStartedEvent) => void
	): () => void;
	onFinish(fn: (action: GameFinishEvent) => void): () => void;
	onPlayerListChange(fn: (action: PlayerListChangedEvent) => void): () => void;
	onPieceUpgraded(fn: (action: PieceUpgradedEvent) => void): () => void;
	onPlayerLevelUp(fn: (action: PlayerLevelUpEvent) => void): () => void;
	onPlayerStreak(fn: (action: PlayerStreakEvent) => void): () => void;
	onPlayerEliminated(fn: (action: PlayerEliminatedEvent) => void): () => void;
};

export type GamemodeEventsEmitter = GamemodeEventsApi & {
	emitPhaseStart(payload: GamePhaseStartedEvent["payload"]): void;
	emitFinish(payload: GameFinishEvent["payload"]): void;
	emitPlayerListChange(payload: PlayerListChangedEvent["payload"]): void;
	emitPieceUpgraded(payload: PieceUpgradedEvent["payload"]): void;
	emitPlayerLevelUp(payload: PlayerLevelUpEvent["payload"]): void;
	emitPlayerStreak(payload: PlayerStreakEvent["payload"]): void;
	emitPlayerEliminated(payload: PlayerEliminatedEvent["payload"]): void;
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
		onPieceUpgraded: (fn) => emitter.on("pieceUpgraded", fn),
		onPlayerLevelUp: (fn) => emitter.on("playerLevelUp", fn),
		onPlayerStreak: (fn) => emitter.on("playerStreak", fn),
		onPlayerEliminated: (fn) => emitter.on("playerEliminated", fn),
		emitPhaseStart: (payload) =>
			emitter.emit("phaseStart", gamePhaseStartedEvent(payload)),
		emitFinish: (payload) => emitter.emit("finish", gameFinishEvent(payload)),
		emitPlayerListChange: (payload) =>
			emitter.emit("playerListChange", playerListChangedEvent(payload)),
		emitPieceUpgraded: (payload) =>
			emitter.emit("pieceUpgraded", pieceUpgradedEvent(payload)),
		emitPlayerLevelUp: (payload) =>
			emitter.emit("playerLevelUp", playerLevelUpEvent(payload)),
		emitPlayerStreak: (payload) =>
			emitter.emit("playerStreak", playerStreakEvent(payload)),
		emitPlayerEliminated: (payload) =>
			emitter.emit("playerEliminated", playerEliminatedEvent(payload)),
		dispose: () => emitter.removeAllListeners(),
	};
};
