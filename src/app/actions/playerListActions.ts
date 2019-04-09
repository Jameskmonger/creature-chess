import { PlayerListPlayer } from "@common";
import { PLAYER_LIST_UPDATED } from "../actiontypes/playerListActionTypes";

export type PlayerListAction = ({ type: PLAYER_LIST_UPDATED, payload: PlayerListPlayer[] });

export const playerListUpdated = (payload: PlayerListPlayer[]) => { console.log(payload); return ({
    type: PLAYER_LIST_UPDATED,
    payload
}) };
