export const auth0Config = {
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_SPA_CLIENT_ID,
	redirectUri: process.env.APP_URL,
	audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
	scope: "openid profile email",
};
