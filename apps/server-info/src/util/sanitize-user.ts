import { UserModel } from "@creature-chess/auth-server";
import { SanitizedUser } from "@creature-chess/models";

export const sanitize = (user: UserModel): SanitizedUser => {
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
