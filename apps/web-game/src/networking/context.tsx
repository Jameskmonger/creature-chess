import React, {
	createContext,
	useContext,
	useRef,
	useSyncExternalStore,
} from "react";

import { useDispatch } from "react-redux";
import { Holder } from "~/utils/Holder";

import { GameConnection } from "./GameConnection";
import { LobbyConnection } from "./LobbyConnection";
import { SocketManager } from "./SocketManager";

type NetworkingContextValue = {
	socketManager: SocketManager;
	gameConnectionHolder: Holder<GameConnection>;
	lobbyConnectionHolder: Holder<LobbyConnection>;
};

const NetworkingContext = createContext<NetworkingContextValue | null>(null);

type ProviderProps = React.PropsWithChildren<{
	gameConnectionHolder: Holder<GameConnection>;
	lobbyConnectionHolder: Holder<LobbyConnection>;
	accountIdHolder: Holder<string>;
}>;

export function SocketManagerProvider({
	children,
	gameConnectionHolder,
	lobbyConnectionHolder,
	accountIdHolder,
}: ProviderProps) {
	const dispatch = useDispatch();
	const ref = useRef<NetworkingContextValue | null>(null);

	if (ref.current === null) {
		ref.current = {
			socketManager: new SocketManager(
				dispatch,
				gameConnectionHolder,
				lobbyConnectionHolder,
				accountIdHolder
			),
			gameConnectionHolder,
			lobbyConnectionHolder,
		};
	}

	return (
		<NetworkingContext.Provider value={ref.current}>
			{children}
		</NetworkingContext.Provider>
	);
}

function useNetworking(): NetworkingContextValue {
	const context = useContext(NetworkingContext);
	if (!context) {
		throw new Error(
			"useSocketManager / useLobbyConnection must be used within a SocketManagerProvider"
		);
	}
	return context;
}

export function useSocketManager(): SocketManager {
	return useNetworking().socketManager;
}

export function useLobbyConnection(): LobbyConnection | null {
	const { lobbyConnectionHolder } = useNetworking();
	useSyncExternalStore(
		lobbyConnectionHolder.subscribe,
		lobbyConnectionHolder.getSnapshot
	);
	return lobbyConnectionHolder.peek();
}
