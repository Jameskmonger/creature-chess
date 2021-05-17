import jwt = require("jsonwebtoken");
import jwksClient = require("jwks-rsa");
import { config } from "@creature-chess/gamemode";

const client = jwksClient({
	cache: true,
	rateLimit: true,
	jwksRequestsPerMinute: 5,
	jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
});

interface JWTPayload {
	sub: string;
}

interface DecodedToken {
	header: jwt.JwtHeader;
	payload: JWTPayload;
}

const verifyToken = async (token: string, publicKey: string) => new Promise<JWTPayload>((resolve, reject) => {
	jwt.verify(token, publicKey, (err, payload) => {
		if (err) {
			reject(err);
			return;
		}

		resolve(payload as JWTPayload);
	});
});

export const verifyDecodeJwt = async (token: string) => {
	try {
		const dtoken: DecodedToken | null = (jwt.decode(token, { complete: true }) || null) as DecodedToken | null;

		if (dtoken === null) {
			return null;
		}

		const key = await client.getSigningKey(dtoken.header.kid);
		const publicKey = key.getPublicKey();

		const decoded = await verifyToken(token, publicKey);

		return decoded;
	} catch (err) {
		return null;
	}
};
