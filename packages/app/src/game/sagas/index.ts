import { fork, all } from "@redux-saga/core/effects";
import { preventAccidentalClose } from "../../game/sagas/actions/preventAccidentalClose";
import { AppState } from "../../store";
import { closeShopOnFirstBuy } from "../features/cardShop/closeShopOnFirstBuy";
import { announcement } from "./actions/announcement";

import { PlayerSagas, battle, DefinitionProvider, defaultGameOptions } from "@creature-chess/shared";

export const gameSagaFactory = (playerId: string) => {
    const definitionProvider = new DefinitionProvider();

    return function*() {
        yield all([
            yield fork(preventAccidentalClose),
            yield fork(announcement),
            yield fork(closeShopOnFirstBuy),
            yield fork(PlayerSagas.sellPiece),
            yield fork(PlayerSagas.rerollCards),
            yield fork(PlayerSagas.evolutionSagaFactory<AppState>()),
            yield fork(PlayerSagas.cardShopSagaFactory<AppState>(definitionProvider, playerId)),
            yield fork(PlayerSagas.dropPieceSagaFactory<AppState>(playerId)),
            yield fork(PlayerSagas.xpSagaFactory<AppState>()),
            yield fork(
                battle,
                defaultGameOptions
            )
        ]);
    };
};
