import { LobbyState } from "./state";
import { LobbyAction, JOIN_LOBBY, UPDATE_LOBBY_PLAYER } from "./actions";

const initialState: LobbyState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null
};

export function reducer(
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
                startingAtMs: action.payload.startTimestamp
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