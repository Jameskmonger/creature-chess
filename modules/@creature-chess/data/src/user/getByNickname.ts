import { Logger } from "winston";
import { PrismaClient } from "@prisma/client";

export const getByNickname =
	(logger: Logger, client: PrismaClient) => async (nickname: string) => {
		try {
			// TODO (James) is findFirstOrThrow appropriate here? We use this to check if a nickname is taken
			//             maybe a boolean function would be better?
			return await client.users.findFirstOrThrow({
				where: {
					nickname: {
						equals: nickname,
						// TODO (James) we should consider making an index for this if there are performance issues
						mode: "insensitive"
					}
				}
			});
		} catch (e) {
			logger.error("Error in @cc/data user.getByNickname", e);
			return null;
		}
	};
