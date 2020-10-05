import * as React from "react";
import { useSelector } from "react-redux";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/shared/player/pieceSelectors";
import { AppState } from "../../../../../store";
import { ProgressBar } from "../../../../../display/progressBar";

interface HealthbarProps {
    pieceId: string;
    vertical?: boolean;
}

const Healthbar: React.FunctionComponent<HealthbarProps> = ({ pieceId, vertical = false }) => {
    const showHealthbar = useSelector<AppState, boolean>(state => (
        state.game.phase === GamePhase.READY
        || state.game.phase === GamePhase.PLAYING
    ));

    const piece = useSelector<AppState, (PieceModel | null)>(state => getPiece(state, pieceId));

    const localPlayerId = useSelector<AppState, string>(state => state.game.localPlayerId);

    const pieceIsOnBench = piece.position.y === null;

    if (!showHealthbar || !piece || pieceIsOnBench) {
        return null;
    }

    const { ownerId, currentHealth, maxHealth } = piece;
    const friendly = (localPlayerId === ownerId);

    return (
            <ProgressBar
                className={`healthbar ${friendly ? "friendly" : "enemy"} ${vertical ? "vertical" : ""}`}
                current={currentHealth}
                max={maxHealth}
                vertical={vertical}
            />
    );
};

export { Healthbar };
