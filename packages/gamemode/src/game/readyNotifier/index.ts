import { Player } from "../../player";
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

        const disposeQuit = player.onQuitGame(() => {
            if (player.isAlive() && player.getReady() === false) {
                queue.add(player.id);
            }
        });

        return () => {
            disposeReady();
            disposeQuit();
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
