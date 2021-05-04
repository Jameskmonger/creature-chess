import { call, takeLatest, put, take } from "@redux-saga/core/effects";
import { LobbyPlayer, GamePhase } from "@creature-chess/models";
import { Player, PlayerGameActions, PlayerEvents, GameEvents } from "@creature-chess/gamemode";
import uuid = require("uuid");
import delay from "delay";
import { putBenchOnBoard } from "./behaviour/putBenchOnBoard";
import { BOT_ACTION_TIME_MS } from "./constants";
import { spendExcessMoneyOnXp } from "./behaviour/spendExcessMoneyOnXp";
import { buyBestPieces } from "./shop/buyBestPieces";

export class BotPlayer extends Player {
    public readonly isBot = true;

    constructor(id: string, name: string, picture: number) {
        // todo fix typing
        super(id, name, picture);

        this.sagaMiddleware.run(this.botLogicSaga());
    }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        /* nothing required, we're a bot */
    }

    private botLogicSaga() {
        const preparingPhase = function*() {
            yield call(buyBestPieces);
            yield call(spendExcessMoneyOnXp);
            yield call(putBenchOnBoard);

            yield put(PlayerGameActions.readyUpPlayerAction());
            yield delay(BOT_ACTION_TIME_MS);
        };

        return function*() {
            // take first event manually to allow for a delay
            const event: GameEvents.GamePhaseStartedEvent = yield take(GameEvents.gamePhaseStartedEvent.toString());

            yield delay(500);

            if (event.payload.phase === GamePhase.PREPARING) {
                yield call(preparingPhase);
            } else if (event.payload.phase === GamePhase.PLAYING) {
                yield put(PlayerEvents.clientFinishMatchEvent());
            }

            yield takeLatest<GameEvents.GamePhaseStartedEvent>(
                GameEvents.gamePhaseStartedEvent.toString(),
                function*({ payload: { phase } }) {
                    if (phase === GamePhase.PREPARING) {
                        yield call(preparingPhase);
                    } else if (phase === GamePhase.PLAYING) {
                        yield put(PlayerEvents.clientFinishMatchEvent());
                    }
                }
            );
        };
    }
}
