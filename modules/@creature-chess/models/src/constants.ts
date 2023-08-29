import { GamePhase } from "./game-phase";

export const APP_BASE_URL = process.env.CREATURE_CHESS_APP_URL as string;
export const IMAGE_BASE_URL = process.env.CREATURE_CHESS_IMAGE_URL as string;

if (!APP_BASE_URL) {
	throw new Error("No APP_BASE_URL set");
}

export const PHASE_LENGTHS = {
	[GamePhase.PREPARING]: 40,
	[GamePhase.READY]: 3,
	[GamePhase.PLAYING]: 35,
};
export const REROLL_COST = 2;
export const STARTING_MONEY = 3;
export const STARTING_LEVEL = 1;
export const STARTING_HEALTH = 100;
export const MAX_PLAYER_LEVEL = 10;
export const HEALTH_LOST_PER_PIECE = 3;

export const BUY_XP_COST = 5;
export const BUY_XP_AMOUNT = 4;

export const PIECES_TO_EVOLVE = 3;

export const DEFAULT_TURN_COUNT = 300;
export const DEFAULT_TURN_DURATION = 100;
export const MAX_NAME_LENGTH = 16;

export const MAX_PLAYERS_IN_GAME = 8;
export const LOBBY_WAIT_TIME = 30;

export const AVAILABLE_PROFILE_PICTURES = {
	1: "Budaye",
	4: "Aardorn",
	5: "Nut",
	7: "Embra",
	8: "Tweesher",
};
export const PIECES_FOR_STAGE = [1, 3, 9];
