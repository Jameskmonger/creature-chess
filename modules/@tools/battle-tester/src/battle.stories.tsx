import React from "react";

import { takeLatest, put, fork } from "@redux-saga/core/effects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { BoardSelectors, BoardState, createBoardSlice } from "@shoki/board";
import { DndProvider } from "@shoki/board-react";

import {
	BattleEvents,
	battleSagaFactory,
	startBattle,
} from "@creature-chess/battle";
import { getAllDefinitions } from "@creature-chess/gamemode";
import {
	BENCH_SLOT_COUNT,
	Builders,
	defaultGameOptions,
	GRID_SIZE,
	PieceModel,
} from "@creature-chess/models";
import {
	GameBoardContextProvider,
	GameBoardContext,
	GameBoard,
	PieceContextProvider,
	Piece,
	MatchPiece,
	GameBoardLocation,
} from "@creature-chess/ui";

export default {
	title: "Battle Tester",
	component: GameBoard,
	argTypes: {},
} as Meta;

const controlSlice = createSlice({
	name: "controls",
	initialState: {
		selectedTile: null as GameBoardLocation | null,
	},
	reducers: {
		setSelectedTile: (
			state,
			action: PayloadAction<{ tile: GameBoardLocation }>
		) => {
			state.selectedTile = action.payload.tile;
		},
	},
});

const definitions = getAllDefinitions();
const board = createBoardSlice("battle-tester", GRID_SIZE);

const renderPiece = (onClickPiece: any) => (piece: PieceModel) => {
	return (
		<PieceContextProvider value={{ piece, viewingPlayerId: "A" }}>
			<div
				style={{ width: "100%", height: "100%" }}
				onClick={() => onClickPiece(piece.id)}
			>
				<MatchPiece />
			</div>
		</PieceContextProvider>
	);
};

const makePiece = (
	id: string,
	ownerId: "A" | "B",
	definition: number,
	facingAway: boolean
) =>
	Builders.buildPieceModel({
		id,
		ownerId,
		definition: definitions[definition],
		definitionId: definitions[definition].id,
		facingAway,
	});

const boardPieces = {
	pieces: {
		["001"]: makePiece("001", "A", 1, false),
		["002"]: makePiece("002", "A", 2, false),
		["003"]: makePiece("003", "A", 3, false),
		["004"]: makePiece("004", "A", 4, false),
		["101"]: makePiece("101", "B", 9, true),
		["102"]: makePiece("102", "B", 10, true),
		["103"]: makePiece("103", "B", 11, true),
	},
	piecePositions: {
		["3,2"]: "001",
		["2,2"]: "002",
		["4,2"]: "003",
		["3,1"]: "004",
		["2,3"]: "101",
		["3,3"]: "102",
		["4,3"]: "103",
	},
	size: GRID_SIZE,
};

const makeStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		combineReducers({
			board: board.boardReducer,
			controls: controlSlice.reducer,
		}),
		applyMiddleware(sagaMiddleware)
	);

	sagaMiddleware.run(function* () {
		yield fork(
			battleSagaFactory((state: any) => state.board) as any,
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

		yield put(board.commands.setBoardPiecesCommand(boardPieces));
	});

	return store;
};

const store = makeStore();

function BattleBoard({ args }: { args: any }) {
	const dispatch = useDispatch();
	const board: BoardState<PieceModel> = useSelector(
		(state: any) => state.board
	);

	const context: GameBoardContext = {
		board,
		bench: {
			id: "",
			locked: false,
			size: { width: BENCH_SLOT_COUNT, height: 1 },
			pieces: {},
			piecePositions: {},
			pieceLimit: 0,
		},
	};

	const onClickTile = React.useCallback(
		(event: { location: GameBoardLocation }) => {
			dispatch(controlSlice.actions.setSelectedTile({ tile: event.location }));
		},
		[dispatch]
	);

	const onClickPiece = React.useCallback(
		(pieceId: string) => {
			const piecePosition = BoardSelectors.getPiecePosition(board, pieceId);

			if (!piecePosition) {
				return;
			}

			dispatch(
				controlSlice.actions.setSelectedTile({
					tile: {
						locationType: "board",
						x: piecePosition.x,
						y: piecePosition.y,
					},
				})
			);
		},
		[board]
	);

	return (
		<Provider store={store}>
			<DndProvider>
				<GameBoardContextProvider value={context}>
					<GameBoard
						renderBoardPiece={renderPiece(onClickPiece)}
						renderBenchPiece={renderPiece(onClickPiece)}
						onClick={onClickTile}
						onDropPiece={args.onDropPiece}
					/>
				</GameBoardContextProvider>
			</DndProvider>
		</Provider>
	);
}

function BattleControls() {
	const dispatch = useDispatch();

	const onClickStart = React.useCallback(
		() => dispatch(startBattle()),
		[dispatch]
	);

	const onClickReset = React.useCallback(
		() => dispatch(board.commands.setBoardPiecesCommand(boardPieces)),
		[dispatch]
	);

	return (
		<div>
			<h1>Controls</h1>
			<button onClick={onClickStart}>Start Battle</button>
			<button onClick={onClickReset}>Reset</button>

			<hr />

			<SelectedTileInfo />
		</div>
	);
}

function SelectedTileInfo() {
	const tile: { x: number; y: number } = useSelector(
		(state: any) => state.controls.selectedTile
	);
	const selectedPiece: PieceModel | null = useSelector((state: any) => {
		if (!tile) {
			return null;
		}

		return BoardSelectors.getPieceForPosition(state.board, tile.x, tile.y);
	});

	if (!tile) {
		return null;
	}

	return (
		<>
			<h2>Selected Tile</h2>

			{tile && <div>{`${tile.x}, ${tile.y}`}</div>}

			{selectedPiece && <div>{selectedPiece.definition.name}</div>}
		</>
	);
}

const Template: Story<any> = (args) => {
	return (
		<Provider store={store}>
			<div style={{ display: "flex", width: "100%", height: "100%" }}>
				<div style={{ width: "60%", height: "100%", border: "2px solid grey" }}>
					<BattleBoard args={args} />
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
