import { Action } from "redux";

import { Board } from "@creature-chess/board";
import { PlayerState } from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

export type PreparingPhaseContext = {
	board: Board;
	bench: Board;
	pieceRegistry: PieceRegistry;
	state: PlayerState;
	settings: GamemodeSettings;
	/** Uniform `[0, 1)`. Use this instead of `Math.random` for reproducible runs. */
	rng: () => number;
};

export type BotImplementation = {
	onGameStart?: (playerId: string) => void;
	/** Return `null` to ready up. */
	decidePreparingAction: (ctx: PreparingPhaseContext) => Action | null;
};

export type SetupBotLogicOptions = {
	/** Defaults to 200. */
	actionBudget?: number;
	/** Defaults to `Math.random`. */
	rng?: () => number;
};
