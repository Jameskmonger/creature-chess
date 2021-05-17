import { ActionPattern } from "@redux-saga/types";
import { take } from "redux-saga/effects";
import { OutgoingPacketRegistry } from "./outgoing-packet-registry";

type Action<T = any> = { type: T };

export const emitActionsOpcode = "emitActions";

/**
 * The packet used to emit a set of actions.
 */
export type EmitActionsPacket = {
	index: number;
	actions: Action[];
};

type PacketDefinitions = {
	[emitActionsOpcode]: EmitActionsPacket;
};

type PacketAcknowledgements = {
	[emitActionsOpcode]: never;
};

/**
 * Take a given action pattern and emit them to the registry under a given opcode
 *
 * @param registry The registry to use. Must have an entry for `emitActions`, accepting an {@link EmitActionsPacket}
 * @param actions The action pattern to emit
 */
export const emitActionsSaga = function*<
	TRegistry
	extends OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>
	= OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>
>(
	registry: TRegistry,
	actions: ActionPattern
) {
	let lastSentIndex = 0;

	while (true) {
		// todo make this send multiple at once, or remove that feature
		const action: Action = yield take(actions);

		const index = ++lastSentIndex;

		const payload: EmitActionsPacket = { index, actions: [action] };

		registry.emit(emitActionsOpcode, payload);
	}
};
