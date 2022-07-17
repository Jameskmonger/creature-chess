import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { getManagementClient } from "@libs/auth0";
import { middyfy } from "@libs/lambda";
import { sanitize } from "@libs/sanitize-user";
import { createLogger, transports } from "winston";

import {
	authenticate,
	convertDatabaseUserToUserModel,
} from "@creature-chess/auth-server";
import {
	createDatabaseConnection,
	DatabaseConnection,
} from "@creature-chess/data";
import {
	AVAILABLE_PROFILE_PICTURES,
	validateNicknameFormat,
} from "@creature-chess/models";

import schema from "./schema";

import Filter = require("bad-words");

const logger = createLogger();
logger.add(new transports.Console());

const authClient = getManagementClient();
const filter = new Filter();

const getNicknameError = async (
	filter: Filter,
	database: DatabaseConnection,
	nickname: string
): Promise<string | null> => {
	const nicknameError = validateNicknameFormat(nickname);

	if (nicknameError) {
		return nicknameError;
	}

	if (filter.isProfane(nickname)) {
		return "Profanity filter";
	}

	const isUnique = (await database.user.getByNickname(nickname)) === null;

	if (!isUnique) {
		return "Nickname already in use";
	}

	return null;
};

const getPictureIdError = (picture: number) => {
	if (typeof picture !== "number") {
		return "Picture id supplied is not a number";
	}
	if (!Object.keys(AVAILABLE_PROFILE_PICTURES).includes(picture.toString())) {
		return "Picture id supplied is not useable by players";
	}
	return null;
};

const updateCurrentUser: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async (event) => {
	const database = await createDatabaseConnection(logger);

	const { Authorization } = event.headers;
	const { nickname, picture } = event.body;

	const headers = {
		"Access-Control-Allow-Origin": "https://creaturechess.com",
		"Access-Control-Allow-Credentials": true,
	};

	if (!Authorization) {
		return formatJSONResponse(
			{
				message: "No token",
			},
			headers,
			401
		);
	}

	if (!nickname && !picture) {
		return formatJSONResponse(
			{
				message: "No body",
			},
			headers,
			400
		);
	}

	const user = await authenticate(authClient, database, Authorization);

	if (!user) {
		return formatJSONResponse(
			{
				message: "Unauthorized",
			},
			headers,
			401
		);
	}

	if (user.registered) {
		console.log(`Registered user ${user.id} tried to patch`);
		return formatJSONResponse(
			{
				message: "Forbidden",
			},
			headers,
			403
		);
	}

	let outputUser = user;

	let nicknameUpdate: string | null = null;
	let pictureUpdate: number | null = null;

	if (nickname) {
		const trimmedNickname = nickname.trim();
		const nicknameError = await getNicknameError(
			filter,
			database,
			trimmedNickname
		);
		console.log(`setting nickname to ${trimmedNickname}`);

		if (nicknameError) {
			return formatJSONResponse(
				{
					type: "invalid_nickname",
					error: nicknameError,
				},
				headers,
				400
			);
		}

		nicknameUpdate = trimmedNickname;
	}

	if (picture) {
		console.log(`setting nickname to ${picture}`);

		const pictureIdError = getPictureIdError(picture);

		if (pictureIdError) {
			return formatJSONResponse(
				{
					type: "invalid_picture_id",
					error: pictureIdError,
				},
				headers,
				400
			);
		}

		pictureUpdate = picture;
	}

	console.log(
		`about to set nickname ${nicknameUpdate} and picture ${pictureUpdate}`
	);

	const updatedUser = await database.user.setProfileInfo(
		user.id,
		nicknameUpdate,
		pictureUpdate
	);

	outputUser = convertDatabaseUserToUserModel(updatedUser!);

	console.log(`new nick is ${outputUser.nickname}`);

	await authClient.updateAppMetadata(
		{ id: outputUser.authId },
		{
			playerId: outputUser.id,
			playerNickname: outputUser.nickname,
			playerPicture: outputUser.profile?.picture || null,
		}
	);

	return formatJSONResponse(
		{
			user: sanitize(user),
		},
		headers
	);
};

export const main = middyfy(updateCurrentUser);
