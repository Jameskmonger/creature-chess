import React from "react";

import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { BattleEvents, battleSaga } from "@creature-chess/battle";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { GameBoard } from "@creature-chess-app/web-game/src/components/game/board/GameBoard";

import { BattleBoard } from "./BattleBoard";
import {
	HOME_VS_AWAY_TEST_T1_AWAY_VIEW,
	HOME_VS_AWAY_TEST_T1_HOME_VIEW,
	HOME_VS_AWAY_TEST_T2_AWAY_VIEW,
	HOME_VS_AWAY_TEST_T2_HOME_VIEW,
} from "./cases/home-vs-away";
import { BattleControls } from "./controls/BattleControls";
import { initialBoardPieces } from "./piece";
import { BattleTesterState, board, controlSlice } from "./state";

export default {
	title: "@tools / Battle Tester",
	component: GameBoard,
	argTypes: {},
} as Meta;

const makeStore = (initial: any) => {
	const sagaMiddleware = createSagaMiddleware();

	const newStore = createStore(
		combineReducers<BattleTesterState>({
			board: board.boardReducer as any,
			controls: controlSlice.reducer as any,
			currentTurn: ((s: BattleTesterState, a: any) => {
				if (a.type !== BattleEvents.battleTurnEvent.toString()) {
					return s || 0;
				}

				const action = a as BattleEvents.BattleTurnEvent;

				return action.payload.turn;
			}) as any,
			combatStore: ((s: BattleTesterState, a: any) => {
				if (a.type !== BattleEvents.exposeStoreEvent.toString()) {
					return s || null;
				}

				const action = a as BattleEvents.ExposeStoreEvent;

				return action.payload.stores.combat;
			}) as any,
		}),
		applyMiddleware(sagaMiddleware)
	);

	sagaMiddleware.run(function* () {
		yield fork(
			battleSaga,
			(state: BattleTesterState) => state.board,
			GamemodeSettingsPresets["default"],
			board
		);

		yield takeLatest<BattleEvents.BattleTurnEvent>(
			BattleEvents.battleTurnEvent,
			function* ({
				payload: { board: newBoard },
			}: BattleEvents.BattleTurnEvent) {
				yield put(board.commands.setBoardPiecesCommand(newBoard));
			}
		);

		yield put(board.commands.setBoardPiecesCommand(initial));
	});

	return newStore;
};

const Template = (state: any) => (args: any) => (
	<Provider store={makeStore(state)}>
		<div style={{ display: "flex", width: "100%", height: "100%" }}>
			<div style={{ width: "60%", height: "100%", border: "2px solid grey" }}>
				<BattleBoard />
			</div>
			<div style={{ width: "40%", height: "100%", border: "2px solid grey" }}>
				<BattleControls />
			</div>
		</div>
	</Provider>
);

export const Default: any = Template(initialBoardPieces).bind({});
Default.args = {};

export const HomeVsAwayT1Home: any = Template(
	HOME_VS_AWAY_TEST_T1_HOME_VIEW
).bind({});
HomeVsAwayT1Home.args = {};

export const HomeVsAwayT2Home: any = Template(
	HOME_VS_AWAY_TEST_T2_HOME_VIEW
).bind({});
HomeVsAwayT2Home.args = {};

export const HomeVsAwayT1Away: any = Template(
	HOME_VS_AWAY_TEST_T1_AWAY_VIEW
).bind({});
HomeVsAwayT1Away.args = {};

export const HomeVsAwayT2Away: any = Template(
	HOME_VS_AWAY_TEST_T2_AWAY_VIEW
).bind({});
HomeVsAwayT2Away.args = {};
