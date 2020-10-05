import { GamePhase } from "@creature-chess/models";
import { ConnectionStatus } from "@creature-chess/shared/networking";

export interface GameState {
    phase: GamePhase;
    phaseStartedAtSeconds: number;
    opponentId: string;
    loading: boolean;
    round: number | null;
    debug: boolean;
    connectionStatus: ConnectionStatus;
    shopLocked: boolean;
}
