import { take, takeEvery, put, all, call } from "redux-saga/effects";
import { Socket } from "socket.io";
import { eventChannel } from "redux-saga";
import { PlayerEvents, PlayerGameActions, PlayerSagaContext } from "@creature-chess/gamemode";
import { ClientToServer } from "@creature-chess/networking";

import { receivePlayerActionsEvent, ReceivePlayerActionsEvent } from "../events";
import { getPacketRegistries } from "./registries";

export const incomingNetworking = function*(socket: Socket) {
	const { logger } = yield* PlayerSagaContext.getPlayerSagaDependencies();

	const { incoming: registry } = yield* getPacketRegistries();

	const processIncomingPackets = function*() {
		let expectedPacketIndex = 1;

		const channel = eventChannel<ReceivePlayerActionsEvent>(emit => {
			const onReceiveActions = (
				{ index, actions }: ClientToServer.SendPlayerActionsPacket
			) => emit(receivePlayerActionsEvent(index, actions));

			registry.on(ClientToServer.PacketOpcodes.SEND_PLAYER_ACTIONS, onReceiveActions);

			// todo create a registry.off function here
			return () => socket.off(ClientToServer.PacketOpcodes.SEND_PLAYER_ACTIONS, onReceiveActions);
		});

		const actionQueue: PlayerGameActions.PlayerGameAction[] = [];

		while (true) {
			// todo refactor this client+server to make use of the array
			const { payload: { index, actions: [action] } }: ReceivePlayerActionsEvent = yield take(channel);

			const validAction = PlayerGameActions.PlayerGameActionTypesArray.includes(action.type);
			if (!validAction) {
				logger.error(`Unhandled PlayerGameAction type: ${action.type}`);

				continue;
			}

			if (index < expectedPacketIndex) {
				logger.warn(`Received packet index ${index} before lastReceivedPacketIndex ${expectedPacketIndex}`);
			} else {
				// queue future actions and execute them after the expected one arrives
				actionQueue[index - expectedPacketIndex] = action;

				// if there's an action for the expected index, process it and repeat
				while (actionQueue[0]) {
					const actionFromQueue = actionQueue.shift()!;
					expectedPacketIndex++;
					yield put(actionFromQueue);
				}
			}
		}
	};

	const processFinishMatch = function*() {
		const channel = eventChannel<PlayerEvents.ClientFinishMatchEvent>(emit => {
			const onFinishMatch = () => emit(PlayerEvents.clientFinishMatchEvent());

			registry.on(ClientToServer.PacketOpcodes.FINISH_MATCH, onFinishMatch);

			// todo create a registry.off function here
			return () => socket.off(ClientToServer.PacketOpcodes.FINISH_MATCH, onFinishMatch);
		});

		// take events from channel and put them directly
		yield takeEvery<PlayerEvents.ClientFinishMatchEvent>(
			channel,
			function*(action) {
				yield put(action);
			});
	};

	yield all([
		call(processIncomingPackets),
		call(processFinishMatch)
	]);
};
