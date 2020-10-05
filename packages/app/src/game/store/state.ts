import { ConnectionStatus } from "@creature-chess/shared/networking";

export interface GameState {
    id: string;
    round: number | null;
    debug: boolean;
    connectionStatus: ConnectionStatus;
}
