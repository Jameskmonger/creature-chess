import { wireProtocol } from "~/plugins/wireProtocol";
import { ClientStartListening } from "~/store/listenerContext";

export const setupForwardPlayerActions = (
	startListening: ClientStartListening
) => {
	startListening({
		predicate: (action) => wireProtocol.acceptsOutbound((action as { type: string }).type),
		effect: async (action, api) => {
			api.extra.gameConnectionHolder
				.peek()
				?.sendPlayerAction(action as { type: string; payload?: any });
		},
	});
};
