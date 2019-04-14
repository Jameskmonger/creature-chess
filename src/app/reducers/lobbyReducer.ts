import { LobbyState } from "../store/store";
import { LobbyAction } from "../actions/lobbyActions";
import { JOIN_GAME, JOIN_COMPLETE } from "../actiontypes/lobbyActionTypes";

export function lobby(state: LobbyState = { loading: false, inLobby: true }, action: LobbyAction) {
    switch (action.type) {
        case JOIN_GAME:
            return {
                ...state,
                loading: true
            };
        case JOIN_COMPLETE:
            return {
                ...state,
                inLobby: false
            };
        default:
            return state;
    }
}
