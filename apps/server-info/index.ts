import { authenticate, convertDatabaseUserToUserModel } from "@creature-chess/auth-server";
import { createDatabaseConnection, DatabaseConnection } from "@creature-chess/data";
import {
	AVAILABLE_PROFILE_PICTURES,
	validateNicknameFormat,
} from "@creature-chess/models";


import express from "express";
import { logger as expressWinston } from "express-winston";

import Filter = require("bad-words");

import { logger } from "./src/log";
import { getManagementClient } from "./src/util/auth0";
import { sanitize } from "./src/util/sanitize-user";

const app = express();
const PORT = 3000;

// Define a middleware to parse JSON requests
app.use(express.json());
app.use(expressWinston({ winstonInstance: logger }));

async function getNicknameUpdate(database: DatabaseConnection, filter: Filter,
	body: { nickname?: string }): Promise<{ error: string | null; nickname: string | null }> {
	const { nickname } = body;

	if (!nickname) {
		return { error: null, nickname: null };
	}

	const trimmedNickname = nickname.trim();

	const nicknameError = validateNicknameFormat(nickname);

	if (nicknameError) {
		return { error: nicknameError, nickname: null };
	};

	if (filter.isProfane(nickname)) {
		return { error: "Profanity filter", nickname: null };
	}

	const isUnique = (await database.user.getByNickname(nickname)) === null;

	if (!isUnique) {
		return { error: "Nickname already in use", nickname: null };
	}

	return { error: null, nickname: trimmedNickname };
}

async function getPictureUpdate(body: { picture?: string }): Promise<{ error: string | null; picture: number | null }> {
	const { picture } = body;

	if (!picture) {
		return { error: null, picture: null };
	}

	const pictureId = parseInt(picture, 10);

	if (isNaN(pictureId)) {
		return { error: "Invalid picture id", picture: null };
	}

	if (!Object.keys(AVAILABLE_PROFILE_PICTURES).includes(picture.toString())) {
		return { error: "Picture id supplied is not useable", picture: null };
	}

	return { error: null, picture: pictureId };
}

async function startServer() {
	const authClient = getManagementClient();
	const filter = new Filter();

	const database = await createDatabaseConnection(logger);

	app.get("/user/current", async (req, res) => {
		const { authorization } = req.headers;

		if (!authorization) {
			logger.info("No authorization header found");

			return res.status(401).json({
				message: "Not authorized",
			});
		}

		const user = await authenticate(authClient, database, authorization as string);

		res.status(200).json(sanitize(user));
	});

	app.patch("/user/current", async (req, res) => {
		const { authorization } = req.headers;

		if (!authorization) {
			logger.info("No authorization header found");

			return res.status(401).json({
				message: "Not authorized",
			});
		}

		const user = await authenticate(authClient, database, authorization as string);

		if (!user) {
			logger.info("No user found");

			return res.status(401).json({
				message: "Not authorized",
			});
		}

		if (user.registered) {
			console.log(`Registered user ${user.id} tried to patch`);

			return res.status(403).json({
				message: "Forbidden",
			});
		}

		const nicknameUpdate = await getNicknameUpdate(database, filter, req.body);

		if (nicknameUpdate.error) {
			return res.status(400).json({
				message: nicknameUpdate.error,
			});
		}

		const pictureUpdate = await getPictureUpdate(req.body);

		if (pictureUpdate.error) {
			return res.status(400).json({
				message: pictureUpdate.error,
			});
		}

		const updatedUser = await database.user.setProfileInfo(
			user.id,
			nicknameUpdate.nickname,
			pictureUpdate.picture
		);

		if (!updatedUser) {
			return res.status(500).json({
				message: "An error occurred while updating the user",
			});
		}

		res.status(200).json(sanitize(convertDatabaseUserToUserModel(updatedUser)));
	});

	// Start the server
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
}

startServer()
	.catch((e) => {
		logger.error("An error occurred while starting the server", e);
		process.exit(1);
	});
