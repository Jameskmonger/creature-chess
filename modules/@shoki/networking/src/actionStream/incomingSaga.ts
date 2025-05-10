import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";

import { OpcodesForPacket, PacketSet } from "../packet";
import { IncomingRegistry } from "../registry/incoming";
import { Action, ActionStreamPacket } from "./packet";

/**
 * Listen to an {@link IncomingRegistry} and emit any received actions to the store if they match a pattern
 *
 * @param registry The registry to use
 * @param opcode The opcode to use, must be registered to a {@link ActionStreamPacket} in the {@link PacketSet}
 * @param actions The action pattern to emit to the store
 */
export const incomingSaga = <
	TPacketSet extends PacketSet,
	TOpcode extends keyof OpcodesForPacket<TPacketSet, ActionStreamPacket>,
>(
	registry: IncomingRegistry<TPacketSet>,
	opcode: TOpcode,
	actions: string[]
) =>
	function* () {
		const channel = eventChannel<ActionStreamPacket>((emit) => {
			const onReceiveActions = (packet: ActionStreamPacket) => emit(packet);

			registry.on(opcode, onReceiveActions);

			return () => registry.off(opcode, onReceiveActions);
		});

		while (true) {
			const action: Action = yield take(channel);

			const validAction = actions.includes(action.type);
			if (!validAction) {
				console.error(
					`Unhandled action type: ${action.type} (for opcode ${String(opcode)})`
				);

				continue;
			}

			yield put(action);
		}
	};
