import {
	dispatchIncomingPlayerAction,
	Player,
} from "@creature-chess/gamemode";

import { GameSocket } from "../socket";

export const setupIncomingNetworking = (socket: GameSocket, player: Player) => {
	const onSendPlayerActions = (
		raw: { type?: unknown; payload?: unknown },
		ack?: () => void
	) => {
		const result = dispatchIncomingPlayerAction(player, raw);
		if (!result.ok) {
			console.warn(`PlayerAction rejected for ${player.id}: ${result.reason}`);
		}
		ack?.();
	};

	const onPing = (_payload: unknown, ack?: () => void) => {
		player.put({ type: "ping" });
		ack?.();
	};

	const onFinishMatch = () => {
		player.emitClientFinishMatch();
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
