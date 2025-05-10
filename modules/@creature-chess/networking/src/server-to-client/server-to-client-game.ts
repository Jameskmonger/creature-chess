import { BoardState } from "@shoki/board";
import { protocol, ActionStream } from "@shoki/networking";

import {
	PieceModel,
	QuickChatOption,
	RoundInfoState,
} from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";

export type GameConnectionPacket = {
	players: PlayerListPlayer[];
	game: RoundInfoState;
	settings: GamemodeSettings;
};

export type AuthenticateResponse = {
	error?: { type: "not_registered" } | { type: "authentication" };
};

type BoardUpdatePacket = BoardState<PieceModel>;
type MatchBoardUpdatePacket = {
	turn: number | null;
	board: BoardUpdatePacket;
};
type QuickChatPacket = {
	phrase: typeof QuickChatOption;
};

export type PacketSet = {
	gameConnected: {
		payload: GameConnectionPacket;
		ack: never;
	};
	boardUpdate: {
		payload: BoardUpdatePacket;
		ack: never;
	};
	benchUpdate: {
		payload: BoardUpdatePacket;
		ack: never;
	};
	matchBoardUpdate: {
		payload: MatchBoardUpdatePacket;
		ack: never;
	};
	spectatingPlayerUpdate: {
		payload: string | null;
		ack: never;
	};

	sendGameEvents: ActionStream.ActionStreamPacket;
	sendLocalPlayerEvents: ActionStream.ActionStreamPacket;
	playerInfoUpdates: ActionStream.ActionStreamPacket;
};

export const { incoming, outgoing } = protocol<PacketSet>();
