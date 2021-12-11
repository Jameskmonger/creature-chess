import { config } from "@creature-chess/models";

export const auth0Config = {
	domain: config.auth0.domain,
	clientID: config.auth0.spaClientId,
	redirectUri: config.appUrl,
	logoutRedirectUri: config.appUrl,
	audience: `https://${config.auth0.domain}/api/v2/`,
	scope: "openid profile email"
};

export const CURRENT_USER_ENDPOINT = `${config.serverInfoUrl}/user/current`;
export const LEADERBOARD_ENDPOINT = `${config.serverInfoUrl}/leaderboard`;
