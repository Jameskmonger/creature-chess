import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

/**
 * Creates a new user in the database
 *
 * A user is created when a user logs in for the first time,
 * and is identified by their authId. They do not have a nickname
 * or other information at this point.
 *
 * @param logger Winston logger
 * @param client Prisma client
 * @returns A function that creates a new user in the database
 */
export const create =
	(logger: Logger, client: PrismaClient) => async (authId: string) => {
		try {
			return await client.users.create({
				data: {
					auth_id: authId,
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data user.create", e);
			return null;
		}
	};
