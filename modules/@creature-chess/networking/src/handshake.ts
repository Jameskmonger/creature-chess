/**
 * Guest users are not authenticated and are not associated with any user account.
 */
type GuestConnectionRequest = { type: "guest"; data?: never };

/**
 * Auth0 users are authenticated and are associated with a user account.
 *
 * They must provide an access token to authenticate.
 */
type Auth0ConnectionRequest = { type: "auth0"; data: { accessToken: string } };

/**
 * The request to initialize a connection to the game server.
 */
export type InitConnectionRequest =
	GuestConnectionRequest
	| Auth0ConnectionRequest;
