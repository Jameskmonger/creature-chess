import {
	PieceModel,
	QuickChatOption,
	RoundInfoState,
} from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";
import { PositionKey } from "@creature-chess/board";

type ActionStreamPacket = {
	type: string;
	payload?: any;
};

export type GameConnectionPacket = {
	players: PlayerListPlayer[];
	game: RoundInfoState;
	settings: GamemodeSettings;
};

export type AuthenticateResponse = {
	error?: { type: "not_registered" } | { type: "authentication" };
};

export type BoardUpdatePacket = {
	positions: Record<PositionKey, PieceModel["id"]>;
	pieces: PieceModel[];
};
export type MatchBoardUpdatePacket = {
	turn: number | null;
	board: BoardUpdatePacket;
};
type QuickChatPacket = {
	phrase: QuickChatOption;
};

export type Events = {
	gameConnected: (payload: GameConnectionPacket) => void;
	boardUpdate: (payload: BoardUpdatePacket) => void;
	benchUpdate: (payload: BoardUpdatePacket) => void;
	matchBoardUpdate: (payload: MatchBoardUpdatePacket) => void;
	spectatingPlayerUpdate: (payload: string | null) => void;
	sendGameEvents: (payload: ActionStreamPacket) => void;
	sendLocalPlayerEvents: (payload: ActionStreamPacket) => void;
	playerInfoUpdates: (payload: ActionStreamPacket) => void;
};
