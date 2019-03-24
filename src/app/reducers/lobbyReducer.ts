import { LobbyState } from "../store/store";
import { LobbyAction } from "../actions/lobbyActions";
import { JOIN_GAME } from "../actiontypes/lobbyActionTypes";

export function lobby(state: LobbyState = { inLobby: true }, action: LobbyAction) {
    switch (action.type) {
        case JOIN_GAME:
            return {
                inLobby: false
            };
        default:
            return state;
    }
}
