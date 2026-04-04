import { eventChannel } from "redux-saga";
import { takeEvery, put, take } from "redux-saga/effects";
import { all, call } from "typed-redux-saga";

import { PlayerEvents, PlayerActionTypesArray } from "@creature-chess/gamemode";

import { getPlayerSocket } from "./registries";
import { metricCollectorSaga } from "../../metrics/metricCollectorSaga";

const processPlayerActions = function* () {
	const socket = yield* getPlayerSocket();

	const channel = eventChannel<{ type: string; payload?: any }>((emit) => {
		const handler = (action: { type: string; payload?: any }, ack?: () => void) => {
			emit(action);
			if (ack) {
				ack();
			}
		};

		socket.on("sendPlayerActions", handler);

		return () => socket.off("sendPlayerActions", handler);
	});

	while (true) {
		const action: { type: string } = yield take(channel);

		if (!PlayerActionTypesArray.includes(action.type)) {
			console.error(
				`Unhandled action type: ${action.type} (for opcode sendPlayerActions)`
			);
			continue;
		}

		yield put(action);
	}
};

const processPing = function* () {
	const socket = yield* getPlayerSocket();

	const channel = eventChannel<true>((emit) => {
		const handler = (_payload: unknown, ack?: () => void) => {
			emit(true);
			if (ack) {
				ack();
			}
		};

		socket.on("ping", handler as any);

		return () => socket.off("ping", handler as any);
	});

	while (true) {
		yield take(channel);
		yield put({ type: "ping" });
	}
};

const processFinishMatch = function* () {
	const socket = yield* getPlayerSocket();

	const channel = eventChannel<PlayerEvents.ClientFinishMatchEvent>(
		(emit) => {
			const onFinishMatch = () => emit(PlayerEvents.clientFinishMatchEvent());

			socket.on("finishMatch", onFinishMatch);

			return () => socket.off("finishMatch", onFinishMatch);
		}
	);

	yield takeEvery<PlayerEvents.ClientFinishMatchEvent>(
		channel,
		function* (action) {
			yield put(action);
		}
	);
};

export const incomingNetworking = function* () {
	yield* all([
		call(processPlayerActions),
		call(processPing),
		call(processFinishMatch),
		call(metricCollectorSaga),
	]);
};
