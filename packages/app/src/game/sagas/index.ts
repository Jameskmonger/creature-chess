import { put, fork, all, select } from "@redux-saga/core/effects";
import { preventAccidentalClose } from "../../game/sagas/actions/preventAccidentalClose";
import { AppState } from "../../store";
import { closeShopOnFirstBuy } from "../features/cardShop/closeShopOnFirstBuy";
import { announcement } from "./actions/announcement";
import { gameNetworking } from "./networking/saga";

import { battleSaga, DefinitionProvider, defaultGameOptions, PlayerInfoCommands, PlayerCommands, GameEvents, startBattle } from "@creature-chess/shared";
import { BoardSlice } from "@creature-chess/board";
import { clickToDrop } from "./actions/clickToDrop";
import { GameConnectedEvent } from "../../lobby/store/actions";
import { playerListUpdated } from "../features/playerList/playerListActions";
import { PieceModel } from "@creature-chess/models";

export const gameSaga = function*(playerId: string, socket: SocketIOClient.Socket, slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }) {
    const definitionProvider = new DefinitionProvider();

    yield all([
        yield fork(gameNetworking, socket, slices),
        yield fork(battleSaga, defaultGameOptions, slices.boardSlice),

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
