import React, {
	createContext,
	useContext,
	useRef,
	useSyncExternalStore,
} from "react";

import { GameSession } from "./GameSession";
import { GameSessionHolder } from "./GameSessionHolder";

const GameSessionContext = createContext<GameSessionHolder | null>(null);

type ProviderProps = React.PropsWithChildren<{ holder?: GameSessionHolder }>;

export function GameSessionProvider({ children, holder }: ProviderProps) {
	const ref = useRef<GameSessionHolder | null>(null);

	if (ref.current === null) {
		ref.current = holder ?? new GameSessionHolder();
	}

	return (
		<GameSessionContext.Provider value={ref.current}>
			{children}
		</GameSessionContext.Provider>
	);
}

function useHolder(): GameSessionHolder {
	const holder = useContext(GameSessionContext);
	if (!holder) {
		throw new Error("Must be used within a GameSessionProvider");
	}
	return holder;
}

export function useGameSession(): GameSession {
	const holder = useHolder();
	useSyncExternalStore(holder.subscribe, holder.getSnapshot);
	return holder.get();
}

export function useGamemodeSettings() {
	return useGameSession().settings;
}
