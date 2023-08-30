export const APP_BASE_URL = process.env.CREATURE_CHESS_APP_URL as string;
export const IMAGE_BASE_URL = process.env.CREATURE_CHESS_IMAGE_URL as string;

if (!APP_BASE_URL) {
	throw new Error("No APP_BASE_URL set");
}

export const MAX_PLAYERS_IN_GAME = 8;
export const LOBBY_WAIT_TIME = 30;
