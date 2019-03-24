import { LobbyState } from "../store/store";
import { LobbyAction } from "../actions/lobbyAction";
import { JOIN_LOBBY, JOIN_LOBBY_SUCCESS } from "../actiontypes/lobbyActionTypes";

export function lobby(state: LobbyState = { loading: false, inLobby: true }, action: LobbyAction) {
    switch (action.type) {
        case JOIN_LOBBY:
            return {
                ...state,
                loading: true
            };
        case JOIN_LOBBY_SUCCESS: {
            return {
                loading: false,
                inLobby: true
            };
        }
        default:
            return state;
    }
}
