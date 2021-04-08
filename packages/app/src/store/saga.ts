import { all, call } from "@redux-saga/core/effects";
import { BoardSlice } from "@creature-chess/board";
import { findGame } from "../menu/findGame";
import { loadUserSaga } from "../menu/auth/store/saga";
import { PieceModel } from "@creature-chess/models";

export const rootSaga = function*(
    getAccessTokenSilently: () => Promise<string>,
    loginWithRedirect: () => Promise<void>,
    slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
    yield all([
        call(loadUserSaga),
        call(findGame, getAccessTokenSilently, loginWithRedirect, slices)
    ]);
};
