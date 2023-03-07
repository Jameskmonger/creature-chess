import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

export const addGamePlayed =
	(logger: Logger, client: PrismaClient) => async (id: number) => {
		try {
			return await client.bots.update({
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
			logger.error("Error in @cc/data bots.addGamePlayed", e);
			return null;
		}
	};
