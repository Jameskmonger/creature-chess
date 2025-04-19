import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { QuickChatOption } from "@creature-chess/models";

export type QuickChatState = {
	[id: string]: {
		value: QuickChatOption;
		receivedAt: number;
	};
};

export type QuickChatAction = {
	sendingPlayerId: string;
	chatValue: QuickChatOption;
};

export type ClearQuickChatAction = {
	sendingPlayerId: string;
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
				}: PayloadAction<QuickChatAction>
			) => ({
				...state,
				[sendingPlayerId]: {
					value: chatValue,
					receivedAt: Date.now(),
				},
			}),
			clearPlayerChat: (
				state,
				{ payload: { sendingPlayerId } }: PayloadAction<ClearQuickChatAction>
			) => {
				const newState = { ...state };

				delete newState[sendingPlayerId];

				return newState;
			},
		},
	});
