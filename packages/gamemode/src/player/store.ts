import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { all, call } from "@redux-saga/core/effects";

import { BoardState, BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { PlayerInfoState, playerInfoReducer } from "./playerInfo";
import {
	fillBoardSagaFactory, healthSagaFactory, xpSagaFactory, evolutionSagaFactory, setStatusOnQuit, playerBattle
} from "./sagas";
import { roundInfoReducer, RoundInfoState } from "../game/roundInfo";
import { cardShopReducer, CardShopState } from "./cardShop";
import { PlayerSagaContext, PlayerSagaDependencies } from "./sagaContext";
import { playerGameActionsSaga } from "./playerGameActions";
import { playerPhases } from "./sagas/phases";
import { createPlayerVariableStore } from "./variablesStore";
import { featuresRootSaga } from "../features";
import { defaultPlayerVariables, PlayerVariables } from "./variables";

export interface PlayerState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
}

export type PlayerStore = Store<PlayerState>;

export const createPlayerStore = (
	dependencies: PlayerSagaDependencies,
	playerId: string,
	playerName: string,
	boardSlices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
): { store: PlayerStore, sagaMiddleware: SagaMiddleware } => {
	const playerVariables = createPlayerVariableStore<PlayerVariables>(defaultPlayerVariables());

	const sagaMiddleware = createSagaMiddleware<PlayerSagaContext>({
		context: {
			playerId,
			playerName,
			boardSlices,
			dependencies,
			getVariable: playerVariables.getVariable,
			updateVariables: playerVariables.updateVariables
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

	const rootSaga = function*() {
		yield all([
			call(playerPhases),
			call(playerGameActionsSaga),
			call(evolutionSagaFactory<PlayerState>(boardSlices)),
			call(healthSagaFactory<PlayerState>()),
			call(xpSagaFactory<PlayerState>(boardSlices)),
			call(fillBoardSagaFactory<PlayerState>(playerId)),
			call(setStatusOnQuit),
			call(playerBattle),
			call(featuresRootSaga)
		]);
	};

	sagaMiddleware.run(rootSaga);

	return {
		store,
		sagaMiddleware
	};
};
