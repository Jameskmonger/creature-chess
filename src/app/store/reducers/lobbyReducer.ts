import { LobbyState } from "../state";
import { LobbyAction } from '../actions/lobbyActions';
import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER } from '../actiontypes/lobbyActionTypes';

const initialState: LobbyState = {
    lobbyId: null,
    localPlayerId: null,
    players: []
};

export function lobby(
    state: LobbyState = initialState,
    action: LobbyAction
) {
    switch (action.type) {
        case JOIN_LOBBY:
            return action.payload;
        case UPDATE_LOBBY_PLAYER:
            const cloned = {
                ...state,
                players: [
                    ...state.players
                ]
            };

            cloned.players[action.payload.index] = action.payload.player;

            return cloned;
    }
};