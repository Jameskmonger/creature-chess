import { FeedAction } from "../actions/feedActions";
import { FeedMessage, FeedMessageType } from "@common/feed-message";
import { NEW_FEED_MESSAGE } from "../actiontypes/feedActionTypes";
import { GamePhaseUpdateAction } from "../actions/gameActions";
import { GAME_PHASE_UPDATE } from "../actiontypes/gameActionTypes";
import { GamePhase } from "../../shared";

export const feedMessages = (state: FeedMessage[] = [], action: FeedAction | GamePhaseUpdateAction) => {
    switch (action.type) {
        case NEW_FEED_MESSAGE:
            return [action.payload, ...state];
        case GAME_PHASE_UPDATE:
            if (action.payload.phase !== GamePhase.READY) {
                return state;
            }

            return state.filter(m => m.type !== FeedMessageType.BATTLE);
        default:
            return state;
    }
};
