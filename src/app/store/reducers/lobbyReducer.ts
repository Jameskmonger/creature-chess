import { LobbyState } from "../state";
import { LobbyAction } from '../actions/lobbyActions';
import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER } from '../actiontypes/lobbyActionTypes';

const initialState: LobbyState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    secondsRemaining: 30
};

export function lobby(
    state: LobbyState = initialState,
    action: LobbyAction
): LobbyState {
    switch (action.type) {
        case JOIN_LOBBY:
            return {
                lobbyId: action.payload.lobbyId,
                localPlayerId: action.payload.localPlayerId,
                players: action.payload.players,
                secondsRemaining: (action.payload.startTimestamp - Date.now()) / 1000
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
};