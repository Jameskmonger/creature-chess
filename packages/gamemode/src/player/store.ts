import { Logger } from "winston";
import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { all, call } from "@redux-saga/core/effects";

import { BoardState, BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { PlayerInfoState, playerInfoReducer } from "./playerInfo";
import {
	fillBoardSagaFactory, healthSagaFactory, xpSagaFactory, evolutionSagaFactory, setStatusOnQuit, playerBattle, playerMatchRewards
} from "./sagas";
import { roundInfoReducer, RoundInfoState } from "../game/roundInfo";
import { cardShopReducer, CardShopState } from "./cardShop";
import { PlayerSagaContext } from "./sagaContext";
import { playerGameActionsSaga } from "./playerGameActions";
import { Match } from "../game/match";
import { playerPhases } from "./sagas/phases";

export interface PlayerState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (
	logger: Logger,
	getMatch: () => Match | null,
	playerId: string,
	playerName: string,
	boardSlices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
	const rootSaga = function*() {
		yield all([
			call(playerPhases),
			call(playerGameActionsSaga),
			call(evolutionSagaFactory<PlayerState>(boardSlices)),
			call(healthSagaFactory<PlayerState>()),
			call(xpSagaFactory<PlayerState>(boardSlices)),
			call(fillBoardSagaFactory<PlayerState>(playerId)),
			call(setStatusOnQuit),
			call(playerBattle)
		]);
	};

	const sagaMiddleware = createSagaMiddleware<PlayerSagaContext>({
		context: {
			playerId,
			playerName,
			boardSlices,
			dependencies: {
				logger,
				getMatch
			}
		}
	});

	const store = createStore(
		combineReducers<PlayerState>({
			board: boardSlices.boardSlice.boardReducer,
			bench: boardSlices.benchSlice.boardReducer,
			playerInfo: playerInfoReducer,
			roundInfo: roundInfoReducer,
			cardShop: cardShopReducer
		}),
		applyMiddleware(sagaMiddleware)
	);

	sagaMiddleware.run(rootSaga);

	return {
		store,
		sagaMiddleware
	};
};
