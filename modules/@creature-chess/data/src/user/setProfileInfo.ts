import { PrismaClient, Prisma } from "@prisma/client";
import { Logger } from "winston";

export const setProfileInfo =
	(logger: Logger, client: PrismaClient) =>
	async (id: number, nickname: string | null, picture: number | null) => {
		try {
			logger.info(`setProfileInfo for user ${id}`);
			logger.info(`nickname: ${nickname}`);
			logger.info(`picture: ${picture}`);

			let userUpdate: Prisma.usersUpdateInput = {};

			if (nickname) {
				userUpdate = {
					...userUpdate,
					nickname,
				};
			}

			if (picture) {
				userUpdate = {
					...userUpdate,
					profile_picture: picture,
				};
			}

			logger.info(`userUpdate: ${JSON.stringify(userUpdate)}`);

			return await client.users.update({
				where: {
					id,
				},
				data: {
					...userUpdate,
				},
			});
		} catch (e) {
			logger.error("Error in @cc/data user.setProfileInfo", e);
			return null;
		}
	};
