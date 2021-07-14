import { getContext } from "typed-redux-saga";
import { BoardSlice } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";

type Slices = {
	board: BoardSlice<PieceModel>;
	bench: BoardSlice<PieceModel>;
};

type AuthContext = {
	getAccessTokenSilently: () => Promise<string>;
	loginWithRedirect: () => Promise<void>;
};

export type SagaContext = {
	slices: Slices;
	auth: AuthContext;
};

export const getPlayerSlices = () => getContext<Slices>("slices");
export const getAuth = () => getContext<AuthContext>("auth");
