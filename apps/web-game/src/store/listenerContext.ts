import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";
import { GameSessionHolder } from "~/game/GameSessionHolder";

import { AppState } from "./state";

export type ClientExtra = {
	sessionHolder: GameSessionHolder;
};

export type ClientStartListening = TypedStartListening<
	AppState,
	Dispatch<UnknownAction>,
	ClientExtra
>;
