import * as React from "react";

import "pepjs";
import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "react-jss";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "~/app";

import { GameSessionHolder } from "./game/GameSessionHolder";
import { GameSessionProvider } from "./game/sessionContext";
import { SocketManagerProvider } from "./networking/context";
import { createAppStore } from "./store";
import { DEFAULT_THEME } from "./useStyles";

function AppRoot() {
	const holderRef = useRef<GameSessionHolder | null>(null);
	if (holderRef.current === null) {
		holderRef.current = new GameSessionHolder();
	}

	const storeRef = useRef<ReturnType<typeof createAppStore> | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createAppStore(holderRef.current);
	}

	return (
		<ReduxProvider store={storeRef.current}>
			<GameSessionProvider holder={holderRef.current}>
				<SocketManagerProvider>
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
