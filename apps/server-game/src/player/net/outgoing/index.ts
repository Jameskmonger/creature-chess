import { Player } from "@creature-chess/gamemode";
import { GameEvents } from "@creature-chess/models";

import { GameSocket } from "../../socket";

export const setupOutgoingNetworking = (entity: Player, socket: GameSocket) => {
	const unsubscribes: (() => void)[] = [];

	const forwardGameEvent = (action: GameEvents.GameEvent) => {
		socket.emit("sendGameEvents", action);
	};
	unsubscribes.push(entity.gamemode.events.onPhaseStart(forwardGameEvent));
	unsubscribes.push(entity.gamemode.events.onFinish(forwardGameEvent));
	unsubscribes.push(
		entity.gamemode.events.onPlayerListChange(forwardGameEvent)
	);

	unsubscribes.push(
		entity.events.onPlayerEvent((action) => {
			socket.emit("sendLocalPlayerEvents", action);
		})
	);

	unsubscribes.push(
		entity.events.onInfoUpdate((action) => {
			socket.emit("playerInfoUpdates", action);
		})
	);

	return () => unsubscribes.forEach((fn) => fn());
};
