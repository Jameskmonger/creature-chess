export const LOBBY_GAME_STARTED_EVENT = "LOBBY_GAME_STARTED_EVENT";
export type LOBBY_GAME_STARTED_EVENT = typeof LOBBY_GAME_STARTED_EVENT;

export type LobbyGameStartedEvent = { type: LOBBY_GAME_STARTED_EVENT };

export const lobbyGameStartedEvent = (): LobbyGameStartedEvent => ({ type: LOBBY_GAME_STARTED_EVENT });
