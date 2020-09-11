import { LobbyPlayer } from "@creature-chess/models";

export const JOIN_LOBBY = "JOIN_LOBBY";
export type JOIN_LOBBY = typeof JOIN_LOBBY;

export const UPDATE_LOBBY_PLAYER = "UPDATE_LOBBY_PLAYER";
export type UPDATE_LOBBY_PLAYER = typeof UPDATE_LOBBY_PLAYER;

export const START_LOBBY_GAME = "START_LOBBY_GAME";
export type START_LOBBY_GAME = typeof START_LOBBY_GAME;

export const REQUEST_NICKNAME = "REQUEST_NICKNAME";
export type REQUEST_NICKNAME = typeof REQUEST_NICKNAME;
export const NICKNAME_CHOSEN = "NICKNAME_CHOSEN";
export type NICKNAME_CHOSEN = typeof NICKNAME_CHOSEN;

export type JoinLobbyAction = ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId: string;
        lobbyId: string;
        players: LobbyPlayer[];
        startTimestamp: number;
        isHost: boolean;
    }
});

export type UpdateLobbyPlayerAction = ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index: number;
        player: LobbyPlayer;
    }
});

export type StartLobbyGameAction = ({ type: START_LOBBY_GAME });

export type RequestNicknameAction = ({ type: REQUEST_NICKNAME, payload: { reason: string } });
export type NicknameChosenAction = ({ type: NICKNAME_CHOSEN, payload: { nickname: string } });

export type LobbyAction = JoinLobbyAction
    | UpdateLobbyPlayerAction
    | StartLobbyGameAction
    | RequestNicknameAction
    | NicknameChosenAction;

export const joinLobbyAction = (localPlayerId: string, lobbyId: string, players: LobbyPlayer[], startTimestamp: number, isHost: boolean): JoinLobbyAction => ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId,
        lobbyId,
        players,
        startTimestamp,
        isHost
    }
});

export const updateLobbyPlayerAction = (index: number, player: LobbyPlayer): UpdateLobbyPlayerAction => ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index,
        player
    }
});

export const startLobbyGame = () => ({ type: START_LOBBY_GAME });

export const requestNickname = (reason: string): RequestNicknameAction => ({ type: REQUEST_NICKNAME, payload: { reason }});
export const nicknameChosen = (nickname: string): NicknameChosenAction => ({ type: NICKNAME_CHOSEN, payload: { nickname }});
