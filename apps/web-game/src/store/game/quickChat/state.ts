import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { QuickChatOption } from "@creature-chess/models";

export type QuickChatState = {
	[playerId: string]: {
		value: QuickChatOption;
		receivedAt: number;
	};
};

const initialState: QuickChatState = {};

export const { reducer: quickChatReducer, actions: QuickChatCommands } =
	createSlice({
		name: "quickChat",
		initialState,
		reducers: {
			setPlayerChat: (
				state,
				{
					payload: { sendingPlayerId, chatValue },
				}: PayloadAction<{
					sendingPlayerId: string;
					chatValue: QuickChatOption;
				}>
			) => ({
				...state,
				[sendingPlayerId]: { value: chatValue, receivedAt: Date.now() },
			}),
			clearPlayerChat: (
				state,
				{
					payload: { sendingPlayerId },
				}: PayloadAction<{ sendingPlayerId: string }>
			) => {
				const next = { ...state };
				delete next[sendingPlayerId];
				return next;
			},
		},
	});
