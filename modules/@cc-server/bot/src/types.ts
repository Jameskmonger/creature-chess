import { Board } from "@creature-chess/board";
import { Player } from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

export type BotAction = { type: string; payload?: unknown };

export type PreparingPhaseContext = {
	board: Board;
	bench: Board;
	pieceRegistry: ReadablePieceRegistry;
	player: Player;
	settings: GamemodeSettings;
	/** Uniform `[0, 1)`. Use this instead of `Math.random` for reproducible runs. */
	rng: () => number;
};

export type BotImplementation = {
	onGameStart?: (playerId: string) => void;
	/** Return `null` to ready up. */
	decidePreparingAction: (ctx: PreparingPhaseContext) => BotAction | null;
};

export type SetupBotLogicOptions = {
	/** Defaults to 200. */
	actionBudget?: number;
	/** Defaults to `Math.random`. */
	rng?: () => number;
};
