import * as React from "react";

import "pepjs";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "react-jss";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "~/app";

import {
	GameBoardProvider,
	useGameBoards,
} from "./components/game/board/state";
import { SocketManagerProvider } from "./networking/context";
import { createAppStore } from "./store";
import { DEFAULT_THEME } from "./useStyles";

function GameRoot() {
	const gameBoard = useGameBoards();
	const store = createAppStore(gameBoard);

	return (
		<ReduxProvider store={store}>
			<SocketManagerProvider>
				<ThemeProvider theme={DEFAULT_THEME}>
					<App />
				</ThemeProvider>
			</SocketManagerProvider>
		</ReduxProvider>
	);
}

function AppRoot() {
	return (
		<GameBoardProvider>
			<GameRoot />
		</GameBoardProvider>
	);
}

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
