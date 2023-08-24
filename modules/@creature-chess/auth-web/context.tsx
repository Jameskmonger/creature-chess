import * as React from "react";

import { UserDTO } from "@creature-chess/models/dto/user";

import { useUser } from "./useUser";

const GameAuthContext = React.createContext<{
	user: UserDTO | null;
}>({
	user: null,
});
GameAuthContext.displayName = "GameAuthContext";

export const AuthContextProvider = GameAuthContext.Provider;

export function GameAuthContextProvider({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	const { user } = useUser();

	return (
		<GameAuthContext.Provider value={{ user: user || null }}>
			{children}
		</GameAuthContext.Provider>
	);
}

export const usePlayerId = (): string => {
	const { user } = React.useContext(GameAuthContext);

	if (!user) {
		return "";
	}

	return user.id;
};
