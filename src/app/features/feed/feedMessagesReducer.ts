import { FeedAction } from "./feedActions";
import { FeedMessage } from "@common/models/feed-message";
import { NEW_FEED_MESSAGE } from "./feedActionTypes";

export const feedMessages = (state: FeedMessage[] = [], action: FeedAction) => {
    switch (action.type) {
        case NEW_FEED_MESSAGE:
            return [action.payload, ...state];
        default:
            return state;
    }
};
