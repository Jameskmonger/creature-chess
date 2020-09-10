import jwt = require("jsonwebtoken");
import jwksClient = require("jwks-rsa");

const domain = "creaturechess.eu.auth0.com";

const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
});

interface JWTPayload {
    sub: string;
}

interface DecodedToken {
    header: jwt.JwtHeader;
    payload: JWTPayload;
}

const getSecret = (header: jwt.JwtHeader) => {
    return new Promise<string>((resolve, reject) => {
        client.getSigningKey(header.kid, (err, key) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(key.getPublicKey());
        });
    });
};
const verifyToken = async (token: string, secret: string) => {
    return new Promise<JWTPayload>((resolve, reject) => {
        jwt.verify(token, secret, (err, payload: JWTPayload) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(payload);
        });
    });
};

export const verifyDecodeJwt = async (token: string) => {
    try {
        const dtoken: DecodedToken | null = (jwt.decode(token, { complete: true }) || null) as DecodedToken | null;

        if (dtoken === null) {
            return null;
        }

        const secret = await getSecret(dtoken.header);
        const decoded = await verifyToken(token, secret);

        return decoded;
    } catch (err) {
        return null;
    }
};
