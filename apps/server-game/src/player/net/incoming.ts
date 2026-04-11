import { PlayerEvents, PlayerActionTypesArray } from "@creature-chess/gamemode";

import { GameSocket } from "../socket";

type DispatchFn = (action: { type: string; payload?: any }) => void;

export const setupIncomingNetworking = (
	socket: GameSocket,
	dispatch: DispatchFn
) => {
	const onSendPlayerActions = (
		action: { type: string; payload?: any },
		ack?: () => void
	) => {
		if (!PlayerActionTypesArray.includes(action.type)) {
			console.error(
				`Unhandled action type: ${action.type} (for opcode sendPlayerActions)`
			);
		} else {
			dispatch(action);
		}

		if (ack) {
			ack();
		}
	};

	const onPing = (_payload: unknown, ack?: () => void) => {
		dispatch({ type: "ping" });
		if (ack) {
			ack();
		}
	};

	const onFinishMatch = () => {
		dispatch(PlayerEvents.clientFinishMatchEvent());
	};

	socket.on("sendPlayerActions", onSendPlayerActions);
	socket.on("ping", onPing as any);
	socket.on("finishMatch", onFinishMatch);

	return () => {
		socket.off("sendPlayerActions", onSendPlayerActions);
		socket.off("ping", onPing as any);
		socket.off("finishMatch", onFinishMatch);
	};
};
