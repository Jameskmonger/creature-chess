import * as React from "react";
import { useRef } from "react";

import "pepjs";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "react-jss";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "~/app";
import { AccountIdHolderProvider } from "~/auth/context";
import { Holder } from "~/utils/Holder";

import { GameSessionHolder } from "./game/GameSessionHolder";
import { GameSessionProvider } from "./game/sessionContext";
import { loadCreatureCatalog } from "./networking/creatureDefinitions";
import { GameConnection } from "./networking/GameConnection";
import { LobbyConnection } from "./networking/LobbyConnection";
import { SocketManagerProvider } from "./networking/context";
import {
	installPluginRuntime,
	loadClientPlugins,
	wirePluginHostState,
} from "./plugins";
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

	const accountIdHolderRef = useRef<Holder<string> | null>(null);
	if (accountIdHolderRef.current === null) {
		accountIdHolderRef.current = new Holder<string>("AccountId");
	}

	const storeRef = useRef<ReturnType<typeof createAppStore> | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createAppStore({
			sessionHolder: sessionHolderRef.current,
			gameConnectionHolder: gameConnectionHolderRef.current,
			lobbyConnectionHolder: lobbyConnectionHolderRef.current,
			accountIdHolder: accountIdHolderRef.current,
		});

		wirePluginHostState({
			store: storeRef.current,
			getLocalPlayerId: () => accountIdHolderRef.current?.peek() ?? null,
		});
	}

	return (
		<ReduxProvider store={storeRef.current}>
			<AccountIdHolderProvider value={accountIdHolderRef.current}>
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
			</AccountIdHolderProvider>
		</ReduxProvider>
	);
}

async function bootstrap() {
	installPluginRuntime();
	// Pre-game surfaces (menu, lobby) need creature art before any connection.
	const catalogUrl = APP_PLUGIN_MANIFEST_URL.replace(
		/manifest\.json$/,
		"creatures.json"
	);
	await Promise.all([
		loadCreatureCatalog(catalogUrl),
		loadClientPlugins(APP_PLUGIN_MANIFEST_URL),
	]);

	const container = document.getElementById("approot");
	const root = createRoot(container!);
	root.render(<AppRoot />);
}

bootstrap().catch((error) => {
	// eslint-disable-next-line no-console
	console.error("[bootstrap] failed before render", error);
	const container = document.getElementById("approot");
	if (container) {
		const root = createRoot(container);
		root.render(
			<div style={{ padding: 24, fontFamily: "sans-serif" }}>
				Something went wrong while starting the game. Please refresh to try
				again.
			</div>
		);
	}
});
