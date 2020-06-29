import { WebAuth } from "auth0-js";

const domain = "creaturechess.eu.auth0.com";
const clientID = "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1";
const redirectUri = "http://localhost:8090/callback";
const logoutRedirectUrl = "http://localhost:8090";

const auth0Client = new WebAuth({
  domain,
  clientID,
  redirectUri,
  audience: `https://${domain}/userinfo`,
  responseType: "id_token",
  scope: "openid profile email"
});

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
