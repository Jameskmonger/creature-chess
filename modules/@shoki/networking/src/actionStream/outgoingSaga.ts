import { ActionPattern } from "@redux-saga/types";
import { SagaIterator, channel } from "redux-saga";
import { all, call, cancelled, fork, put, take } from "redux-saga/effects";

import { ResponseAction } from "../actions/ResponseAction";
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
	function* outgoingSagaWorker(): SagaIterator {
		/**
		 * Creates a channel containing most recent ack times
		 */
		const pingChan = channel<number>();

		/**
		 * Sends the action to the registry and puts the ack time in the channel
		 */
		function* sender(): SagaIterator {
			while (true) {
				const action: Action = yield take(actions);

				const sent = Date.now();
				yield call([registry, registry.send], opcode, action, () => {
					pingChan.put(Date.now() - sent);
				});
			}
		}

		/**
		 * Emits the ping time to the Redux store
		 */
		function* pingEmitter(): SagaIterator {
			while (true) {
				const ping: number = yield take(pingChan);

				const action: ResponseAction = {
					type: "response",
					payload: { pingMs: ping },
				};
				yield put(action);
			}
		}

		try {
			yield all([fork(sender), fork(pingEmitter)]);
		} finally {
			if (yield cancelled()) {
				pingChan.close();
			}
		}
	};
