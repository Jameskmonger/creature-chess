import React from "react";

import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

import { GameBoard } from "@creature-chess-app/web-game/src/components/game/board/GameBoard";

import { BotStateView } from "./BotStateView";
import { BotBrainInfo } from "./brain/BotBrainInfo";
import {
	BotBrainTesterContextProvider,
	BotBrainTesterContextValue,
} from "./context";
import { makeCard, makePiece } from "./piece";
import { BotBrainTesterState, bench, board } from "./state";

export default {
	title: "@tools / Bot Brain Tester",
	component: GameBoard,
	argTypes: {},
} as Meta;

type Args = {
	board: Partial<BoardState<PieceModel>>;
	bench: Partial<BoardState<PieceModel>>;
	personality: BotPersonality;
	state: BotBrainTesterContextValue["state"];
};

const makeStore = (args: Args) => {
	const sagaMiddleware = createSagaMiddleware();

	const newStore = createStore(
		combineReducers<BotBrainTesterState>({
			board: board.boardReducer as any,
			bench: bench.boardReducer as any,
		}),
		applyMiddleware(sagaMiddleware)
	);

	newStore.dispatch(
		board.commands.setBoardPiecesCommand({
			pieces: args.board.pieces || {},
			piecePositions: args.board.piecePositions || {},
		})
	);
	newStore.dispatch(
		bench.commands.setBoardPiecesCommand({
			pieces: args.bench.pieces || {},
			piecePositions: args.bench.piecePositions || {},
		})
	);

	return newStore;
};

const Template: Story<any> = (args: Args) => {
	const store = makeStore(args);

	const [personality, setPersonality] = React.useState<BotPersonality>(
		args.personality
	);

	const [state, setState] = React.useState<BotBrainTesterContextValue["state"]>(
		args.state
	);

	const context = React.useMemo(
		() => ({
			value: {
				personality,
				gamemodeSettings: GamemodeSettingsPresets["default"],
				state,
			},
			setPersonality,
			setState,
		}),
		[personality, state]
	);

	return (
		<Provider store={store}>
			<BotBrainTesterContextProvider value={context}>
				<div style={{ display: "flex", width: "100%", height: "100%" }}>
					<div
						style={{ width: "60%", height: "100%", border: "2px solid grey" }}
					>
						<BotStateView />
					</div>
					<div
						style={{ width: "40%", height: "100%", border: "2px solid grey" }}
					>
						<BotBrainInfo />
					</div>
				</div>
			</BotBrainTesterContextProvider>
		</Provider>
	);
};

export const Default = Template.bind({});
Default.args = {
	board: {
		pieces: {
			["101"]: makePiece("101", "B", 9, false),
			["102"]: makePiece("102", "B", 10, false),
			["103"]: makePiece("103", "B", 11, false),
		},
		piecePositions: {
			["2,0"]: "101",
			["3,0"]: "102",
			["4,0"]: "103",
		},
	},

	bench: {
		pieces: {
			["201"]: makePiece("201", "B", 1, false),
		},
		piecePositions: {
			["2,0"]: "201",
		},
	},

	personality: {
		composure: 100,
		ambition: 100,
		vision: 100,
	},

	state: {
		health: 100,
		money: 12,
		level: 3,
		xp: 0,
		cards: [makeCard("901", 1), makeCard("902", 9)],
	},
};
