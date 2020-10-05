const local = true;

export const domain = "creaturechess.eu.auth0.com";
export const clientID = "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1";
export const redirectUri = local ? "http://localhost:8090/callback" : "http://creaturechess.jamesmonger.com/callback";
export const logoutRedirectUrl = local ? "http://localhost:8090" : "http://creaturechess.jamesmonger.com/";
export const audience = `https://${domain}/userinfo`;
export const scope = "openid profile email";

export const CURRENT_USER_ENDPOINT = local ? "http://localhost:3001/user/current" : "https://cc-server-info.herokuapp.com/user/current";
