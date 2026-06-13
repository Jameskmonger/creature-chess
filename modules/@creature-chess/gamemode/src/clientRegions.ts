import "@cc-plugins/api";

import type {
	Card,
	GamePhase,
	LobbyPlayer,
	PlayerMatchRewards,
	PlayerPieceLocation,
} from "@creature-chess/models";

declare module "@cc-plugins/api" {
	interface RegionContexts {
		/** Rendered next to a player's avatar. */
		"player-avatar": { playerId: string };
		/** A row in the player-list overlay. */
		"player-list-row": { playerId: string; position: number };
		/** HUD strip with the local player's level, xp, and money. */
		"player-profile-bar": { level: number; xp: number; money: number };

		/** A piece tile on a board (board or bench). */
		"player-piece-tile": {
			pieceId: string;
			ownerId: string;
			definitionId: number;
			stage: number;
			location: PlayerPieceLocation;
		};
		/** A card slot in the shop; `card` is null on a sold slot. */
		"card-shop-card": { cardIndex: number; card: Card | null };

		/** The body of an overlay. */
		"overlay-content": { localPlayerId?: string };
		/** The post-match rewards summary block. */
		"match-rewards-summary": { rewards: PlayerMatchRewards };

		/**
		 * The phase countdown. ctx covers everything a replacement needs:
		 * absolute end time, phase duration (`null` when no phase is
		 * running), and `gameOver` when the local player is out.
		 */
		"phase-timer": {
			phaseEndTimeSeconds: number | null;
			phaseDurationSeconds: number | null;
			gameOver: boolean;
		};
		/** The whole board area (board + bench), under the pieces. */
		"board-surface": { isMatch: boolean; isPreparing: boolean };

		/** A player slot in the pre-game lobby. */
		"lobby-player-slot": {
			slotIndex: number;
			player: LobbyPlayer | null;
		};
		/** The main-menu home card body. */
		"main-menu": Record<string, never>;
		/** Strip at the top of the menu, above the main card. */
		"menu-header": Record<string, never>;
		/** A section in the settings overlay. */
		"settings-section": Record<string, never>;

		/** Persistent app-level extension surface, mounted across routes. */
		"app-extension": Record<string, never>;
	}

	/** Host build-time values exposed at `runtime.config`. */
	interface ClientPluginHostConfig {
		appUrl: string;
		apiUrl: string;
		imageUrl: string;
		version: string;
	}

	/** Host-state selectors exposed at `runtime.host`. */
	interface ClientPluginHostSelectors {
		/** The signed-in player's id, or null if not yet known. */
		getLocalPlayerId(): string | null;
		/** The active phase, or null outside a game. */
		getCurrentPhase(): GamePhase | null;
	}
}
