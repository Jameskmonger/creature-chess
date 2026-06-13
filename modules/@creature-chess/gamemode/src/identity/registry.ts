import { PlayerProfile } from "@creature-chess/models";

/**
 * An authenticated socket identity.
 */
export interface ResolvedIdentity {
	/** Provider kind, conventionally equal to the handshake `type`. */
	type: string;
	id: string;
	nickname: string | null;
	profile: PlayerProfile | null;
}

export type IdentityResolution =
	| { ok: true; identity: ResolvedIdentity }
	| { ok: false };

export interface IdentityProvider {
	/** Handshake `type` string this provider claims, e.g. "guest", "player". */
	readonly type: string;
	/** Resolve a handshake's opaque `data` to an identity, or reject. */
	resolve(data: unknown): Promise<IdentityResolution>;
}

/**
 * Open registry of identity providers, keyed by handshake type.
 */
export interface IdentityProviderRegistry {
	readonly types: string[];
	register(provider: IdentityProvider): void;
	resolve(type: string, data: unknown): Promise<IdentityResolution>;
}

export const createIdentityProviderRegistry = (): IdentityProviderRegistry => {
	const byType = new Map<string, IdentityProvider>();

	return {
		get types() {
			return [...byType.keys()];
		},

		register(provider) {
			if (byType.has(provider.type)) {
				throw new Error(`duplicate IdentityProvider type: ${provider.type}`);
			}
			byType.set(provider.type, provider);
		},

		async resolve(type, data) {
			const provider = byType.get(type);
			if (!provider) {
				return { ok: false };
			}
			return provider.resolve(data);
		},
	};
};
