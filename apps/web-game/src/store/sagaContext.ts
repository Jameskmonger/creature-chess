import { getContext } from "typed-redux-saga";

import { BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

type Slices = {
	board: BoardSlice<PieceModel>;
	bench: BoardSlice<PieceModel>;
};

export type SagaContext = {
	slices: Slices;
};

export const getPlayerSlices = () => getContext<Slices>("slices");
