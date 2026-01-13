import { getContext } from "typed-redux-saga";
import { Logger } from "winston";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { Gamemode } from "../../game";
import { Board } from "@creature-chess/board";

export type PlayerEntityDependencies = {
	logger: Logger;
	boards: {
		board: Board;
		bench: Board;
	};
	gamemode: Gamemode;
	settings: GamemodeSettings;
};

export const getPlayerEntityDependencies = () =>
	getContext<PlayerEntityDependencies>("dependencies");
