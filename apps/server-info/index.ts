import { randomBytes } from "crypto";
import express from "express";
import { logger as expressWinston } from "express-winston";

import { createDatabaseConnection, DatabaseConnection } from "@cc-server/data";

import { logger } from "./src/log";

const app = express();
const PORT = 3000;

// Define a middleware to parse JSON requests
app.use(express.json());
app.use(expressWinston({ winstonInstance: logger }));

app.use((req, res, next) => {
	const {
		headers: { cookie },
	} = req;
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
	const database = await createDatabaseConnection(logger);

	guestCleanUpProcess(database);

	async function getNewToken() {
		let token: string | null = null;

		do {
			const newToken = randomBytes(32).toString("base64url");

			const existing = await database.prisma.guests.findFirst({
				where: {
					token: newToken,
					expires_at: {
						gte: new Date(),
					},
				},
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
			const newId = (Math.floor(Math.random() * 10000) + 1)
				.toString()
				.padStart(4, "0");

			const existing = await database.prisma.guests.findFirst({
				where: {
					id: newId,
				},
			});

			if (!existing) {
				id = newId;
			}
		} while (id === null);

		return id;
	}

	app.get("/guest/session", async (req, res) => {
		const existingToken = res.locals.cookie["guest-token"];

		let account: { id: string; token: string } | null = null;

		if (existingToken) {
			account = await database.prisma.guests.findFirst({
				where: {
					token: existingToken,
					expires_at: {
						gte: new Date(),
					},
				},
			});

			account ??= null;
		}

		if (!account) {
			const id = await getNewGuestId();
			const newToken = await getNewToken();

			const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

			account = await database.prisma.guests.create({
				data: {
					id,
					token: newToken,
					expires_at: expiryDate,

					profile_picture: Math.floor(Math.random() * 36) + 1,
				},
			});

			res.cookie("guest-token", newToken, {
				expires: expiryDate,
				httpOnly: true,
			});
		}

		res.status(200).json({
			id: account.id,
			token: account.token,
		});
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
