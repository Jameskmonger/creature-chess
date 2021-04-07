import { all, call } from "@redux-saga/core/effects";
import { BoardSlice } from "@creature-chess/shared";
import { findGame } from "../menu/findGame";
import { loadUserSaga } from "../menu/auth/store/saga";

export const rootSaga = function*(
    getAccessTokenSilently: () => Promise<string>,
    loginWithRedirect: () => Promise<void>,
    slices: { boardSlice: BoardSlice, benchSlice: BoardSlice }
) {
    yield all([
        call(loadUserSaga),
        call(findGame, getAccessTokenSilently, loginWithRedirect, slices)
    ]);
};
