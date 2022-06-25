import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import {
	LobbyPageContextProvider,
	LobbyPage,
	useGlobalStyles,
} from "@creature-chess/ui";

import { Loading } from "./display/loading";
import { GamePage } from "./game";
import { openConnection } from "./networking";
import { AppState } from "./store";

ReactModal.setAppElement("#approot");

const App: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const lobbyInfo = useSelector((state: AppState) => state.lobby);
	const isInGame = useSelector((state: AppState) => state.game.ui.inGame);

	const [loadingMessage, setLoadingMessage] = React.useState("loading...");

	React.useEffect(() => {
		const open = async () => {
			setLoadingMessage("getting access token");
			const idToken = await getAccessTokenSilently();

			setLoadingMessage("opening connection");
			dispatch(openConnection({ idToken }));
		};

		open();
	}, [isAuthenticated, getAccessTokenSilently]);

	useGlobalStyles();

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
			<span>({loadingMessage})</span>
			<Loading />
		</>
	);
};

export { App };
