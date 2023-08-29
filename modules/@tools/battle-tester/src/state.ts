import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { BoardState, createBoardSlice } from "@shoki/board";

import { PieceCombatState, PieceInfoStore } from "@creature-chess/battle";
import { getAllDefinitions } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

export type BattleTesterState = {
	currentTurn: number;
	controls: {
		selectedTile: {
			x: number;
			y: number;
		} | null;
	};
	board: BoardState<PieceModel>;
	combatStore: PieceInfoStore<PieceCombatState> | null;
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

export const board = createBoardSlice<PieceModel>("battle-tester", DEFAULT_GAME_OPTIONS.boardSize);

export const definitions = getAllDefinitions();
