import { SEND_CHAT_MESSAGE } from "../actiontypes/chatActionTypes";

export type ChatMessageAction = { type: SEND_CHAT_MESSAGE, payload: { message: string } };

export const sendChatMessage = (message: string) => ({
    type: SEND_CHAT_MESSAGE,
    payload: {
        message
    }
});
