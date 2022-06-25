import { ActionPattern } from "@redux-saga/types";
import { take } from "redux-saga/effects";

import { OpcodesForPacket, PacketSet } from "../packet";
import { OutgoingRegistry } from "../registry/outgoing";
import { Action, ActionStreamPacket, ActionStreamPayload } from "./packet";

/**
 * Take a given action pattern and emit them to the registry under a given opcode
 *
 * @param registry The registry to use
 * @param opcode The opcode to use, must be registered to a {@link ActionStreamPacket} in the {@link PacketSet}
 * @param actions The action pattern to emit
 */
export const outgoingSaga = <
	TPacketSet extends PacketSet,
	TOpcode extends keyof OpcodesForPacket<TPacketSet, ActionStreamPacket>
>(
	registry: OutgoingRegistry<TPacketSet>,
	opcode: TOpcode,
	actions: ActionPattern
) =>
	function* () {
		let lastSentIndex = 0;

		while (true) {
			// todo make this send multiple at once, or remove that feature
			const action: Action = yield take(actions);

			const index = ++lastSentIndex;

			const payload: ActionStreamPayload = { index, actions: [action] };

			registry.send(opcode, payload);
		}
	};
