import { Logger } from "winston";

import { PrismaClient } from "@prisma/client";

export const addWin =
	(logger: Logger, client: PrismaClient) => async (id: number) => {
		try {
			return await client.users.update({
				where: {
					id,
				},
				data: {
					wins: {
						increment: 1,
					},
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data user.addWin", e);
			return null;
		}
	};
