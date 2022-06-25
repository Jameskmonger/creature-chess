import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { DatabaseUser } from "./databaseUser";

export const setProfileInfo =
	(logger: Logger, client: FaunaDBClient) =>
	async (id: string, nickname: string | null, picture: number | null) => {
		try {
			let userUpdate = {};

			if (nickname) {
				userUpdate = {
					...userUpdate,
					nickname: {
						value: nickname,
						uppercase: nickname.toUpperCase(),
					},
				};
			}

			if (picture) {
				userUpdate = {
					...userUpdate,
					profile: {
						picture,
					},
				};
			}

			const user = await client.query<DatabaseUser>(
				q.Update(q.Ref(q.Collection("users"), id), {
					data: {
						...userUpdate,
					},
				})
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.setProfileInfo", e);
			return null;
		}
	};
