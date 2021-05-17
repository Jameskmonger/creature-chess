import { takeEvery, put, all, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { PlayerEvents, PlayerActionTypesArray, getPlayerEntityDependencies } from "@creature-chess/gamemode";
import { ClientToServer } from "@creature-chess/networking";
import { receiveActionsSaga } from "@shoki/networking";

import { getPacketRegistries } from "./registries";

export const incomingNetworking = function*() {
	const { logger } = yield* getPlayerEntityDependencies();

	const { incoming: registry } = yield* getPacketRegistries();

	const processFinishMatch = function*() {
		const channel = eventChannel<PlayerEvents.ClientFinishMatchEvent>(emit => {
			const onFinishMatch = () => emit(PlayerEvents.clientFinishMatchEvent());

			registry.on(ClientToServer.PacketOpcodes.FINISH_MATCH, onFinishMatch);

			return () => registry.off(ClientToServer.PacketOpcodes.FINISH_MATCH, onFinishMatch);
		});

		// take events from channel and put them directly
		yield takeEvery<PlayerEvents.ClientFinishMatchEvent>(
			channel,
			function*(action) {
				yield put(action);
			});
	};

	yield all([
		call(receiveActionsSaga, registry, PlayerActionTypesArray),
		call(processFinishMatch)
	]);
};
