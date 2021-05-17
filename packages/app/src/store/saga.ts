import { all, call } from "redux-saga/effects";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { findGame } from "../networking";
import { gameSaga } from "../game";

export const rootSaga = function*(
	getAccessTokenSilently: () => Promise<string>,
	loginWithRedirect: () => Promise<void>,
	slices: { boardSlice: BoardSlice<PieceModel>; benchSlice: BoardSlice<PieceModel> }
) {
	yield all([
		call(findGame, { getAccessTokenSilently, loginWithRedirect }, slices),
		call(gameSaga, slices)
	]);
};
