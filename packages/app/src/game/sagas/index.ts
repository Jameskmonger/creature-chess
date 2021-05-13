import { take, fork, put } from "@redux-saga/core/effects";

import { PlayerInfoCommands, PlayerCommands, RoundInfoCommands } from "@creature-chess/gamemode";
import { BoardSlice } from "@creature-chess/board";
import { startBattle } from "@creature-chess/battle";
import { PieceModel } from "@creature-chess/models";

import { gameConnectedEvent, GameConnectedEvent } from "../../networking/actions";

import { PlayerListCommands, clickToDropSaga, closeShopOnFirstBuySaga } from "../module";

import { preventAccidentalClose } from "./actions/preventAccidentalClose";

import { LobbyEvents } from "../../lobby";
import { roundUpdateSaga, clientBattleSaga, uiSaga } from "./events";
import { all, call } from "redux-saga/effects";

export const gameSaga = function*(slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }) {
	const action = yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([gameConnectedEvent.toString(), LobbyEvents.LOBBY_GAME_STARTED_EVENT]);

	yield all([
		call(preventAccidentalClose),
		call(closeShopOnFirstBuySaga),
		call(clickToDropSaga),
		call(roundUpdateSaga, slices),
		call(clientBattleSaga, slices),
		call(uiSaga),
		call(function*() {
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
				yield put(RoundInfoCommands.setRoundInfoCommand(update));

				if (battleTurn !== null) {
					yield put(startBattle(battleTurn));
				}
			}
		})
	]);
};
