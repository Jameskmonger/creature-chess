import { fork } from "@redux-saga/core/effects";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { findGame } from "../menu/findGame";
import { loadUserSaga } from "../menu/auth/store/saga";
import { gameSaga } from "../game";

export const rootSaga = function*(
    getAccessTokenSilently: () => Promise<string>,
    loginWithRedirect: () => Promise<void>,
    slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
    yield fork(loadUserSaga);
    yield fork(findGame, { getAccessTokenSilently, loginWithRedirect }, slices);
    yield fork(gameSaga, slices);
};
