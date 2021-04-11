import { take, fork, put, takeLatest } from "@redux-saga/core/effects";

import { GameEvents, PlayerInfoCommands, PlayerCommands } from "@creature-chess/shared";
import { BoardSlice } from "@creature-chess/board";
import { battleSaga, startBattle, BattleEvents } from "@creature-chess/battle";
import { PieceModel, defaultGameOptions } from "@creature-chess/models";

import { GameConnectedEvent, GAME_CONNECTED_EVENT } from "../../networking/actions";
import { playerListUpdated } from "../features/playerList/playerListActions";
import { LobbyGameStartedEvent, LOBBY_GAME_STARTED_EVENT } from "../../lobby/store/actions";

import { clickToDrop } from "./actions/clickToDrop";
import { closeShopOnFirstBuy } from "./actions/closeShopOnFirstBuy";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";

export const gameSaga = function*(slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }) {
    const action = yield take<GameConnectedEvent | LobbyGameStartedEvent>([GAME_CONNECTED_EVENT, LOBBY_GAME_STARTED_EVENT]);

    yield fork(battleSaga, defaultGameOptions, slices.boardSlice);

    yield takeLatest<BattleEvents.BattleTurnEvent>(
        BattleEvents.BATTLE_TURN_EVENT,
        function*({ payload: { board }}: BattleEvents.BattleTurnEvent) {
            yield put(slices.boardSlice.commands.setBoardPiecesCommand({
                pieces: board.pieces,
                piecePositions: board.piecePositions,
                size: undefined // todo improve this
            }));
        }
    );

    yield fork(preventAccidentalClose);
    yield fork(closeShopOnFirstBuy);
    yield fork(clickToDrop);

    if (action && action.payload) {
        const { payload: {
            board,
            bench,
            players,
            battleTurn,
            game: { phase, phaseStartedAtSeconds },
            playerInfo: { money, cards, level, xp }
        } } = action as GameConnectedEvent;

        yield put(slices.boardSlice.commands.setBoardPiecesCommand(board));
        yield put(slices.benchSlice.commands.setBoardPiecesCommand(bench));
        yield put(PlayerInfoCommands.updateMoneyCommand(money));
        yield put(PlayerCommands.updateCardsCommand(cards));
        yield put(PlayerInfoCommands.updateLevelCommand(level, xp));
        yield put(playerListUpdated(players));
        yield put(GameEvents.gamePhaseStartedEvent(phase, phaseStartedAtSeconds));

        if (battleTurn !== null) {
            yield put(startBattle(battleTurn));
        }
    }

    // yield fork(PlayerSagas.evolutionSagaFactory<AppState>()),
    // yield fork(PlayerActionSagas.sellPiecePlayerActionSagaFactory<AppState>()),
    // yield fork(PlayerActionSagas.rerollCardsPlayerActionSagaFactory<AppState>()),
    // yield fork(PlayerActionSagas.toggleShopLockSaga<AppState>()),
    // yield fork(PlayerActionSagas.buyCardPlayerActionSagaFactory<AppState>(definitionProvider, playerId)),
    // yield fork(PlayerActionSagas.buyXpPlayerActionSagaFactory<AppState>()),
    // yield fork(PlayerActionSagas.dropPiecePlayerActionSagaFactory<AppState>(playerId)),
    // yield fork(PlayerSagas.xpSagaFactory<AppState>()),
};
