import { IncomingPacketRegistry, OutgoingPacketRegistry, RegisterListenerFn, EmitFn, emitActionsOpcode, EmitActionsPacket } from "@shoki/networking";
import { GamePhase, PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { BoardState } from "@shoki/board";
import { RoundInfoState } from "@creature-chess/gamemode";
import { EmptyPacket } from "../empty-packet";

export type GameConnectionPacket = {
	players: PlayerListPlayer[];
	game: RoundInfoState;
};

export type PreparingPhaseUpdatePacket = {
	startedAtSeconds: number;
	phase: GamePhase.PREPARING;
	payload: {
		round: number;
	};
};

export type ReadyPhaseUpdatePacket = {
	startedAtSeconds: number;
	phase: GamePhase.READY;
};

type PlayingPhaseUpdatePacket = ({ startedAtSeconds: number; phase: GamePhase.PLAYING });

export type PhaseUpdatePacket =
	PreparingPhaseUpdatePacket
	| ReadyPhaseUpdatePacket
	| PlayingPhaseUpdatePacket;

type FinishGamePacket = {
	winnerId: string;
};

export type AuthenticateResponse = {
	error?: { type: "not_registered" } | { type: "authentication" };
};

type MatchRewardsPacket = {
	damage: number;
	justDied: boolean;
	rewardMoney: { total: number; base: number; winBonus: number; streakBonus: number; interest: number };
} | null;

type BoardUpdatePacket = BoardState<PieceModel>;
type MatchBoardUpdatePacket = {
	turn: number | null;
	board: BoardUpdatePacket;
};

export enum PacketOpcodes {
	GAME_CONNECTED = "gameConnected",
	BENCH_UPDATE = "benchUpdate",
	BOARD_UPDATE = "boardUpdate",
	MATCH_BOARD_UPDATE = "matchBoardUpdate",
	SPECTATING_PLAYER_UPDATE = "spectatingPlayerUpdate",
	PLAYER_LIST_UPDATE = "playerListUpdate",
	PHASE_UPDATE = "phaseUpdate",
	FINISH_GAME = "finishGame",
	MATCH_REWARDS = "matchRewards",
	PLAYER_DEAD = "playerDead"
}

export type PacketDefinitions = {
	[PacketOpcodes.GAME_CONNECTED]: GameConnectionPacket;
	[PacketOpcodes.BENCH_UPDATE]: BoardUpdatePacket;
	[PacketOpcodes.BOARD_UPDATE]: BoardUpdatePacket;
	[PacketOpcodes.MATCH_BOARD_UPDATE]: MatchBoardUpdatePacket;
	[PacketOpcodes.SPECTATING_PLAYER_UPDATE]: string | null;
	[PacketOpcodes.PLAYER_LIST_UPDATE]: PlayerListPlayer[];
	[PacketOpcodes.PHASE_UPDATE]: PhaseUpdatePacket;
	[PacketOpcodes.FINISH_GAME]: FinishGamePacket;
	[PacketOpcodes.MATCH_REWARDS]: MatchRewardsPacket;
	[PacketOpcodes.PLAYER_DEAD]: EmptyPacket;

	[emitActionsOpcode]: EmitActionsPacket;
};

export type PacketAcknowledgements = {
	[PacketOpcodes.GAME_CONNECTED]: never;
	[PacketOpcodes.BENCH_UPDATE]: never;
	[PacketOpcodes.BOARD_UPDATE]: never;
	[PacketOpcodes.MATCH_BOARD_UPDATE]: never;
	[PacketOpcodes.SPECTATING_PLAYER_UPDATE]: never;
	[PacketOpcodes.PLAYER_LIST_UPDATE]: never;
	[PacketOpcodes.PHASE_UPDATE]: never;
	[PacketOpcodes.FINISH_GAME]: never;
	[PacketOpcodes.MATCH_REWARDS]: never;
	[PacketOpcodes.PLAYER_DEAD]: never;
};

export type IncomingRegistry = IncomingPacketRegistry<PacketDefinitions, PacketAcknowledgements>;
export type OutgoingRegistry = OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>;

export const createIncomingRegistry = (
	registerListener: RegisterListenerFn<PacketDefinitions, PacketAcknowledgements>
): IncomingRegistry =>
	new IncomingPacketRegistry<PacketDefinitions, PacketAcknowledgements>(registerListener);

export const createOutgoingRegistry = (
	emit: EmitFn<PacketDefinitions, PacketAcknowledgements>
): OutgoingRegistry =>
	new OutgoingPacketRegistry<PacketDefinitions, PacketAcknowledgements>(emit);
