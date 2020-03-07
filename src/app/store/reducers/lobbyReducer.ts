import { LobbyState } from "../state";
import { LobbyAction } from "../actions/lobbyActions";
import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER, UPDATE_LOBBY_SECONDS_REMAINING } from "../actiontypes/lobbyActionTypes";

const initialState: LobbyState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    secondsRemaining: null,
    isHost: false
};

export function lobby(
    state: LobbyState = initialState,
    action: LobbyAction
): LobbyState {
    switch (action.type) {
        case JOIN_LOBBY:
            return {
                ...state,
                lobbyId: action.payload.lobbyId,
                localPlayerId: action.payload.localPlayerId,
                players: action.payload.players,
                isHost: action.payload.isHost
            };
        case UPDATE_LOBBY_SECONDS_REMAINING:
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining
            };
        case UPDATE_LOBBY_PLAYER:
            const cloned = {
                ...state,
                players: [
                    ...state.players
                ]
            };

            cloned.players[action.payload.index] = action.payload.player;

            return cloned;
        default:
            return state;
    }
}
