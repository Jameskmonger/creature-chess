import { Logger } from "winston";

import { EntityExtra, EntityListenerApi, EntityStartListening } from "../entity";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { Gamemode } from "../../game";
import { Board } from "@creature-chess/board";
import { PlayerState } from "./state";
import { PlayerVariables } from "./variables";

export type PlayerEntityDependencies = {
	logger: Logger;
	boards: {
		board: Board;
		bench: Board;
	};
	gamemode: Gamemode;
	settings: GamemodeSettings;
};

export type PlayerExtra = EntityExtra<PlayerEntityDependencies, PlayerVariables>;
export type PlayerStartListening = EntityStartListening<PlayerState, PlayerEntityDependencies, PlayerVariables>;
export type PlayerListenerApi = EntityListenerApi<PlayerState, PlayerEntityDependencies, PlayerVariables>;
