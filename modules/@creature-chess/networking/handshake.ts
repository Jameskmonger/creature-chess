export type HandshakeRequest =
	| { type: "auth0"; data: { accessToken: string } }
	| { type: "guest"; data: { accessToken: string } };
