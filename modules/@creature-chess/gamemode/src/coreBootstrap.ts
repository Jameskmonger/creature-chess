import { DefinesApi, TypedEventEmitter } from "@cc-engine/kernel";

import {
	CreatureRegistry,
	GamemodeSettings,
	GamemodeSettingsPresets,
	gameEventCreators,
	playerInfoUpdateCreators,
	wirePlayerEventCreators,
} from "@creature-chess/models";

import {
	GameplayEvents,
	GameplayEventsBus,
	GamemodeContext,
} from "./factory";
import { registerCorePlayerActions } from "./playerActions";
import {
	PlayerActionRegistry,
	createPlayerActionRegistry,
} from "./playerActions/registry";
import { WireProtocol } from "./wireProtocol";

// Maps gameplay settings to the defines paths a mod patches to override them.
// Seeded with the preset defaults (core origin) so `defines.patch(path, …)`
// works; resolveSettings only adopts a path a *plugin* has written, leaving the
// per-game settings untouched otherwise.
const SETTINGS_DEFINE_PATHS: readonly (readonly [
	keyof GamemodeSettings,
	string,
])[] = [
	["healthLostPerPiece", "economy.healthLostPerPiece"],
	["startingMoney", "economy.startingMoney"],
	["startingLevel", "economy.startingLevel"],
	["rerollCost", "economy.rerollCost"],
	["rerollMultiplier", "economy.rerollMultiplier"],
	["buyXpCost", "economy.buyXpCost"],
	["buyXpAmount", "economy.buyXpAmount"],
] as const;

export const seedDefines = (defines: DefinesApi): DefinesApi => {
	const preset = GamemodeSettingsPresets.default;
	for (const [settingsKey, definesPath] of SETTINGS_DEFINE_PATHS) {
		defines.set(definesPath, preset[settingsKey]);
	}
	return defines;
};

export const createDefines = (): DefinesApi => seedDefines(new DefinesApi());

export const createCreatureRegistry = (): CreatureRegistry =>
	new CreatureRegistry();

export const createGameplayEventsBus = (): GameplayEventsBus =>
	new TypedEventEmitter<GameplayEvents>();

export const createBuiltInPlayerActionRegistry = (
	wire?: WireProtocol
): PlayerActionRegistry => {
	const registry = createPlayerActionRegistry(wire);
	registerCorePlayerActions(registry);
	return registry;
};

export const seedCoreWire = (wire: WireProtocol): WireProtocol => {
	for (const creator of gameEventCreators) {
		wire.addOutbound("gameEvents", creator);
	}
	for (const creator of wirePlayerEventCreators) {
		wire.addOutbound("playerEvents", creator);
	}
	for (const creator of playerInfoUpdateCreators) {
		wire.addOutbound("playerInfoUpdates", creator);
	}
	return wire;
};

export const createBuiltInWireProtocol = (): WireProtocol =>
	seedCoreWire(new WireProtocol());

export const resolveSettings = (
	raw: GamemodeSettings,
	defines: DefinesApi
): GamemodeSettings => {
	const out: GamemodeSettings = { ...raw };
	for (const [settingsKey, definesPath] of SETTINGS_DEFINE_PATHS) {
		const origin = defines.originOf(definesPath);

		if (origin && origin !== "core") {
			(out as Record<string, unknown>)[settingsKey] = defines.get(definesPath);
		}
	}
	return out;
};

export const createDefaultGamemodeContext = (): GamemodeContext => {
	const wire = createBuiltInWireProtocol();
	const playerActions = createBuiltInPlayerActionRegistry(wire);
	return {
		defines: createDefines(),
		creatures: createCreatureRegistry(),
		events: createGameplayEventsBus(),
		playerActions,
		wire,
	};
};
