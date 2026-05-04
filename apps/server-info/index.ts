import { randomBytes } from "crypto";
import express from "express";
import { logger as expressWinston } from "express-winston";

import { logger } from "./src/log";

const app = express();
const PORT = 3000;

type Guest = {
	id: string;
	token: string;
	expiresAt: Date;
	profilePicture: number;
};

const guestsByToken = new Map<string, Guest>();
const guestIds = new Set<string>();

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

function guestCleanUpProcess() {
	setInterval(() => {
		const now = Date.now();
		for (const [token, guest] of guestsByToken) {
			if (guest.expiresAt.getTime() <= now) {
				guestsByToken.delete(token);
				guestIds.delete(guest.id);
			}
		}
	}, 60000);
}

function getNewToken() {
	let token: string;
	do {
		token = randomBytes(32).toString("base64url");
	} while (guestsByToken.has(token));
	return token;
}

function getNewGuestId() {
	let id: string;
	do {
		id = (Math.floor(Math.random() * 10000) + 1).toString().padStart(4, "0");
	} while (guestIds.has(id));
	return id;
}

guestCleanUpProcess();

app.get("/guest/session", (_req, res) => {
	const existingToken = res.locals.cookie["guest-token"];

	let account: Guest | null = null;

	if (existingToken) {
		const existing = guestsByToken.get(existingToken);
		if (existing && existing.expiresAt.getTime() > Date.now()) {
			account = existing;
		}
	}

	if (!account) {
		const id = getNewGuestId();
		const newToken = getNewToken();
		const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

		account = {
			id,
			token: newToken,
			expiresAt: expiryDate,
			profilePicture: Math.floor(Math.random() * 36) + 1,
		};

		guestsByToken.set(newToken, account);
		guestIds.add(id);

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

app.post("/guest/validate", (req, res) => {
	const token = typeof req.body?.token === "string" ? req.body.token : null;
	if (!token) {
		res.status(400).json({ error: "token required" });
		return;
	}

	const guest = guestsByToken.get(token);
	if (!guest || guest.expiresAt.getTime() <= Date.now()) {
		res.status(401).json({ error: "invalid or expired token" });
		return;
	}

	res.status(200).json({
		id: guest.id,
		profilePicture: guest.profilePicture,
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
