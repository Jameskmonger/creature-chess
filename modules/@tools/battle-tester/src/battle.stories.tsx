import React from "react";

import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { BattleEvents, battleSaga } from "@creature-chess/battle";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { GameBoard } from "@cc-web/ui";

import { BattleBoard } from "./BattleBoard";
import { BattleControls } from "./controls/BattleControls";
import { initialBoardPieces } from "./piece";
import { BattleTesterState, board, controlSlice } from "./state";

export default {
	title: "@tools / Battle Tester",
	component: GameBoard,
	argTypes: {},
} as Meta;

const makeStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const newStore = createStore(
		combineReducers<BattleTesterState>({
			board: board.boardReducer,
			controls: controlSlice.reducer,
			currentTurn: (s, a) => {
				if (a.type !== BattleEvents.battleTurnEvent.toString()) {
					return s || 0;
				}

				const action = a as BattleEvents.BattleTurnEvent;

				return action.payload.turn;
			},
			combatStore: (s, a) => {
				if (a.type !== BattleEvents.exposeStoreEvent.toString()) {
					return s || null;
				}

				const action = a as BattleEvents.ExposeStoreEvent;

				return action.payload.stores.combat;
			},
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

		yield put(board.commands.setBoardPiecesCommand(initialBoardPieces));
	});

	return newStore;
};

const store = makeStore();

const Template: Story<any> = (args) => (
	<Provider store={store}>
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

export const Default = Template.bind({});
Default.args = {};
