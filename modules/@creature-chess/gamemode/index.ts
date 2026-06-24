// Side-effect: ambient client region-class declaration-merge.
import "./src/clientRegions";

export type {
	GameplayEvents,
	GameplayEventsBus,
	GameStanding,
	CreatureRegistry,
	GamemodeInit,
	GamemodeContext,
} from "./src/factory";
export { createGamemode } from "./src/factory";
export {
	WireProtocol,
	type OutboundChannel,
	type ValidatePayloadResult,
} from "./src/wireProtocol";
export {
	createCreatureRegistry,
	createDefaultGamemodeContext,
	createDefines,
	createGameplayEventsBus,
	createBuiltInPlayerActionRegistry,
	createBuiltInWireProtocol,
	seedCoreWire,
	resolveSettings,
	seedDefines,
} from "./src/coreBootstrap";

export {
	Gamemode,
	type GamemodeApi,
	type GamemodeCallbacks,
} from "./src/game/gamemode";
export {
	type Player,
	type PlayerState,
	initialPlayerState,
} from "./src/entities/player";
export { buildPlayerSnapshot } from "./src/entities/player/state/wireFields";
export {
	type PlayerInfoState,
	initialPlayerInfoState,
} from "./src/entities/player/state/playerInfo";
export {
	type PlayerActionDef,
	type PlayerActionRegistry,
	type DispatchResult,
	definePlayerAction,
	createPlayerActionRegistry,
} from "./src/playerActions/registry";
export { registerCorePlayerActions } from "./src/playerActions";
export {
	type IdentityProvider,
	type IdentityProviderRegistry,
	type IdentityResolution,
	type ResolvedIdentity,
	createIdentityProviderRegistry,
} from "./src/identity/registry";

export { Match } from "./src/game/match";
