import { PositionKey } from "@creature-chess/board";
import {
	CreatureDefinition,
	PieceModel,
	RoundInfoState,
} from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

type ActionStreamPacket = {
	type: string;
	payload?: any;
};

/**
 * One creature catalog entry over the wire.
 */
export type WireCreatureEntry = {
	definition: CreatureDefinition;
	/**
	 * The plugin that registered this creature.
	 */
	ownerPluginId: string;
};

export type GameConnectionPacket = {
	players: PlayerListPlayer[];
	game: RoundInfoState;
	settings: GamemodeSettings;
	/** Snapshot of the server's creature registry at game start. */
	creatures: WireCreatureEntry[];
};

export type AuthenticateResponse = {
	error?: { type: "authentication" };
	/**
	 * The resolved identity ID of the connecting player, if the handshake succeeded.
	 */
	id?: string;
};

export type BoardUpdatePacket = {
	positions: Record<PositionKey, PieceModel["id"]>;
	pieces: PieceModel[];
};
export type MatchBoardUpdatePacket = {
	turn: number | null;
	board: BoardUpdatePacket;
};
export type Events = {
	gameConnected: (payload: GameConnectionPacket) => void;
	snapshot: (payload: ActionStreamPacket[]) => void;
	boardUpdate: (payload: BoardUpdatePacket) => void;
	benchUpdate: (payload: BoardUpdatePacket) => void;
	matchBoardUpdate: (payload: MatchBoardUpdatePacket) => void;
	spectatingPlayerUpdate: (payload: string | null) => void;
	sendGameEvents: (payload: ActionStreamPacket) => void;
	sendLocalPlayerEvents: (payload: ActionStreamPacket) => void;
	playerInfoUpdates: (payload: ActionStreamPacket) => void;
};
