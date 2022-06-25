import { ManagementClient } from "auth0";

import { UserAppMetadata } from "@creature-chess/auth-server";
import { config } from "@creature-chess/models";

export const createManagementClient = (): ManagementClient<UserAppMetadata> => {
	const client = new ManagementClient<UserAppMetadata>({
		domain: config.auth0.domain,
		clientId: config.auth0.machineToMachineClientId,
		clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
	});

	// todo error if invalid

	return client;
};
