import * as React from "react";

import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { useLocalPlayer } from "@cc-web/auth/context";
import {
	LobbyPageContextProvider,
	LobbyPage,
	useGlobalStyles,
} from "@cc-web/ui";

import { Loading } from "./components/loading";
import { useOpenConnection } from "./networking/hooks";
import { GamePage } from "./pages/game";
import { AppState } from "./store";
import {
	lobbyStartNowEvent,
	lobbyUpdateSettingEvent,
} from "./store/lobby/actions";

ReactModal.setAppElement("#approot");

/**
 * Set up the lobby context
 *
 * TODO (jkm) refactor this, it contains too much
 */
function useLobbyContext() {
	const dispatch = useDispatch();
	const lobbyInfo = useSelector((state: AppState) => state.lobby);

	const onStartNow = React.useCallback(() => {
		dispatch(lobbyStartNowEvent());
	}, [dispatch]);

	const onUpdateSetting = React.useCallback(
		(key: keyof GamemodeSettings, value: string) => {
			dispatch(lobbyUpdateSettingEvent({ key, value }));
		},
		[dispatch]
	);

	return React.useMemo(() => {
		if (!lobbyInfo) {
			return null;
		}

		return {
			players: lobbyInfo.players,
			startingAtMs: lobbyInfo.startingAtMs,
			maxPlayers: lobbyInfo.maxPlayers,
			lobbyWaitTimeSeconds: lobbyInfo.lobbyWaitTimeSeconds,
			settings: lobbyInfo.settings,
			onStartNow,
			onUpdateSetting,
		};
	}, [lobbyInfo, onStartNow, onUpdateSetting]);
}

export const App = withErrorBoundary(() => {
	const [error, resetError] = useErrorBoundary();

	const lobbyContext = useLobbyContext();
	const isInGame = useSelector((state: AppState) => state.game.ui.inGame);

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

	if (lobbyContext) {
		return (
			<LobbyPageContextProvider value={lobbyContext}>
				<LobbyPage />
			</LobbyPageContextProvider>
		);
	}

	return (
		<>
			<Loading />
		</>
	);
});
