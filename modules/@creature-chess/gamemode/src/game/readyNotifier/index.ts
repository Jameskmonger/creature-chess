import { take } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { PlayerEntity } from "../../entities";
import {
	isPlayerAlive,
	isPlayerReady,
} from "../../entities/player/state/selectors";
import {
	quitGamePlayerAction,
	QuitGamePlayerAction,
} from "../../playerActions";
import { listenForPropertyUpdates } from "../playerPropertyUpdates";
import { deferLimitedQueue, limitedQueue } from "./limitedQueue";

export const readyNotifier = (livingPlayers: PlayerEntity[]) => {
	const queue = limitedQueue<string>(livingPlayers.length);

	const disposePlayerFns = livingPlayers.map((player) => {
		const disposeReady = listenForPropertyUpdates(player, {
			ready: (ready) => {
				if (ready) {
					queue.add(player.id);
				}
			},
		});

		const watchQuitTask = player.runSaga(function* () {
			yield take<QuitGamePlayerAction>(quitGamePlayerAction.toString());

			const isAlive = yield* select(isPlayerAlive);
			const isReady = yield* select(isPlayerReady);

			if (isAlive && !isReady) {
				queue.add(player.id);
			}
		});

		return () => {
			disposeReady();
			watchQuitTask.cancel();
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
