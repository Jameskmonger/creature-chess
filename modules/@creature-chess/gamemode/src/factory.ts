import { DefinesApi, Logger, TypedEventEmitter } from "@cc-engine/kernel";

import { CreatureRegistry, GamemodeSettings } from "@creature-chess/models";

import { Gamemode, GamemodeCallbacks } from "./game/gamemode";
import { IdentityProviderRegistry } from "./identity/registry";
import { PlayerActionRegistry } from "./playerActions/registry";
import { WireProtocol } from "./wireProtocol";

export { CreatureRegistry };

export interface GameplayEvents {
	pieceDeath: { gameId: string; pieceId: string; ownerId: string };
	roundPhaseChange: {
		gameId: string;
		roundNumber: number;
		from: "preparing" | "ready" | "playing" | null;
		to: "preparing" | "ready" | "playing";
	};
	matchSettled: {
		gameId: string;
		homeId: string;
		awayId: string;
		winnerId: string | null;
		damageToLoser: number;
	};
}

export type GameplayEventsBus = TypedEventEmitter<GameplayEvents>;

export type GamemodeContext = {
	defines: DefinesApi;
	creatures: CreatureRegistry;
	events: GameplayEventsBus;
	playerActions: PlayerActionRegistry;
	wire: WireProtocol;
	identity: IdentityProviderRegistry;
};

export type GamemodeInit = {
	id: string;
	logger: Logger;
	settings: GamemodeSettings;
	context: GamemodeContext;
	callbacks?: GamemodeCallbacks;
	seed?: number | number[];
};

export const createGamemode = (init: GamemodeInit): Gamemode => new Gamemode(init);

declare module "@cc-engine/kernel" {
	interface PluginContext {
		creatures: CreatureRegistry;
		events: GameplayEventsBus;
		playerActions: PlayerActionRegistry;
		wire: WireProtocol;
		identity: IdentityProviderRegistry;
	}

	interface Defines {
		economy: {
			healthLostPerPiece: number;
			startingMoney: number;
			startingLevel: number;
			rerollCost: number;
			rerollMultiplier: number;
			buyXpCost: number;
			buyXpAmount: number;
		};
	}
}
