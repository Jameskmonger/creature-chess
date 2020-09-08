import { LobbyState } from "../state";
import { LobbyAction, JOIN_LOBBY, UPDATE_LOBBY_PLAYER, REQUEST_NICKNAME } from "../actions/lobbyActions";

const initialState: LobbyState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null,
    isHost: false,
    requestNicknameMessage: null
};

export function lobby(
    state: LobbyState = initialState,
    action: LobbyAction
): LobbyState {
    switch (action.type) {
        case REQUEST_NICKNAME: {
            return {
                ...state,
                requestNicknameMessage: action.payload.reason
            };
        }
        case JOIN_LOBBY:
            return {
                ...state,
                lobbyId: action.payload.lobbyId,
                localPlayerId: action.payload.localPlayerId,
                players: action.payload.players,
                isHost: action.payload.isHost,
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
