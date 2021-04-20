import { take, fork, put } from "@redux-saga/core/effects";

import { PlayerInfoCommands, PlayerCommands, RoundInfoCommands } from "@creature-chess/gamemode";
import { BoardSlice } from "@creature-chess/board";
import { startBattle } from "@creature-chess/battle";
import { PieceModel } from "@creature-chess/models";

import { GameConnectedEvent, GAME_CONNECTED_EVENT } from "../../networking/actions";

import { PlayerListCommands, clickToDropSaga, closeShopOnFirstBuySaga } from "../module";

import { preventAccidentalClose } from "./actions/preventAccidentalClose";

import { LobbyEvents } from "../../lobby";
import { roundUpdateSaga, clientBattleSaga, uiSaga } from "./events";

export const gameSaga = function*(slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }) {
    const action = yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([GAME_CONNECTED_EVENT, LobbyEvents.LOBBY_GAME_STARTED_EVENT]);

    yield fork(preventAccidentalClose);
    yield fork(closeShopOnFirstBuySaga);
    yield fork(clickToDropSaga);

    yield fork(roundUpdateSaga, slices);
    yield fork(clientBattleSaga, slices);
    yield fork(uiSaga);

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
        yield put(PlayerListCommands.updatePlayerListCommand(players));

        const update = { phase, startedAt: phaseStartedAtSeconds };
        yield put(RoundInfoCommands.setRoundInfoCommand(update))

        if (battleTurn !== null) {
            yield put(startBattle(battleTurn));
        }
    }
};
