import { useAuth0 } from "@auth0/auth0-react";

export const usePlayerId = (): string => {
    const { user } = useAuth0();
    return user["https://creaturechess.jamesmonger.com/playerId"];
};
