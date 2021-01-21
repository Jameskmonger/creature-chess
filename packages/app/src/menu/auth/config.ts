const local = false;

export const auth0Config = {
    domain: "creaturechess.eu.auth0.com",
    clientID: "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1",
    redirectUri: local ? "https://creaturechess.local-dev.com:8090" : "http://creaturechess.jamesmonger.com/",
    logoutRedirectUri: local ? "https://creaturechess.local-dev.com:8090" : "http://creaturechess.jamesmonger.com/",
    audience: `https://creaturechess.eu.auth0.com/userinfo`,
    scope: "openid profile email"
};

export const GAME_SERVER_URL = "https://cc-server.jamesmonger.com";
export const CURRENT_USER_ENDPOINT = local ? "http://localhost:3001/user/current" : "https://cc-server-info.herokuapp.com/user/current";
export const LEADERBOARD_ENDPOINT = local ? "http://localhost:3001/leaderboard" : "https://cc-server-info.herokuapp.com/leaderboard";
