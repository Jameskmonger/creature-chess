import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameConnection } from "~/networking/GameConnection";
import { LobbyConnection } from "~/networking/LobbyConnection";
import { Holder } from "~/utils/Holder";

import { AppState } from "./state";

export type ClientExtra = {
	sessionHolder: GameSessionHolder;
	gameConnectionHolder: Holder<GameConnection>;
	lobbyConnectionHolder: Holder<LobbyConnection>;
};

export type ClientStartListening = TypedStartListening<
	AppState,
	Dispatch<UnknownAction>,
	ClientExtra
>;
