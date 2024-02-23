import { createAction } from "@reduxjs/toolkit";

export type LobbyStartNowEvent = ReturnType<typeof lobbyStartNowEvent>;
export const lobbyStartNowEvent = createAction("lobbyStartNowEvent");
