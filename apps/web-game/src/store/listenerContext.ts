import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameConnection } from "~/networking/GameConnection";
import { LobbyConnection } from "~/networking/LobbyConnection";
import { SocketManager } from "~/networking/SocketManager";
import { Holder } from "~/utils/Holder";

import { AppState } from "./state";

export type ClientExtra = {
	sessionHolder: GameSessionHolder;
	gameConnectionHolder: Holder<GameConnection>;
	lobbyConnectionHolder: Holder<LobbyConnection>;
	accountIdHolder: Holder<string>;
	socketManagerHolder: Holder<SocketManager>;
};

export type ClientStartListening = TypedStartListening<
	AppState,
	Dispatch<UnknownAction>,
	ClientExtra
>;
