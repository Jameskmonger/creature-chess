import { GamePhase, QuickChatOption } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

export type Dispatch = (action: any) => void;

export enum ConnectionStatus {
	NOT_CONNECTED = 1,
	CONNECTED = 2,
	DISCONNECTED = 3,
}

export type GameEventMap = {
	phaseChanged: { phase: GamePhase; startedAt: number; round?: number };
	gameFinished: {
		players: { id: string; position: number; finishRound: number }[];
	};
	playerListChanged: { players: PlayerListPlayer[] };
	quickChat: { sendingPlayerId: string; chatValue: QuickChatOption };
	playerDeath: undefined;
	connectionStatusChanged: ConnectionStatus;
};
