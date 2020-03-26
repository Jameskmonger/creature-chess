import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { phaseTimer } from "./actions/phaseTimer";
import { gamePhase } from "./actions/gamePhase";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { cardShop } from "./actions/cardShop";
import { battle } from "@common/match/combat/battleSaga";
import { TurnSimulator } from "@common/match/combat/turnSimulator";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "@common/models/constants";
import { AppState } from "../state";
import { announcement } from "./actions/announcement";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { networking } from "../../networking/saga";
import { evolutionSagaFactory } from "@common/player/sagas/evolution";
import { dropPiece } from "@common/player/sagas/dropPiece";

export const rootSaga = function*() {
    yield all([
        yield fork(preventAccidentalClose),
        yield fork(networking),
        yield takeEvery(
            JOIN_COMPLETE,
            function*() {
                yield all([
                    yield fork(dropPiece),
                    yield fork(phaseTimer),
                    yield fork(announcement),
                    yield fork(gamePhase),
                    yield fork(cardShop),
                    yield fork(evolutionSagaFactory<AppState>()),
                    yield fork(
                        battle,
                        new TurnSimulator(new DefinitionProvider()),
                        DEFAULT_TURN_COUNT,
                        DEFAULT_TURN_DURATION
                    )
                ]);
            }
        )
    ]);
};
