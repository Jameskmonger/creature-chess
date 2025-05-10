import { ActionPattern } from "@redux-saga/types";
import { take } from "redux-saga/effects";

import { OpcodesForPacket, PacketSet } from "../packet";
import { OutgoingRegistry } from "../registry/outgoing";
import { Action, ActionStreamPacket } from "./packet";

/**
 * Take a given action pattern and emit them to the registry under a given opcode
 *
 * @param registry The registry to use
 * @param opcode The opcode to use, must be registered to a {@link ActionStreamPacket} in the {@link PacketSet}
 * @param actions The action pattern to emit
 */
export const outgoingSaga = <
	TPacketSet extends PacketSet,
	TOpcode extends keyof OpcodesForPacket<TPacketSet, ActionStreamPacket>,
>(
	registry: OutgoingRegistry<TPacketSet>,
	opcode: TOpcode,
	actions: ActionPattern
) =>
	function* () {
		while (true) {
			const action: Action = yield take(actions);

			registry.send(opcode, action);
		}
	};
