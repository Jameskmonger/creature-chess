import { useSyncExternalStore } from "react";

import { GameConnection } from "./GameConnection";
import { LobbyConnection } from "./LobbyConnection";

let lobbyConnection: LobbyConnection | null = null;
let gameConnection: GameConnection | null = null;
const listeners = new Set<() => void>();

function notify() {
	for (const listener of listeners) {
		listener();
	}
}

function subscribe(callback: () => void) {
	listeners.add(callback);
	return () => listeners.delete(callback);
}

export function setLobbyConnectionRef(conn: LobbyConnection | null) {
	lobbyConnection = conn;
	notify();
}

export function setGameConnectionRef(conn: GameConnection | null) {
	gameConnection = conn;
	notify();
}

export function getGameConnectionRef(): GameConnection | null {
	return gameConnection;
}

const getLobbySnapshot = () => lobbyConnection;
const getGameSnapshot = () => gameConnection;

export function useLobbyConnection(): LobbyConnection | null {
	return useSyncExternalStore(subscribe, getLobbySnapshot);
}

export function useGameConnectionRef(): GameConnection | null {
	return useSyncExternalStore(subscribe, getGameSnapshot);
}
