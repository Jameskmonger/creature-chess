import { ConnectionStatus } from "@creature-chess/shared/networking";

export interface GameState {
    localPlayerId: string;
    loading: boolean;
    round: number | null;
    debug: boolean;
    connectionStatus: ConnectionStatus;
}
