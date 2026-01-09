import { getContext } from "typed-redux-saga";
import { Logger } from "winston";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { Gamemode } from "../../game";
import { Board } from "@creature-chess/board";

type PlayerBoardSlices = {
	boardSlice: Board;
	benchSlice: Board;
};

export type PlayerEntityDependencies = {
	logger: Logger;
	boardSlices: PlayerBoardSlices;
	gamemode: Gamemode;
	settings: GamemodeSettings;
};

export const getPlayerEntityDependencies = () =>
	getContext<PlayerEntityDependencies>("dependencies");
