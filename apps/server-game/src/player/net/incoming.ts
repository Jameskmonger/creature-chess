import { eventChannel } from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import { all, call } from "typed-redux-saga";

import { ActionStream } from "@shoki/networking";

import { PlayerEvents, PlayerActionTypesArray } from "@creature-chess/gamemode";
import { ClientToServer } from "@creature-chess/networking";

import { getPacketRegistries } from "./registries";

export const incomingNetworking = function* () {
	const { incoming: registry } = yield* getPacketRegistries();

	const processFinishMatch = function* () {
		const channel = eventChannel<PlayerEvents.ClientFinishMatchEvent>(
			(emit) => {
				const onFinishMatch = () => emit(PlayerEvents.clientFinishMatchEvent());

				registry.on("finishMatch", onFinishMatch);

				return () => registry.off("finishMatch", onFinishMatch);
			}
		);

		// take events from channel and put them directly
		yield takeEvery<PlayerEvents.ClientFinishMatchEvent>(
			channel,
			function* (action) {
				yield put(action);
			}
		);
	};

	yield* all([
		call(
			ActionStream.incomingSaga<ClientToServer.PacketSet, "sendPlayerActions">(
				registry,
				"sendPlayerActions",
				PlayerActionTypesArray
			)
		),
		call(
			ActionStream.incomingSaga<ClientToServer.PacketSet, "ping">(
				registry,
				"ping",
				["ping"]
			)
		),
		call(processFinishMatch),
	]);
};
