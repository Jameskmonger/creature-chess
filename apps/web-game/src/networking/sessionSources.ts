import { SessionSource } from "@cc-plugins/api";

import { HandshakeRequest } from "@creature-chess/networking";

import { pluginRegistry } from "~/plugins/registry";

const getGuestSession = async (): Promise<{
	id: string;
	token: string;
} | null> => {
	const response = await fetch(APP_API_URL + "/guest/session", {
		headers: { "Content-Type": "application/json" },
	});

	if (!response.ok) {
		return null;
	}

	const { id, token } = await response.json();
	return { id, token } as { id: string; token: string };
};

const guestSource: SessionSource = {
	id: "guest",
	priority: 0,
	isAvailable: () => true,
	createHandshake: async () => {
		const session = await getGuestSession();
		if (!session) {
			return null;
		}
		return { type: "guest", data: { accessToken: session.token } };
	},
};

const pluginSources = (): SessionSource[] =>
	pluginRegistry.list().flatMap((plugin) => [...(plugin.sessionSources ?? [])]);

export const resolveHandshake = async (): Promise<HandshakeRequest | null> => {
	const ordered = [...pluginSources(), guestSource].sort(
		(a, b) => (b.priority ?? 0) - (a.priority ?? 0)
	);

	for (const source of ordered) {
		if (!source.isAvailable()) {
			continue;
		}
		const request = await source.createHandshake();
		if (request) {
			return request;
		}
	}

	return null;
};
