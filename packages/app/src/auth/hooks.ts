import { useAuth0 } from "@auth0/auth0-react";
import { Auth0User } from "./user";

export const usePlayerId = (): string => {
	const { user } = useAuth0<Auth0User>();
	return user["https://creaturechess.jamesmonger.com/playerId"];
};
