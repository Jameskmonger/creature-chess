import { ManagementClient } from "auth0";

export function getManagementClient() {
	const {
		AUTH0_DOMAIN,
		AUTH0_MACHINE_TO_MACHINE_CLIENT_ID,
		AUTH0_MANAGEMENT_CLIENT_SECRET,
	} = process.env;

	if (
		!AUTH0_DOMAIN ||
		!AUTH0_MACHINE_TO_MACHINE_CLIENT_ID ||
		!AUTH0_MANAGEMENT_CLIENT_SECRET
	) {
		throw Error("No Auth0 configuration found");
	}

	const client = new ManagementClient({
		domain: AUTH0_DOMAIN,
		clientId: AUTH0_MACHINE_TO_MACHINE_CLIENT_ID,
		clientSecret: AUTH0_MANAGEMENT_CLIENT_SECRET,
	});

	// todo error if invalid

	return client;
}
