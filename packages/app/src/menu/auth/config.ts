const local = true;

export const auth0Config = {
    domain: "thyde1.eu.auth0.com",
    clientID: "NiQiXyVDBRPTHDDPa49S2wKkWQx82XrK",
    // redirectUri: local ? "https://creaturechess.local-dev.com:8090" : "https://creaturechess.jamesmonger.com/",
    redirectUri: local ? "http://localhost:8090" : "https://creaturechess.jamesmonger.com/",
    // logoutRedirectUri: local ? "https://creaturechess.local-dev.com:8090" : "https://creaturechess.jamesmonger.com/",
    logoutRedirectUri: local ? "http://localhost:8090" : "https://creaturechess.jamesmonger.com/",
    audience: `https://thyde1.eu.auth0.com/userinfo`,
    scope: "openid profile email"
};

// export const GAME_SERVER_URL = "https://cc-server.jamesmonger.com";
export const GAME_SERVER_URL = "ws://localhost:3000";
export const CURRENT_USER_ENDPOINT = local ? "http://localhost:3001/user/current" : "https://cc-server-info.herokuapp.com/user/current";
export const LEADERBOARD_ENDPOINT = local ? "http://localhost:3001/leaderboard" : "https://cc-server-info.herokuapp.com/leaderboard";
