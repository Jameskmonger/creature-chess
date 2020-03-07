import { fork, all } from "@redux-saga/core/effects";
import { networking } from "./actions/networking";
import { phaseTimer } from "./actions/phaseTimer";
import { gamePhase } from "./actions/gamePhase";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { cardShop } from "./actions/cardShop";
import { evolutionSagaFactory } from "@common/board/sagas/evolution";
import { battle } from "@common/match/combat/battleSaga";
import { TurnSimulator } from "@common/match/combat/turnSimulator";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "@common/constants";
import { AppState } from "../state";
import { announcement } from "./actions/announcement";

export const rootSaga = function*() {
    yield all([
        yield fork(networking),
        yield fork(phaseTimer),
        yield fork(announcement),
        yield fork(gamePhase),
        yield fork(preventAccidentalClose),
        yield fork(cardShop),
        yield fork(evolutionSagaFactory<AppState>()),
        yield fork(battle, new TurnSimulator(new DefinitionProvider()), DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION)
    ]);
};
