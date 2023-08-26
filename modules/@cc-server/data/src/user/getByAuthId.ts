import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

export const getByAuthId =
	(logger: Logger, client: PrismaClient) => async (authId: string) => {
		try {
			// TODO (James) is findFirstOrThrow a good idea? We catch and return null anyway
			return await client.users.findFirstOrThrow({
				where: {
					auth_id: authId,
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data user.getByAuthId", e);
			return null;
		}
	};
