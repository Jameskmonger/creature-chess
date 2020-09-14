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

export const checkSession = () => (
  new Promise((resolve, reject) => {
    auth0Client.checkSession(
      {
        audience,
        scope
      },
      (err, authResult) => {
        if (err) {
          if (err.code === "login_required") {
            return resolve(null);
          }

          return reject(err);
        }

        if (!authResult || !authResult.idToken) {
          return resolve(null);
        }

        const idToken = authResult.idToken;
        const profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        const expiresAt = authResult.idTokenPayload.exp * 1000;

        resolve({
          idToken,
          profile,
          expiresAt
        });
      });
  })
);

export const handleAuthentication = () => (
  new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) {
        return reject(err);
      }

      if (!authResult || !authResult.idToken) {
        return reject(err);
      }

      const idToken = authResult.idToken;
      const profile = authResult.idTokenPayload;
      // set the time that the id token will expire at
      const expiresAt = authResult.idTokenPayload.exp * 1000;

      resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt
      });
    });
  })
);

export const signIn = () => auth0Client.authorize();

export const signOut = () => {
  auth0Client.logout({
    clientID,
    returnTo: logoutRedirectUrl
  });
};
