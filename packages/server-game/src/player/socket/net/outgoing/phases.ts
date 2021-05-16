import { call, takeLatest } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";
import { getVariable } from "@shoki/engine";

import { GameEvents, PlayerSagaContext, PlayerVariables, Match } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";
import { getPacketRegistries } from "../registries";
import { getPlayerHealth } from "../../../../../../gamemode/lib/player/playerSelectors";

const preparingPhase = function*(phase: GamePhase, startedAt: number, round: number) {
	const { outgoing: registry } = yield* getPacketRegistries();

	const packet: ServerToClient.Game.PhaseUpdatePacket = {
		startedAtSeconds: startedAt,
		phase: GamePhase.PREPARING,
		payload: {
			round: round!
		}
	};

	registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
};

const readyPhase = function*(startedAt: number) {
	const { outgoing: registry } = yield* getPacketRegistries();
	const { logger } = yield* PlayerSagaContext.getPlayerSagaDependencies();

	const health = yield* select(getPlayerHealth);

	const currentMatch = yield* getVariable<PlayerVariables, Match>(variables => variables.match!);

	if (!currentMatch) {
		if (health > 0) {
			logger.warn("No match found for living player when entering ready state");
		}

		return;
	}

	const packet: ServerToClient.Game.PhaseUpdatePacket = {
		startedAtSeconds: startedAt,
		phase: GamePhase.READY
	};

	registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
};

const playingPhase = function*(startedAt: number) {
	const { outgoing: registry } = yield* getPacketRegistries();

	const packet: ServerToClient.Game.PhaseUpdatePacket = { startedAtSeconds: startedAt, phase: GamePhase.PLAYING };
	registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
};

export const sendGamePhaseUpdates = function*() {
	yield takeLatest<GameEvents.GamePhaseStartedEvent>(
		GameEvents.gamePhaseStartedEvent.toString(),
		function*({ payload: { phase, startedAt, round } }) {
			if (phase === GamePhase.PREPARING) {
				yield call(preparingPhase, phase, startedAt, round!);
			} else if (phase === GamePhase.READY) {
				yield call(readyPhase, startedAt);
			} else if (phase === GamePhase.PLAYING) {
				yield call(playingPhase, startedAt);
			}
		}
	);
};
