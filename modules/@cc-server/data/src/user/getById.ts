import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

export const getById =
	(logger: Logger, client: PrismaClient) => async (id: string) => {
		try {
			return await client.users.findUnique({
				where: {
					id,
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data user.getById", e);
			return null;
		}
	};
