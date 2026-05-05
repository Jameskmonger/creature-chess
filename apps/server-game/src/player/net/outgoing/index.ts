import { Player } from "@creature-chess/gamemode";

import { GameSocket } from "../../socket";
import { sendInitialState } from "./initialState";

export const setupOutgoingNetworking = (entity: Player, socket: GameSocket) => {
	const unsubscribes: (() => void)[] = [];

	const initialStateTask = entity.runEffect(async (api) => {
		await sendInitialState(api);
	});

	unsubscribes.push(() => initialStateTask.cancel());

	unsubscribes.push(
		entity.events.onGameEvent((action) => {
			socket.emit("sendGameEvents", action);
		})
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
