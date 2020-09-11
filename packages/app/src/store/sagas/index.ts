import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { phaseTimer } from "./actions/phaseTimer";
import { gamePhase } from "./actions/gamePhase";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { battle } from "@creature-chess/shared/match/combat/battleSaga";
import { TurnSimulator } from "@creature-chess/shared/match/combat/turnSimulator";
import { DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "@creature-chess/models/constants";
import { AppState } from "../state";
import { announcement } from "./actions/announcement";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { networking } from "../../networking/saga";
import { evolutionSagaFactory } from "@creature-chess/shared/player/sagas/evolution";
import { sellPiece } from "./actions/sellPiece";
import { auth } from "./actions/auth";
import { JoinCompleteAction } from "../actions/localPlayerActions";
import { cardShopSagaFactory } from "@creature-chess/shared/player/cardShop/saga";
import { dropPieceSagaFactory } from "@creature-chess/shared/player/sagas/dropPiece";
import { closeShopOnFirstBuy } from "../../features/cardShop/closeShopOnFirstBuy";

const gameSagaFactory = (playerId: string) => {
    return function*() {
        yield all([
            yield fork(phaseTimer),
            yield fork(announcement),
            yield fork(gamePhase),
            yield fork(sellPiece),
            yield fork(closeShopOnFirstBuy),
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
    };
};

export const rootSaga = function*() {
    yield all([
        yield fork(preventAccidentalClose),
        yield fork(auth),
        yield fork(networking),
        yield takeEvery<JoinCompleteAction>(
            JOIN_COMPLETE,
            function*({ payload: { playerId }}) {
                yield fork(gameSagaFactory(playerId));
            }
        )
    ]);
};
