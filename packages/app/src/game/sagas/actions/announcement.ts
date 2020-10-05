import { takeLatest, put, select, delay } from "@redux-saga/core/effects";
import { GamePhase } from "@creature-chess/models";
import { AppState } from "../../../store/state";
import { GAME_PHASE_UPDATE, GamePhaseUpdateAction } from "@creature-chess/shared/player/gameInfo";
import { PlayersResurrectedAction, PLAYERS_RESURRECTED } from "packages/app/src/game/store/actions";
import { clearAnnouncement, updateAnnouncement } from "packages/app/src/store/actions/uiActions";

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
    yield takeLatest<GamePhaseUpdateAction | PlayersResurrectedAction>(
        [GAME_PHASE_UPDATE, PLAYERS_RESURRECTED],
        function*(action) {
            if (action.type === GAME_PHASE_UPDATE) {
                if (action.payload.phase === GamePhase.PLAYING) {
                    yield put(clearAnnouncement());
                    return;
                }

                if (action.payload.phase === GamePhase.READY) {
                    const state: AppState = yield select();

                    const opponentId = action.payload.payload.opponentId;
                    const opponent = state.playerList.find(p => p.id === opponentId);

                    if (!opponent) {
                        return;
                    }

                    yield put(updateAnnouncement(opponent.name, "Now Playing"));
                }
            }

            if (action.type === PLAYERS_RESURRECTED) {
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
        }
    );
};
