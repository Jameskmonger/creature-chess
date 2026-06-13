import { IdentityProvider } from "@creature-chess/gamemode";

import { logger } from "../log";

const INFO_API_URL =
	process.env.INFO_API_INTERNAL_URL ?? "http://server-info:3000";

type ValidatedGuest = {
	id: string;
	profilePicture: number;
};

async function validateGuestToken(
	token: string
): Promise<ValidatedGuest | null> {
	try {
		const response = await fetch(`${INFO_API_URL}/guest/validate`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});

		if (!response.ok) {
			return null;
		}

		return (await response.json()) as ValidatedGuest;
	} catch (e) {
		logger.error("Failed to reach server-info for token validation", {
			error: e,
		});
		return null;
	}
}

export const createGuestIdentityProvider = (): IdentityProvider => ({
	type: "guest",
	async resolve(data) {
		const token = (data as { accessToken?: unknown } | null)?.accessToken;
		if (typeof token !== "string") {
			return { ok: false };
		}

		const guest = await validateGuestToken(token);
		if (!guest) {
			return { ok: false };
		}

		return {
			ok: true,
			identity: {
				type: "guest",
				id: guest.id,
				// Guests don't have nicknames, they are set by the lobby.
				nickname: null,
				profile: { picture: guest.profilePicture, title: null },
			},
		};
	},
});
