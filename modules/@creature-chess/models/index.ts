export type { Card } from "./src/card";
export type { PieceModel, IndexedPieces } from "./src/piece";
export type { PlayerPieceLocation } from "./src/playerPieceLocation";

export { GamePhase } from "./src/game-phase";
export type { RoundInfoState } from "./src/roundInfoState";

export type {
	CreatureDefinition,
	CreatureStats,
	CreatureOrigin,
	CreatureLookup,
} from "./src/creatureDefinition";
export { CreatureRegistry } from "./src/creatureDefinition";

export * as Builders from "./src/builders";
export { buildDefinition, buildPieceModel, buildCard } from "./src/builders";

export { MAX_LEVEL, MAX_HEALTH, PIECES_TO_EVOLVE } from "./config";
export { type GamemodeSettings, GamemodeSettingsPresets } from "./settings";
export {
	PlayerStatus,
	PlayerBattleStatus,
	type PlayerListPlayer,
	type PlayerBattle,
	inProgressBattle,
	finishedBattle,
} from "./game/playerList";
export type { LobbyPlayer } from "./lobby/player";
export {
	type PlayerProfile,
	CREATURE_PICTURE_PREFIX,
	creaturePicture,
	ASSET_PICTURE_PREFIX,
	assetPicture,
	type PlayerStreak,
	StreakType,
	type PlayerTitle,
} from "./player";
export {
	type Trait,
	type TraitId,
	type TraitSet,
	allTraits,
	allTraitsMap,
} from "./gamemode/traits";

// Wire vocabulary - neutral protocol package the host and plugins both
// import from, so the host never reaches into a specific plugin for
// vocabulary (the agnostic-host principle).
export * as PlayerActions from "./src/wire/playerActions";
export * from "./src/wire/playerActions";
export * from "./src/wire/quickChat";
export * as GameEvents from "./src/wire/gameEvents";
export * from "./src/wire/gameEvents";
export * as ClientUi from "./src/wire/clientUi";
export * from "./src/wire/clientUi";
export * as PlayerEvents from "./src/wire/playerEvents";
export * from "./src/wire/playerEvents";
export * as QuickChat from "./src/wire/quickChat";
export * as PlayerCommands from "./src/wire/playerCommands";
export * from "./src/wire/playerCommands";
// Only PlayerMatchRewards is flat-exported here; playerInfoCommands /
// PlayerInfoUpdateCommand reach the surface via playerCommands' re-export,
// so an `export *` would collide.
export { type PlayerMatchRewards } from "./src/wire/playerInfoCommands";

// Utility funcs the client legitimately needs for display (compute
// from local state). Lives here, not in a specific plugin.
export { getXpToNextLevel } from "./src/utils/xp";
export { getPiecesForStage } from "./src/utils/evolution";
