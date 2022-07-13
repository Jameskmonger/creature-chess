import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { BoardState, createBoardSlice } from "@shoki/board";

import { getAllDefinitions } from "@creature-chess/gamemode";
import { GRID_SIZE, PieceModel } from "@creature-chess/models";

export type BattleTesterState = {
	controls: {
		selectedTile: {
			x: number;
			y: number;
		} | null;
	};
	board: BoardState<PieceModel>;
};

export const useAppSelector = <TValue>(
	selector: (state: BattleTesterState) => TValue
) => useSelector<BattleTesterState, TValue>(selector);

export const controlSlice = createSlice({
	name: "controls",
	initialState: {
		selectedTile: null as { x: number; y: number } | null,
	},
	reducers: {
		setSelectedTile: (
			state,
			action: PayloadAction<{ tile: { x: number; y: number } }>
		) => {
			state.selectedTile = action.payload.tile;
		},
	},
});

export const board = createBoardSlice<PieceModel>("battle-tester", GRID_SIZE);

export const definitions = getAllDefinitions();
