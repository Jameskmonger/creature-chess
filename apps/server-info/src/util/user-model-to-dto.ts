import { UserDTO } from "@creature-chess/models/dto/user";

import { UserModel } from "@cc-server/auth";

export const userModelToDto = (user: UserModel): UserDTO => {
	const { id, nickname, stats, registered } = user;

	return {
		// TODO (James) convert to a string here to preserve the old FaunaDB id type
		// 			we should make it a number
		id: id.toString(),
		nickname,
		stats,
		registered,
	};
};
