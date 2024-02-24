import { call } from "redux-saga/effects";

import { BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { networkingSaga } from "../networking";

export const rootSaga = function* (slices: {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
}) {
	yield call(networkingSaga, slices);
};
