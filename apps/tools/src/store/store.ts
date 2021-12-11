import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { PieceModel, PlayerBattle, PlayerStreak, RoundInfoState, StreakType } from "@creature-chess/models";
import { playerInfoReducer, PlayerInfoState, PlayerMatchRewards, PlayerState } from "@creature-chess/gamemode";
import { BoardSlice, BoardState, createBoardSlice, createInitialBoardState } from "@shoki/board";
import { cardShopReducer, CardShopState } from "./devCardShop";
import { botInfoReducer } from "./botInfo";
import { uiReducer, BoardType } from "./ui";
import { devSaga } from "./saga";

export enum Overlay {
	CARD_SELECTION,
	NOTIFICATION
}

export type DevState = {
	scenario: {
		board: BoardState<PieceModel>;
		bench: BoardState<PieceModel>;
		cardShop: CardShopState;
		playerInfo: PlayerInfoState;
		roundInfo: RoundInfoState;
	};
	actions: string[];
	ui: {
		overlay: Overlay | null;
		boardParameters: {
			boardPosition: {
				one: number;
				two: number;
			};
			boardType: BoardType;
		} | null;

	};
};

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 20
});

type Slices = { boardSlice: BoardSlice<PieceModel>; benchSlice: BoardSlice<PieceModel> };
export const boardSlice = createBoardSlice<PieceModel>("local-board", { width: 7, height: 3 });
export const benchSlice = createBoardSlice<PieceModel>("local-bench", { width: 7, height: 1 });

const boardReducer = boardSlice.boardReducer;
const benchReducer = benchSlice.boardReducer;


export type SagaContext = {
	slices: Slices;
};

const actionsReducer = (state = {}, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const scenarioReducer = combineReducers({
	board: boardReducer,
	bench: benchReducer,
	playerInfo: playerInfoReducer,
	cardShop: cardShopReducer,
	botInfo: botInfoReducer
});

const devReducer = combineReducers({
	scenario: scenarioReducer,
	ui: uiReducer,
	actions: actionsReducer,
});

const sagaMiddleware = createSagaMiddleware<SagaContext>({
	context: {
		slices: {
			boardSlice,
			benchSlice
		}
	}
});

export const store = createStore(devReducer, composeEnhancers(
	applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(devSaga);