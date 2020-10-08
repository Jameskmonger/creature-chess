import { fork, all } from "@redux-saga/core/effects";
import { preventAccidentalClose } from "../../game/sagas/actions/preventAccidentalClose";
import { AppState } from "../../store";
import { closeShopOnFirstBuy } from "../features/cardShop/closeShopOnFirstBuy";
import { announcement } from "./actions/announcement";

import { PlayerSagas, PlayerActionSagas, battle, DefinitionProvider, defaultGameOptions } from "@creature-chess/shared";

export const gameSagaFactory = (playerId: string) => {
    const definitionProvider = new DefinitionProvider();

    return function*() {
        yield all([
            yield fork(preventAccidentalClose),
            yield fork(announcement),
            yield fork(closeShopOnFirstBuy),
            yield fork(PlayerSagas.evolutionSagaFactory<AppState>()),
            yield fork(PlayerActionSagas.sellPiecePlayerActionSagaFactory<AppState>()),
            yield fork(PlayerActionSagas.rerollCardsPlayerActionSagaFactory<AppState>()),
            yield fork(PlayerActionSagas.buyCardPlayerActionSagaFactory<AppState>(definitionProvider, playerId)),
            yield fork(PlayerActionSagas.buyXpPlayerActionSagaFactory<AppState>()),
            yield fork(PlayerActionSagas.dropPiecePlayerActionSagaFactory<AppState>(playerId)),
            yield fork(PlayerSagas.xpSagaFactory<AppState>()),
            yield fork(
                battle,
                defaultGameOptions
            )
        ]);
    };
};
