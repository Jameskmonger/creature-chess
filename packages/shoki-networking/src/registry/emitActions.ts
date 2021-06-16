import { ActionPattern } from "@redux-saga/types";
import { take } from "redux-saga/effects";
import { OutgoingPacketRegistry } from "./outgoing-packet-registry";

type Action<T = any> = { type: T };

/**
 * The packet used to emit a set of actions.
 */
export type EmitActionsPacket = {
	index: number;
	actions: Action[];
};

/**
 * Take a given action pattern and emit them to the registry under a given opcode
 *
 * @param registry The registry to use. Must have an entry for `emitActions`, accepting an {@link EmitActionsPacket}
 * @param actions The action pattern to emit
 */
export const emitActionsSaga = function*<
	TOpcode extends string,
	TDefinitions extends { [opcode in TOpcode]: EmitActionsPacket }
>(
	opcode: TOpcode,
	registry: OutgoingPacketRegistry<TDefinitions, any>,
	actions: ActionPattern
) {
	let lastSentIndex = 0;

	while (true) {
		// todo make this send multiple at once, or remove that feature
		const action: Action = yield take(actions);

		const index = ++lastSentIndex;

		const payload: EmitActionsPacket = { index, actions: [action] };

		registry.emit(opcode, payload as TDefinitions[TOpcode]);
	}
};
