import express from "express";
import { logger as expressWinston } from "express-winston";

import {
	authenticate,
	convertDatabaseUserToUserModel,
} from "@cc-server/auth";
import {
	createDatabaseConnection,
	DatabaseConnection,
} from "@creature-chess/data";
import {
	AVAILABLE_PROFILE_PICTURES,
	validateNicknameFormat,
} from "@creature-chess/models";

import { logger } from "./src/log";
import { getManagementClient } from "./src/util/auth0";
import { userModelToDto } from "./src/util/user-model-to-dto";

import Filter = require("bad-words");

const app = express();
const PORT = 3000;

// Define a middleware to parse JSON requests
app.use(express.json());
app.use(expressWinston({ winstonInstance: logger }));

app.use((req, res, next) => {
	const { headers: { cookie } } = req;
	if (cookie) {
		const values = cookie.split(";").reduce((acc, item) => {
			const data = item.trim().split("=");
			return { ...acc, [data[0]]: data[1] };
		}, {});
		res.locals.cookie = values;
	} else {
		res.locals.cookie = {};
	}
	next();
});

async function getNicknameUpdate(
	database: DatabaseConnection,
	filter: Filter,
	body: { nickname?: string }
): Promise<{ error: string | null; nickname: string | null }> {
	const { nickname } = body;

	if (!nickname) {
		return { error: null, nickname: null };
	}

	const trimmedNickname = nickname.trim();

	const nicknameError = validateNicknameFormat(nickname);

	if (nicknameError) {
		return { error: nicknameError, nickname: null };
	}

	if (filter.isProfane(nickname)) {
		return { error: "Profanity filter", nickname: null };
	}

	const isUnique = (await database.user.getByNickname(nickname)) === null;

	if (!isUnique) {
		return { error: "Nickname already in use", nickname: null };
	}

	return { error: null, nickname: trimmedNickname };
}

async function getPictureUpdate(body: {
	picture?: string;
}): Promise<{ error: string | null; picture: number | null }> {
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

function guestCleanUpProcess(database: DatabaseConnection) {
	setInterval(async () => {
		const now = new Date();
		await database.prisma.guests.deleteMany({
			where: {
				expires_at: {
					lte: now,
				},
			},
		});
	}, 60000); // Check every minute
}

async function startServer() {
	const authClient = getManagementClient();
	const filter = new Filter();

	const database = await createDatabaseConnection(logger);

	guestCleanUpProcess(database);

	async function getNewToken() {
		let token: string | null = null;

		do {
			// TODO make this secure
			const newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			const existing = await database.prisma.guests.findFirst({
				where: {
					token: newToken,
					expires_at: {
						gte: new Date()
					}
				}
			});

			if (!existing) {
				token = newToken;
			}
		} while (token === null);

		return token;
	}

	async function getNewGuestId() {
		let id: string | null = null;

		do {
			// random between 0001 and 9999 as string with leading zeros
			const newId = (Math.floor(Math.random() * 10000) + 1).toString().padStart(4, "0");

			const existing = await database.prisma.guests.findFirst({
				where: {
					id: newId
				}
			});

			if (!existing) {
				id = newId;
			}
		} while (id === null);

		return id;
	}

	app.get("/guest/session", async (req, res) => {
		const token = res.locals.cookie["guest-token"];

		let account: ({ id: string }) | null = null;

		if (token) {
			// check its valid
			account = await database.prisma.guests.findFirst({
				where: {
					token,
					expires_at: {
						gte: new Date()
					}
				}
			});

			account ??= null;
		}

		if (!account) {
			const id = await getNewGuestId();
			const newToken = await getNewToken();

			// expire in 1 hour
			const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

			// create a new guest user
			account = await database.prisma.guests.create({
				data: {
					id,
					token: newToken,
					expires_at: expiryDate
				}
			});

			// set cookie "guest-token" to the token
			res.cookie("guest-token", newToken, {
				expires: expiryDate,

				// TODO improve security here, this is a temporary solution as it's only for guests
				httpOnly: false
			});
		}

		res.status(200).json({
			id: account.id
		});
	});

	app.get("/user/current", async (req, res) => {
		const { authorization } = req.headers;

		if (!authorization) {
			logger.info("No authorization header found");

			return res.status(401).json({
				message: "Not authorized",
			});
		}

		const user = await authenticate(
			authClient,
			database,
			authorization as string
		);

		res.status(200).json(userModelToDto(user));
	});

	app.patch("/user/current", async (req, res) => {
		const { authorization } = req.headers;

		if (!authorization) {
			logger.info("No authorization header found");

			return res.status(401).json({
				message: "Not authorized",
			});
		}

		const user = await authenticate(
			authClient,
			database,
			authorization as string
		);

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

		res.status(200).json(userModelToDto(convertDatabaseUserToUserModel(updatedUser)));
	});

	// Start the server
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
}

startServer().catch((e) => {
	logger.error("An error occurred while starting the server", e);
	process.exit(1);
});
