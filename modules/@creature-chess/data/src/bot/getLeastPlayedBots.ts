import { Logger } from "winston";
import { PrismaClient } from "@prisma/client";

export const getLeastPlayedBots =
	(logger: Logger, client: PrismaClient) => async (count: number) => {
		try {
			return await client.bots.findMany({
				take: count,
				orderBy: {
					games_played: "asc",
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data bots.getLeastPlayedBots", e);
			return null;
		}
	};
