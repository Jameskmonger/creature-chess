import { createAction } from "@reduxjs/toolkit";

import { GamemodeSettings } from "@creature-chess/models/settings";

export type LobbyStartNowEvent = ReturnType<typeof lobbyStartNowEvent>;
export const lobbyStartNowEvent = createAction("lobbyStartNowEvent");

export type LobbyUpdateSettingEvent = ReturnType<
	typeof lobbyUpdateSettingEvent
>;
export const lobbyUpdateSettingEvent = createAction<{
	key: keyof GamemodeSettings;
	value: string;
}>("lobbyUpdateSettingEvent");
