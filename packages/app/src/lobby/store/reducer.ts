import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyPlayer } from "@creature-chess/models";
import { LobbyState } from "./state";
import { LobbyConnectedEventPayload } from "../../networking/actions";

const initialState: LobbyState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null
};

export const { reducer, actions: lobbyCommands } = createSlice({
    name: "lobby",
    initialState,
    reducers: {
        setLobbyDetailsCommand: (state, action: PayloadAction<LobbyConnectedEventPayload>) => ({
            ...state,
            lobbyId: action.payload.lobbyId,
            localPlayerId: action.payload.localPlayerId,
            players: action.payload.players,
            startingAtMs: action.payload.startTimestamp
        }),
        updateLobbyPlayerCommand: (state: LobbyState, action: PayloadAction<{ index: number, player: LobbyPlayer }>) => {
            const cloned = {
                ...state,
                players: [
                    ...state.players
                ]
            };

            cloned.players[action.payload.index] = action.payload.player;

            return cloned;
        }
    }
})
