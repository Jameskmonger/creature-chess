import { useSyncExternalStore } from "react";

import { SessionIdentity, SessionSource } from "@cc-plugins/api";

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
	getIdentity: () => ({ id: "", name: "Guest", picture: null }),
};

const pluginSources = (): SessionSource[] =>
	pluginRegistry.list().flatMap((plugin) => [...(plugin.sessionSources ?? [])]);

const orderedSources = (): SessionSource[] =>
	[...pluginSources(), guestSource].sort(
		(a, b) => (b.priority ?? 0) - (a.priority ?? 0)
	);

export const resolveHandshake = async (): Promise<HandshakeRequest | null> => {
	for (const source of orderedSources()) {
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

const sameIdentity = (
	a: SessionIdentity | null,
	b: SessionIdentity | null
): boolean =>
	a === b ||
	(!!a && !!b && a.id === b.id && a.name === b.name && a.picture === b.picture);

const computeSession = (): SessionIdentity | null => {
	for (const source of orderedSources()) {
		if (!source.isAvailable()) {
			continue;
		}
		const identity = source.getIdentity?.();
		if (identity) {
			return identity;
		}
	}
	return null;
};

const sessionListeners = new Set<() => void>();
let cachedSession: SessionIdentity | null = computeSession();
let sourceUnsubs: (() => void)[] = [];

const recomputeSession = (): void => {
	const next = computeSession();
	// Keep the reference stable when unchanged so getSnapshot is loop-safe.
	if (!sameIdentity(cachedSession, next)) {
		cachedSession = next;
		sessionListeners.forEach((fn) => fn());
	}
};

const resubscribeSources = (): void => {
	sourceUnsubs.forEach((unsub) => unsub());
	sourceUnsubs = orderedSources()
		.map((source) => source.subscribe?.(recomputeSession))
		.filter((unsub): unsub is () => void => !!unsub);
};

// A newly-registered plugin can add a source, so re-bind and recompute.
pluginRegistry.onChange(() => {
	resubscribeSources();
	recomputeSession();
});
resubscribeSources();

export const getCurrentSession = (): SessionIdentity | null => cachedSession;

export const subscribeSession = (listener: () => void): (() => void) => {
	sessionListeners.add(listener);
	return () => sessionListeners.delete(listener);
};

/** Reactive active display identity for menu UI. */
export const useSession = (): SessionIdentity | null =>
	useSyncExternalStore(subscribeSession, getCurrentSession, getCurrentSession);
