import delay from "delay";

import {
	GameEvents,
	PlayerActions,
	PlayerCommands,
	Player,
} from "@creature-chess/gamemode";
import { RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { GameSocket } from "./socket";

import { setupPlayerBoard } from "./board";
import { setupIncomingNetworking } from "./net/incoming";
import { setupOutgoingNetworking } from "./net/outgoing";
import { setupMetricCollector } from "../metrics/metricCollectorListener";

type Parameters = {
	getRoundInfo: () => RoundInfoState;
	getPlayers: () => PlayerListPlayer[];
};

export const playerNetworking = (
	entity: Player,
	socket: GameSocket,
	{ getRoundInfo, getPlayers }: Parameters,
	settings: GamemodeSettings
) => {
	entity.put(PlayerCommands.setSpectatingIdCommand(null));

	const cleanups: (() => void)[] = [];

	const teardown = () => {
		cleanups.forEach((fn) => fn());
		socket.removeAllListeners();
		socket.disconnect();
	};

	cleanups.push(setupIncomingNetworking(socket, (action) => entity.put(action)));

	cleanups.push(setupMetricCollector(entity));

	const connectTask = entity.runEffect(async () => {
		await delay(500);

		socket.emit("gameConnected", {
			game: getRoundInfo(),
			players: getPlayers(),
			settings,
		});

		// Now that the client has gameConnected and will set up its listeners,
		// start forwarding outgoing events, send initial state, and set up board spectating.
		const outgoingCleanup = setupOutgoingNetworking(entity, socket);
		cleanups.push(outgoingCleanup);

		const boardCleanup = setupPlayerBoard(entity, socket);
		cleanups.push(boardCleanup);
	});

	cleanups.push(() => connectTask.cancel());

	// Listen for quit or game finish to tear down
	const unsubQuit = entity.addListener({
		actionCreator: PlayerActions.quitGamePlayerAction,
		effect: async () => {
			await delay(100);
			teardown();
		},
	});
	cleanups.push(unsubQuit);

	const unsubFinish = entity.addListener({
		actionCreator: GameEvents.gameFinishEvent,
		effect: async () => {
			// wait 1 second before closing the networking
			// to allow the game finish event to be sent
			await delay(1000);
			teardown();
		},
	});
	cleanups.push(unsubFinish);

	return { teardown };
};
