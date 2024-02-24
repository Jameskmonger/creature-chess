import * as React from "react";

import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { AUTH0_ENABLED } from "@cc-web/auth/auth0/config";
import { useLocalPlayer } from "@cc-web/auth/context";
import {
	LobbyPageContextProvider,
	LobbyPage,
	useGlobalStyles,
} from "@cc-web/ui";

import { lobbyStartNowEvent, lobbyUpdateSettingEvent } from "../lobby/actions";
import { Loading } from "./display/loading";
import { GamePage } from "./game";
import { openConnection } from "./networking";
import { AppState } from "./store";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAuth0 = AUTH0_ENABLED ? require("@auth0/auth0-react").useAuth0 : null;

ReactModal.setAppElement("#approot");

function useOpenAuth0Connection() {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	React.useEffect(() => {
		const open = async () => {
			try {
				const accessToken = await getAccessTokenSilently();
				dispatch(openConnection({ type: "auth0", data: { accessToken } }));
			} catch (e) {
				console.log({ error: e });
			}
		};

		open();
	}, [isAuthenticated, getAccessTokenSilently, dispatch]);
}

/**
 * Hook to read a cookie value
 *
 * TODO move this
 */
function useCookie(cookieName: string) {
	const [cookie, setCookie] = React.useState(() => getCookieValue(cookieName));

	React.useEffect(() => {
		function handleCookieChange() {
			setCookie(getCookieValue(cookieName));
		}

		window.addEventListener("cookieChange", handleCookieChange);
		return () => {
			window.removeEventListener("cookieChange", handleCookieChange);
		};
	}, [cookieName]);

	return cookie;
}

function getCookieValue(name: string) {
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");
	if (parts.length === 2) {
		return parts.pop()!.split(";").shift();
	}

	return null;
}

function useOpenGuestConnection() {
	const dispatch = useDispatch();

	// read cookie "guest-token"
	const cookie = useCookie("guest-token");

	React.useEffect(() => {
		if (!cookie) {
			console.error("tries to open guest connection without cookie");
			return;
		}

		const open = async () => {
			try {
				dispatch(
					openConnection({ type: "guest", data: { accessToken: cookie } })
				);
			} catch (e) {
				console.log({ error: e });
			}
		};

		open();
	}, [cookie, dispatch]);
}

function useOpenConnection() {
	const localPlayer = useLocalPlayer();

	if (!localPlayer) {
		return <span>Loading</span>;
	}

	if (localPlayer.type === "guest") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useOpenGuestConnection();
	}

	if (localPlayer.type === "user" && useAuth0) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useOpenAuth0Connection();
	}

	throw new Error("No connection method available");
}

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

	useOpenConnection();

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
