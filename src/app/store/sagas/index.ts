import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { phaseTimer } from "./actions/phaseTimer";
import { gamePhase } from "./actions/gamePhase";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { battle } from "@common/match/combat/battleSaga";
import { TurnSimulator } from "@common/match/combat/turnSimulator";
import { DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "@common/models/constants";
import { AppState } from "../state";
import { announcement } from "./actions/announcement";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { networking } from "../../networking/saga";
import { evolutionSagaFactory } from "@common/player/sagas/evolution";
import { sellPiece } from "./actions/sellPiece";
import { auth } from "./actions/auth";
import { JoinCompleteAction } from "../actions/localPlayerActions";
import { cardShopSagaFactory } from "@common/player/cardShop/saga";
import { dropPieceSagaFactory } from "@common/player/sagas/dropPiece";

export const rootSaga = function*() {
    yield all([
        yield fork(preventAccidentalClose),
        yield fork(auth),
        yield fork(networking),
        yield takeEvery<JoinCompleteAction>(
            JOIN_COMPLETE,
            function*({ payload: { playerId }}) {
                yield all([
                    yield fork(phaseTimer),
                    yield fork(announcement),
                    yield fork(gamePhase),
                    yield fork(sellPiece),
                    yield fork(dropPieceSagaFactory<AppState>(playerId)),
                    yield fork(evolutionSagaFactory<AppState>()),
                    yield fork(cardShopSagaFactory<AppState>(playerId)),
                    yield fork(
                        battle,
                        new TurnSimulator(),
                        DEFAULT_TURN_COUNT,
                        DEFAULT_TURN_DURATION
                    )
                ]);
            }
        )
    ]);
};
