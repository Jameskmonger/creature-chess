import { Player } from "../../entities/player/player";
import {
	isPlayerAlive,
	isPlayerReady,
} from "../../entities/player/state/selectors";
import {
	quitGamePlayerAction,
} from "../../playerActions";
import { listenForPropertyUpdates } from "../playerPropertyUpdates";
import { deferLimitedQueue, limitedQueue } from "./limitedQueue";

export const readyNotifier = (livingPlayers: Player[]) => {
	const queue = limitedQueue<string>(livingPlayers.length);

	const disposePlayerFns = livingPlayers.map((player) => {
		const disposeReady = listenForPropertyUpdates(player, {
			ready: (ready) => {
				if (ready) {
					queue.add(player.id);
				}
			},
		});

		const unsubscribeQuit = player.addListener({
			actionCreator: quitGamePlayerAction,
			effect: async (_action, api) => {
				const state = api.getState();

				if (isPlayerAlive(state) && !isPlayerReady(state)) {
					queue.add(player.id);
				}
			},
		});

		return () => {
			disposeReady();
			unsubscribeQuit();
		};
	});

	const deferred = deferLimitedQueue(queue);

	return {
		promise: deferred.promise,
		dispose: () => {
			disposePlayerFns.forEach((fn) => fn());
			deferred.dispose();
		},
	};
};
