import { WebAuth } from "auth0-js";

const domain = "creaturechess.eu.auth0.com";
const clientID = "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1";

const local = false;

const redirectUri = local ? "http://localhost:8090/callback" : "http://creaturechess.jamesmonger.com/callback";
const logoutRedirectUrl = local ? "http://localhost:8090" : "http://creaturechess.jamesmonger.com/";
const audience = `https://${domain}/userinfo`;
const scope = "openid profile email";

const auth0Client = new WebAuth({
  domain,
  clientID,
  redirectUri,
  audience,
  responseType: "id_token",
  scope
});

export type AuthResponse = { token: string, expiry: number } | null;

export const checkSession = () => new Promise<AuthResponse>((resolve, reject) => {
  const options = { audience, scope };

  auth0Client.checkSession(options, (err, authResult) => {
    if (err) {
      if (err.code === "login_required") {
        return resolve(null);
      }

      return reject(err);
    }

    if (!authResult || !authResult.idToken) {
      return resolve(null);
    }

    const token = authResult.idToken;
    const expiry = authResult.idTokenPayload.exp * 1000;

    resolve({ token, expiry });
  });
});

export const handleAuthentication = () => new Promise<AuthResponse>((resolve, reject) => {
  auth0Client.parseHash((err, authResult) => {
    if (err) {
      return reject(err);
    }

    if (!authResult || !authResult.idToken) {
      return reject(err);
    }

    const token = authResult.idToken;
    const expiry = authResult.idTokenPayload.exp * 1000;

    resolve({ token, expiry });
  });
});

export const signIn = () => auth0Client.authorize();

export const signOut = () => {
  auth0Client.logout({
    clientID,
    returnTo: logoutRedirectUrl
  });
};
