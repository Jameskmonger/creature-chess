import * as React from "react";

import "pepjs";
import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "react-jss";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "~/app";
import { Holder } from "~/utils/Holder";

import { GameSessionHolder } from "./game/GameSessionHolder";
import { GameSessionProvider } from "./game/sessionContext";
import { GameConnection } from "./networking/GameConnection";
import { LobbyConnection } from "./networking/LobbyConnection";
import { SocketManagerProvider } from "./networking/context";
import { createAppStore } from "./store";
import { DEFAULT_THEME } from "./useStyles";

function AppRoot() {
	const sessionHolderRef = useRef<GameSessionHolder | null>(null);
	if (sessionHolderRef.current === null) {
		sessionHolderRef.current = new GameSessionHolder();
	}

	const gameConnectionHolderRef = useRef<Holder<GameConnection> | null>(null);
	if (gameConnectionHolderRef.current === null) {
		gameConnectionHolderRef.current = new Holder<GameConnection>(
			"GameConnection"
		);
	}

	const lobbyConnectionHolderRef = useRef<Holder<LobbyConnection> | null>(null);
	if (lobbyConnectionHolderRef.current === null) {
		lobbyConnectionHolderRef.current = new Holder<LobbyConnection>(
			"LobbyConnection"
		);
	}

	const storeRef = useRef<ReturnType<typeof createAppStore> | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createAppStore({
			sessionHolder: sessionHolderRef.current,
			gameConnectionHolder: gameConnectionHolderRef.current,
			lobbyConnectionHolder: lobbyConnectionHolderRef.current,
		});
	}

	return (
		<ReduxProvider store={storeRef.current}>
			<GameSessionProvider holder={sessionHolderRef.current}>
				<SocketManagerProvider
					gameConnectionHolder={gameConnectionHolderRef.current}
					lobbyConnectionHolder={lobbyConnectionHolderRef.current}
				>
					<ThemeProvider theme={DEFAULT_THEME}>
						<App />
					</ThemeProvider>
				</SocketManagerProvider>
			</GameSessionProvider>
		</ReduxProvider>
	);
}

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
