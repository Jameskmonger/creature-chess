import { Card, GamePhase, PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { BoardState } from "@creature-chess/board";
import { RoundInfoState } from "@creature-chess/gamemode";
import { EmptyPacket } from "../empty-packet";

export type GameConnectionPacket = {
	players: PlayerListPlayer[];

	// todo check which props we're sending here - no `ready` for example
	playerInfo: {
		health: number;
		opponentId: string | null;
		shopLocked: boolean;
		money: number;
		level: number;
		xp: number;
		cards: (Card | null)[];
	};

	game: RoundInfoState;
};

export type PreparingPhaseUpdatePacket = {
	startedAtSeconds: number,
	phase: GamePhase.PREPARING,
	payload: {
		round: number;
		pieces: {
			board: BoardState;
			bench: BoardState;
		};
		cards: (Card | null)[];
	}
};

export type ReadyPhaseUpdatePacket = {
	startedAtSeconds: number,
	phase: GamePhase.READY,
	payload: {
		board: BoardState;
		bench: BoardState;
		opponentId: string
	}
};

type PlayingPhaseUpdatePacket = ({ startedAtSeconds: number, phase: GamePhase.PLAYING });

export type PhaseUpdatePacket =
	PreparingPhaseUpdatePacket
	| ReadyPhaseUpdatePacket
	| PlayingPhaseUpdatePacket;

type LevelUpdatePacket = {
	level: number;
	xp: number;
};

type FinishGamePacket = {
	winnerId: string;
};

export type AuthenticateResponse = {
	error?: { type: "not_registered" } | { type: "authentication" };
};

type MatchRewardsPacket = {
	damage: number;
	justDied: boolean;
	rewardMoney: { total: number, base: number, winBonus: number, streakBonus: number, interest: number };
} | null;

type BoardUpdatePacket = BoardState<PieceModel>;
type MatchBoardUpdatePacket = {
	turn: number | null,
	board: BoardUpdatePacket
};

export enum PacketOpcodes {
	GAME_CONNECTED = "gameConnected",
	BENCH_UPDATE = "benchUpdate",
	BOARD_UPDATE = "boardUpdate",
	MATCH_BOARD_UPDATE = "matchBoardUpdate",
	SPECTATING_PLAYER_UPDATE = "spectatingPlayerUpdate",
	CARDS_UPDATE = "cardsUpdate",
	PLAYER_LIST_UPDATE = "playerListUpdate",
	PHASE_UPDATE = "phaseUpdate",
	MONEY_UPDATE = "moneyUpdate",
	HEALTH_UPDATE = "healthUpdate",
	LEVEL_UPDATE = "levelUpdate",
	FINISH_GAME = "finishGame",
	SHOP_LOCK_UPDATE = "shopLockUpdate",
	MATCH_REWARDS = "matchRewards",
	PLAYER_DEAD = "playerDead"
}

export type PacketDefinitions = {
	[PacketOpcodes.GAME_CONNECTED]: GameConnectionPacket,
	[PacketOpcodes.BENCH_UPDATE]: BoardUpdatePacket,
	[PacketOpcodes.BOARD_UPDATE]: BoardUpdatePacket,
	[PacketOpcodes.MATCH_BOARD_UPDATE]: MatchBoardUpdatePacket,
	[PacketOpcodes.SPECTATING_PLAYER_UPDATE]: string | null,
	[PacketOpcodes.CARDS_UPDATE]: (Card | null)[],
	[PacketOpcodes.PLAYER_LIST_UPDATE]: PlayerListPlayer[],
	[PacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket,
	[PacketOpcodes.MONEY_UPDATE]: number,
	[PacketOpcodes.HEALTH_UPDATE]: number,
	[PacketOpcodes.LEVEL_UPDATE]: LevelUpdatePacket,
	[PacketOpcodes.FINISH_GAME]: FinishGamePacket,
	[PacketOpcodes.SHOP_LOCK_UPDATE]: boolean,
	[PacketOpcodes.MATCH_REWARDS]: MatchRewardsPacket,
	[PacketOpcodes.PLAYER_DEAD]: EmptyPacket,
};

export type PacketAcknowledgements = {
	[PacketOpcodes.GAME_CONNECTED]: never,
	[PacketOpcodes.BENCH_UPDATE]: never,
	[PacketOpcodes.BOARD_UPDATE]: never,
	[PacketOpcodes.MATCH_BOARD_UPDATE]: never,
	[PacketOpcodes.SPECTATING_PLAYER_UPDATE]: never,
	[PacketOpcodes.CARDS_UPDATE]: never,
	[PacketOpcodes.PLAYER_LIST_UPDATE]: never,
	[PacketOpcodes.PHASE_UPDATE]: never,
	[PacketOpcodes.MONEY_UPDATE]: never,
	[PacketOpcodes.HEALTH_UPDATE]: never,
	[PacketOpcodes.LEVEL_UPDATE]: never,
	[PacketOpcodes.FINISH_GAME]: never,
	[PacketOpcodes.SHOP_LOCK_UPDATE]: never,
	[PacketOpcodes.MATCH_REWARDS]: never,
	[PacketOpcodes.PLAYER_DEAD]: never,
};
