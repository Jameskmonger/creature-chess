import React from "react";

import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { BattleEvents, battleSagaFactory } from "@creature-chess/battle";
import { defaultGameOptions } from "@creature-chess/models";
import { GameBoard } from "@creature-chess/ui";

import { BattleBoard } from "./BattleBoard";
import { BattleControls } from "./controls/BattleControls";
import { initialBoardPieces } from "./piece";
import { BattleTesterState, board, controlSlice } from "./state";

export default {
	title: "Battle Tester",
	component: GameBoard,
	argTypes: {},
} as Meta;

const makeStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		combineReducers<BattleTesterState>({
			board: board.boardReducer,
			controls: controlSlice.reducer,
		}),
		applyMiddleware(sagaMiddleware)
	);

	sagaMiddleware.run(function* () {
		yield fork(
			battleSagaFactory((state: BattleTesterState) => state.board) as any,
			defaultGameOptions,
			board
		);

		yield takeLatest<BattleEvents.BattleTurnEvent>(
			BattleEvents.BATTLE_TURN_EVENT,
			function* ({
				payload: { board: newBoard },
			}: BattleEvents.BattleTurnEvent) {
				console.log("turn event");
				yield put(board.commands.setBoardPiecesCommand(newBoard));
			}
		);

		yield put(board.commands.setBoardPiecesCommand(initialBoardPieces));
	});

	return store;
};

const store = makeStore();

const Template: Story<any> = (args) => {
	return (
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
};

export const Default = Template.bind({});
Default.args = {};
