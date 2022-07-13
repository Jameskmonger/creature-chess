import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { Auth0User } from "./types";

type AuthContextValue = {
	user: Auth0User | null;
};

const AuthContext = React.createContext<AuthContextValue>({ user: null });
AuthContext.displayName = "AuthContext";

export const AuthContextProvider = AuthContext.Provider;

export function Auth0ContextProvider({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	const { user } = useAuth0<Auth0User>();

	return (
		<AuthContext.Provider value={{ user: user || null }}>
			{children}
		</AuthContext.Provider>
	);
}

export const usePlayerId = (): string => {
	const { user } = React.useContext(AuthContext);

	if (!user) {
		return "";
	}

	return user["https://creaturechess.jamesmonger.com/playerId"]!;
};
