import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

export const addGamePlayed =
	(logger: Logger, client: PrismaClient) => async (id: string) => {
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
