import { Logger } from "winston";


import { PrismaClient } from "@prisma/client";

export const getById =
	(logger: Logger, client: PrismaClient) => async (id: number) => {
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
