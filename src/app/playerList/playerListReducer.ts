import { PlayerListPlayer } from "@common/models";
import { PlayerListAction } from "./playerListActions";
import { PLAYER_LIST_UPDATED } from "./playerListActionTypes";

export function playerList(state: PlayerListPlayer[] = [], action: PlayerListAction) {
    switch (action.type) {
        case PLAYER_LIST_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
