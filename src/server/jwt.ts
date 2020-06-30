import jwt = require("jsonwebtoken");
import jwksClient = require("jwks-rsa");

const domain = "creaturechess.eu.auth0.com";

const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
});

const getSecret = (header: any) => {
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

const verifyToken = async (token: string, secret: any) => {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded);
        });
    });
};

export const verify = async (token: string) => {
    try {
        const dtoken: any = jwt.decode(token, { complete: true }) || {};

        const secret = await getSecret(dtoken.header);
        const decoded = await verifyToken(token, secret);

        return decoded;
    } catch (err) {
        return null;
    }
};
