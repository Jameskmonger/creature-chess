import { put, fork, all, select } from "@redux-saga/core/effects";
import { preventAccidentalClose } from "../../game/sagas/actions/preventAccidentalClose";
import { AppState } from "../../store";
import { closeShopOnFirstBuy } from "../features/cardShop/closeShopOnFirstBuy";
import { announcement } from "./actions/announcement";
import { gameNetworking } from "./networking/saga";

import { battleSaga, DefinitionProvider, defaultGameOptions, BenchCommands, PlayerInfoCommands, PlayerCommands, GameEvents, startBattle, BoardSlice } from "@creature-chess/shared";
import { clickToDrop } from "./actions/clickToDrop";
import { GameConnectedEvent } from "../../lobby/store/actions";
import { playerListUpdated } from "../features/playerList/playerListActions";

export const gameSaga = function*(playerId: string, socket: SocketIOClient.Socket, boardSlice: BoardSlice) {
    const definitionProvider = new DefinitionProvider();

    yield all([
        yield fork(gameNetworking, socket, boardSlice),
        yield fork(battleSaga, defaultGameOptions, boardSlice),

        yield fork(preventAccidentalClose),
        yield fork(announcement),
        yield fork(closeShopOnFirstBuy),
        yield fork(clickToDrop),

        // yield fork(PlayerSagas.evolutionSagaFactory<AppState>()),
        // yield fork(PlayerActionSagas.sellPiecePlayerActionSagaFactory<AppState>()),
        // yield fork(PlayerActionSagas.rerollCardsPlayerActionSagaFactory<AppState>()),
        // yield fork(PlayerActionSagas.toggleShopLockSaga<AppState>()),
        // yield fork(PlayerActionSagas.buyCardPlayerActionSagaFactory<AppState>(definitionProvider, playerId)),
        // yield fork(PlayerActionSagas.buyXpPlayerActionSagaFactory<AppState>()),
        // yield fork(PlayerActionSagas.dropPiecePlayerActionSagaFactory<AppState>(playerId)),
        // yield fork(PlayerSagas.xpSagaFactory<AppState>()),
    ]);
};
