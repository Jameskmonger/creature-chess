import { FeedAction } from "./feedActions";
import { FeedMessage, FeedMessageType } from "@common/models/feed-message";
import { NEW_FEED_MESSAGE } from "./feedActionTypes";
import { GamePhaseUpdateAction } from "../../store/actions/gameActions";
import { GAME_PHASE_UPDATE } from "../../store/actiontypes/gameActionTypes";
import { GamePhase } from "@common/models";

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
