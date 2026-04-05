import {
	GameEvents,
	PlayerCommands,
	PlayerEvents,
	Player,
} from "@creature-chess/gamemode";

import { GameSocket } from "../../socket";
import { sendInitialState } from "./initialState";

export const setupOutgoingNetworking = (entity: Player, socket: GameSocket) => {
	const unsubscribes: (() => void)[] = [];

	// Send initial state
	const initialStateTask = entity.runEffect(async (api) => {
		await sendInitialState(api);
	});

	unsubscribes.push(() => initialStateTask.cancel());

	// Forward game events
	unsubscribes.push(
		entity.addListener({
			predicate: (action) => GameEvents.GameEventActionTypesArray.includes(action.type),
			effect: async (action) => {
				socket.emit("sendGameEvents", action);
			},
		})
	);

	// Forward player events
	unsubscribes.push(
		entity.addListener({
			predicate: (action) => PlayerEvents.PlayerEventActionTypesArray.includes(action.type),
			effect: async (action) => {
				socket.emit("sendLocalPlayerEvents", action);
			},
		})
	);

	// Forward player info update commands
	unsubscribes.push(
		entity.addListener({
			predicate: (action) => PlayerCommands.PlayerInfoUpdateCommandActionTypesArray.includes(action.type),
			effect: async (action) => {
				socket.emit("playerInfoUpdates", action);
			},
		})
	);

	return () => unsubscribes.forEach((fn) => fn());
};
