import * as React from "react";
import ReactModal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./display/loading";
import { GamePage } from "./game";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./store";
import { LobbyPage } from "./lobby";
import { openConnection } from "./networking";

ReactModal.setAppElement("#approot");

const App: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const hasLobbyId = useSelector<AppState>(state => state.lobby.lobbyId !== null);
	const isInGame = useSelector<AppState>(state => state.game.ui.inGame);

	React.useEffect(() => {
		const open = async () => {
			const idToken = await getAccessTokenSilently();

			dispatch(openConnection({ idToken }));
		};

		open();
	}, [isAuthenticated, getAccessTokenSilently]);

	if (isInGame) {
		return <GamePage />;
	}

	if (hasLobbyId) {
		return <LobbyPage />;
	}

	return <Loading />;
};

export { App };
