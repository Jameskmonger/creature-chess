import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";
import { GameBoardState } from "~/components/game/board/state";

import { AppState } from "./state";

export type ClientExtra = {
	slices: GameBoardState;
};

export type ClientStartListening = TypedStartListening<
	AppState,
	Dispatch<UnknownAction>,
	ClientExtra
>;
