import * as React from "react";

import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

import { AUTH0_ENABLED } from "@creature-chess/auth-web/auth0/config";
import {
	LobbyPageContextProvider,
	LobbyPage,
	useGlobalStyles,
} from "@creature-chess/ui";

import { Loading } from "./display/loading";
import { GamePage } from "./game";
import { openConnection } from "./networking";
import { AppState } from "./store";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAuth0 = AUTH0_ENABLED ? require("@auth0/auth0-react").useAuth0 : null;

ReactModal.setAppElement("#approot");

function useIsGuestRequest() {
	const query = new URLSearchParams(window.location.search);

	return query.get("guest") === "true";
}

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

function useOpenGuestConnection() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		const open = async () => {
			try {
				dispatch(openConnection({ type: "guest" }));
			} catch (e) {
				console.log({ error: e });
			}
		};

		open();
	}, [dispatch]);
}

function useOpenConnection() {
	if (useIsGuestRequest()) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useOpenGuestConnection();
	}

	if (useAuth0) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useOpenAuth0Connection();
	}

	throw new Error("No connection method available");
}

export const App = withErrorBoundary(() => {
	const [error, resetError] = useErrorBoundary();

	const lobbyInfo = useSelector((state: AppState) => state.lobby);
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

	if (lobbyInfo) {
		return (
			<LobbyPageContextProvider value={lobbyInfo}>
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
