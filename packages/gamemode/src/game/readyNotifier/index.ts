import { take } from "redux-saga/effects";
import { select } from "typed-redux-saga";
import { Player } from "../../player";
import { quitGamePlayerAction, QuitGamePlayerAction } from "../../player/playerGameActions";
import { isPlayerAlive } from "../../player/playerSelectors";
import { PlayerState } from "../../player/store";
import { listenForPropertyUpdates } from "../playerPropertyUpdates";
import { deferLimitedQueue, limitedQueue } from "./limitedQueue";

export const readyNotifier = (livingPlayers: Player[]) => {
    const queue = limitedQueue<string>(livingPlayers.length);

    const disposePlayerFns = livingPlayers.map(player => {
        const disposeReady = listenForPropertyUpdates(player,
            {
                ready: (ready) => {
                    if (ready) {
                        queue.add(player.id);
                    }
                }
            }
        );

        const watchQuitTask = player.runSaga(function*() {
            yield take<QuitGamePlayerAction>(quitGamePlayerAction.toString());

            const isAlive = yield* select(isPlayerAlive);
            const isReady = yield* select((state: PlayerState) => state.playerInfo.ready);

            if (isAlive && !isReady) {
                console.log(player.name + " just quit");

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
            disposePlayerFns.forEach(fn => fn());
            deferred.dispose();
        }
    };
};
