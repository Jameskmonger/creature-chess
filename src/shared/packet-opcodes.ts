import { TileCoordinates } from "./position";
import { GamePhase } from "./game-phase";
import { Piece, Card, LobbyPlayer } from "./models";

export type BoardUpatePacket = {
    pieces: Piece[];
};

interface PreparingPhasePacket {
    round: number;
    pieces: Piece[];
    bench: Piece[];
    cards: Card[];
}

export type PhaseUpdatePacket
    = ({ phase: GamePhase.PREPARING, payload: PreparingPhasePacket })
    | ({ phase: GamePhase.READY, payload: { pieces: Piece[], opponentId: string } })
    | ({ phase: GamePhase.PLAYING })
    | ({ phase: GamePhase.DEAD });

