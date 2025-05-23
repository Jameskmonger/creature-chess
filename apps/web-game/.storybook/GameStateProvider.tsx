import React from "react";

import { Provider } from "react-redux";
import { GameState } from "~/store/game/state";
import { useGlobalStyles } from "~/styles";

import { createMockStore } from "./utils";

export function GameStateProvider({
	children,
	halfBoard,
	decorateState,
}: {
	children: React.ReactNode;
	halfBoard?: boolean;
	decorateState?: (state: GameState) => GameState;
}) {
	useGlobalStyles();

	const store = createMockStore(halfBoard ?? false, decorateState);

	return <Provider store={store}>{children}</Provider>;
}
