import * as React from "react";

import "pepjs";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "~/app";

import { createAppStore } from "./store";
import { ThemeProvider } from "react-jss";
import { DEFAULT_THEME } from "./useStyles";
import { GameBoardProvider, useGameBoards } from "./components/game/board/state";

function GameRoot() {
	const gameBoard = useGameBoards();
	const store = createAppStore(gameBoard);

	return (
		<ReduxProvider store={store}>
			<ThemeProvider theme={DEFAULT_THEME}>
				<App />
			</ThemeProvider>
		</ReduxProvider>
	);
}

const AppRoot = () => {
	return (
		<GameBoardProvider>
			<GameRoot />
		</GameBoardProvider>
	);
};

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
