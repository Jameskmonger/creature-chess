import * as React from "react";

import { useSelector } from "react-redux";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

import { GamePage } from "./pages/game";
import { LobbyPage } from "./pages/lobby";
import { MenuPage } from "./pages/menu";
import { Region } from "./plugins";
import { AppState } from "./store";
import { useGlobalStyles } from "./styles";

/**
 * Top-level extension surface for mods that want to render persistent
 * UI without targeting an existing host region.
 */
function AppExtensionSurface() {
	return (
		<Region cls="app-extension" ctx={{}}>
			{null}
		</Region>
	);
}

export const App = withErrorBoundary(() => {
	const [error, resetError] = useErrorBoundary();

	const isInGame = useSelector((state: AppState) => state.game.ui.inGame);
	const isInLobby = useSelector((state: AppState) => state.lobby !== null);

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

	return (
		<>
			{isInGame ? <GamePage /> : isInLobby ? <LobbyPage /> : <MenuPage />}
			<AppExtensionSurface />
		</>
	);
});
