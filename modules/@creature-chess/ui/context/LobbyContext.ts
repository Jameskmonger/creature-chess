import { LobbyPlayer } from "@creature-chess/models";
import { createContext, useContext } from "react";

export type LobbyInfo = {
	players: LobbyPlayer[];
	startingAtMs: number;
};

const LobbyContext = createContext<LobbyInfo>(null as unknown as LobbyInfo);
LobbyContext.displayName = "LobbyContext";

export const LobbyContextProvider = LobbyContext.Provider;

export const useLobby = () => {
	const lobby = useContext(LobbyContext);

	if (!lobby) {
		throw new Error("No valid LobbyContext found for useLobby");
	}

	return lobby;
};
