import { fork, all } from "@redux-saga/core/effects";
import { preventAccidentalClose } from "../../game/sagas/actions/preventAccidentalClose";
import { battle } from "@creature-chess/shared/match/combat/battleSaga";
import { TurnSimulator } from "@creature-chess/shared/match/combat/turnSimulator";
import { DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "@creature-chess/models/src/constants";
import { evolutionSagaFactory } from "@creature-chess/shared/player/sagas/evolution";
import { dropPieceSagaFactory } from "@creature-chess/shared/player/sagas/dropPiece";
import { DefinitionProvider } from "@creature-chess/shared/game/definitionProvider";
import { AppState } from "../../store";
import { closeShopOnFirstBuy } from "../features/cardShop/closeShopOnFirstBuy";
import { announcement } from "./actions/announcement";
import { cardShopSagaFactory } from "@creature-chess/shared/player/sagas/cardShop";
import { sellPiece } from "@creature-chess/shared/player/sagas/sellPiece";
import { rerollCards } from "@creature-chess/shared/player/sagas/rerollCards";

export const gameSagaFactory = (playerId: string) => {
    const turnSimulator = new TurnSimulator();
    const definitionProvider = new DefinitionProvider();

    return function*() {
        yield all([
            yield fork(preventAccidentalClose),
            yield fork(announcement),
            yield fork(sellPiece),
            yield fork(rerollCards),
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
