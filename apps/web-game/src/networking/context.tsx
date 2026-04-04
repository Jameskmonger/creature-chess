import React, { createContext, useContext, useRef } from "react";
import { useDispatch } from "react-redux";

import { useGameBoards } from "~/components/game/board/state";

import { SocketManager } from "./SocketManager";

const SocketManagerContext = createContext<SocketManager | null>(null);

export function SocketManagerProvider({ children }: React.PropsWithChildren) {
	const dispatch = useDispatch();
	const gameBoard = useGameBoards();
	const ref = useRef<SocketManager | null>(null);

	if (ref.current === null) {
		ref.current = new SocketManager(dispatch, gameBoard);
	}

	return (
		<SocketManagerContext.Provider value={ref.current}>
			{children}
		</SocketManagerContext.Provider>
	);
}

export function useSocketManager(): SocketManager {
	const context = useContext(SocketManagerContext);
	if (!context) {
		throw new Error("useSocketManager must be used within a SocketManagerProvider");
	}
	return context;
}
