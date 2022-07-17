import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { getManagementClient } from "@libs/auth0";
import { middyfy } from "@libs/lambda";
import { sanitize } from "@libs/sanitize-user";
import { createLogger, transports } from "winston";

import { authenticate } from "@creature-chess/auth-server";
import { createDatabaseConnection } from "@creature-chess/data";

import schema from "./schema";

const logger = createLogger();
logger.add(new transports.Console());

const authClient = getManagementClient();

const getCurrentUser: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async (event) => {
	const database = await createDatabaseConnection(logger);

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
