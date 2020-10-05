import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { preventAccidentalClose } from "../../game/sagas/actions/preventAccidentalClose";
import { networking } from "./networking/saga";
import { authSaga } from "../../auth";
import { battle } from "@creature-chess/shared/match/combat/battleSaga";
import { TurnSimulator } from "@creature-chess/shared/match/combat/turnSimulator";
import { DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "@creature-chess/models/src/constants";
import { evolutionSagaFactory } from "@creature-chess/shared/player/sagas/evolution";
import { cardShopSagaFactory } from "@creature-chess/shared/player/cardShop/saga";
import { dropPieceSagaFactory } from "@creature-chess/shared/player/sagas/dropPiece";
import { DefinitionProvider } from "@creature-chess/shared/game/definitionProvider";
import { AppState } from "../../store";
import { closeShopOnFirstBuy } from "../features/cardShop/closeShopOnFirstBuy";
import { phaseTimer } from "./actions/phaseTimer";
import { gamePhase } from "./actions/gamePhase";
import { sellPiece } from "./actions/sellPiece";
import { announcement } from "./actions/announcement";
import { JoinCompleteAction } from "../../store/actions/localPlayerActions";
import { JOIN_COMPLETE } from "../../store/actiontypes/localPlayerActionTypes";

const gameSagaFactory = (playerId: string) => {
    const turnSimulator = new TurnSimulator();
    const definitionProvider = new DefinitionProvider();

    return function*() {
        yield all([
            yield fork(phaseTimer),
            yield fork(announcement),
            yield fork(gamePhase),
            yield fork(sellPiece),
            yield fork(closeShopOnFirstBuy),
            yield fork(dropPieceSagaFactory<AppState>(playerId)),
            yield fork(evolutionSagaFactory<AppState>()),
            yield fork(cardShopSagaFactory<AppState>(definitionProvider, playerId)),
            yield fork(
                battle,
                turnSimulator,
                DEFAULT_TURN_COUNT,
                DEFAULT_TURN_DURATION
            )
        ]);
    };
};

export const gameSaga = function*() {
    yield all([
        yield fork(preventAccidentalClose),
        yield fork(authSaga),
        yield fork(networking),
        yield takeEvery<JoinCompleteAction>(
            JOIN_COMPLETE,
            function*({ payload: { playerId }}) {
                yield fork(gameSagaFactory(playerId));
            }
        )
    ]);
};
