import * as React from "react";
import { useEffect, useRef, useState } from "react";

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
import { SplashScreen } from "./components/SplashScreen";
import {
	BOOT_TRANSITION_TOTAL_MS,
	BootEntranceContext,
} from "./components/menu/bootEntrance";
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
						accountIdHolder={accountIdHolderRef.current}
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

const MIN_SPLASH_MS = 1200;

function Boot() {
	const [phase, setPhase] = useState<
		"loading" | "entering" | "done" | "error"
	>("loading");

	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			installPluginRuntime();
			// Pre-game surfaces (menu, lobby) need creature art before any connection.
			const catalogUrl = APP_PLUGIN_MANIFEST_URL.replace(
				/manifest\.json$/,
				"creatures.json"
			);
			await Promise.all([
				loadCreatureCatalog(catalogUrl),
				loadClientPlugins(APP_PLUGIN_MANIFEST_URL),
				new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_MS)),
			]);
		};

		load()
			.then(() => {
				if (!cancelled) {
					setPhase("entering");
				}
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error("[bootstrap] failed before menu", error);
				if (!cancelled) {
					setPhase("error");
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (phase !== "entering") {
			return;
		}
		const timer = setTimeout(() => setPhase("done"), BOOT_TRANSITION_TOTAL_MS);
		return () => clearTimeout(timer);
	}, [phase]);

	if (phase === "error") {
		return (
			<div style={{ padding: 24, fontFamily: "sans-serif" }}>
				Something went wrong while starting the game. Please refresh to try
				again.
			</div>
		);
	}

	return (
		// The splash sits outside AppRoot's providers, so it needs its own theme.
		<ThemeProvider theme={DEFAULT_THEME}>
			{phase !== "loading" && (
				<BootEntranceContext.Provider value={phase === "entering"}>
					<AppRoot />
				</BootEntranceContext.Provider>
			)}
			{phase !== "done" && <SplashScreen entering={phase === "entering"} />}
		</ThemeProvider>
	);
}

const container = document.getElementById("approot");
if (container) {
	createRoot(container).render(<Boot />);
}
