import {
	Card,
	PieceModel,
	PlayerProfile,
	PlayerStreak,
} from "@creature-chess/models";

import type { Player } from "../entities/player/player";
import type { GamemodeApi } from "./gamemode";

export type PlayerSnapshot = {
	id: string;
	name: string;
	profile?: PlayerProfile;

	health: number;
	money: number;
	level: number;
	xp: number;
	streak: PlayerStreak;

	shop: {
		cards: (Card | null)[];
		locked?: boolean;
	};

	board: { piece: PieceModel; x: number; y: number }[];
	bench: { piece: PieceModel; x: number }[];
};

export type GamemodeSnapshot = {
	round: number;
	seed?: number | number[];
	players: PlayerSnapshot[];
};

/**
 * Serialise the current gamemode state into a `GamemodeSnapshot` - the
 * inverse of `Gamemode.hydrate`. Call when state is top of a
 * preparing phase, snapshotting mid-combat captures incoherent state.
 *
 * Card deck and opponent provider rotation are deliberately omitted, hydrate
 * rebuilds them fresh from the seed.
 */
export const captureSnapshot = (
	gamemode: GamemodeApi,
	players: Player[]
): GamemodeSnapshot => {
	const lookupPiece = (id: string, ownerId: string, where: string) => {
		const piece = gamemode.pieceRegistry.getPieceById(id);
		if (!piece) {
			throw new Error(
				`captureSnapshot: piece ${id} on ${ownerId}'s ${where} has no registry entry`
			);
		}
		return piece;
	};

	const playerSnapshots: PlayerSnapshot[] = players.map((player) => ({
		id: player.id,
		name: player.name,
		profile: player.profile,
		health: player.health,
		money: player.money,
		level: player.level,
		xp: player.xp,
		streak: player.streak,
		shop: {
			cards: player.cards,
			locked: player.shopLocked,
		},
		board: player.board.mapPieces((id, x, y) => ({
			piece: lookupPiece(id, player.id, "board"),
			x,
			y,
		})),
		bench: player.bench.mapPieces((id, x) => ({
			piece: lookupPiece(id, player.id, "bench"),
			x,
		})),
	}));

	return {
		round: gamemode.getRoundInfo().round,
		players: playerSnapshots,
	};
};
