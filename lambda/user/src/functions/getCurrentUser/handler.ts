import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { sanitize } from "@libs/sanitize-user";
import { ManagementClient } from "auth0";
import { createLogger, transports } from "winston";

import { authenticate, UserAppMetadata } from "@creature-chess/auth-server";
import { createDatabaseConnection } from "@creature-chess/data";
import { config } from "@creature-chess/models";

import schema from "./schema";

const logger = createLogger();
logger.add(new transports.Console());
const database = createDatabaseConnection(
	logger,
	process.env.CREATURE_CHESS_FAUNA_KEY!
);
const AUTH0_CONFIG = {
	domain: config.auth0.domain,
	clientId: config.auth0.machineToMachineClientId,
	clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
};
const authClient = new ManagementClient<UserAppMetadata>({
	domain: AUTH0_CONFIG.domain,
	clientId: AUTH0_CONFIG.clientId,
	clientSecret: AUTH0_CONFIG.clientSecret,
});

const getCurrentUser: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async (event) => {
	const headers = {
		"Access-Control-Allow-Origin": "https://creaturechess.com",
		"Access-Control-Allow-Credentials": true,
	};

	const { Authorization } = event.headers;

	if (!Authorization) {
		console.log(event.headers);

		return formatJSONResponse(
			{
				message: "No token",
			},
			headers,
			401
		);
	}

	const user = await authenticate(authClient, database, Authorization);

	return formatJSONResponse(
		{
			user: sanitize(user),
		},
		headers
	);
};

export const main = middyfy(getCurrentUser);
