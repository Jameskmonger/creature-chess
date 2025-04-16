import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { BoardState, createBoardSlice, PiecePosition } from "@shoki/board";

import { PieceCombatState, PieceInfoStore } from "@creature-chess/battle";
import { getAllDefinitions } from "@creature-chess/gamemode";
import { PieceModel, TileCoordinates } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

export type BattleTesterState = {
	currentTurn: number;
	controls: {
		selectedTile: {
			x: number;
			y: number;
		} | null;
		pathfinder: {
			enabled: boolean;
			start: TileCoordinates | null;
			end: TileCoordinates | null;
			path: PiecePosition[] | null;
			otherPaths: PiecePosition[][];
		};
	};
	board: BoardState<PieceModel>;
	combatStore: PieceInfoStore<PieceCombatState> | null;
};

const initialState: BattleTesterState["controls"] = {
	selectedTile: null,
	pathfinder: {
		enabled: false,
		start: null,
		end: null,
		path: null,
		otherPaths: [],
	},
};

export const useAppSelector = <TValue>(
	selector: (state: BattleTesterState) => TValue
) => useSelector<BattleTesterState, TValue>(selector);

export const controlSlice = createSlice({
	name: "controls",
	initialState,
	reducers: {
		setSelectedTile: (
			state,
			action: PayloadAction<{ tile: { x: number; y: number } }>
		) => {
			state.selectedTile = action.payload.tile;
		},
		enablePathfinder: (state) => {
			state.pathfinder.enabled = true;
			state.pathfinder.start = null;
			state.pathfinder.end = null;
			state.pathfinder.path = null;
			state.pathfinder.otherPaths = [];
		},
		disablePathfinder: (state) => {
			state.pathfinder.enabled = false;
			state.pathfinder.start = null;
			state.pathfinder.end = null;
			state.pathfinder.path = null;
			state.pathfinder.otherPaths = [];
		},
		setPathfinderStart: (
			state,
			action: PayloadAction<{ start: TileCoordinates }>
		) => {
			state.pathfinder.end = null;
			state.pathfinder.path = null;
			state.pathfinder.otherPaths = [];
			state.pathfinder.start = action.payload.start;
		},
		setPathfinderEnd: (
			state,
			action: PayloadAction<{ end: TileCoordinates | null }>
		) => {
			state.pathfinder.end = action.payload.end;
		},
		setPathfinderPath: (
			state,
			action: PayloadAction<{
				path: PiecePosition[] | null;
				otherPaths?: PiecePosition[][];
			}>
		) => {
			state.pathfinder.path = action.payload.path;
			state.pathfinder.otherPaths = action.payload.otherPaths || [];
		},
	},
});

export const board = createBoardSlice<PieceModel>("battle-tester", {
	width: GamemodeSettingsPresets["default"].boardWidth,
	height: GamemodeSettingsPresets["default"].boardHalfHeight * 2,
});

export const definitions = getAllDefinitions();
