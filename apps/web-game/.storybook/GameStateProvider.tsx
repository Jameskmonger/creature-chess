import React from "react";

import { Provider } from "react-redux";
import { GameState } from "~/store/game/state";
import { useGlobalStyles } from "~/styles";

import { createMockStore } from "./utils";

export function GameStateProvider({
	children,
	decorateState,
}: {
	children: React.ReactNode;
	decorateState?: (state: GameState) => GameState;
}) {
	useGlobalStyles();

	const store = createMockStore(decorateState);

	return <Provider store={store}>{children}</Provider>;
}
