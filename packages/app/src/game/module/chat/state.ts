import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerListPlayer, QuickChatValue } from "@creature-chess/models";

export type QuickChat = {
	id: string;
	value: QuickChatValue;
	receivedAt: number;

};
export type QuickChatAction = {
	sendingPlayerId: string;
	receivingPlayerId: string;
	chatValue: QuickChatValue | null;
};

const initialState: QuickChat[] = [];

export const { reducer, actions: commands } = createSlice({
	name: "quickChat",
	initialState,
	reducers: {
		setPlayerChat: (state, { payload: { sendingPlayerId, receivingPlayerId, chatValue } }: PayloadAction<QuickChatAction>) => {
			const existingChat = state.find(chat => chat.id === sendingPlayerId);
			if (existingChat) {
				const newState = state.filter(chat => chat.id !== existingChat.id);
				return (
					[
						...newState,
						{
							id: sendingPlayerId,
							value: chatValue,
							receivedAt: Date.now()
						}

					]
				);
			}
			return (
				[
					...state,
					{
						id: sendingPlayerId,
						value: chatValue,
						receivedAt: Date.now()

					}

				]
			);
		}
	}
});
