export type HandshakeRequest =
	| { type: "guest"; data: { accessToken: string } };
