import { Logger } from "winston";

import { PrismaClient } from "@prisma/client";

export const addGamePlayed =
	(logger: Logger, client: PrismaClient) => async (id: number) => {
		try {
			return await client.users.update({
				where: {
					id,
				},
				data: {
					games_played: {
						increment: 1,
					},
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data user.addGamePlayed", e);
			return null;
		}
	};
