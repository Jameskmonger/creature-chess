import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { PieceModel, PlayerBattle, PlayerStreak, RoundInfoState, StreakType } from "../../../models/lib";
import { composeWithDevTools } from "redux-devtools-extension";
import { PlayerInfoState, PlayerMatchRewards, PlayerState } from "@creature-chess/gamemode";
import { BoardSlice, BoardState, createBoardSlice, createInitialBoardState } from "../../../../@shoki/board/lib";
import { cardShopReducer, CardShopState } from "./cardShop";
import { playerInfoReducer, initialPlayerInfoState } from "./playerInfo";
import { botInfoReducer } from "./botInfo";
import { devSaga } from "./saga";

export type DevState = {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
};
export interface DevPlayerInfoState {
	status: number;
	health: number;
	streak: PlayerStreak;
	battle: null;
	matchRewards: null;
	opponentId: null;
	money: number;
	ready: boolean;
	level: number;
	xp: number;
}

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 20
});

type Slices = { boardSlice: BoardSlice<PieceModel>; benchSlice: BoardSlice<PieceModel> };
const boardSlice = createBoardSlice<PieceModel>("local-board", { width: 7, height: 3 });
const benchSlice = createBoardSlice<PieceModel>("local-bench", { width: 7, height: 1 });

const boardReducer = boardSlice.boardReducer;
const benchReducer = benchSlice.boardReducer;

const boardState = createInitialBoardState("dev-board", { width: 7, height: 3 });

const initialState: DevState = {
	board: null,
	bench: null,
	cardShop: null,
	playerInfo: initialPlayerInfoState,
	roundInfo: {
		round: 1,
		phase: 0,
		phaseStartedAtSeconds: 100
	}
};
export type SagaContext = {
	slices: Slices;
};

const devReducer = combineReducers({
	board: boardReducer,
	bench: benchReducer,
	playerInfo: playerInfoReducer,
	cardShop: cardShopReducer,
	botInfo: botInfoReducer
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
