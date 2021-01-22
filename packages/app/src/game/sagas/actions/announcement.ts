import { takeLatest, put, select, delay } from "@redux-saga/core/effects";
import { AppState } from "../../../store/state";
import { clearAnnouncement, updateAnnouncement, PlayersResurrectedAction, PLAYERS_RESURRECTED } from "../../../ui/actions";

// distinctLastJoin(["James", "Bob", "William", "Steve"], ", ", " and ")
// -> "James, Bob, William and Steve"
const distinctLastJoin = (items: string[], mainSeparator: string, lastSeparator: string) => {
    if (!items || !items.length) {
        return null;
    }

    if (items.length === 1) {
        return items[0];
    }

    let output = items[0];
    for (let i = 1; i < items.length - 1; i++) {
        output = output + mainSeparator + items[i];
    }
    output = output + lastSeparator + items[items.length - 1];
    return output;
};

export const announcement = function*() {
    yield takeLatest<PlayersResurrectedAction>(
        PLAYERS_RESURRECTED,
        function*(action) {
            const { playerIds } = action.payload;
            const state: AppState = yield select();

            const playerNames = playerIds.map(playerId => {
                const player = state.playerList.find(p => p.id === playerId);

                if (!player) {
                    return null;
                }

                return player.name;
            }).filter(name => name !== null);

            const message = distinctLastJoin(playerNames, ", ", " and ");

            if (!message) {
                return;
            }

            yield put(updateAnnouncement("Players Resurrected", message));

            yield delay(2000);

            yield put(clearAnnouncement());
        }
    );
};
