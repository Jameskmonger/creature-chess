export const AUTH0_ENABLED = APP_AUTH0_ENABLED === "true";

export const auth0Config = {
	domain: APP_AUTH0_DOMAIN,
	clientID: APP_AUTH0_ENABLED,
	redirectUri: APP_URL,
	audience: `https://${APP_AUTH0_DOMAIN}/api/v2/`,
	scope: "openid profile email",
};
