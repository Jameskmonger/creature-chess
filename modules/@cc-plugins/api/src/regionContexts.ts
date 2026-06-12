/**
 * Typed context payloads for Region classes. The host that declares a
 * class augments this via declaration merging.
 *
 * @example
 * ```ts
 * declare module "@cc-plugins/api" {
 *   interface RegionContexts {
 *     "player-avatar": { playerId: string };
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegionContexts {}

/** Context type for a region class, or `unknown` if none is declared. */
export type RegionCtxFor<C extends string> = C extends keyof RegionContexts
	? RegionContexts[C]
	: unknown;
