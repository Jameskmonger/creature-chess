import { FeedAction } from "../actions/feedActions";
import { FeedMessage } from "@common/feed-message";
import { NEW_FEED_MESSAGE } from "../actiontypes/feedActionTypes";
import { ChatMessageAction } from "../actions/chatActions";
import { SEND_CHAT_MESSAGE } from "../actiontypes/chatActionTypes";
import uuid = require("uuid");

export const feedMessages = (state: FeedMessage[] = [], action: FeedAction | ChatMessageAction) => {
    switch (action.type) {
        case NEW_FEED_MESSAGE:
            return [action.payload, ...state];
        case SEND_CHAT_MESSAGE:
            return [{ id: uuid(), text: action.payload.message }, ...state];
        default:
            return state;
    }
};
