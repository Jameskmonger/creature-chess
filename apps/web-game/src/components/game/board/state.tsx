import React, { createContext, useRef } from "react";

import { GameBoardState } from "./GameBoardState";

export { GameBoardState } from "./GameBoardState";

const GameBoardContext = createContext<GameBoardState | null>(null);

export function GameBoardProvider({ children }: React.PropsWithChildren) {
	const ref = useRef<GameBoardState | null>(null);

	if (ref.current === null) {
		ref.current = new GameBoardState();
	}

	return (
		<GameBoardContext.Provider value={ref.current}>
			{children}
		</GameBoardContext.Provider>
	);
}

export function useGameBoards() {
	const context = React.useContext(GameBoardContext);

	if (!context) {
		throw new Error("useGameBoards must be used within a GameBoardProvider");
	}

	return context;
}
