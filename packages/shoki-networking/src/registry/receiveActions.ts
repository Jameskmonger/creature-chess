import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import { emitActionsOpcode, EmitActionsPacket } from "./emitActions";
import { IncomingPacketRegistry } from "./incoming-packet-registry";

type Action<T = any> = { type: T };

type PacketDefinitions = {
	[emitActionsOpcode]: EmitActionsPacket;
};

/**
 * Listen to an {@link IncomingPacketRegistry} and emit any received actions to the store if they match a pattern
 *
 * @param registry The registry to use. Must have an entry for `emitActions`, accepting an {@link EmitActionsPacket}
 * @param actions The action pattern to emit to the store
 */
export const receiveActionsSaga = function*<
	TDefinitions extends PacketDefinitions,
	TRegistry
	extends IncomingPacketRegistry<TDefinitions, any>
	= IncomingPacketRegistry<TDefinitions, any>
>(
	registry: TRegistry,
	actions: string[]
) {
	let expectedPacketIndex = 1;

	const channel = eventChannel<EmitActionsPacket>(emit => {
		const onReceiveActions = (packet: EmitActionsPacket) => emit(packet);

		registry.on(emitActionsOpcode, onReceiveActions);

		return () => registry.off(emitActionsOpcode, onReceiveActions);
	});

	const actionQueue: Action[] = [];

	while (true) {
		// todo refactor this client+server to make use of the array
		const { index, actions: [action] }: EmitActionsPacket = yield take(channel);

		const validAction = actions.includes(action.type);
		if (!validAction) {
			console.error(`Unhandled PlayerGameAction type: ${action.type}`);

			continue;
		}

		if (index < expectedPacketIndex) {
			console.warn(`Received packet index ${index} before lastReceivedPacketIndex ${expectedPacketIndex}`);
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
