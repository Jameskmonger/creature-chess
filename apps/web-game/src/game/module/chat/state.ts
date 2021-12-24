import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuickChatOption } from "@creature-chess/models";

export type QuickChat = {
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

const initialState: QuickChat = {};

export const { reducer, actions: commands } = createSlice({
	name: "quickChat",
	initialState,
	reducers: {
		setPlayerChat: (state, { payload: {
			sendingPlayerId,
			chatValue
		} }: PayloadAction<QuickChatAction>) => ({
			...state,
			[sendingPlayerId]: {
				value: chatValue,
				receivedAt: Date.now()
			}
		}),
		clearPlayerChat: (state, { payload: { sendingPlayerId } }: PayloadAction<ClearQuickChatAction>) => {
			const newState = { ...state };

			delete newState[sendingPlayerId];

			return newState;
		}
	}
});
