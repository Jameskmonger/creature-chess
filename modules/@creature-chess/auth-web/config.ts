import { APP_BASE_URL } from "@creature-chess/models";

export const auth0Config = {
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_SPA_CLIENT_ID,
	redirectUri: APP_BASE_URL,
	audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
	scope: "openid profile email",
};
