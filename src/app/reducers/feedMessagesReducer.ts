import { FeedAction } from "../actions/feedActions";
import { FeedMessage } from "@common/feed-message";
import { NEW_FEED_MESSAGE } from "../actiontypes/feedActionTypes";
import { ChatMessageAction } from "../actions/chatActions";

export const feedMessages = (state: FeedMessage[] = [], action: FeedAction | ChatMessageAction) => {
    switch (action.type) {
        case NEW_FEED_MESSAGE:
            return [action.payload, ...state];
        default:
            return state;
    }
};
