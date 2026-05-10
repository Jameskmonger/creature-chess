export type { Card } from "./src/card";
export type { PieceModel, IndexedPieces } from "./src/piece";
export type { PlayerPieceLocation } from "./src/playerPieceLocation";

export { GamePhase } from "./src/game-phase";
export type { RoundInfoState } from "./src/roundInfoState";

export type {
	CreatureDefinition,
	CreatureStats,
} from "./src/creatureDefinition";

export {
	QuickChatOption,
	type QuickChatValue,
	ReadyQuickChatOptions,
	FinishedQuickChatOptions,
	getQuickChatOptions,
} from "./src/quickChat";

export * as Builders from "./src/builders";
export { buildDefinition, buildPieceModel, buildCard } from "./src/builders";

export { getDefinitionById, getAllDefinitions } from "./src/definitions";

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
