import { protocol, ActionStream } from "@shoki/networking";
import { BoardState } from "@shoki/board";
import { PieceModel, PlayerListPlayer, QuickChatOption, RoundInfoState } from "@creature-chess/models";

export type GameConnectionPacket = {
	players: PlayerListPlayer[];
	game: RoundInfoState;
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
	phrase: QuickChatOption;
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
