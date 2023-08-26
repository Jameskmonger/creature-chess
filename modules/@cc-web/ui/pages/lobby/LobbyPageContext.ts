import { createContext, useContext } from "react";

import { LobbyPlayer } from "@creature-chess/models";

type LobbyInfo = {
	players: LobbyPlayer[];
	startingAtMs: number;
};

const LobbyPageContext = createContext<LobbyInfo>(null as unknown as LobbyInfo);
LobbyPageContext.displayName = "LobbyContext";

export const LobbyPageContextProvider = LobbyPageContext.Provider;

export const useLobbyPage = () => {
	const lobbyPage = useContext(LobbyPageContext);

	if (!lobbyPage) {
		throw new Error("No valid LobbyPageContext found for useLobbyPage");
	}

	return lobbyPage;
};