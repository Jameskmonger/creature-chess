import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";

import { OpcodesForPacket, PacketSet } from "../packet";
import { IncomingRegistry } from "../registry/incoming";
import { Action, ActionStreamPacket, ActionStreamPayload } from "./packet";

/**
 * Listen to an {@link IncomingRegistry} and emit any received actions to the store if they match a pattern
 *
 * @param registry The registry to use
 * @param opcode The opcode to use, must be registered to a {@link ActionStreamPacket} in the {@link PacketSet}
 * @param actions The action pattern to emit to the store
 */
export const incomingSaga = <
	TPacketSet extends PacketSet,
	TOpcode extends keyof OpcodesForPacket<TPacketSet, ActionStreamPacket>
>(
	registry: IncomingRegistry<TPacketSet>,
	opcode: TOpcode,
	actions: string[]
) =>
	function* () {
		let expectedPacketIndex = 1;

		const channel = eventChannel<ActionStreamPacket>((emit) => {
			const onReceiveActions = (packet: ActionStreamPacket) => emit(packet);

			registry.on(opcode, onReceiveActions);

			return () => registry.off(opcode, onReceiveActions);
		});

		const actionQueue: Action[] = [];

		while (true) {
			// todo refactor this client+server to make use of the array
			const {
				index,
				actions: [action],
			}: ActionStreamPayload = yield take(channel);

			const validAction = actions.includes(action.type);
			if (!validAction) {
				console.error(
					`Unhandled action type: ${action.type} (for opcode ${String(opcode)})`
				);

				continue;
			}

			if (index < expectedPacketIndex) {
				console.warn(
					`Received packet index ${index} before lastReceivedPacketIndex ${expectedPacketIndex} (for opcode ${String(opcode)})`
				);
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
