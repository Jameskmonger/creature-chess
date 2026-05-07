export { Gamemode } from "./src/game";

export {
	type Player,
	createPlayer,
	type PlayerState,
	initialPlayerState,
	PlayerCommands,
	PlayerEvents,
} from "./src/entities/player";
export { buildPlayerSnapshot } from "./src/entities/player/state/wireFields";
export {
	type PlayerInfoState,
	initialPlayerInfoState,
	type PlayerMatchRewards,
} from "./src/entities/player/state/playerInfo";
export {
	type CardShopState,
	initialCardShopState,
} from "./src/entities/player/state/cardShop";
export {
	type SpectatingState,
	initialSpectatingState,
} from "./src/entities/player/state/spectating";
export {
	type PlayerAction,
	PlayerActionTypesArray,
	dispatchIncomingPlayerAction,
	dispatchTrustedPlayerAction,
} from "./src/playerActions";
export * as PlayerActions from "./src/playerActions";
export {
	quickChatPlayerAction,
	quitGamePlayerAction,
	spectatePlayerAction,
} from "./src/playerActions";

export * as GameEvents from "./src/game/events";
export { type GameFinishEvent } from "./src/game/events";

export { Match } from "./src/game/match";

export { getXpToNextLevel } from "./src/player/xp";
export { getPiecesForStage } from "./src/game/evolution";
