import { call, takeLatest } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";

import { PlayerState, GameEvents, PlayerSagaContext } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { GamePhase } from "@creature-chess/models";
import { getPacketRegistries } from "../registries";

const preparingPhase = function*(phase: GamePhase, startedAt: number, round: number) {
	const { outgoing: registry } = yield* getPacketRegistries();

	const board = yield* select((state: PlayerState) => state.board);
	const bench = yield* select((state: PlayerState) => state.bench);
	const cards = yield* select((state: PlayerState) => state.cardShop.cards);

	const packet: ServerToClient.Game.PhaseUpdatePacket = {
		startedAtSeconds: startedAt,
		phase: GamePhase.PREPARING,
		payload: {
			round: round!,
			pieces: {
				board,
				bench
			},
			cards
		}
	};

	registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
};

const readyPhase = function*(startedAt: number) {
	const { outgoing: registry } = yield* getPacketRegistries();
	const playerId = yield* getContext<string>("playerId");
	const { getLogger, getMatch } = yield* getContext<PlayerSagaContext.PlayerSagaDependencies>("dependencies");

	const bench = yield* select((state: PlayerState) => state.bench);
	const health = yield* select((state: PlayerState) => state.playerInfo.health);

	const match = getMatch();

	if (!match) {
		if (health > 0) {
			getLogger().warn("No match found for living player when entering ready state");
		}

		return;
	}

	const board = match.getBoardForPlayer(playerId);

	const opponentId =
		match.home.id === playerId
			? match.away.id
			: match.home.id;

	const packet: ServerToClient.Game.PhaseUpdatePacket = {
		startedAtSeconds: startedAt,
		phase: GamePhase.READY,
		payload: {
			bench,
			board,
			opponentId
		}
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
