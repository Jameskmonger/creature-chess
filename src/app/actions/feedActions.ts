import { FeedMessage } from "@common/feed-message";
import { NEW_FEED_MESSAGE } from "../actiontypes/feedActionTypes";

export type FeedAction = { type: NEW_FEED_MESSAGE, payload: FeedMessage };

export const newFeedMessage = (payload: FeedMessage) => ({
    type: NEW_FEED_MESSAGE,
    payload
});
