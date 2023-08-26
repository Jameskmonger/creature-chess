import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

export const addWin =
	(logger: Logger, client: PrismaClient) => async (id: string) => {
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
