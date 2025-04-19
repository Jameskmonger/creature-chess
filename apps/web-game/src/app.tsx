import * as React from "react";

import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

import { useLocalPlayer } from "./auth/context";
import { useOpenConnection } from "./networking/hooks";
import { GamePage } from "./pages/game";
import { LobbyPage } from "./pages/lobby";
import { MenuPage } from "./pages/menu";
import { AppState } from "./store";
import { useGlobalStyles } from "./styles";

ReactModal.setAppElement("#approot");

export const App = withErrorBoundary(() => {
	const [error, resetError] = useErrorBoundary();

	const isInGame = useSelector((state: AppState) => state.game.ui.inGame);
	const isInLobby = useSelector((state: AppState) => state.lobby !== null);

	const localPlayer = useLocalPlayer();
	useOpenConnection(localPlayer);

	useGlobalStyles();

	if (error) {
		return (
			<div>
				<p>{(error as Error).message}</p>

				<p>{(error as Error).stack}</p>

				<button onClick={() => window.location.reload()}>Try again</button>
			</div>
		);
	}

	if (isInGame) {
		return <GamePage />;
	}

	if (isInLobby) {
		return <LobbyPage />;
	}

	return <MenuPage />;
});
