import { useAuth0 } from "@auth0/auth0-react";

export { AuthProvider } from "./provider";
export { isRegistered, hasNickname } from "./isRegistered";

export type Auth0User = {
	"https://creaturechess.jamesmonger.com/playerId": string | null;
	"https://creaturechess.jamesmonger.com/playerNickname": string | null;
	"https://creaturechess.jamesmonger.com/playerPicture": number | null;
};

export const usePlayerId = (): string => {
	const { user } = useAuth0<Auth0User>();

	if (!user) {
		return "";
	}

	return user["https://creaturechess.jamesmonger.com/playerId"]!;
};
