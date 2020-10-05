import { ConnectionStatus } from "@creature-chess/shared/networking";

export interface GameState {
    localPlayerId: string;
    ready: boolean;
    phaseStartedAtSeconds: number;
    opponentId: string;
    loading: boolean;
    round: number | null;
    debug: boolean;
    connectionStatus: ConnectionStatus;
}
